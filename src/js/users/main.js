//Création utilisateur local
const localUser = {
    firstName: "Alexis",
    lastName: "Fouquet",
    email: "alexis.fouquet@bts-malraux.net",
}



//Vérifier si l'utilisateur local est correct.
function verifyUsersEmail(firstName, lastName, email) {

    const inputElement = document.querySelectorAll('input');

    firstName = inputElement[0].value; //Prénom
    lastName = inputElement[1].value; //Nom de famille
    email = inputElement[2].value; //Email

    return (firstName === localUser.firstName && lastName === localUser.lastName && email === localUser.email ? true : false);
}


function sendEmail() {
    Email.send({
        Host : "smtp.elasticemail.com",
        Port: 2525,
        Username : "lilian.caffier@bts-malraux.net",
        Password : "29E837A8D273099D52DDBACBB5B612C0786D",
        To : localUser.email.toString(),
        From : "contact.greenpoll@gmail.com",
        Subject : "Code de vérification",
        Body : `Bonjour Mr ${localUser.firstName} ${localUser.lastName} \n Voici votre code de vérification: 1111`
    }).then(
        message => console.log(message)
    );
}


//Vérification si nos entrées claviers sont vides ou non
function verifyProfile() {
    document.querySelector("#button").addEventListener('click', () => {
        const inputElement = document.querySelectorAll('input');
        for(let i = 0; i < inputElement.length; i++) {
            if(inputElement[i].value === "") {
                document.getElementById("message").innerHTML = `Vos identifiants n'ont pas été saisis !`;
            }
            else if(inputElement[0].value.toString() !== "" && inputElement[1].value.toString() !== "" && inputElement[2].value.toString() !== "") {

                if(!verifyUsersEmail(inputElement[0].value, inputElement[1].value, inputElement[2].value)) {
                    document.getElementById("message").innerHTML = "Utilisateur non reconnu !";
                }
                else if(verifyUsersEmail(inputElement[0].value, inputElement[1].value, inputElement[2].value)){
                    sendEmail();
                    document.getElementById("message").innerHTML= "Code envoyé par email, suivez les instructions...";


                    setTimeout(() => {
                        window.location = 'http://192.168.3.220/~alexis.fouquet/Projet%20AP%201er%20semestre/inpoll/app-web/sondage/src/pages/mailConfirmation.html';
                    }, 1000);
                } else {
                    document.getElementById("message").innerHTML = "Commande non fonctionnelle !";
                }
            } else {
                document.getElementById("message").innerHTML = "Commande non fonctionnelle !";
            }
        }
    });
}

verifyProfile();
console.log(localStorage.getItem('firstname'));

//Suppression message erreur lorsqu'on ajoute des contenus dans nos inputs → forms
document.querySelectorAll('input').forEach((element) => element.addEventListener('input', () => {
   document.getElementById("message").innerHTML = "";
}));