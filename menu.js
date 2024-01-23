document.addEventListener('DOMContentLoaded', function () {
    const scroll = new SmoothScroll('nav a[href*="#"]', {
        speed: 800, // Ajuste a velocidade conforme necessário
        offset: 16 // Ajuste conforme necessário
    });

    let btnMenu = document.getElementById('btn-menu');
    let menu = document.getElementById('menu-mobile');
    let overlay = document.getElementById('overlay-menu');
    let btnFecharMenu = document.querySelector('.menu-mobile .btn-fechar i');

    btnMenu.addEventListener('click', () => {
        menu.classList.toggle('abrir-menu');
        overlay.style.display = menu.classList.contains('abrir-menu') ? 'block' : 'none';
    });

    btnFecharMenu.addEventListener('click', () => {
        menu.classList.remove('abrir-menu');
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
        menu.classList.remove('abrir-menu');
        overlay.style.display = 'none';
    });
});
