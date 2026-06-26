document.addEventListener('DOMContentLoaded', () => {

    initThemeToggle();
    initScrollReveal();
    initTypingEffect();
    initParticles();
    initSmoothScroll();

    function initThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        const icon = toggle.querySelector('.theme-icon');
        const saved = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
        icon.textContent = saved === 'dark' ? '\u2600' : '\uD83C\uDF19';

        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            icon.textContent = next === 'dark' ? '\u2600' : '\uD83C\uDF19';
        });
    }

    function initScrollReveal() {
        const sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        sections.forEach(s => observer.observe(s));
        sections.forEach(s => {
            const rect = s.getBoundingClientRect();
            if (rect.top < window.innerHeight) s.classList.add('visible');
        });
    }

    function initTypingEffect() {
        const el = document.getElementById('typedText');
        const phrases = [
            'An\u00e1lise de Dados',
            'Ci\u00eancia de Dados',
            'Engenharia de Dados',
            'Seguran\u00e7a da Informa\u00e7\u00e3o',
            'Power BI & Python'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isWaiting = false;

        function type() {
            const current = phrases[phraseIndex];
            if (!isDeleting && !isWaiting) {
                el.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) {
                    isWaiting = true;
                    setTimeout(() => { isWaiting = false; isDeleting = true; }, 2000);
                }
                setTimeout(type, 60);
            } else if (isDeleting) {
                el.textContent = current.substring(0, charIndex);
                charIndex--;
                if (charIndex < 0) {
                    isDeleting = false;
                    charIndex = 0;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
                setTimeout(type, 30);
            } else {
                setTimeout(type, 100);
            }
        }
        type();
    }

    function initParticles() {
        const container = document.getElementById('particles');
        const count = 40;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
            particle.style.animationDelay = (Math.random() * 15) + 's';
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#00cec9', '#ffeaa7'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(particle);
        }
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
});
