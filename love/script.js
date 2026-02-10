const loginScreen = document.getElementById('loginScreen');
const valentineScreen = document.getElementById('valentineScreen');
const form = document.getElementById('loveLoginForm');
const loginInput = document.getElementById('loginInput');
const passwordInput = document.getElementById('passwordInput');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const formMessage = document.getElementById('formMessage');

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const actionsRow = document.getElementById('actionsRow');
const proposalCard = document.getElementById('proposalCard');
const envelopeScene = document.getElementById('envelopeScene');
const envelope = document.getElementById('envelope');
const envelopePaper = document.getElementById('envelopePaper');

const letterOverlay = document.getElementById('letterOverlay');
const closeLetter = document.getElementById('closeLetter');
const loveRain = document.getElementById('loveRain');

const LOVE_LOGIN = '1.12.2020';
const LOVE_PASSWORD = 'вкусняшка-фитоняшка';

const rainCardPresets = [
    { bg: '#fff7c5', text: '#801f4f', accent: '#ff4d8d', l1: 'обнимать тебя', l2: 'каждый день' },
    { bg: '#f6ecff', text: '#602b94', accent: '#a68bff', l1: 'смеяться вместе', l2: 'до слёз' },
    { bg: '#e7f8ff', text: '#1f5f87', accent: '#78cfff', l1: 'выбирать тебя', l2: 'снова и снова' },
    { bg: '#ffeefa', text: '#7d2f66', accent: '#ff8ccf', l1: 'целовать тебя', l2: 'перед сном' },
    { bg: '#fff2e8', text: '#8a3d2f', accent: '#ff9f7c', l1: 'греть твои руки', l2: 'зимой' },
    { bg: '#efffea', text: '#2f6a3e', accent: '#8fe3a3', l1: 'делить с тобой', l2: 'любую мечту' },
    { bg: '#eef2ff', text: '#3f4f8d', accent: '#9ba9ff', l1: 'держаться за руки', l2: 'всегда' },
    { bg: '#fff0f3', text: '#8a2c54', accent: '#ffa0be', l1: 'слышать твой смех', l2: 'каждый вечер' },
    { bg: '#f4fbff', text: '#2f5d7e', accent: '#8fd7ff', l1: 'пить кофе вместе', l2: 'в тишине утра' },
    { bg: '#fff6ec', text: '#7a4c28', accent: '#ffc98f', l1: 'смотреть на тебя', l2: 'и улыбаться' },
    { bg: '#f2efff', text: '#5d3f8a', accent: '#c09dff', l1: 'быть рядом', l2: 'в любой день' },
    { bg: '#eafdf7', text: '#2e6d5a', accent: '#89e8ca', l1: 'беречь твоё сердце', l2: 'нежно-нежно' }
];

function createRainCardImage({ bg, text, accent, l1, l2 }) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360">
            <defs>
                <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45"/>
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
                </linearGradient>
            </defs>
            <rect width="300" height="360" rx="24" fill="${bg}"/>
            <rect x="18" y="18" width="264" height="70" rx="12" fill="#fff"/>
            <rect x="18" y="18" width="264" height="70" rx="12" fill="url(#shine)"/>
            <text x="150" y="64" text-anchor="middle" font-size="48" font-family="Arial" fill="#d9155b" font-weight="700">LOVE IS...</text>
            <text x="150" y="140" text-anchor="middle" font-size="30" font-family="Arial" fill="${text}">${l1}</text>
            <text x="150" y="180" text-anchor="middle" font-size="30" font-family="Arial" fill="${text}">${l2}</text>
            <path d="M150 315c-15-17-44-29-44-57 0-18 14-31 30-31 8 0 15 4 20 10 5-6 12-10 20-10 17 0 30 13 30 31 0 28-29 40-44 57z" fill="${accent}"/>
            <circle cx="98" cy="258" r="17" fill="${accent}" fill-opacity="0.52"/>
            <circle cx="202" cy="258" r="17" fill="${accent}" fill-opacity="0.52"/>
        </svg>
    `;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

const rainImages = rainCardPresets.map(createRainCardImage);


let noButtonCanRun = true;

function normalizeInput(value) {
    return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

togglePasswordBtn.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    togglePasswordBtn.textContent = isHidden ? '💖' : '💗';
    togglePasswordBtn.setAttribute('aria-label', isHidden ? 'Скрыть пароль' : 'Показать пароль');
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const loginValue = normalizeInput(loginInput.value);
    const passwordValue = normalizeInput(passwordInput.value);

    if (loginValue === normalizeInput(LOVE_LOGIN) && passwordValue === normalizeInput(LOVE_PASSWORD)) {
        formMessage.textContent = 'Доступ открыт. Добро пожаловать в любовь 💖';
        formMessage.style.color = '#b8ffd8';

        setTimeout(() => {
            loginScreen.classList.add('hidden');
            valentineScreen.classList.remove('hidden');
        }, 650);
        return;
    }

    formMessage.textContent = 'Кажется, это не ваши особенные данные. Попробуй ещё раз ✨';
    formMessage.style.color = '#ffd2e4';
});

function intersects(rectA, rectB) {
    return !(rectA.right < rectB.left || rectA.left > rectB.right || rectA.bottom < rectB.top || rectA.top > rectB.bottom);
}

function moveNoButton() {
    if (!noButtonCanRun) {
        return;
    }

    const cardRect = proposalCard.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    const maxX = Math.max(0, cardRect.width - noBtn.offsetWidth - 24);
    const maxY = Math.max(0, cardRect.height - noBtn.offsetHeight - 24);

    let chosenX = noBtn.offsetLeft || 16;
    let chosenY = noBtn.offsetTop || 16;

        for (let i = 0; i < 100; i += 1) {
        const x = 12 + Math.random() * maxX;
        const y = 12 + Math.random() * maxY;

        const candidateRect = {
            left: cardRect.left + x,
            top: cardRect.top + y,
            right: cardRect.left + x + noBtn.offsetWidth,
            bottom: cardRect.top + y + noBtn.offsetHeight
        };

        const safeZoneAroundYes = {
            left: yesRect.left - 120,
            top: yesRect.top - 80,
            right: yesRect.right + 120,
            bottom: yesRect.bottom + 80
        };


        if (!intersects(candidateRect, safeZoneAroundYes)) {
            chosenX = x;
            chosenY = y;
            break;
        }
    }

    noBtn.classList.add('runaway');
    noBtn.style.left = `${chosenX}px`;
    noBtn.style.top = `${chosenY}px`;
}

noBtn.addEventListener('mouseenter', moveNoButton);

noBtn.addEventListener('touchstart', (event) => {
    event.preventDefault();
    moveNoButton();
}, { passive: false });

noBtn.addEventListener('click', (event) => {
    event.preventDefault();
    moveNoButton();
});


yesBtn.addEventListener('click', () => {
    noBtn.classList.remove('runaway');
    noBtn.style.left = '';
    noBtn.style.top = '';

    actionsRow.classList.add('hidden');
    envelopeScene.classList.remove('hidden');
});

function openEnvelope() {
    envelope.classList.add('opened');
}

envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openEnvelope();
    }
});

envelopePaper.addEventListener('click', () => {
    if (!envelope.classList.contains('opened')) {
        return;
    }

    letterOverlay.classList.remove('hidden');
});

closeLetter.addEventListener('click', () => {
    letterOverlay.classList.add('hidden');
});

letterOverlay.addEventListener('click', (event) => {
    if (event.target === letterOverlay) {
        letterOverlay.classList.add('hidden');
    }
});

function createRainItem() {
    const item = document.createElement('div');
    item.className = 'rain-item';

    const duration = 12 + Math.random() * 14;
    const left = Math.random() * 100;
    const delay = -Math.random() * 20;
    const drift = `${Math.random() * 180 - 90}px`;
    const spin = `${Math.random() * 260 - 130}deg`;
    const size = 78 + Math.random() * 58;
    const image = rainImages[Math.floor(Math.random() * rainImages.length)];

    item.style.left = `${left}%`;
    item.style.width = `${size}px`;
    item.style.animationDuration = `${duration}s`;
    item.style.animationDelay = `${delay}s`;
    item.style.setProperty('--drift', drift);
    item.style.setProperty('--spin', spin);
    item.style.backgroundImage = `url('${image}')`;
    item.style.setProperty('--item-opacity', (0.2 + Math.random() * 0.3).toFixed(2));
    item.style.setProperty('--item-brightness', (0.78 + Math.random() * 0.28).toFixed(2));
    item.style.setProperty('--item-blur', `${(Math.random() * 0.8).toFixed(2)}px`);

    loveRain.appendChild(item);
}

for (let i = 0; i < 28; i += 1) {
    createRainItem();
}