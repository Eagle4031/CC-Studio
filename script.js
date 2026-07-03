// ============================================
// CIPHER LABS — Digital Matrix Landing Page JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
            }
        });
    });

    // ============================================
    // Matrix rain background
    // ============================================
    const canvas = document.getElementById('matrixRain');
    const ctx = canvas.getContext('2d');
    let columns, drops, fontSize = 16;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        drops = new Array(columns).fill(1).map(() => Math.random() * -50);
    }

    const glyphs = 'アイウエオカキクケコサシスセソ01アイウエオCIPHERLABS0101';

    function drawMatrix() {
        ctx.fillStyle = 'rgba(2, 2, 2, 0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = glyphs[Math.floor(Math.random() * glyphs.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillStyle = Math.random() > 0.985 ? '#eafff2' : 'rgba(0, 255, 136, 0.75)';
            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    let rainInterval;
    function startRain() {
        resizeCanvas();
        if (rainInterval) clearInterval(rainInterval);
        rainInterval = setInterval(drawMatrix, reduceMotion ? 200 : 45);
    }

    if (canvas.getContext) {
        startRain();
        window.addEventListener('resize', () => {
            clearTimeout(window._matrixResizeTimer);
            window._matrixResizeTimer = setTimeout(startRain, 200);
        });
    }

    // ============================================
    // Cursor glow (desktop only)
    // ============================================
    const cursorGlow = document.getElementById('cursorGlow');
    if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        });
    }

    // ============================================
    // Magnetic buttons
    // ============================================
    if (!reduceMotion) {
        document.querySelectorAll('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ============================================
    // Animate hero stats on scroll into view
    // ============================================
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
                const duration = 1800;
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

    // ============================================
    // Scroll reveal animations
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // Portfolio filters
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            workCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                const match = filter === 'all' || categories.includes(filter);
                card.classList.toggle('hidden', !match);
            });
        });
    });

    // ============================================
    // Pricing monthly / yearly toggle
    // ============================================
    const pricingToggle = document.getElementById('pricingToggle');
    const priceAmounts = document.querySelectorAll('.pricing-price .amount span[data-monthly]');

    if (pricingToggle) {
        pricingToggle.addEventListener('click', () => {
            const yearly = pricingToggle.classList.toggle('yearly');
            priceAmounts.forEach(span => {
                const value = yearly ? span.getAttribute('data-yearly') : span.getAttribute('data-monthly');
                span.textContent = '$' + Number(value).toLocaleString();
            });
        });
    }

    // ============================================
    // Contact form handling (client-side simulation)
    // ============================================
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (!data.name || !data.email || !data.service) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Transmitting...';
        btn.disabled = true;

        setTimeout(() => {
            showFormMessage('Transmission received. We\'ll be in touch within 24 hours.', 'success');
            form.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1400);
    });

    function showFormMessage(message, type) {
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
            font-family: 'JetBrains Mono', monospace;
            ${type === 'success'
                ? 'background: rgba(0,255,136,0.08); color: #00ff88; border: 1px solid rgba(0,255,136,0.35);'
                : 'background: rgba(255,80,80,0.08); color: #ff8080; border: 1px solid rgba(255,80,80,0.35);'
            }
        `;
        form.insertBefore(div, form.firstChild);
        setTimeout(() => div.remove(), 5000);
    }

    // ============================================
    // Interactive terminal (contact section)
    // ============================================
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');

    const commands = {
        help: 'Available commands: help, services, pricing, contact, about, portfolio, whoami, sudo, matrix, clear',
        services: 'Services: Web Design & Dev · SEO · Paid Advertising · Brand Identity · AI Automation · Growth Analytics',
        pricing: 'Plans: Starter ($1,500/mo) · Growth ($3,800/mo) · Enterprise (custom). See the pricing section above.',
        about: 'Mustard — digital creative agency. 8+ years running, 180+ launches, $120M+ client revenue driven.',
        portfolio: 'Recent launches: Bloom & Co., TechVault SaaS, GreenPlate Meals, Northline Studio, Orbital Finance.',
        contact: 'Reach us at hello@mustard.io or fill out the form to your right.',
        whoami: 'guest — curious visitor exploring the matrix.',
        sudo: 'Nice try. Access denied. This incident will be logged.',
        matrix: 'Wake up... the matrix has you. Try the Konami code: ↑↑↓↓←→←→BA',
    };

    function printLine(text, cls) {
        const p = document.createElement('p');
        p.className = cls || 't-resp';
        p.textContent = text;
        terminalOutput.appendChild(p);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const raw = terminalInput.value.trim();
            if (!raw) return;

            printLine('> ' + raw, 't-user');

            const cmd = raw.toLowerCase();
            if (cmd === 'clear') {
                terminalOutput.innerHTML = '';
            } else if (commands[cmd]) {
                printLine(commands[cmd], 't-resp');
            } else if (cmd.includes('seo')) {
                printLine('SEO is one of our core services — technical audits, content strategy, and link authority building.', 't-resp');
            } else if (cmd.includes('brand')) {
                printLine('Branding services include naming, logo systems, and full identity guidelines.', 't-resp');
            } else if (cmd.includes('web') || cmd.includes('site')) {
                printLine('We build custom, high-performance websites engineered to convert.', 't-resp');
            } else if (cmd.includes('hello') || cmd.includes('hi')) {
                printLine('Hello, guest. How can Mustard help you grow today?', 't-accent');
            } else {
                printLine(`Command not recognized: "${raw}". Type "help" for options.`, 't-resp');
            }

            terminalInput.value = '';
        });
    }

    // ============================================
    // Konami code easter egg
    // ============================================
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    const secretOverlay = document.getElementById('secretOverlay');

    window.addEventListener('keydown', (e) => {
        if (secretOverlay.classList.contains('active') && e.key === 'Escape') {
            secretOverlay.classList.remove('active');
            document.body.classList.remove('secret-mode');
            return;
        }

        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        if (key === konamiSequence[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiSequence.length) {
                secretOverlay.classList.add('active');
                document.body.classList.add('secret-mode');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = key === konamiSequence[0] ? 1 : 0;
        }
    });

    secretOverlay.addEventListener('click', () => {
        secretOverlay.classList.remove('active');
        document.body.classList.remove('secret-mode');
    });

});
