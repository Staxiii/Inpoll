const hamburgerMenu = document.querySelector('.hamburger-menu')
const navContent = document.querySelector('.nav-content')

hamburgerMenu.addEventListener('click', () => {
    navContent.classList.toggle('mobile-menu')

    const h1 = document.querySelector('.container-accueil h1');
    const p = document.querySelector('.container-accueil p');

    if(navContent.classList.contains('mobile-menu')) {
        h1.style.opacity = '0';
        p.style.opacity = '0';
        hamburgerMenu.src = '../images/burger-nav-cross.png';



    } else {
        h1.style.opacity = '1';
        p.style.opacity = '1';
        hamburgerMenu.src = '../images/burger-nav.png';
    }

});
