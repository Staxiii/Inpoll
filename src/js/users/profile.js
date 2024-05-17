function showProfile(idUtilisateur) {
    getUserRequest(idUtilisateur).then(data => {
        const firstname = document.getElementById('firstname');
        const lastname = document.getElementById('lastname');
        const email = document.getElementById('mail');
        const rank = document.getElementById('rank');


        firstname.innerHTML += getUserNameLocal();
        lastname.innerHTML += getUserLastnameLocal();
        email.innerHTML += data.email;
        rank.innerHTML += (getUserRankLocal() === "Administrateur" ? "<span class='admin'>Administrateur</span>"
            : "<span class='user'>Utilisateur</span>");

    });
}
showProfile('6571da6bfec8b92be68e748a');