let userCredential = JSON.parse(sessionStorage.getItem("user-creds"));
let userInfo = JSON.parse(sessionStorage.getItem("user-info"));

let signOutBtn = document.getElementById("signOutBtn");

let SignOut = () => {
    sessionStorage.removeItem("user-info"); 
    sessionStorage.removeItem("user-creds");
    
    window.location.href = "/";
}

let CheckCred = () => {
    if(!sessionStorage.getItem("user-creds")){
        window.location.href = "/";

    }
    else{

        console.log(userCredential.email , " is loged in.");
        console.log(userInfo.name, " is current user.");

    }
}

window.addEventListener('load', CheckCred);
signOutBtn.addEventListener("click", SignOut);