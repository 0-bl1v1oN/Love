const loginScreen = document.getElementById('loginScreen');
const valentineScreen = document.getElementById('valentineScreen');
const form = document.getElementById('loveLoginForm');
const loginInput = document.getElementById('loginInput');
const passwordInput = document.getElementById('passwordInput');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const formMessage = document.getElementById('formMessage');
const inputFocusHint = document.getElementById('inputFocusHint');

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
const confettiLayer = document.getElementById('confettiLayer');
const loveCounter = document.getElementById('loveCounter');
const LOVE_LOGIN = '1.12.2020';
const LOVE_PASSWORD = 'вкусняшка-фитоняшка';
const LOVE_START_DATE = '2020-12-01';

const warmMessageBtn = document.getElementById('warmMessageBtn');
const warmMessageText = document.getElementById('warmMessageText');
const startMiniGameBtn = document.getElementById('startMiniGameBtn');
const heartGameArea = document.getElementById('heartGameArea');
const gameScoreEl = document.getElementById('gameScore');
const gameTimeEl = document.getElementById('gameTime');
const bestScoreEl = document.getElementById('bestScore');
const miniGameStatus = document.getElementById('miniGameStatus');

const WARM_MESSAGES = [
    'Ты — моё самое красивое «почему-то улыбаюсь без причины».',
    'С тобой даже обычный день становится маленьким праздником.',
    'Твоя улыбка умеет лечить усталость лучше любого отдыха.',
    'Рядом с тобой в мире становится больше света.',
    'Ты делаешь меня добрее просто тем, что существуешь.',
    'Мне нравится, как ты смеёшься — в этот момент всё правильно.',
    'Ты вдохновляешь меня быть лучшей версией себя.',
    'Когда думаю о тебе, внутри сразу становится теплее.',
    'Ты очень красивая. И внешне, и сердцем.',
    'С тобой хочется строить планы и верить в чудеса.',
    'Мне спокойно от мысли, что ты есть в моей жизни.',
    'Ты — мой любимый человек, даже когда молчишь.',
    'Каждая встреча с тобой — как любимая песня на повторе.',
    'Ты приносишь в мою жизнь уют, который нельзя купить.',
    'Твои глаза — мой любимый вид на свете.',
    'Рядом с тобой даже дождь кажется романтичным.',
    'Мне нравится заботиться о тебе и видеть, как ты расцветаешь.',
    'Ты достойна самой нежной любви — каждый день.',
    'С тобой хочется смеяться, обниматься и никуда не спешить.',
    'Спасибо, что ты такая настоящая. Это бесценно.'
];

let warmMessagePool = [];
let miniGameTimer = null;
let miniGameSpawner = null;
let miniGameScore = 0;
let miniGameSecondsLeft = 20;
let miniGameBestScore = 0;
let miniGameRunning = false;


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

function handleFocusHint(event) {
    if (!inputFocusHint) {
        return;
    }
    inputFocusHint.textContent = event.target.dataset.focusHint || '';
}

function clearFocusHint() {
    if (!inputFocusHint) {
        return;
    }
    inputFocusHint.textContent = '';
}

[loginInput, passwordInput].forEach((input) => {
    input.addEventListener('focus', handleFocusHint);
    input.addEventListener('blur', clearFocusHint);
});


function normalizeInput(value) {
    return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function parseLoveStartDate(rawDate) {
    if (!rawDate) {
        return null;
    }

    const isoDatePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
    const ruDatePattern = /^(\d{1,2})[.-](\d{1,2})[.-](\d{4})$/;

    if (isoDatePattern.test(rawDate)) {
        const [, year, month, day] = rawDate.match(isoDatePattern);
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    if (ruDatePattern.test(rawDate)) {
        const [, day, month, year] = rawDate.match(ruDatePattern);
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    return null;
}


function updateLoveCounter() {
    if (!loveCounter) {
        return;
    }

    const startDate = parseLoveStartDate(LOVE_START_DATE);
    const today = new Date();

    if (!startDate || Number.isNaN(startDate.getTime())) {
        loveCounter.textContent = 'Вместе уже: дата любви пока не настроена 💞';
        return;
    }

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const days = Math.max(0, Math.floor((today - startDate) / (1000 * 60 * 60 * 24)));

    const suffix = days % 10 === 1 && days % 100 !== 11
        ? 'день'
        : (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 12 || days % 100 > 14) ? 'дня' : 'дней');

    loveCounter.innerHTML = `
        <span class="counter-prefix">Вместе уже</span>
        <span class="counter-value">${days}</span>
        <span class="counter-suffix">${suffix} 💖</span>
    `;
}

function pickWarmMessage() {
    if (warmMessagePool.length === 0) {
        warmMessagePool = [...WARM_MESSAGES].sort(() => Math.random() - 0.5);
    }

    return warmMessagePool.pop();
}

function showWarmMessage() {
    if (!warmMessageText) {
        return;
    }

    const message = pickWarmMessage();
    warmMessageText.textContent = message;
    warmMessageText.classList.remove('show');
    window.requestAnimationFrame(() => {
        warmMessageText.classList.add('show');
    });
}

function cleanupMiniGameHearts() {
    if (!heartGameArea) {
        return;
    }

    heartGameArea.querySelectorAll('.falling-heart').forEach((heart) => heart.remove());
}

function spawnMiniGameHeart() {
    if (!heartGameArea || !miniGameRunning) {
        return;
    }

    const heart = document.createElement('button');
    heart.type = 'button';
    heart.className = 'falling-heart';
    heart.textContent = ['💗', '💖', '💘', '💝'][Math.floor(Math.random() * 4)];

    const maxX = Math.max(6, heartGameArea.clientWidth - 40);
    const left = Math.round(6 + Math.random() * (maxX - 6));
    const duration = (1.8 + Math.random() * 1.4).toFixed(2);

    heart.style.left = `${left}px`;
    heart.style.setProperty('--heart-fall-duration', `${duration}s`);

    heart.addEventListener('click', () => {
        if (!miniGameRunning) {
            return;
        }

        miniGameScore += 1;
        if (gameScoreEl) {
            gameScoreEl.textContent = String(miniGameScore);
        }
        heart.remove();
    }, { once: true });

    heart.addEventListener('animationend', () => heart.remove(), { once: true });
    heartGameArea.appendChild(heart);
}

function finishMiniGame() {
    miniGameRunning = false;
    window.clearInterval(miniGameTimer);
    window.clearInterval(miniGameSpawner);
    miniGameTimer = null;
    miniGameSpawner = null;
    cleanupMiniGameHearts();

    miniGameBestScore = Math.max(miniGameBestScore, miniGameScore);
    if (bestScoreEl) {
        bestScoreEl.textContent = String(miniGameBestScore);
    }

    if (startMiniGameBtn) {
        startMiniGameBtn.disabled = false;
        startMiniGameBtn.textContent = 'Сыграть ещё раз';
    }

    if (miniGameStatus) {
        miniGameStatus.textContent = `Игра окончена! Ты поймала ${miniGameScore} сердечек 🥰`;
    }
}

function startMiniGame() {
    if (!heartGameArea || miniGameRunning) {
        return;
    }

    miniGameRunning = true;
    miniGameScore = 0;
    miniGameSecondsLeft = 20;

    if (gameScoreEl) {
        gameScoreEl.textContent = '0';
    }
    if (gameTimeEl) {
        gameTimeEl.textContent = String(miniGameSecondsLeft);
    }

    if (startMiniGameBtn) {
        startMiniGameBtn.disabled = true;
        startMiniGameBtn.textContent = 'Игра идёт…';
    }

    if (miniGameStatus) {
        miniGameStatus.textContent = 'Лови сердечки кликом — поехали!';
    }

    cleanupMiniGameHearts();
    spawnMiniGameHeart();

    miniGameSpawner = window.setInterval(spawnMiniGameHeart, 480);
    miniGameTimer = window.setInterval(() => {
        miniGameSecondsLeft -= 1;

        if (gameTimeEl) {
            gameTimeEl.textContent = String(Math.max(0, miniGameSecondsLeft));
        }

        if (miniGameSecondsLeft <= 0) {
            finishMiniGame();
        }
    }, 1000);
}

if (warmMessageBtn) {
    warmMessageBtn.addEventListener('click', showWarmMessage);
}

if (startMiniGameBtn) {
    startMiniGameBtn.addEventListener('click', startMiniGame);
}


function launchConfettiBurst(count = 26) {
    if (!confettiLayer) {
        return;
    }

    const palette = ['#ff4d8d', '#ffd166', '#8fe3a3', '#a68bff', '#7ad7ff', '#ff9ec2'];

    for (let i = 0; i < count; i += 1) {
        const piece = document.createElement('span');
        piece.className = 'confetti-piece';

        const fromCenter = 42 + Math.random() * 16;
        const dx = Math.round(Math.random() * 340 - 170);
        const dy = Math.round(window.innerHeight * (0.35 + Math.random() * 0.45));
        const spin = `${Math.round(Math.random() * 540 - 270)}deg`;
        const duration = 900 + Math.random() * 650;

        piece.style.left = `${fromCenter}%`;
        piece.style.background = palette[Math.floor(Math.random() * palette.length)];
        piece.style.setProperty('--dx', `${dx}px`);
        piece.style.setProperty('--dy', `${dy}px`);
        piece.style.setProperty('--spin', spin);
        piece.style.animationDuration = `${duration}ms`;

        confettiLayer.appendChild(piece);
        piece.addEventListener('animationend', () => piece.remove(), { once: true });
    }
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
    launchConfettiBurst();
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

updateLoveCounter();


for (let i = 0; i < 28; i += 1) {
    createRainItem();
}