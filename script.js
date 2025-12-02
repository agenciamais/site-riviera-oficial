// --- script.js ---

// MENU MOBILE
const hamburger = document.querySelector(".hamburger");
const navMenuContainer = document.querySelector(".nav-links-container");
const body = document.querySelector("body");

function toggleMenu() {
    hamburger.classList.toggle("active");
    navMenuContainer.classList.toggle("active");
    body.classList.toggle("menu-open");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenuContainer.classList.remove("active");
    body.classList.remove("menu-open");
}

if (hamburger) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });
}

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", closeMenu));

// SLIDER
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
    const resetInterval = () => { clearInterval(slideInterval); slideInterval = setInterval(nextSlide, slideIntervalTime); }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
    updateSlidePosition();
}

// MENU ATIVO
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll("header nav ul li a.nav-link");
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
});

// ANIMAÇÃO SCROLL
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
}, observerOptions);
document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));

// ACORDEÃO
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.accordion-content').style.maxHeight = null;
        });
        if (!isActive) {
            item.classList.add('active');
            const content = item.querySelector('.accordion-content');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});
