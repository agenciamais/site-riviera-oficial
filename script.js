// --- script.js - LÓGICA FINAL (COM BARRA DE PROGRESSO) ---

// 1. PRELOADER (Tela de Carregamento)
window.addEventListener("load", function() {
    const body = document.querySelector("body");
    const preloader = document.getElementById("preloader");
    if(preloader) {
        // Pequeno delay para garantir que o CSS carregou
        setTimeout(() => {
            body.classList.add("loaded");
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }, 500);
    }
});

// 2. MENU MOBILE (Gaveta Lateral)
const hamburger = document.querySelector(".hamburger");
const navMenuContainer = document.querySelector(".nav-links-container");
const body = document.querySelector("body");

// Cria a camada escura (overlay) dinamicamente se ela não existir no HTML
let menuOverlay = document.querySelector('.menu-overlay');
if (!menuOverlay) {
    menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    body.appendChild(menuOverlay);
}

function toggleMenu() {
    hamburger.classList.toggle("active");
    navMenuContainer.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    body.classList.toggle("menu-open");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenuContainer.classList.remove("active");
    menuOverlay.classList.remove("active");
    body.classList.remove("menu-open");
}

if (hamburger) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });
}

// Fecha o menu ao clicar fora (na parte escura) ou nos links
menuOverlay.addEventListener('click', closeMenu);
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", closeMenu));


// 3. SLIDER DE BANNERS (COM BARRA DE PROGRESSO)
const slideContainer = document.querySelector(".slider-container");
const progressBar = document.querySelector(".slider-progress-bar"); // Seleciona a barra

if (slideContainer) {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    const slideIntervalTime = 5000;
    let slideInterval;

    // Função para reiniciar a animação da barra
    function resetProgressBar() {
        if(progressBar) {
            progressBar.classList.remove("animate");
            void progressBar.offsetWidth; // Força reinício da animação
            progressBar.classList.add("animate");
        }
    }

    function updateSlidePosition() {
        slideContainer.style.transform = `translateX(${-slideIndex * 100}%)`;
        resetProgressBar(); // Reinicia a barra
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % totalSlides;
        updateSlidePosition();
    }
    function prevSlide() {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    // Inicia o slider
    slideInterval = setInterval(nextSlide, slideIntervalTime);
    resetProgressBar(); // Inicia a barra na primeira vez

    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    const resetInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideIntervalTime);
        resetProgressBar();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
    
    updateSlidePosition();
}


// 4. MENU ATIVO (Link Laranja)
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll("header nav ul li a.nav-link");
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
});


// 5. ANIMAÇÃO SCROLL (Fade In Up)
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
}, observerOptions);
document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));


// 6. ACORDEÃO (Níveis de Ensino)
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');

        // Fecha todos os outros
        document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.accordion-content').style.maxHeight = null;
        });

        // Abre o clicado
        if (!isActive) {
            item.classList.add('active');
            const content = item.querySelector('.accordion-content');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});
