const userRoad = "https://inpoll-alexisfouquet.azurewebsites.net/utilisateurs/";

// Fonction pour stocker l'ID de l'utilisateur dans le localStorage
function storeUserIdInLocalStorage(userId) {
    localStorage.setItem('userId', userId);
}

// Fonction pour récupérer l'ID de l'utilisateur depuis le localStorage
function getUserIdFromLocalStorage() {
    return localStorage.getItem('userId');
}

// Fonction pour stocker l'utilisateur dans le localStorage
function storeUserInLocalStorage(user) {
    if (!user) {
        console.error('User is undefined or null');
        return;
    }
    localStorage.setItem('user', JSON.stringify(user)); // Convertir l'objet en chaîne JSON avant de le stocker
}

// Fonction pour récupérer l'utilisateur depuis le localStorage
function getUserFromLocalStorage() {
    const userJSON = localStorage.getItem('user');
    return userJSON ? JSON.parse(userJSON) : null;
}

const user = getUserFromLocalStorage();


// Affichage des informations de l'utilisateur
if(user){
    document.addEventListener('DOMContentLoaded', function () {
        const user = getUserFromLocalStorage();
        const showUserElement = document.getElementById('showUser');
        if (user) {
            const { nom, prenom, _id } = user;
            localStorage.setItem("userId", _id);
            showUserElement.innerHTML = `<i class="fa-solid fa-user"></i> ${prenom} ${nom}`;
        } else {
            showUserElement.innerHTML = "<i class='fa-solid fa-user'></i> Utilisateur non trouvé";
        }
    });
}

document.querySelectorAll('input').forEach((element) => element.addEventListener('input', () => {
    document.getElementById("message").innerHTML = "";
}));

if (window.location.pathname.endsWith('/accueil.html')) {
    if (userId) {
        fetchAndDisplaySondages(userId);
        setInterval(() => {
            fetchAndDisplaySondages(userId);
        }, 3000);
    } else {
        console.error('User ID not found in localStorage');
    }
}

async function fetchAndDisplaySondages(userId) {
    try {
        const sondages = await fetchSondages(userId);
        displaySondages(sondages);
    } catch (error) {
        console.error('There was a problem fetching and displaying sondages:', error);
    }
}

function getUserIdFromLocalStorage() {
    return localStorage.getItem('userId');
}

async function fetchSondages(userId) {
    try {
        const response = await fetch(`https://inpoll-alexisfouquet.azurewebsites.net/sondages/express/${userId}`);
        if (!response.ok) {
            if (response.status === 400) {
                return [];
            } else {
                throw new Error('Network response was not ok');
            }
        }
        const sondages = await response.json();
        return sondages;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

function displaySondages(sondages) {
    const container = document.getElementById('sondagesContainer');
    if (!container) {
        console.error('Element with ID "sondagesContainer" not found');
        return;
    }
    container.innerHTML = '';
    if (sondages && sondages.length > 0) {
        container.classList.add('bandeau-notif');
        const messageElement = document.createElement('div');
        messageElement.textContent = 'Vous avez des sondages express disponibles:';
        container.appendChild(messageElement);
        const titres = sondages.map(sondage => sondage.titre); 
        const titresElement = document.createElement('div');
        titresElement.textContent = titres.join(', ');

        container.appendChild(titresElement);
    } else {
        container.classList.remove('bandeau-notif');
    }
}

