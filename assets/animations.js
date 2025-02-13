// Intersection Observer for fade-in animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', entry.target.dataset.animation || 'animate__fadeIn');
        }
    });
}, { threshold: 0.1 });

// Apply animations to elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.country-card').forEach(card => {
        card.dataset.animation = 'animate__fadeInUp';
        animateOnScroll.observe(card);
    });

    document.querySelectorAll('section h2').forEach(heading => {
        heading.dataset.animation = 'animate__fadeInDown';
        animateOnScroll.observe(heading);
    });

    document.querySelectorAll('.benefits-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('animate__pulse'));
        card.addEventListener('mouseleave', () => card.classList.remove('animate__pulse'));
    });
});

// Background Particle Effect (Optimized)
let maxParticles = 50;
let currentParticles = 0;

function createParticles() {
    const heroSection = document.querySelector('.bg-gradient-to-br');
    if (!heroSection || currentParticles >= maxParticles) return;

    const particle = document.createElement('div');
    particle.className = 'absolute w-2 h-2 bg-sky-200 rounded-full opacity-50';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + '%';

    heroSection.appendChild(particle);
    currentParticles++;

    // Animate particle
    particle.animate([
        { transform: 'translateY(0)', opacity: 0.5 },
        { transform: 'translateY(-100px)', opacity: 0 }
    ], { duration: 3000, easing: 'ease-out' }).onfinish = () => {
        particle.remove();
        currentParticles--;
    };
}

// Start particle animation after page load
document.addEventListener('DOMContentLoaded', () => {
    function generateParticles() {
        createParticles();
        requestAnimationFrame(generateParticles);
    }
    generateParticles();
});
