// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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
const dbref = ref(db);

const auth = getAuth(app);
auth.languageCode = 'en';


//google auth provider ---------------------------------------------------

const provider = new GoogleAuthProvider();


const googleLoginBtn = document.getElementById("login-with-google-btn");
googleLoginBtn.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
          // The signed-in user info.
        const user = result.user;
        
        // window.location.href = "/main";
        console.log(user);
        set(ref(db, 'users/' + user.uid),{
            username: user.displayName
        });
        console.log(user.displayName, "User Logged In");
        get(child(dbref, 'users/' + user.uid)).then((snapshot) => {
            if(snapshot.exists()){
                console.log(snapshot.val().username)
                sessionStorage.setItem("user-info", JSON.stringify({
                    name: snapshot.val().username 
                }))
                console.log("inside get child fun")
                sessionStorage.setItem("user-creds", JSON.stringify(user));
                window.location.href = '/main';
                // console.log("new page tadow!!!")
            }
        })
    }).catch((error) => {username
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
         
    });

});

function updateUserProfile(user){
    const username = user.displayName;
    const useremail = user.email;
    const userprofile = user.photoURL;
    console.log("user", user)
    document.getElementById("username").textContent = username;
    document.getElementById("useremail").textContent = useremail;
    document.getElementById("userProfile").src = userprofile;
}
updateUserProfile();

// google auth provider -end-------------------------------------------------

