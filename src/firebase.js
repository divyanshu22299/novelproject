// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcZ__tqAOpXQ-nzOkA54CdQXwkgLXp0tk",
  authDomain: "office-credentials-app.firebaseapp.com",
  projectId: "office-credentials-app",
  storageBucket: "office-credentials-app.firebasestorage.app",
  messagingSenderId: "633951285290",
  appId: "1:633951285290:web:e8645190220f70fe501353",
  measurementId: "G-99YPKF88M5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);
