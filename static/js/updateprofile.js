// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: apiKey,
authDomain: "major-project-rtebmrs.firebaseapp.com",
projectId: "major-project-rtebmrs",
storageBucket: "major-project-rtebmrs.appspot.com",
messagingSenderId: "1042694817097",
appId: "1:1042694817097:web:96566f9df5ec97a6554698",
measurementId: "G-N0J85L64VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);


const user = auth.currentUser;

function updateUserProfile(user){
    const username = user.displayName;
    const useremail = user.email;
    const userprofile = user.photoURL;

    document.getElementById("username").textContent = username;
    document.getElementById("useremail").textContent = useremail;
    document.getElementById("userProfile").src = userprofile;
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
        const uid = user.uid;
        return uid; 
    } else {
        alert("Create Account & login")
    }
});