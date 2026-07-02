// ============================================
// GROUNDWORK — Performance & Recovery for Runners
// Shared JS (index / about / shop)
// ============================================

document.documentElement.classList.add('has-js');

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');

    if (navbar && !navbar.classList.contains('always-solid')) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // --- Smooth scroll for in-page anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = (navbar ? navbar.offsetHeight : 0) + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Animate stats on scroll ---
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated || !statNumbers.length) return;

        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'), 10);
                const duration = 1600;
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
    const revealElements = document.querySelectorAll('.fade-in');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), (i % 3) * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // Safety net: force-reveal anything the observer never caught
    // (e.g. reduced-motion setups, elements resized off-screen, etc.)
    setTimeout(() => {
        revealElements.forEach(el => el.classList.add('visible'));
        revealObserver.disconnect();
    }, 4000);

    // --- FAQ accordion ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            item.parentElement.querySelectorAll('.faq-item.open').forEach(open => {
                if (open !== item) {
                    open.classList.remove('open');
                    open.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            item.classList.toggle('open', !isOpen);
            answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
        });
    });

    // --- Shop category filters (client-side, static catalog) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length && productCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const matches = filter === 'all' || card.getAttribute('data-category') === filter;
                    card.style.display = matches ? '' : 'none';
                });
            });
        });
    }

    // --- Cart drawer (UI placeholder — no real checkout wired up) ---
    const cartToggle = document.getElementById('cartToggle');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const cartCount = document.getElementById('cartCount');
    let cartItems = 0;

    function openCart() {
        if (cartDrawer) cartDrawer.classList.add('open');
        if (cartOverlay) cartOverlay.classList.add('open');
    }
    function closeCart() {
        if (cartDrawer) cartDrawer.classList.remove('open');
        if (cartOverlay) cartOverlay.classList.remove('open');
    }

    if (cartToggle) cartToggle.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            cartItems++;
            if (cartCount) cartCount.textContent = cartItems;
            btn.classList.add('added');
            openCart();
        });
    });

    // --- Newsletter form (simulated submission — no email service wired up) ---
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = newsletterForm.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Sent — check your inbox';
                newsletterForm.reset();
                setTimeout(() => {
                    btn.textContent = original;
                    btn.disabled = false;
                }, 2500);
            }, 1000);
        });
    }

    // --- Contact form (simulated submission — no backend wired up) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const status = document.getElementById('formStatus');
            const data = Object.fromEntries(new FormData(contactForm).entries());

            if (!data.name || !data.email || !data.topic) {
                if (status) {
                    status.textContent = 'Please fill in all required fields.';
                    status.className = 'form-status show';
                }
                return;
            }

            const btn = contactForm.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                if (status) {
                    status.textContent = 'Thanks — we\'ll reply within one business day.';
                    status.className = 'form-status show success';
                }
                contactForm.reset();
                btn.textContent = original;
                btn.disabled = false;
            }, 1200);
        });
    }

});
