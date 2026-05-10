document.addEventListener('DOMContentLoaded', () => {
    // 1. PRELOADER
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Trigger entrance animations
                document.querySelector('.hero-content').classList.add('active');
            }, 500);
        }, 1500);
    });

    // 2. CUSTOM CURSOR
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorBlur.style.left = e.clientX - 15 + 'px';
        cursorBlur.style.top = e.clientY - 15 + 'px';
    });

    // Hover effects for cursor
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn, .stat-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(4)';
            cursor.style.mixBlendMode = 'difference';
            cursorBlur.style.borderColor = 'var(--accent)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.mixBlendMode = 'difference';
            cursorBlur.style.borderColor = 'var(--primary)';
        });
    });

    // 3. SCROLL PROGRESS
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        scrollProgress.style.width = scrolled + '%';
        
        // Show/Hide back to top
        if (window.scrollY > 500) {
            document.getElementById('back-to-top').classList.add('show');
        } else {
            document.getElementById('back-to-top').classList.remove('show');
        }
        
        // Sticky Navbar
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 30, 0.8)';
            navbar.style.top = '10px';
        } else {
            navbar.style.background = 'rgba(18, 18, 30, 0.4)';
            navbar.style.top = '20px';
        }
    });

    // 4. ACTIVE LINK HIGHLIGHTING
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
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

    // 5. REVEAL ANIMATIONS (Intersection Observer)
    const revealElements = document.querySelectorAll('section, .timeline-item, .exp-card-item, .project-card, .skill-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                
                // Animate skill bars if it's a skill item
                if (entry.target.classList.contains('skill-item')) {
                    const fill = entry.target.querySelector('.skill-fill');
                    fill.style.width = fill.parentElement.previousElementSibling.querySelector('span:last-child').innerText;
                }
                
                // Animate stats
                if (entry.target.id === 'about') {
                    animateStats();
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // 6. STATS COUNTER ANIMATION
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

    // 7. PROJECT FILTERING
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // 8. FORM SUBMISSION (Prevention & Mock UI)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sending... <i data-lucide="loader-2" class="spin"></i>';
            lucide.createIcons();
            
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i data-lucide="check"></i>';
                btn.style.background = '#10b981';
                lucide.createIcons();
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    lucide.createIcons();
                }, 3000);
            }, 2000);
        });
    }

    // 9. BACK TO TOP
    const backToTop = document.getElementById('back-to-top');
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 10. PARALLAX EFFECT FOR HERO IMAGE
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const heroImg = document.querySelector('.image-border');
        if (heroImg) {
            heroImg.style.transform = `rotate(3deg) translate(${moveX}px, ${moveY}px)`;
        }
        
        const spheres = document.querySelectorAll('.gradient-sphere');
        spheres.forEach((sphere, index) => {
            const speed = (index + 1) * 0.03;
            sphere.style.transform = `translate(${moveX * speed * 100}px, ${moveY * speed * 100}px)`;
        });
    });

    // 11. MOBILE MENU TOGGLE
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksList = document.querySelector('.nav-links');
    
    if (menuBtn) {
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
});
