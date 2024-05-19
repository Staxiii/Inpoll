document.addEventListener("DOMContentLoaded", () => {
    const logout = document.querySelector("#logout");
    logout.innerHTML += "Déconnexion";
    logout.addEventListener('click', async () => {
        // Récupérer l'ID de l'utilisateur depuis le stockage local
        const userId = localStorage.getItem('userId');

        if (!userId) {
            console.error("ID de l'utilisateur non trouvé dans le stockage local");
            return;
        }

        try {
            // Effectuer une requête PUT pour mettre à jour l'état connecté de l'utilisateur à false
            const response = await fetch(`https://inpoll-alexisfouquet.azurewebsites.net/utilisateurs/isNotConnected/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log("Déconnexion réussie !");
            } else {
                console.error("Erreur lors de la déconnexion :", response.status);
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }

        // Effacer toutes les données du stockage local
        localStorage.clear();
        // Rediriger vers la page de connexion
        window.location.pathname = "~alexis.fouquet/BTS%20Sujets/DeuxiemeAnneeAP/inpoll/app-web/sondage/client-web-inpoll/src/connexion.html";
    });
});
