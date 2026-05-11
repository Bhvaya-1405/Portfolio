document.addEventListener('DOMContentLoaded', () => {
    // 1. PRELOADER
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // 2. LOAD DATA
    const urlParams = new URLSearchParams(window.location.search);
    const certId = urlParams.get('id');

    if (!certId || !certificates[certId]) {
        // Redirect to index if no ID found or ID is invalid
        window.location.href = 'index.html';
        return;
    }

    const cert = certificates[certId];

    // Update Head Title
    document.title = `${cert.title} | Bhavya Singh`;

    // Populate Content
    document.getElementById('cert-title').innerText = cert.title;
    document.getElementById('cert-issuer').innerText = cert.issuer;
    document.getElementById('cert-date').innerText = cert.date;
    document.getElementById('cert-desc').innerText = cert.desc;
    document.getElementById('cert-download').href = cert.file;

    // Skills
    const skillsContainer = document.getElementById('cert-skills-tags');
    cert.skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.innerText = skill;
        skillsContainer.appendChild(span);
    });

    // Display Content (Image or PDF/Iframe)
    const viewer = document.getElementById('cert-viewer-content');
    const isPdf = cert.file.toLowerCase().endsWith('.pdf');

    setTimeout(() => {
        if (isPdf) {
            viewer.innerHTML = `<iframe src="${cert.file}#toolbar=0" title="${cert.title}"></iframe>`;
        } else {
            viewer.innerHTML = `<img src="${cert.file}" alt="${cert.title}">`;
        }
        
        // Re-initialize Lucide for dynamic icons if any
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, 400);

    // 3. IMAGE HOVER ZOOM
    viewer.addEventListener('mousemove', (e) => {
        const img = viewer.querySelector('img');
        if (img) {
            const { left, top, width, height } = viewer.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        }
    });
});
