// Fonction pour envoyer l'email de vérification
function sendEmail(email, randomCode) {
    localStorage.setItem('randomCode', randomCode);
    localStorage.setItem('email', email);
    Email.send({
        Host: "smtp.elasticemail.com",
        Port: 2525,
        Username: "lilian.caffier@bts-malraux.net",
        Password: "29E837A8D273099D52DDBACBB5B612C0786D",
        To: email,
        From: "contact.greenpoll@gmail.com",
        Subject: "Code de vérification",
        Body: `Bonjour, \n Voici votre code de vérification: ${randomCode}`
    }).catch(
        error => console.error("Erreur lors de l'envoi de l'email:", error)
    );
}

// Vérification de la page de connexion
if (window.location.pathname.endsWith('/connexion.html')) {
    async function verifyProfile() {
        document.querySelector("#button").addEventListener('click', async () => {
            const email = document.querySelector('input[name="email"]').value;
            if (email === "") {
                document.getElementById("message").innerHTML = "Veuillez saisir votre adresse e-mail !";
            } else {
                try {
                    document.getElementById("message").innerHTML = "Recherche de l'email en cours...";
                    const user = await getUserByEmail(email);
                    if (user) {
                        if (user.connected !== true) {
                            const randomCode = generateRandomCode();
                            sendEmail(email, randomCode);
                            document.getElementById("message").innerHTML = "Code envoyé par email, suivez les instructions...";
                            storeUserIdInLocalStorage(user._id)
                            localStorage.setItem('randomCode', randomCode);
                            setTimeout(() => { window.location = 'pages/mailConfirmation.html'; }, 2000);
                        } else { // Redirection vers accueil si connected = true
                            const user = await getUserByEmail(email);
                            storeUserInLocalStorage(user);
                            storeUserIdInLocalStorage(user._id);
                            setTimeout(() => {
                                window.location = 'accueil.html';
                            }, 3000);
                            document.getElementById("message").innerHTML = "Utilisateur reconnu, redirection vers accueil !";
                            setTimeout(() => { window.location = 'pages/accueil.html'; }, 2000);
                        }
                    } else {
                        document.getElementById("message").innerHTML = "Utilisateur inconnu, redirection vers l'inscription !";
                        setTimeout(() => { window.location = 'inscription.html'; }, 2000);
                    }
                } catch (error) {
                    console.error('Erreur lors de la vérification du profil:', error);
                    document.getElementById("message").innerHTML = "Erreur lors de la vérification du profil.";
                }
            }
        });
    }

    verifyProfile();
}

// Compare email saisi avec emails dans la route utilisateurs
async function getUserByEmail(email) {
    try {
        const response = await fetch(`${userRoad}?email=${email}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        const foundUser = users.find(user => user.email === email);
        return foundUser ? foundUser : null;
    } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur par email:', error);
        throw error;
    }
}

// Fonction pour générer un code aléatoire à 4 chiffres
function generateRandomCode() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}