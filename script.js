/**
 * BIRTHDAY EXPERIENCE LOGIC
 * --------------------------
 * Handles text injection, narrative transitions, and inverse parallax effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    initContent();
    initConfetti();
    initTransition();
    initLilies();
    initParallax();
});

/**
 * Injects content from content.js into the HTML.
 */
function initContent() {
    const content = window.siteContent;
    if (!content) {
        console.error("siteContent not found! Make sure content.js is loaded before script.js");
        return;
    }

    document.getElementById('decoy-title').textContent = content.decoyTitle;
    document.getElementById('decoy-subtitle').textContent = content.decoySubtitle;
    document.getElementById('decoy-greeting').textContent = content.decoyGreeting;
    document.getElementById('real-letter').textContent = content.realLetter;
}

/**
 * Generates and animates confetti for the Decoy section.
 */
function initConfetti() {
    const container = document.querySelector('.confetti-container');
    const colors = ['#ff6b6b', '#ffd93d', '#6bcbf1', '#95e1d3', '#ff8787'];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = (Math.random() * 5) + 's';
        confetti.style.opacity = Math.random();
        container.appendChild(confetti);
    }
}

/**
 * Handles the transition from the Decoy section to the Letter section.
 */
function initTransition() {
    const decoySection = document.getElementById('decoy-section');
    const wrapper = document.querySelector('.experience-wrapper');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the decoy section is leaving the viewport (scrolling down)
            if (!entry.isIntersecting) {
                decoySection.classList.add('fade-out');
            } else {
                decoySection.classList.remove('fade-out');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(decoySection);
}

/**
 * Creates and places lilies around the edges of the viewport.
 */
function initLilies() {
    const container = document.getElementById('lily-container');
    const lilyCount = 12;

    for (let i = 0; i < lilyCount; i++) {
        const lily = document.createElement('div');
        lily.classList.add('lily');
        
        // Randomly place lilies near the edges
        const side = Math.floor(Math.random() * 4); 
        let top, left;

        switch(side) {
            case 0: // Top
                top = Math.random() * 15 + '%';
                left = Math.random() * 80 + 10 + '%';
                break;
            case 1: // Bottom
                top = (Math.random() * 15 + 85) + '%';
                left = Math.random() * 80 + 10 + '%';
                break;
            case 2: // Left
                top = Math.random() * 80 + 10 + '%';
                left = Math.random() * 15 + '%';
                break;
            case 3: // Right
                top = Math.random() * 80 + 10 + '%';
                left = (Math.random() * 15 + 85) + '%';
                break;
        }

        lily.style.top = top;
        lily.style.left = left;
        
        // Store random properties in dataset to avoid jittering during parallax
        const scale = (Math.random() * 0.5 + 0.5).toFixed(2);
        const rotation = (Math.random() * 360).toFixed(2);
        const speedFactor = (Math.random() * 0.4 + 0.8).toFixed(2);
        
        lily.dataset.scale = scale;
        lily.dataset.rotation = rotation;
        lily.dataset.speed = speedFactor;
        
        lily.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        
        container.appendChild(lily);
    }
}

/**
 * Implements the inverse parallax effect.
 * The lilies (foreground) move slower than the scroll speed.
 */
function initParallax() {
    const wrapper = document.querySelector('.experience-wrapper');
    const lilies = document.querySelectorAll('.lily');
    
    // ADJUST THIS VALUE:
    // Lower = slower (more lag). Higher = faster (closer to normal scroll).
    // 0.1 = very slow lagging effect. 0.5 = moderate lag.
    const parallaxSpeed = 0.3;

    function updateParallax() {
        const scrollTop = wrapper.scrollTop;
        
        lilies.forEach((lily) => {
            const speedFactor = parseFloat(lily.dataset.speed || 1);
            const rotation = lily.dataset.rotation || 0;
            const scale = lily.dataset.scale || 1;
            
            const individualSpeed = parallaxSpeed * speedFactor;
            const offset = scrollTop * individualSpeed;
            
            // Maintain initial scale and rotation while translating for the parallax effect
            lily.style.transform = `translateY(-${offset}px) rotate(${rotation}deg) scale(${scale})`;
        });

        requestAnimationFrame(updateParallax);
    }

    // Optimization: Start the loop
    requestAnimationFrame(updateParallax);
}