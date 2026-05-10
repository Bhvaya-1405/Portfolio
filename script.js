document.addEventListener('DOMContentLoaded', () => {
    // 1. PRELOADER
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Trigger hero entrance
                const heroStagger = document.querySelector('.reveal-stagger');
                if (heroStagger) heroStagger.classList.add('active');
            }, 500);
        });
        
        // Safety timeout in case window load takes too long
        setTimeout(() => {
            if (preloader.style.display !== 'none') {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 500);
            }
        }, 3000);
    }

    // 2. CUSTOM CURSOR
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
        if (cursorBlur) {
            cursorBlur.style.left = e.clientX - 25 + 'px';
            cursorBlur.style.top = e.clientY - 25 + 'px';
        }
    });

    // 3. SCROLL PROGRESS & BACK TO TOP
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        if (scrollProgress) scrollProgress.style.width = scrolled + '%';
        
        if (backToTop) {
            if (window.scrollY > 500) backToTop.style.display = 'flex';
            else backToTop.style.display = 'none';
        }
        
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.top = '15px';
                navbar.style.background = 'rgba(10, 10, 20, 0.8)';
            } else {
                navbar.style.top = '30px';
                navbar.style.background = 'rgba(18, 18, 30, 0.4)';
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. REVEAL ANIMATIONS (Intersection Observer)
    // IMPORTANT: Observing everything with the class .reveal
    const revealElements = document.querySelectorAll('.reveal, .timeline-item, .exp-card-item, .project-card, .skill-group');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Special case for about section to trigger stats
                if (entry.target.id === 'about' || entry.target.classList.contains('about-section')) {
                    animateStats();
                }
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. STATS COUNTER
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            if (stat.classList.contains('animated')) return;
            stat.classList.add('animated');
            
            const targetStr = stat.getAttribute('data-target');
            const target = parseFloat(targetStr);
            const isFloat = targetStr.includes('.');
            let count = 0;
            const duration = 2000;
            const startTime = performance.now();
            
            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                count = easeProgress * target;
                
                if (isFloat) {
                    stat.innerText = count.toFixed(2);
                } else {
                    stat.innerText = Math.ceil(count);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = targetStr;
                }
            };
            requestAnimationFrame(updateCount);
        });
    }

    // 6. PARALLAX & PARTICLES
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(particle);
        }
    }

    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const heroImg = document.querySelector('.image-border');
        if (heroImg) {
            heroImg.style.transform = `translate(${moveX * 20}px, ${moveY * 20}px)`;
        }
        
        const spheres = document.querySelectorAll('.gradient-sphere');
        spheres.forEach((sphere, index) => {
            const speed = (index + 1) * 0.03;
            sphere.style.transform = `translate(${moveX * speed * 100}px, ${moveY * speed * 100}px)`;
        });
    });

    // 7. MOBILE MENU
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksList = document.querySelector('.nav-links');
    
    if (menuBtn && navLinksList) {
        menuBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('mobile-active');
            const icon = menuBtn.querySelector('i');
            if (navLinksList.classList.contains('mobile-active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // 8. ACTIVE LINK HIGHLIGHT
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
