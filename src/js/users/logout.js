document.addEventListener("DOMContentLoaded", () => {
    const logout = document.querySelector("#logout");
    logout.innerHTML += "Déconnexion";
    logout.addEventListener('click', () => {
        localStorage.clear();
        window.location.pathname = "~alexis.fouquet/Projet%20AP%201er%20semestre/inpoll/app-web/sondage/src/";
    });
});