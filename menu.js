document.addEventListener('DOMContentLoaded', function () {
    const scroll = new SmoothScroll('nav a[href*="#"]', {
        speed: 800,
        offset: 16
    });

    let btnMenu = document.getElementById('btn-menu');
    let menu = document.getElementById('menu-mobile');
    let overlay = document.getElementById('overlay-menu');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    let galeriaAtiva = null;
    let imagensAtuais = [];

    btnMenu.addEventListener('click', () => {
        menu.classList.toggle('abrir-menu');
        overlay.style.display = menu.classList.contains('abrir-menu') ? 'block' : 'none';
    });

    document.querySelectorAll('.galeria .btn-fechar, .overlay').forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.classList.contains('btn-fechar')) {
                this.closest('.galeria').style.display = 'none';
            } else {
                const galeriaId = this.getAttribute('data-target');
                abrirGaleria(galeriaId);
            }
        });
    });

    overlay.addEventListener('click', () => {
        if (menu.classList.contains('abrir-menu')) {
            menu.classList.remove('abrir-menu');
            overlay.style.display = 'none';
        }
        if (galeriaAtiva) {
            galeriaAtiva.style.display = 'none';
            galeriaAtiva = null;
        }
    });

    document.querySelectorAll('.overlay').forEach(button => {
        button.addEventListener('click', function () {
            const galeriaId = this.getAttribute('data-target');
            abrirGaleria(galeriaId);
        });
    });

    function abrirGaleria(id) {
        const galeria = document.getElementById(id);
        if (galeria) {
            galeria.style.display = 'block';
            galeriaAtiva = galeria;
            imagensAtuais = Array.from(galeria.querySelectorAll('.miniaturas img')).map(img => img.src);
        }
    }

    // Revisão do fechamento de galerias
    document.querySelectorAll('.galeria .fechar').forEach(fechar => {
        fechar.addEventListener('click', function () {
            this.parentElement.style.display = 'none';
            if (galeriaAtiva === this.parentElement) {
                galeriaAtiva = null; // Reseta a galeria ativa
            }
        });
    });

    document.querySelectorAll('.navegacao button').forEach(button => {
        button.addEventListener('click', function () {
            const direcao = this.classList.contains('anterior') ? -1 : 1;
            mudarImagem(direcao);
        });
    });

    function mudarImagem(direcao) {
        if (!galeriaAtiva) return;
        const imagemGrande = galeriaAtiva.querySelector('#imagemGrande');
        let indiceAtual = imagensAtuais.indexOf(imagemGrande.src);
        indiceAtual += direcao;
        if (indiceAtual < 0) indiceAtual = imagensAtuais.length - 1;
        else if (indiceAtual >= imagensAtuais.length) indiceAtual = 0;
        imagemGrande.src = imagensAtuais[indiceAtual];
    }

    document.querySelectorAll('.miniaturas img').forEach(img => {
        img.addEventListener('click', function () {
            const galeria = this.closest('.galeria');
            galeria.querySelector('#imagemGrande').src = this.src;
        });
    });

    function toggleTheme() {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        themeToggleLightIcon.style.display = newTheme === 'dark' ? 'none' : 'block';
        themeToggleDarkIcon.style.display = newTheme === 'dark' ? 'block' : 'none';

        // Atualiza os logos para o tema claro ou escuro
        const headerLogo = document.getElementById('headerLogo');
        const footerLogo = document.getElementById('footerLogo');
        if (newTheme === 'dark') {
            headerLogo.src = 'img/logositemododark.png'; // Caminho do logo para o tema escuro
            footerLogo.src = 'img/logositemododark.png'; // Atualize se necessário
        } else {
            headerLogo.src = 'img/logositemodolight.png'; // Caminho do logo para o tema claro
            footerLogo.src = 'img/logositemodolight.png'; // Atualize se necessário
        }
    }

    // Adicione esta chamada para garantir que os logos sejam atualizados quando a página for carregada
    toggleTheme();

    themeToggleDarkIcon.addEventListener('click', toggleTheme);
    themeToggleLightIcon.addEventListener('click', toggleTheme);


    themeToggleDarkIcon.addEventListener('click', toggleTheme);
    themeToggleLightIcon.addEventListener('click', toggleTheme);

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleTheme();
    }
    
    
});

