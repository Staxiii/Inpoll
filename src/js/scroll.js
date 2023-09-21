const arrowBtn = document.querySelector('.up-btn');

arrowBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});
