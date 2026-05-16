window.addEventListener('scroll', () => {

    const header = document.querySelector('.header');

    header.classList.toggle('active', window.scrollY > 50);

});