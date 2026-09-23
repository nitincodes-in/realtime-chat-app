import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";




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





const firebaseConfig = {
    // अपना existing Firebase config यहाँ रखो
};


/* =====================================
   FIREBASE START
   ===================================== */

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const messagesRef = ref(database, "messages");


/* =====================================
   HTML ELEMENTS
   ===================================== */

const messageInput = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

const messagesBox = document.getElementById("messages");


/* =====================================
   SEND MESSAGE
   ===================================== */

function sendMessage() {

    const text = messageInput.value.trim();

    if (text === "") {
        return;
    }

    push(messagesRef, {
        text: text,
        time: Date.now()
    });

    messageInput.value = "";

    messageInput.focus();
}


/* =====================================
   SEND BUTTON
   ===================================== */

sendBtn.addEventListener("click", sendMessage);


/* =====================================
   ENTER KEY
   ===================================== */

messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendMessage();
    }

});


/* =====================================
   RECEIVE REAL-TIME MESSAGES
   ===================================== */

onValue(messagesRef, function(snapshot) {

    messagesBox.innerHTML = "";

    snapshot.forEach(function(childSnapshot) {

        const message = childSnapshot.val();

        const messageDiv = document.createElement("div");

        messageDiv.className = "message sent";


        const bubble = document.createElement("div");

        bubble.className = "bubble";


        const text = document.createElement("div");

        text.textContent = message.text;


        const time = document.createElement("span");

        time.className = "time";

        const date = new Date(message.time);

        time.textContent =
            date.getHours().toString().padStart(2, "0")
            + ":"
            +
            date.getMinutes().toString().padStart(2, "0");


        bubble.appendChild(text);

        bubble.appendChild(time);

        messageDiv.appendChild(bubble);

        messagesBox.appendChild(messageDiv);

    });


    messagesBox.scrollTop = messagesBox.scrollHeight;

});


console.log("Chattera connected to Firebase!");
