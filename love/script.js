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

const rainImages = [
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360"><rect width="300" height="360" rx="24" fill="%23fff7c5"/><rect x="18" y="18" width="264" height="70" rx="12" fill="%23fff"/><text x="150" y="64" text-anchor="middle" font-size="48" font-family="Arial" fill="%23d9155b" font-weight="700">LOVE IS...</text><text x="150" y="140" text-anchor="middle" font-size="31" font-family="Arial" fill="%23801f4f">обнимать тебя</text><text x="150" y="180" text-anchor="middle" font-size="31" font-family="Arial" fill="%23801f4f">каждый день</text><path d="M150 295c-15-17-44-29-44-57 0-18 14-31 30-31 8 0 15 4 20 10 5-6 12-10 20-10 17 0 30 13 30 31 0 28-29 40-44 57z" fill="%23ff4d8d"/></svg>',
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360"><rect width="300" height="360" rx="24" fill="%23f6ecff"/><rect x="18" y="18" width="264" height="70" rx="12" fill="%23fff"/><text x="150" y="64" text-anchor="middle" font-size="48" font-family="Arial" fill="%23d9155b" font-weight="700">LOVE IS...</text><text x="150" y="140" text-anchor="middle" font-size="31" font-family="Arial" fill="%23602b94">смеяться вместе</text><text x="150" y="180" text-anchor="middle" font-size="31" font-family="Arial" fill="%23602b94">до слёз</text><circle cx="112" cy="270" r="26" fill="%23ff98bf"/><circle cx="188" cy="270" r="26" fill="%23a68bff"/><path d="M150 325c-15-17-44-29-44-57 0-18 14-31 30-31 8 0 15 4 20 10 5-6 12-10 20-10 17 0 30 13 30 31 0 28-29 40-44 57z" fill="%23ff4d8d"/></svg>',
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360"><rect width="300" height="360" rx="24" fill="%23e7f8ff"/><rect x="18" y="18" width="264" height="70" rx="12" fill="%23fff"/><text x="150" y="64" text-anchor="middle" font-size="48" font-family="Arial" fill="%23d9155b" font-weight="700">LOVE IS...</text><text x="150" y="140" text-anchor="middle" font-size="31" font-family="Arial" fill="%231f5f87">выбирать тебя</text><text x="150" y="180" text-anchor="middle" font-size="31" font-family="Arial" fill="%231f5f87">снова и снова</text><rect x="72" y="230" width="156" height="96" rx="20" fill="%2397dcff"/><path d="M150 313c-15-17-44-29-44-57 0-18 14-31 30-31 8 0 15 4 20 10 5-6 12-10 20-10 17 0 30 13 30 31 0 28-29 40-44 57z" fill="%23ff4d8d"/></svg>'
];

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

function moveNoButton(pointerX = -9999, pointerY = -9999) {
    if (!noButtonCanRun) {
        return;
    }

    const margin = 18;
    const maxX = window.innerWidth - noBtn.offsetWidth - margin;
    const maxY = window.innerHeight - noBtn.offsetHeight - margin;
    const yesRect = yesBtn.getBoundingClientRect();

    let chosenX = margin;
    let chosenY = margin;

    for (let i = 0; i < 120; i += 1) {
        const x = margin + Math.random() * Math.max(1, maxX - margin);
        const y = margin + Math.random() * Math.max(1, maxY - margin);

        const noRect = {
            left: x,
            top: y,
            right: x + noBtn.offsetWidth,
            bottom: y + noBtn.offsetHeight
        };

        const safeZoneAroundYes = {
            left: yesRect.left - 140,
            top: yesRect.top - 90,
            right: yesRect.right + 140,
            bottom: yesRect.bottom + 90
        };

        const farFromPointer = Math.hypot(x - pointerX, y - pointerY) > 170;

        if (!intersects(noRect, safeZoneAroundYes) && farFromPointer) {
            chosenX = x;
            chosenY = y;
            break;
        }
    }

    noBtn.classList.add('runaway');
    noBtn.style.left = `${chosenX}px`;
    noBtn.style.top = `${chosenY}px`;
}

noBtn.addEventListener('mouseenter', (event) => {
    moveNoButton(event.clientX, event.clientY);
});

noBtn.addEventListener('mousemove', (event) => {
    moveNoButton(event.clientX, event.clientY);
});

noBtn.addEventListener('click', (event) => {
    event.preventDefault();
    moveNoButton(event.clientX, event.clientY);
});

noBtn.addEventListener('touchstart', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    moveNoButton(touch?.clientX ?? -9999, touch?.clientY ?? -9999);
}, { passive: false });

proposalCard.addEventListener('mousemove', (event) => {
    if (!noBtn.classList.contains('runaway')) {
        return;
    }

    const noRect = noBtn.getBoundingClientRect();
    const distance = Math.hypot(
        event.clientX - (noRect.left + noRect.width / 2),
        event.clientY - (noRect.top + noRect.height / 2)
    );

    if (distance < 150) {
        moveNoButton(event.clientX, event.clientY);
    }
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

    const duration = 10 + Math.random() * 12;
    const left = Math.random() * 100;
    const delay = -Math.random() * 16;
    const drift = `${Math.random() * 180 - 90}px`;
    const spin = `${Math.random() * 260 - 130}deg`;
    const size = 70 + Math.random() * 55;
    const image = rainImages[Math.floor(Math.random() * rainImages.length)];

    item.style.left = `${left}%`;
    item.style.width = `${size}px`;
    item.style.animationDuration = `${duration}s`;
    item.style.animationDelay = `${delay}s`;
    item.style.setProperty('--drift', drift);
    item.style.setProperty('--spin', spin);
    item.style.backgroundImage = `url('${image}')`;

    loveRain.appendChild(item);
}

for (let i = 0; i < 22; i += 1) {
    createRainItem();
}