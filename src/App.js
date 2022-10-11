import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase.init';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [resgistered, setResgistered] = useState(false)

  const handleEmailBlur = e => {
    setEmail(e.target.value)
    // setEmail('')
  }

  const handlePasswordBlur = e => {
    setPassword(e.target.value)
    // setPassword('')
  }

  const handleFormSubmit = e => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault();

      // return;
    }
    // if(!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)){
    //   setError('Please should contain a special character')
    //   return;
    // }
    setValidated(true);
    // setError('')
    if (resgistered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
        })
        .catch(error => {
          console.log(error)
          setError(error.message)
        })
      e.preventDefault()
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
        })
        .catch(error => {
          console.log(error)
          setError(error.message)
        })
      verifyEmail()
      e.preventDefault()
    }
  }

  const handleRegisteredChanged = event => {
    setResgistered(event.target.checked)
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email Verification send')
      })
  }


  const handleForgatePass = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Link Send')
      })
  }

  return (
    <div>
      <div className="registration w-50 mx-auto mt-2">
        <h2 className='text-primary'>{resgistered ? 'Please Login' : 'Please Register'}</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <p className='text-danger'>{error}</p>
          <Button onClick={handleForgatePass} variant='link'>Forgate password?</Button>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChanged} type="checkbox" label="Already registered?" />
          </Form.Group>
          <Button variant="primary" type="submit">
            {resgistered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
