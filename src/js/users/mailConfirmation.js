// Fonction pour mettre à jour la propriété connected dans le backend
async function updateConnected(userId) {
    if (!userId) {
        console.error('User ID is null or undefined');
        return;
    }

    try {
        const response = await fetch(`https://inpoll-alexisfouquet.azurewebsites.net/utilisateurs/connected/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ connected: true }),
        });

        if (!response.ok) {
            console.error('Network response was not ok');
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
    } catch (error) {
        console.error('There was a problem with the updateConnected operation:', error);
    }
}


// Récupération des informations de l'utilisateur au chargement de la page
if (window.location.pathname.endsWith('/mailConfirmation.html')) {
    const idUtilisateur = localStorage.getItem('userId');

    async function verifyCodeEmail() {
        document.querySelector("#buttonCode").addEventListener("click", async () => {
            const inputElement = document.querySelector("input[name='firstname']");
            const randomCode = localStorage.getItem('randomCode');
            const email = localStorage.getItem('email');
    
            if (inputElement.value === "") {
                document.getElementById("message").innerHTML = "Le champ semble vide, veuillez le remplir.";
            } else if (inputElement.value !== randomCode) {
                document.getElementById("message").innerHTML = "Code incorrect, impossible de vous connecter.";
            } else {
                document.getElementById("message").innerHTML = "Code correct, récupération des informations de l'utilisateur...";
    
                try {
                    const user = await getUserByEmail(email);
                    if (user) {
                        storeUserInLocalStorage(user); // Stocker toutes les informations de l'utilisateur dans le local storage
                        storeUserIdInLocalStorage(user._id); // Stocker l'ID de l'utilisateur dans le local storage
                        updateConnected(user._id); // Mettre à jour l'état de connexion
                        setTimeout(() => {
                            window.location = 'accueil.html';
                        }, 3000);
                    } else {
                        console.error('Aucun utilisateur trouvé avec cet email');
                        document.getElementById("message").innerHTML = "Aucun utilisateur trouvé avec cet email.";
                    }
                } catch (error) {
                    console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
                    document.getElementById("message").innerHTML = "Erreur lors de la récupération des informations de l'utilisateur.";
                }
            }
        });
    }

    verifyCodeEmail();
}

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