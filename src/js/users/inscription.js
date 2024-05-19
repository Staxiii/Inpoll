inscription.addEventListener('click', async () => {
    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('https://inpoll-alexisfouquet.azurewebsites.net/utilisateurs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prenom, nom, email })
        });

        const responseData = await response.json(); // Capturer la réponse JSON
        console.log('Réponse du serveur :', responseData); // Afficher la réponse pour le débogage

        if (response.ok) {
            const userData = responseData.user; // Accéder aux données de l'utilisateur depuis la réponse
            localStorage.setItem('userId', userData._id);
            alert('Inscription réussie!');
            window.location = 'connexion.html';
        } else {
            const errorMessage = responseData.message; // Accéder au message d'erreur depuis la réponse
            alert(`Erreur lors de l'inscription : ${errorMessage}`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        alert('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
});
