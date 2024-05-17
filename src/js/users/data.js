/**
 * #########################################################
 *
 *   | PARTIE 1 /  UTILISATEUR - RECUPERATION (NOM/PRENOM)
 *
 * ########################################################
 **/


/**
 * Utilisation de la requête ajax pour récupérer le nom et prénom de l'utilisateur
 * @param idUtilisateur
 */
function getUserNameById(idUtilisateur) {
    getUserRequest(idUtilisateur).then(data => {
        const element = document.getElementById('showUser');
        setUserNameLocal(data.prenom);
        setUserLastnameLocal(data.nom);
        setUserRankLocal(data.profil);
        element.innerHTML += getUserNameLocal()  + " " + getUserLastnameLocal();
    }).catch(err => {
        console.log(err);
    });
}

/**+
 * Requête AJAX afin de récupérer un id utilisateur
 * @param idUtilisateur
 * @returns {Promise<any>}
 */
async function getUserRequest(idUtilisateur) {
    const result = await fetch(`https://inpoll-alexisfouquet.azurewebsites.net/utilisateurs/${idUtilisateur}`);
    if(result.ok) {
        return await result.json();
    }
}
/**
 * Récupère le prénom de l'utilisateur ajouté au stockage local
 * @returns {any}
 */
function getUserNameLocal() {
    return JSON.parse(localStorage.getItem('firstname'));
}
/**
 * Ajoute le prénom de l'utilisateur au stockage local identifié par une clé
 * @param utilisateurName
 */
function setUserNameLocal(utilisateurName) {
    localStorage.setItem('firstname', JSON.stringify(utilisateurName))
}
/**
 * Récupère le nom de famille de l'utilisateur ajouté au stockage local
 * @returns {any}
 */
function getUserLastnameLocal() {
    return JSON.parse(localStorage.getItem('lastname'));
}

/**
 * Ajoute le nom de famille de l'utilisateur au stockage local identifié par une clé
 * @param utilisateurLastname
 */
function setUserLastnameLocal(utilisateurLastname) {
    return localStorage.setItem('lastname', JSON.stringify(utilisateurLastname));
}

/**
 * Récupère le rang de l'utilisateur ajouté au stockage local
 * @returns {any}
 */
function getUserRankLocal() {
    return JSON.parse(localStorage.getItem('rank'));
}

/**
 * Ajoute le rang de l'utilisateur au stockage local identifié par une clé
 * @param utilisateurRank
 */
function setUserRankLocal(utilisateurRank) {
    return localStorage.setItem('rank', JSON.stringify(utilisateurRank));
}

function setEmailLocal(email) {
    return localStorage.setItem("email", JSON.stringify(email));
}

/**
 * #########################################################
 *
 *   | PARTIE 2 /  EMAIL - GESTION (ENVOIE)
 *
 * ########################################################
 **/
function getEmailById(idUtilisateur) {
    getUserRequest(idUtilisateur).then(data => {
        return data.email;
    }).catch(err => {
        console.log(err);
    });
}

getUserNameById('1');
