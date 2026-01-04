// ===================================
// SCROLL-TRIGGERED ANIMATIONS WITH GSAP
// ===================================

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Hero Parallax Animation
function initHeroParallax() {
    // Animate hero title lines
    gsap.fromTo('.title-line',
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.5
        }
    );

    // Parallax shapes
    gsap.to('.shape-1', {
        y: 200,
        x: 100,
        scrollTrigger: {
            trigger: '.hero-parallax',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.shape-2', {
        y: -150,
        x: -100,
        scrollTrigger: {
            trigger: '.hero-parallax',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.shape-3', {
        scale: 1.5,
        opacity: 0.05,
        scrollTrigger: {
            trigger: '.hero-parallax',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Hero content parallax
    gsap.to('.hero-content', {
        y: 150,
        opacity: 0.5,
        scrollTrigger: {
            trigger: '.hero-parallax',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
}

// Horizontal Scroll Section
function initHorizontalScroll() {
    const section = document.querySelector('.horizontal-scroll-section');
    const content = document.querySelector('.horizontal-scroll-content');
    
    if (!section || !content) return;

    const cards = gsap.utils.toArray('.story-card');
    const contentWidth = content.scrollWidth;
    const viewportWidth = window.innerWidth;

    gsap.to(content, {
        x: -(contentWidth - viewportWidth),
        ease: 'none',
        scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            end: () => `+=${contentWidth - viewportWidth}`,
            invalidateOnRefresh: true
        }
    });

    // Animate each card on reveal
    cards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0.5, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: gsap.to(content, {
                        x: -(contentWidth - viewportWidth),
                        ease: 'none'
                    }),
                    start: 'left center',
                    end: 'center center',
                    scrub: 1
                }
            }
        );
    });
}

// Reveal Animations
function initRevealAnimations() {
    // Reveal up
    gsap.utils.toArray('.reveal-up').forEach(element => {
        gsap.fromTo(element,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Reveal left
    gsap.utils.toArray('.reveal-left').forEach(element => {
        gsap.fromTo(element,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Reveal right
    gsap.utils.toArray('.reveal-right').forEach(element => {
        gsap.fromTo(element,
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Timeline items
    gsap.utils.toArray('.reveal-timeline').forEach((element, index) => {
        gsap.fromTo(element,
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                delay: index * 0.2
            }
        );
    });
}

// Data Cards Stagger Animation
function initDataCardsAnimation() {
    gsap.fromTo('.data-card',
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.data-grid',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Newsletter Canvas Animation
function initNewsletterCanvas() {
    const canvas = document.getElementById('newsletter-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particleA, indexA) => {
            particles.slice(indexA + 1).forEach(particleB => {
                const dx = particleA.x - particleB.x;
                const dy = particleA.y - particleB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particleA.x, particleA.y);
                    ctx.lineTo(particleB.x, particleB.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    init();
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Floating particles in hero
function initHeroParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        container.appendChild(particle);

        // Animate particles
        gsap.to(particle, {
            y: `+=${Math.random() * 100 - 50}`,
            x: `+=${Math.random() * 100 - 50}`,
            opacity: 0.1,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// Live reader counter animation
function initLiveReaderCounter() {
    const counter = document.querySelector('#live-readers .stat-value');
    if (!counter) return;

    setInterval(() => {
        const currentValue = parseInt(counter.textContent.replace(',', ''));
        const change = Math.floor(Math.random() * 10) - 5;
        const newValue = Math.max(2800, Math.min(2900, currentValue + change));
        counter.textContent = newValue.toLocaleString();
    }, 3000);
}

// Map filter functionality
function initMapFilters() {
    const filters = document.querySelectorAll('.map-filter');
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            const category = filter.getAttribute('data-category');
            // Filter logic would go here
            console.log('Filtering by:', category);
        });
    });
}

// Smooth scroll for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Initialize all animations
function initAnimations() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}

function init() {
    initScrollProgress();
    initNavbarScroll();
    initHeroParallax();
    initHeroParticles();
    initLiveReaderCounter();
    
    // Delay horizontal scroll init slightly for proper measurements
    setTimeout(() => {
        initHorizontalScroll();
    }, 100);
    
    initRevealAnimations();
    initDataCardsAnimation();
    initNewsletterCanvas();
    initMapFilters();
    initSmoothScroll();
    initMobileMenu();
}

// Start animations
initAnimations();

// Export for use in other modules
window.animations = {
    init,
    initScrollProgress,
    initNavbarScroll,
    initHeroParallax,
    initHorizontalScroll
};
