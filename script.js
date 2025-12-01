// ... (mantenha o código do menu e do slider igual) ...

// ANIMAÇÃO AO ROLAR (Scroll Reveal)
const observerOptions = {
    threshold: 0.15, // Dispara quando 15% do elemento aparece
    rootMargin: "0px 0px -50px 0px" // Ajuste fino para disparar um pouco antes
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
