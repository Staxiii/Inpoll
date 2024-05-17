const firstName = document.getElementById('firstname').value;
const lastName =  document.getElementById('lastname').value;
const email = document.getElementById('email').value;

document.getElementById('register').addEventListener('click', () => {
    fetch('https://inpoll-alexisfouquet.azurewebsites.net/utilisateurs/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "prenom": firstName,
        "nom": lastName,
        "email": email,
        "profil": "Utilisateur",
        "liste": "bts-sio2-slam"
    })
})
.then(response => response.json())
.then(response => console.log(JSON.stringify(response)))
});









