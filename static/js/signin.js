// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


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
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);


// let nameInp = document.getElementById("nameInp");
let LoginEmailInp = document.getElementById("loginEmailInp");
let LoginPassInp = document.getElementById("loginPassInp");
let mainLoginForm = document.getElementById("mainLoginForm");


let LoginUser = (e) => {
    e.preventDefault();
    alert("Signin Form Submitted.")
    signInWithEmailAndPassword(auth, LoginEmailInp.value, LoginPassInp.value)
    .then((userCredential) => {
        console.log(userCredential.user.email, "LogedIn successfully")
        get(child(dbref, 'users/' + userCredential.user.uid)).then((snapshot) => {
            if(snapshot.exists()){
                console.log(snapshot.val().username)
                sessionStorage.setItem("user-info", JSON.stringify({
                    name: snapshot.val().username 
                }))
                console.log("inside get child fun")
                sessionStorage.setItem("user-creds", JSON.stringify(userCredential.user));
                window.location.href = '/main';
            }
        })

        // console.log("successfully logedin:)")
        // window.location.href = '/main';
    })
    .catch((error) => {
        alert(error.message);
        console.error(error);
        console.log(error.message);
    });
}

// console.log("register js here")
mainLoginForm.addEventListener("submit", LoginUser);
