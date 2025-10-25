/// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics"; 

// Your web app's Firebase configuration with hardcoded values
const firebaseConfig = {
    // NOTE: Using hardcoded values is strongly discouraged in production
    // but solves the immediate startup error.
    apiKey: "AIzaSyDFE4t7MYoBFT5i0RgQAlVcGYk6MUcBzyg",
    authDomain: "assignment-09-33bda.firebaseapp.com",
    projectId: "assignment-09-33bda",
    storageBucket: "assignment-09-33bda.firebasestorage.app",
    messagingSenderId: "845650214255",
    appId: "1:845650214255:web:2e025205e9d65bd47b3c9a",
    measurementId: "G-9WS6KC943H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const analytics = getAnalytics(app); // Initialized but not used in AuthProvider

export default auth; 
