function getDefaultData() {
    return {
        personal: {
            name: 'Flaviano Sousa Porto',
            age: '34 anos',
            address: 'Belo Horizonte - MG',
            phone: '(73) 98861-9948',
            email: 'sousaportoflaviano@gmail.com.br',
            github: 'BitFlaviano'
        },
        objective: 'Análise de dados, Ciência de dados e afins',
        typedPhrases: [
            'Análise de Dados',
            'Ciência de Dados',
            'Engenharia de Dados',
            'Segurança da Informação',
            'Power BI & Python'
        ],
        education: [
            { year: '2026', degree: 'Engenharia de Dados e IA Aplicada - Pós-graduação', institution: 'PUC Minas' },
            { year: '2024', degree: 'Ciências da Computação', institution: 'Faculdade Pitágoras' },
            { year: '2021', degree: 'Logística', institution: 'Cebrac Santa Luzia MG' }
        ],
        experience: [
            {
                role: 'Gerente de T.I.',
                company: 'Kidverte',
                period: 'Dez/2023 — Atual',
                description: 'Criação de ferramentas e soluções para otimizar rotinas. Manipulação e gerenciamento da base de dados. Criação de relatórios internos para tomada de decisões. Configuração e gerenciamento de segurança da informação com FireWall (FortGate Fortinet). Gerenciamento e suporte ao usuário do sistema ERP (Linx Millennium).'
            },
            {
                role: 'Técnico em Informática',
                company: 'Kidverte',
                period: 'Nov/2021 — Dez/2023',
                description: 'Gerenciamento de equipamentos com manutenção preventiva e corretiva. Suporte ao usuário do sistema ERP (Linx Millennium).'
            },
            {
                role: 'Assistente Administrativo',
                company: 'Mix Móveis & Eletro',
                period: 'Jan/2017 — Ago/2019',
                description: 'Rotina administrativa/financeira, emissão e cadastro de notas fiscais, emissão de boletos. Gerenciamento de contas a pagar/receber e atividades fiscais. Gerenciamento do sistema ERP e SAP Siaf Adsoft. Manutenção de estações de trabalho e rede. Monitoramento de usuários.'
            }
        ],
        skills: [
            { year: '2026', name: 'Power BI', source: 'Fabridata' },
            { year: '2025', name: 'Introdução à Ciência de Dados', source: 'Santander | Open Academy' },
            { year: '2025', name: 'Python', source: 'Santander | Open Academy' },
            { year: '2020', name: 'Excel Avançado', source: 'Udemy (Excel Factory)' },
            { year: '2020', name: 'VBA Excel + Sistemas + Access', source: 'Udemy' },
            { year: '2019', name: 'Gestão de Estoque - Siaf', source: 'Adfsoft Gestão Empresarial' },
            { year: '2014', name: 'HTML5, CSS3, JavaScript', source: 'Eas Digital' },
            { year: '2011', name: 'Assistente Administrativo', source: 'Centro de Qualificação Providência' },
            { year: '2010', name: 'Hardware Profissional', source: 'Digital Treinamentos' },
            { year: '2009', name: 'Informática', source: 'C.E.I.' }
        ],
        contacts: [
            {
                id: 'wa',
                label: '(73) 98861-9948',
                url: 'https://wa.me/5573988619948?text=Ol%C3%A1%2C%20tenho%20uma%20proposta%20de%20trabalho%2C%20teria%20interesse%3F',
                icon: 'whatsapp'
            },
            {
                id: 'email',
                label: 'sousaportoflaviano@gmail.com.br',
                url: 'mailto:sousaportoflaviano@gmail.com.br',
                icon: 'email'
            },
            {
                id: 'github',
                label: 'GitHub',
                url: 'https://github.com/BitFlaviano',
                icon: 'github'
            }
        ]
    };
}

const DATA_KEY = 'portfolioData';
let cachedData = null;

function loadData() {
    if (cachedData) return cachedData;
    const raw = localStorage.getItem(DATA_KEY);
    if (raw) {
        try {
            cachedData = JSON.parse(raw);
            return cachedData;
        } catch (e) { /* fallback */ }
    }
    cachedData = getDefaultData();
    saveDataLocal(cachedData);
    return cachedData;
}

function saveDataLocal(data) {
    cachedData = data;
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

async function saveData(data) {
    saveDataLocal(data);
    const { error } = await supabaseClient
        .from('portfolio_data')
        .update({ data, updated_at: new Date().toISOString() })
        .eq('id', 1);
    if (error) {
        console.warn('Save to Supabase failed (need auth?):', error.message);
    }
}

async function initSupabaseData() {
    const { data, error } = await supabaseClient
        .from('portfolio_data')
        .select('data')
        .eq('id', 1)
        .single();
    if (!error && data && data.data && Object.keys(data.data).length > 0) {
        cachedData = data.data;
        localStorage.setItem(DATA_KEY, JSON.stringify(cachedData));
    }
}
