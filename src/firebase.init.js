// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhzMuPCDqVGMl0mQqbc0K-B5Vm-CRK8oA",
    authDomain: "email-password-auth-51eb4.firebaseapp.com",
    projectId: "email-password-auth-51eb4",
    storageBucket: "email-password-auth-51eb4.appspot.com",
    messagingSenderId: "1091364088779",
    appId: "1:1091364088779:web:77188b1be52a2906de244e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;