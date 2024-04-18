const User = require('./../../../serveur/routes/utilisateurRoutes.js');

function verifyCodeEmail() {
    document.querySelector("#buttonCode").addEventListener("click", () => {
        const inputElement = document.querySelector("input");

        if(inputElement.value === "") {
            document.getElementById("message").innerHTML = "Le champs semble vide, veuillez le remplir.";
        }
        else if (inputElement.value !== '1111') {
            document.getElementById("message").innerHTML = "Code incorrect, impossible de vous connecter.";
        }

        else {
            document.getElementById("message").innerHTML = "Code correct, redirection...";
        
            window.location = 'http://192.168.3.220/~alexis.fouquet/Projet%20AP%201er%20semestre/inpoll/app-web/sondage/src/pages/accueil.html';
        }
    })
}
verifyCodeEmail();