// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBcPnqSmAJ-7z1TE-Cvg_WCYluxKdrCS7s",
  authDomain: "agrisolve-7.firebaseapp.com",
  projectId: "agrisolve-7",
  storageBucket: "agrisolve-7.appspot.com",
  messagingSenderId: "212597401702",
  appId: "1:212597401702:web:adb5b54b32550499cc65a7",
  measurementId: "G-QGFTK9M815"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

 

export { app, auth, googleProvider };