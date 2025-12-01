// --- script.js COMPLETO (Acordeão Incluso) ---

// 1. MENU MOBILE
const hamburger = document.querySelector(".hamburger");
const navMenuContainer = document.querySelector(".nav-links-container");
const body = document.querySelector("body");
const logo = document.querySelector(".logo");

const menuOverlay = document.createElement('div');
menuOverlay.classList.add('menu-overlay');
body.appendChild(menuOverlay);

function closeMenu() {
    if(hamburger) hamburger.classList.remove("active");
    if(navMenuContainer) navMenuContainer.classList.remove("active");
    menuOverlay.classList.remove("active");
    body.classList.remove("menu-open");
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

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", closeMenu));
menuOverlay.addEventListener('click', closeMenu);


// 2. SLIDER
const slideContainer = document.querySelector(".slider-container");
if (slideContainer) {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    const slideIntervalTime = 5000;
    let slideInterval;

    function updateSlidePosition() {
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

    slideInterval = setInterval(nextSlide, slideIntervalTime);
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    const resetInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
    updateSlidePosition();
}


// 3. MENU ATIVO
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll("header nav ul li a.nav-link");
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
});


// 4. ANIMAÇÃO SCROLL
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
}, observerOptions);
document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));


// 5. ACORDEÃO (NÍVEIS DE ENSINO) - NOVO!
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');

        // Fecha todos os outros itens (efeito sanfona única)
        document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.accordion-content').style.maxHeight = null;
        });

        // Se não estava ativo, abre ele
        if (!isActive) {
            item.classList.add('active');
            const content = item.querySelector('.accordion-content');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});
