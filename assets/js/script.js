document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CERTIFICATE DATA ---
    const certificates = {
        'child-nest': {
            title: 'Child Nest Rehab Internship Certificate',
            issuer: 'Child Nest Rehab Centre Pvt Ltd',
            date: 'June 2025',
            desc: 'Successfully completed a Data Analysis internship focused on patient data insights, doctor performance evaluation, and market competitive analysis.',
            skills: ['Data Analysis', 'Excel', 'Healthcare Analytics', 'Statistical Reporting'],
            file: 'certificates/pdfs/child-nest.pdf',
            type: 'pdf'
        },
        'suretrust': {
            title: 'SureTrust Data Science Certification',
            issuer: 'SURE Trust',
            date: 'Jan 2026',
            desc: 'In-depth certification covering the end-to-end data science lifecycle, from data cleaning and preprocessing to advanced machine learning models.',
            skills: ['Python', 'SQL', 'Machine Learning', 'Data Preprocessing'],
            file: 'certificates/pdfs/suretrust.pdf',
            type: 'pdf'
        },
        'tantrafiesta': {
            title: 'TantraFiesta’25 Participation Certificate',
            issuer: 'TantraFiesta Symposium',
            date: '2025',
            desc: 'Recognized for active participation and technical contribution to the national-level technical symposium TantraFiesta’25.',
            skills: ['Technical Innovation', 'Collaboration', 'Problem Solving'],
            file: 'certificates/images/tantrafiesta.png',
            type: 'image'
        },
        'ibm-tools': {
            title: 'IBM Tools for Data Science',
            issuer: 'IBM | Coursera',
            date: '2024',
            desc: 'Comprehensive training on essential data science tools including Jupyter Notebooks, Zeppelin Notebooks, RStudio, and GitHub.',
            skills: ['Jupyter', 'GitHub', 'RStudio', 'Cloud IDEs'],
            file: 'certificates/images/ibm-tools.png',
            type: 'image'
        },
        'ibm-analysis': {
            title: 'IBM Data Analysis with Python',
            issuer: 'IBM | Coursera',
            date: '2024',
            desc: 'Technical specialization in using Python for data analysis, focusing on libraries like Pandas, NumPy, and Scipy for real-world datasets.',
            skills: ['Pandas', 'NumPy', 'Matplotlib', 'Exploratory Data Analysis'],
            file: 'certificates/images/ibm-analysis.png',
            type: 'image'
        },
        'ibm-whatis': {
            title: 'IBM What is Data Science',
            issuer: 'IBM | Coursera',
            date: '2024',
            desc: 'Foundational certification exploring the definition, applications, and impact of data science in the modern tech landscape.',
            skills: ['Data Literacy', 'Research Methods', 'Industry Insights'],
            file: 'certificates/images/ibm-whatis.png',
            type: 'image'
        },
        'geekster': {
            title: 'Geekster Google Sheets Beginner to Advanced',
            issuer: 'Geekster',
            date: '2024',
            desc: 'Mastery of Google Sheets for data manipulation, visualization, and advanced formula implementations for business intelligence.',
            skills: ['Advanced Formulas', 'Pivot Tables', 'Data Visualization', 'Automation'],
            file: 'certificates/images/geekster.png',
            type: 'image'
        },
        'internpe': {
            title: 'InternPe Python Programming Internship',
            issuer: 'InternPe',
            date: '2024',
            desc: 'Successfully completed a Python programming internship, delivering high-quality code for multiple real-world application projects.',
            skills: ['Python 3', 'Algorithm Design', 'Software Development', 'Debugging'],
            file: 'certificates/pdfs/internpe.pdf',
            type: 'pdf'
        }
    };

    const certIds = Object.keys(certificates);
    let currentCertIndex = 0;

    // --- 2. PRELOADER ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                const heroStagger = document.querySelector('.reveal-stagger');
                if (heroStagger) heroStagger.classList.add('active');
            }, 500);
        });
        setTimeout(() => {
            if (preloader.style.display !== 'none') {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 500);
            }
        }, 3000);
    }

    // --- 3. CUSTOM CURSOR ---
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

    // --- 4. SCROLL PROGRESS & NAVBAR ---
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        if (scrollProgress) scrollProgress.style.width = scrolled + '%';
        
        if (backToTop) {
            backToTop.style.display = window.scrollY > 500 ? 'flex' : 'none';
        }
        
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.top = '15px';
                navbar.style.background = 'rgba(10, 10, 20, 0.8)';
                navbar.style.padding = '10px 30px';
            } else {
                navbar.style.top = '30px';
                navbar.style.background = 'rgba(18, 18, 30, 0.4)';
                navbar.style.padding = '15px 40px';
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 5. MODAL LOGIC ---
    const modal = document.getElementById('cert-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const viewCertBtns = document.querySelectorAll('.view-cert-btn');
    
    function openModal(certId) {
        const cert = certificates[certId];
        if (!cert) return;

        currentCertIndex = certIds.indexOf(certId);
        
        // Update Modal Content
        document.getElementById('modal-cert-title').innerText = cert.title;
        document.getElementById('modal-cert-issuer').innerText = cert.issuer;
        document.getElementById('modal-cert-date').innerHTML = `<i data-lucide="calendar"></i> ${cert.date}`;
        document.getElementById('modal-cert-desc').innerText = cert.desc;
        document.getElementById('modal-cert-download').href = cert.file;

        // Skills
        const skillsContainer = document.getElementById('modal-cert-skills');
        skillsContainer.innerHTML = '';
        cert.skills.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'skill-tag';
            span.innerText = skill;
            skillsContainer.appendChild(span);
        });

        // Display File (Image or PDF)
        const display = document.getElementById('cert-display');
        display.innerHTML = '<div class="loader-circle"></div>';
        
        setTimeout(() => {
            if (cert.type === 'pdf') {
                display.innerHTML = `<iframe src="${cert.file}#toolbar=0" title="${cert.title}"></iframe>`;
            } else {
                display.innerHTML = `<img src="${cert.file}" alt="${cert.title}">`;
            }
        }, 300);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        lucide.createIcons();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Clear iframe to stop loading
        setTimeout(() => {
            document.getElementById('cert-display').innerHTML = '';
        }, 400);
    }

    viewCertBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const certId = btn.getAttribute('data-cert-id');
            openModal(certId);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Modal Navigation
    const prevBtn = document.querySelector('.cert-nav-btn.prev');
    const nextBtn = document.querySelector('.cert-nav-btn.next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentCertIndex = (currentCertIndex - 1 + certIds.length) % certIds.length;
            openModal(certIds[currentCertIndex]);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentCertIndex = (currentCertIndex + 1) % certIds.length;
            openModal(certIds[currentCertIndex]);
        });
    }

    // Keyboard Support
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    // --- 6. REVEAL ANIMATIONS & TILT ---
    const revealElements = document.querySelectorAll('.reveal, .timeline-item, .exp-card-item, .project-card, .skill-group, .stat-number, .cert-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('stat-number')) {
                    animateSingleStat(entry.target);
                }
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Card Tilt & Glow Effect
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Tilt logic
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) translateY(0) rotateX(0) rotateY(0)`;
        });

        card.addEventListener('click', () => {
            const certId = card.getAttribute('data-cert-id');
            openModal(certId);
        });
    });

    // --- 7. STATS COUNTER ---
    function animateSingleStat(stat) {
        if (stat.classList.contains('animated')) return;
        stat.classList.add('animated');
        const targetStr = stat.getAttribute('data-target');
        const target = parseFloat(targetStr);
        const isFloat = targetStr.includes('.');
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = easeProgress * target;
            stat.innerText = isFloat ? currentCount.toFixed(2) : Math.ceil(currentCount);
            if (progress < 1) requestAnimationFrame(updateCount);
            else stat.innerText = targetStr;
        };
        requestAnimationFrame(updateCount);
    }

    // --- 8. PARTICLES ---
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

    // --- 9. MOBILE MENU ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksList = document.querySelector('.nav-links');
    
    if (menuBtn && navLinksList) {
        menuBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('mobile-active');
            const icon = menuBtn.querySelector('i');
            icon.setAttribute('data-lucide', navLinksList.classList.contains('mobile-active') ? 'x' : 'menu');
            lucide.createIcons();
        });
    }

    // --- 10. ACTIVE LINK HIGHLIGHT & SMOOTH SCROLL ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 250)) {
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

    // Ensure all nav links have smooth scroll (HTML already has it but this ensures logic consistency)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinksList.classList.contains('mobile-active')) {
                    menuBtn.click();
                }
            }
        });
    });
});

