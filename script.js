let typingInterval = null;

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    initThemeToggle();
    initScrollReveal();
    initParticles();
    initSmoothScroll();
});

function renderPortfolio() {
    const data = loadData();
    const p = data.personal;

    document.getElementById('displayName').textContent = p.name;
    document.getElementById('displaySubtitle').textContent =
        `Brasileiro, ${p.age} · ${p.address}`;

    renderContacts(data);
    renderFooterLinks(data);
    renderMainContent(data);

    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
    }
    initTypingEffect();
    initScrollReveal();
}

function renderContacts(data) {
    const container = document.getElementById('contactLinks');
    container.innerHTML = data.contacts.map(c =>
        `<a href="${escAttr(c.url)}" target="_blank">
            ${ICONS[c.icon] || ICONS.globe}
            ${esc(c.label)}
        </a>`
    ).join('');
}

function renderFooterLinks(data) {
    const container = document.getElementById('footerLinks');
    const links = [];
    if (data.contacts.find(c => c.icon === 'whatsapp' || c.url.includes('wa.me'))) {
        const c = data.contacts.find(c => c.icon === 'whatsapp' || c.url.includes('wa.me'));
        links.push({ label: 'Telefone', url: c ? c.url : '#' });
    }
    if (data.contacts.find(c => c.icon === 'email' || c.url.includes('mailto'))) {
        links.push({ label: 'E-mail', url: 'mailto:' + data.personal.email });
    }
    if (data.contacts.find(c => c.icon === 'github')) {
        links.push({ label: 'GitHub', url: 'https://github.com/' + data.personal.github });
    }
    data.contacts.forEach(c => {
        if (!['whatsapp', 'email', 'github'].includes(c.icon) && c.url) {
            links.push({ label: c.label, url: c.url });
        }
    });
    container.innerHTML = links.map(l =>
        `<a href="${escAttr(l.url)}" target="_blank">${esc(l.label)}</a>`
    ).join('');
}

function renderMainContent(data) {
    const container = document.getElementById('mainContent');
    container.innerHTML = '';

    container.appendChild(createObjectiveSection(data));
    container.appendChild(createEducationSection(data));
    container.appendChild(createExperienceSection(data));
    container.appendChild(createSkillsSection(data));
}

function createSection(iconSvg, title) {
    const section = document.createElement('div');
    section.className = 'section';
    section.innerHTML = `
        <div class="section-header">
            <div class="icon">${iconSvg}</div>
            <h2>${title}</h2>
            <div class="line"></div>
        </div>`;
    return section;
}

function createObjectiveSection(data) {
    const sec = createSection(
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        'Objetivo'
    );
    const card = document.createElement('div');
    card.className = 'objective-card';
    card.innerHTML = `<p>${esc(data.objective)}</p>`;
    sec.appendChild(card);
    return sec;
}

function createEducationSection(data) {
    const sec = createSection(
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
        'Formação'
    );
    const timeline = document.createElement('div');
    timeline.className = 'timeline';
    timeline.innerHTML = data.education.map(item =>
        `<div class="timeline-item">
            <div class="year">${esc(item.year)}</div>
            <h3>${esc(item.degree)}</h3>
            <div class="institution">${esc(item.institution)}</div>
        </div>`
    ).join('');
    sec.appendChild(timeline);
    return sec;
}

function createExperienceSection(data) {
    const sec = createSection(
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
        'Experiência Profissional'
    );
    sec.innerHTML += data.experience.map(item =>
        `<div class="job-card">
            <div class="job-header">
                <h3>${esc(item.role)} <span class="company">&mdash; ${esc(item.company)}</span></h3>
                <span class="period">${esc(item.period)}</span>
            </div>
            <p>${esc(item.description)}</p>
        </div>`
    ).join('');
    return sec;
}

function createSkillsSection(data) {
    const sec = createSection(
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
        'Qualificações Profissionais'
    );
    const grid = document.createElement('div');
    grid.className = 'skills-grid';
    grid.innerHTML = data.skills.map(item =>
        `<div class="skill-item">
            <span class="skill-dot"></span>
            <span class="skill-year">${esc(item.year)}</span>
            <span class="skill-name">${esc(item.name)}</span>
            <span class="skill-source">${esc(item.source)}</span>
        </div>`
    ).join('');
    sec.appendChild(grid);
    return sec;
}

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
    if (!el) return;
    const data = loadData();
    const phrases = data.typedPhrases.filter(Boolean);
    if (!phrases.length) { el.textContent = ''; return; }

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

function escAttr(s) {
    return s.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
