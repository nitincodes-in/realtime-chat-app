import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


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

const auth = getAuth(app);

const messagesRef = ref(database, "messages");


/* =====================================
   AUTH ELEMENTS
   ===================================== */

const authScreen = document.getElementById("authScreen");

const chatScreen = document.getElementById("chatScreen");

const loginForm = document.getElementById("loginForm");

const signupForm = document.getElementById("signupForm");

const loginEmail = document.getElementById("loginEmail");

const loginPassword = document.getElementById("loginPassword");

const signupEmail = document.getElementById("signupEmail");

const signupPassword = document.getElementById("signupPassword");

const loginBtn = document.getElementById("loginBtn");

const signupBtn = document.getElementById("signupBtn");

const showSignupBtn = document.getElementById("showSignupBtn");

const showLoginBtn = document.getElementById("showLoginBtn");

const authMessage = document.getElementById("authMessage");

const logoutBtn = document.getElementById("logoutBtn");


/* =====================================
   CHAT ELEMENTS
   ===================================== */

const messageInput = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

const messagesBox = document.getElementById("messages");


/* =====================================
   SHOW SIGN UP
   ===================================== */

showSignupBtn.addEventListener("click", function() {

    loginForm.style.display = "none";

    signupForm.style.display = "block";

    authMessage.textContent = "";

});


/* =====================================
   SHOW LOGIN
   ===================================== */

showLoginBtn.addEventListener("click", function() {

    signupForm.style.display = "none";

    loginForm.style.display = "block";

    authMessage.textContent = "";

});


/* =====================================
   CREATE ACCOUNT
   ===================================== */

signupBtn.addEventListener("click", function() {

    const email = signupEmail.value.trim();

    const password = signupPassword.value;

    if (email === "" || password === "") {

        authMessage.textContent =
            "Email aur password dono enter karein.";

        return;

    }

    if (password.length < 6) {

        authMessage.textContent =
            "Password kam se kam 6 characters ka hona chahiye.";

        return;

    }

    authMessage.textContent = "Account create ho raha hai...";

    createUserWithEmailAndPassword(
        auth,
        email,
        password
    )
    .then(() => {

        authMessage.textContent = "";

    })
    .catch((error) => {

        console.error(error);

        if (error.code === "auth/email-already-in-use") {

            authMessage.textContent =
                "Ye email already registered hai.";

        } else {

            authMessage.textContent =
                error.message;

        }

    });

});


/* =====================================
   LOGIN
   ===================================== */

loginBtn.addEventListener("click", function() {

    const email = loginEmail.value.trim();

    const password = loginPassword.value;

    if (email === "" || password === "") {

        authMessage.textContent =
            "Email aur password dono enter karein.";

        return;

    }

    authMessage.textContent = "Login ho raha hai...";

    signInWithEmailAndPassword(
        auth,
        email,
        password
    )
    .then(() => {

        authMessage.textContent = "";

    })
    .catch((error) => {

        console.error(error);

        if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
        ) {

            authMessage.textContent =
                "Email ya password galat hai.";

        } else {

            authMessage.textContent =
                error.message;

        }

    });

});


/* =====================================
   AUTH STATE
   ===================================== */

onAuthStateChanged(auth, function(user) {

    if (user) {

        authScreen.style.display = "none";

        chatScreen.style.display = "block";

        console.log("Logged in:", user.email);

    } else {

        authScreen.style.display = "flex";

        chatScreen.style.display = "none";

    }

});


/* =====================================
   LOGOUT
   ===================================== */

logoutBtn.addEventListener("click", function() {

    signOut(auth)
        .catch((error) => {

            console.error("Logout error:", error);

        });

});


/* =====================================
   SEND MESSAGE
   ===================================== */

function sendMessage() {

    const text = messageInput.value.trim();

    if (text === "") {
        return;
    }

    if (!auth.currentUser) {

        alert("Pehle login karein.");

        return;

    }

    push(messagesRef, {

        text: text,

        time: Date.now(),

        userId: auth.currentUser.uid,

        userEmail: auth.currentUser.email

    })
    .then(() => {

        messageInput.value = "";

        messageInput.focus();

    })
    .catch((error) => {

        console.error("Message send error:", error);

        alert(
            "Message send nahi hua. Firebase Database rules check karein."
        );

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
   CONNECTION
   ===================================== */

console.log("Chattera connected to Firebase!");
