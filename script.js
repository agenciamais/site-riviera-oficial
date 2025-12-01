// --- script.js COMPLETO (Versão Final) ---

// 1. LÓGICA DO MENU MOBILE (Hambúrguer)
const hamburger = document.querySelector(".hamburger");
const navMenuContainer = document.querySelector(".nav-links-container");
const body = document.querySelector("body");
const logo = document.querySelector(".logo");

// Cria o fundo escuro quando abre o menu
const menuOverlay = document.createElement('div');
menuOverlay.classList.add('menu-overlay');
body.appendChild(menuOverlay);

function closeMenu() {
    if(hamburger) hamburger.classList.remove("active");
    if(navMenuContainer) navMenuContainer.classList.remove("active");
    menuOverlay.classList.remove("active");
    body.classList.remove("menu-open");
    // Se tiver lógica de esconder logo, remove a classe
    if (logo) logo.classList.remove("hidden");
}

function openMenu() {
    if(hamburger) hamburger.classList.add("active");
    if(navMenuContainer) navMenuContainer.classList.add("active");
    menuOverlay.classList.add("active");
    body.classList.add("menu-open");
}

if (hamburger) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isActive = hamburger.classList.contains('active');
        if (isActive) closeMenu();
        else openMenu();
    });
}

// Fecha o menu ao clicar nos links ou fora dele
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", closeMenu));
menuOverlay.addEventListener('click', closeMenu);


// 2. LÓGICA DO SLIDER (Carrossel de Imagens)
const slideContainer = document.querySelector(".slider-container");

if (slideContainer) {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    const slideIntervalTime = 5000; // Tempo de 5 segundos
    let slideInterval;

    function updateSlidePosition() {
        // Move o slide para a esquerda
        slideContainer.style.transform = `translateX(${-slideIndex * 100}%)`;
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % totalSlides;
        updateSlidePosition();
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    // Inicia o movimento automático
    slideInterval = setInterval(nextSlide, slideIntervalTime);

    // Botões de Voltar e Avançar
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    const resetInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }
    
    // Inicia na posição correta
    updateSlidePosition();
}


// 3. MENU ATIVO (Deixa o link laranja na página atual)
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll("header nav ul li a.nav-link");

    navLinks.forEach(link => {
        link.classList.remove('active');
        // Verifica se o link corresponde à página atual
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});


// 4. NOVA ANIMAÇÃO AO ROLAR (Scroll Reveal Premium)
const observerOptions = {
    threshold: 0.1, // Dispara quando 10% do elemento aparece
    rootMargin: "0px 0px -50px 0px" 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Aplica a animação em todos os elementos com a classe .fade-in-up
document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
