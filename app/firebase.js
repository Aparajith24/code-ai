// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfJ0CrgcXljMkmTT2qk0CxxJGOa5GMmis",
    authDomain: "code-ai-auth.firebaseapp.com",
    projectId: "code-ai-auth",
    storageBucket: "code-ai-auth.firebasestorage.app",
    messagingSenderId: "144312600719",
    appId: "1:144312600719:web:bc03e8c619b0f9a28c08fa",
    measurementId: "G-WPJ3WTEGE8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth};