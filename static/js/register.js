// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "major-project-rtebmrs.firebaseapp.com",
    databaseURL: "https://major-project-rtebmrs-default-rtdb.firebaseio.com",
    projectId: "major-project-rtebmrs",
    storageBucket: "major-project-rtebmrs.appspot.com",
    messagingSenderId: "1042694817097",
    appId: "1:1042694817097:web:96566f9df5ec97a6554698",
    measurementId: "G-N0J85L64VP",
    databaseURL: "https://major-project-rtebmrs-default-rtdb.firebaseio.com"

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

let nameInp = document.getElementById("nameInp");
let emailInp = document.getElementById("emailInp");
let passInp = document.getElementById("passwordInp");
let mainSignupForm = document.getElementById("mainSignupForm");

let RegisterUser = (e) => {
    e.preventDefault();
    alert("Signup Form Submitted.")
    createUserWithEmailAndPassword(auth, emailInp.value, passInp.value)
    .then((userCredential) => {
        // console.log(userCredential);
        set(ref(db, 'users/' + userCredential.user.uid),{
            username: nameInp.value
        });
       console.log(nameInp.value, "User Registered Successfully");
       alert("You have registered successfully. Please Login to continue.")
    })
    .catch((error) => {
        alert(error.message);
        console.error(error);
        console.log(error.message);

    });
}

// console.log("register js here")
mainSignupForm.addEventListener("submit", RegisterUser);
 