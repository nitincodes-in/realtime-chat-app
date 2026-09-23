import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";


/* =====================================
   FIREBASE CONFIG
   ===================================== */

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


/* =====================================
   START FIREBASE
   ===================================== */

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const messagesRef = ref(database, "messages");


/* =====================================
   GET HTML ELEMENTS
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
    })
    .then(() => {

        messageInput.value = "";

        messageInput.focus();

    })
    .catch((error) => {

        console.error("Message send error:", error);

        alert("Message send nahi hua. Firebase Database rules check karein.");

    });

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
   REAL-TIME MESSAGES
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
            + ":" +
            date.getMinutes().toString().padStart(2, "0");


        bubble.appendChild(text);

        bubble.appendChild(time);

        messageDiv.appendChild(bubble);

        messagesBox.appendChild(messageDiv);

    });


    messagesBox.scrollTop = messagesBox.scrollHeight;

});


/* =====================================
   CONNECTION MESSAGE
   ===================================== */

console.log("Chattera connected to Firebase!");
