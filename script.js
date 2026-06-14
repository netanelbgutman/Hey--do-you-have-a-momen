/**
 * Birthday Website Interactivity
 * This script handles the generative festive elements (confetti) 
 * to complement the CSS scroll-driven animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initConfetti();
});

/**
 * Creates and animates festive confetti particles in the first section.
 */
function initConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;

    const confettiCount = 50;
    const colors = ['#e9dcb7', '#bfa36d', '#fdfbf5', '#d4c39a', '#f2e8cf'];

    for (let i = 0; i < confettiCount; i++) {
        createParticle(container, colors);
    }
}

function createParticle(container, colors) {
    const particle = document.createElement('div');
    
    // Randomize appearance
    const size = Math.random() * 10 + 5 + 'px';
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Styling the particle
    Object.assign(particle.style, {
        position: 'absolute',
        width: size,
        height: size,
        backgroundColor: color,
        left: Math.random() * 100 + 'vw',
        top: Math.random() * 100 + 'vh',
        opacity: Math.random() * 0.5 + 0.3,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        zIndex: '1',
        pointerEvents: 'none',
        transition: `all ${Math.random() * 3 + 2}s linear`
    });

    container.appendChild(particle);

    // Initial animation trigger
    animateParticle(particle);
}

function animateParticle(particle) {
    setInterval(() => {
        const xMove = (Math.random() - 0.5) * 100;
        const yMove = (Math.random() - 0.5) * 100;
        
        particle.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${Math.random() * 360}deg)`;
    }, Math.random() * 3000 + 2000);
}