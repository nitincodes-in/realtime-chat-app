import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAx3DahKSB9UXTRpFcppk97D6nNLRHLCM",
  authDomain: "realtime-chat-app-85621.firebaseapp.com",
  databaseURL: "https://realtime-chat-app-85621-default-rtdb.firebaseio.com",
  projectId: "realtime-chat-app-85621",
  storageBucket: "realtime-chat-app-85621.firebasestorage.app",
  messagingSenderId: "1080265230928",
  appId: "1:1080265230928:web:34ebc2c8bd9c7ba4a65f55",
  measurementId: "G-KQ8P3H054K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log("Chattera connected to Firebase!");
