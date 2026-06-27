const ICONS = {
    whatsapp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    email: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
    linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    globe: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
};

function openLogin() {
    document.getElementById('loginModal').classList.add('active');
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginError').style.display = 'none';
    setTimeout(() => document.getElementById('loginPassword').focus(), 100);
}

function closeLogin() {
    document.getElementById('loginModal').classList.remove('active');
}

function submitLogin() {
    const pwd = document.getElementById('loginPassword').value;
    const saved = loadPassword();
    if (!saved) {
        savePassword(pwd);
        closeLogin();
        openAdmin();
        return;
    }
    if (pwd === saved) {
        closeLogin();
        openAdmin();
    } else {
        document.getElementById('loginError').style.display = 'block';
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginPassword').focus();
    }
}

function openAdmin() {
    document.getElementById('adminModal').classList.add('active');
    renderAdmin();
}

function closeAdmin() {
    document.getElementById('adminModal').classList.remove('active');
    renderPortfolio();
}

const TAB_RENDERERS = {};

function renderAdmin() {
    const tabs = [
        { id: 'personal', label: 'Dados Pessoais' },
        { id: 'objective', label: 'Objetivo' },
        { id: 'education', label: 'Formação' },
        { id: 'experience', label: 'Experiência' },
        { id: 'skills', label: 'Qualificações' },
        { id: 'contacts', label: 'Contatos' },
        { id: 'typing', label: 'Frases Digitadas' },
        { id: 'password', label: 'Senha' }
    ];
    const tabNav = document.getElementById('adminTabs');
    tabNav.innerHTML = tabs.map(t =>
        `<button class="admin-tab" data-tab="${t.id}">${t.label}</button>`
    ).join('');

    const first = tabNav.querySelector('.admin-tab');
    if (first) first.classList.add('active');

    tabNav.addEventListener('click', e => {
        const btn = e.target.closest('.admin-tab');
        if (!btn) return;
        tabNav.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderAdminTab(btn.dataset.tab);
    });

    renderAdminTab('personal');
}

function renderAdminTab(tabId) {
    const data = loadData();
    const container = document.getElementById('adminContent');
    if (TAB_RENDERERS[tabId]) {
        TAB_RENDERERS[tabId](data, container);
    }
}

TAB_RENDERERS.personal = (data, container) => {
    const p = data.personal;
    container.innerHTML = `
        <div class="admin-field">
            <label>Nome</label>
            <input class="modal-input" id="af_name" value="${esc(p.name)}">
        </div>
        <div class="admin-field">
            <label>Idade</label>
            <input class="modal-input" id="af_age" value="${esc(p.age)}">
        </div>
        <div class="admin-field">
            <label>Endereço</label>
            <input class="modal-input" id="af_address" value="${esc(p.address)}">
        </div>
        <div class="admin-field">
            <label>Telefone (exibido)</label>
            <input class="modal-input" id="af_phone" value="${esc(p.phone)}">
        </div>
        <div class="admin-field">
            <label>E-mail</label>
            <input class="modal-input" id="af_email" value="${esc(p.email)}">
        </div>
        <div class="admin-field">
            <label>Usuário GitHub</label>
            <input class="modal-input" id="af_github" value="${esc(p.github)}">
        </div>
        <button class="modal-btn modal-btn-primary" onclick="savePersonal()">Salvar</button>
    `;
};

TAB_RENDERERS.objective = (data, container) => {
    container.innerHTML = `
        <div class="admin-field">
            <label>Objetivo</label>
            <textarea class="modal-input modal-textarea" id="af_objective" rows="3">${esc(data.objective)}</textarea>
        </div>
        <button class="modal-btn modal-btn-primary" onclick="saveObjective()">Salvar</button>
    `;
};

TAB_RENDERERS.education = (data, container) => {
    let html = `<div style="margin-bottom:1rem"><button class="modal-btn modal-btn-primary" onclick="addEducation()">+ Adicionar Formação</button></div>`;
    data.education.forEach((item, i) => {
        html += `
            <div class="admin-list-item">
                <div class="admin-list-fields">
                    <input class="modal-input admin-list-input" id="edu_year_${i}" value="${esc(item.year)}" placeholder="Ano">
                    <input class="modal-input admin-list-input" id="edu_degree_${i}" value="${esc(item.degree)}" placeholder="Curso">
                    <input class="modal-input admin-list-input" id="edu_inst_${i}" value="${esc(item.institution)}" placeholder="Instituição">
                </div>
                <button class="modal-btn modal-btn-danger" onclick="removeEducation(${i})">Remover</button>
            </div>`;
    });
    html += `<button class="modal-btn modal-btn-primary" onclick="saveEducation()" style="margin-top:0.5rem">Salvar Alterações</button>`;
    container.innerHTML = html;
};

TAB_RENDERERS.experience = (data, container) => {
    let html = `<div style="margin-bottom:1rem"><button class="modal-btn modal-btn-primary" onclick="addExperience()">+ Adicionar Experiência</button></div>`;
    data.experience.forEach((item, i) => {
        html += `
            <div class="admin-list-item">
                <div class="admin-list-fields">
                    <input class="modal-input admin-list-input" id="exp_role_${i}" value="${esc(item.role)}" placeholder="Cargo">
                    <input class="modal-input admin-list-input" id="exp_company_${i}" value="${esc(item.company)}" placeholder="Empresa">
                    <input class="modal-input admin-list-input" id="exp_period_${i}" value="${esc(item.period)}" placeholder="Período">
                    <textarea class="modal-input admin-list-input modal-textarea" id="exp_desc_${i}" rows="2" placeholder="Descrição">${esc(item.description)}</textarea>
                </div>
                <button class="modal-btn modal-btn-danger" onclick="removeExperience(${i})">Remover</button>
            </div>`;
    });
    html += `<button class="modal-btn modal-btn-primary" onclick="saveExperience()" style="margin-top:0.5rem">Salvar Alterações</button>`;
    container.innerHTML = html;
};

TAB_RENDERERS.skills = (data, container) => {
    let html = `<div style="margin-bottom:1rem"><button class="modal-btn modal-btn-primary" onclick="addSkill()">+ Adicionar Qualificação</button></div>`;
    data.skills.forEach((item, i) => {
        html += `
            <div class="admin-list-item">
                <div class="admin-list-fields">
                    <input class="modal-input admin-list-input" id="sk_year_${i}" value="${esc(item.year)}" placeholder="Ano">
                    <input class="modal-input admin-list-input" id="sk_name_${i}" value="${esc(item.name)}" placeholder="Nome">
                    <input class="modal-input admin-list-input" id="sk_source_${i}" value="${esc(item.source)}" placeholder="Fonte">
                </div>
                <button class="modal-btn modal-btn-danger" onclick="removeSkill(${i})">Remover</button>
            </div>`;
    });
    html += `<button class="modal-btn modal-btn-primary" onclick="saveSkills()" style="margin-top:0.5rem">Salvar Alterações</button>`;
    container.innerHTML = html;
};

TAB_RENDERERS.contacts = (data, container) => {
    let html = `<div style="margin-bottom:1rem"><button class="modal-btn modal-btn-primary" onclick="addContact()">+ Adicionar Contato</button></div>`;
    data.contacts.forEach((item, i) => {
        html += `
            <div class="admin-list-item">
                <div class="admin-list-fields">
                    <select class="modal-input admin-list-input" id="cont_icon_${i}">
                        ${['whatsapp','email','github','linkedin','globe'].map(ic =>
                            `<option value="${ic}" ${item.icon === ic ? 'selected' : ''}>${ic}</option>`
                        ).join('')}
                    </select>
                    <input class="modal-input admin-list-input" id="cont_label_${i}" value="${esc(item.label)}" placeholder="Texto">
                    <input class="modal-input admin-list-input" id="cont_url_${i}" value="${esc(item.url)}" placeholder="URL">
                </div>
                <button class="modal-btn modal-btn-danger" onclick="removeContact(${i})">Remover</button>
            </div>`;
    });
    html += `<button class="modal-btn modal-btn-primary" onclick="saveContacts()" style="margin-top:0.5rem">Salvar Alterações</button>`;
    container.innerHTML = html;
};

TAB_RENDERERS.typing = (data, container) => {
    let html = `<div style="margin-bottom:1rem"><button class="modal-btn modal-btn-primary" onclick="addTypingPhrase()">+ Adicionar Frase</button></div>`;
    data.typedPhrases.forEach((phrase, i) => {
        html += `
            <div class="admin-list-item">
                <input class="modal-input" id="tp_${i}" value="${esc(phrase)}" placeholder="Frase" style="flex:1">
                <button class="modal-btn modal-btn-danger" onclick="removeTypingPhrase(${i})">Remover</button>
            </div>`;
    });
    html += `<button class="modal-btn modal-btn-primary" onclick="saveTypingPhrases()" style="margin-top:0.5rem">Salvar Alterações</button>`;
    container.innerHTML = html;
};

TAB_RENDERERS.password = (data, container) => {
    container.innerHTML = `
        <div class="admin-field">
            <label>Nova Senha</label>
            <input class="modal-input" type="password" id="af_password" placeholder="Nova senha">
        </div>
        <div class="admin-field">
            <label>Confirmar Senha</label>
            <input class="modal-input" type="password" id="af_password2" placeholder="Confirmar senha">
        </div>
        <p id="pwdError" style="color:#e74c3c;font-size:0.85rem;display:none;">Senhas não conferem</p>
        <button class="modal-btn modal-btn-primary" onclick="savePasswordAdmin()">Alterar Senha</button>
    `;
};

function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

function savePersonal() {
    const data = loadData();
    data.personal.name = document.getElementById('af_name').value;
    data.personal.age = document.getElementById('af_age').value;
    data.personal.address = document.getElementById('af_address').value;
    data.personal.phone = document.getElementById('af_phone').value;
    data.personal.email = document.getElementById('af_email').value;
    data.personal.github = document.getElementById('af_github').value;
    saveData(data);
    renderPortfolio();
}

function saveObjective() {
    const data = loadData();
    data.objective = document.getElementById('af_objective').value;
    saveData(data);
    renderPortfolio();
}

function addEducation() {
    const data = loadData();
    data.education.push({ year: '', degree: '', institution: '' });
    saveData(data);
    renderAdminTab('education');
}

function removeEducation(i) {
    const data = loadData();
    data.education.splice(i, 1);
    saveData(data);
    renderAdminTab('education');
    renderPortfolio();
}

function addExperience() {
    const data = loadData();
    data.experience.push({ role: '', company: '', period: '', description: '' });
    saveData(data);
    renderAdminTab('experience');
}

function removeExperience(i) {
    const data = loadData();
    data.experience.splice(i, 1);
    saveData(data);
    renderAdminTab('experience');
    renderPortfolio();
}

function addSkill() {
    const data = loadData();
    data.skills.push({ year: '', name: '', source: '' });
    saveData(data);
    renderAdminTab('skills');
}

function removeSkill(i) {
    const data = loadData();
    data.skills.splice(i, 1);
    saveData(data);
    renderAdminTab('skills');
    renderPortfolio();
}

function addContact() {
    const data = loadData();
    data.contacts.push({ id: 'c' + Date.now(), label: '', url: '', icon: 'globe' });
    saveData(data);
    renderAdminTab('contacts');
}

function removeContact(i) {
    const data = loadData();
    data.contacts.splice(i, 1);
    saveData(data);
    renderAdminTab('contacts');
    renderPortfolio();
}

function addTypingPhrase() {
    const data = loadData();
    data.typedPhrases.push('');
    saveData(data);
    renderAdminTab('typing');
}

function removeTypingPhrase(i) {
    const data = loadData();
    data.typedPhrases.splice(i, 1);
    saveData(data);
    renderAdminTab('typing');
    renderPortfolio();
    initTypingEffect();
}

function getListValues(prefix, fields) {
    const data = loadData();
    const list = data[prefix];
    if (!list) return;
    list.forEach((_, i) => {
        fields.forEach(f => {
            const el = document.getElementById(`${prefix}_${f}_${i}`);
            if (el) list[i][f] = el.value;
        });
    });
    saveData(data);
}

function saveEducation() {
    const data = loadData();
    data.education.forEach((_, i) => {
        const year = document.getElementById(`edu_year_${i}`);
        const degree = document.getElementById(`edu_degree_${i}`);
        const inst = document.getElementById(`edu_inst_${i}`);
        if (year) data.education[i].year = year.value;
        if (degree) data.education[i].degree = degree.value;
        if (inst) data.education[i].institution = inst.value;
    });
    saveData(data);
    renderPortfolio();
}

function saveExperience() {
    const data = loadData();
    data.experience.forEach((_, i) => {
        const role = document.getElementById(`exp_role_${i}`);
        const company = document.getElementById(`exp_company_${i}`);
        const period = document.getElementById(`exp_period_${i}`);
        const desc = document.getElementById(`exp_desc_${i}`);
        if (role) data.experience[i].role = role.value;
        if (company) data.experience[i].company = company.value;
        if (period) data.experience[i].period = period.value;
        if (desc) data.experience[i].description = desc.value;
    });
    saveData(data);
    renderPortfolio();
}

function saveSkills() {
    const data = loadData();
    data.skills.forEach((_, i) => {
        const year = document.getElementById(`sk_year_${i}`);
        const name = document.getElementById(`sk_name_${i}`);
        const source = document.getElementById(`sk_source_${i}`);
        if (year) data.skills[i].year = year.value;
        if (name) data.skills[i].name = name.value;
        if (source) data.skills[i].source = source.value;
    });
    saveData(data);
    renderPortfolio();
}

function saveContacts() {
    const data = loadData();
    data.contacts.forEach((_, i) => {
        const icon = document.getElementById(`cont_icon_${i}`);
        const label = document.getElementById(`cont_label_${i}`);
        const url = document.getElementById(`cont_url_${i}`);
        if (icon) data.contacts[i].icon = icon.value;
        if (label) data.contacts[i].label = label.value;
        if (url) data.contacts[i].url = url.value;
    });
    saveData(data);
    renderPortfolio();
}

function saveTypingPhrases() {
    const data = loadData();
    data.typedPhrases.forEach((_, i) => {
        const el = document.getElementById(`tp_${i}`);
        if (el) data.typedPhrases[i] = el.value;
    });
    saveData(data);
    renderPortfolio();
    initTypingEffect();
}

function savePasswordAdmin() {
    const p1 = document.getElementById('af_password').value;
    const p2 = document.getElementById('af_password2').value;
    if (p1 !== p2 || !p1) {
        document.getElementById('pwdError').style.display = 'block';
        return;
    }
    document.getElementById('pwdError').style.display = 'none';
    savePassword(p1);
    renderAdminTab('password');
}

document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.altKey && e.metaKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        openLogin();
    }
});
