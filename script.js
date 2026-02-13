// ============================================
// MUSTARD DIGITAL MARKETING — Landing Page JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Animate stats on scroll ---
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'), 10);
                const duration = 2000;
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    num.textContent = Math.floor(target * eased);
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        num.textContent = target;
                    }
                }

                requestAnimationFrame(update);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats();

    // --- Scroll reveal animations ---
    const revealElements = document.querySelectorAll(
        '.service-card, .about-feature, .process-step, .work-card, .testimonial-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.6s ease ${i % 3 * 0.1}s, transform 0.6s ease ${i % 3 * 0.1}s`;
        revealObserver.observe(el);
    });

    // --- Contact form handling ---
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        if (!data.name || !data.email || !data.service) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Simulate form submission
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            showFormMessage('Thank you! We\'ll be in touch within 24 hours.', 'success');
            form.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });

    function showFormMessage(message, type) {
        // Remove existing messages
        const existing = form.querySelector('.form-message');
        if (existing) existing.remove();

        const div = document.createElement('div');
        div.className = `form-message form-message-${type}`;
        div.textContent = message;
        div.style.cssText = `
            padding: 14px 20px;
            border-radius: 10px;
            margin-bottom: 16px;
            font-size: 0.9rem;
            font-weight: 500;
            ${type === 'success'
                ? 'background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;'
                : 'background: #fef2f2; color: #991b1b; border: 1px solid #fecaca;'
            }
        `;
        form.insertBefore(div, form.firstChild);

        setTimeout(() => div.remove(), 5000);
    }

});
