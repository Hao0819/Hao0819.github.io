// ===========================================================================
// Page behaviour: boot sequence, typing effect, navigation, status bar.
// ===========================================================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===========================
// Theme switcher
// The chosen theme is applied by the inline script in <head> before first
// paint; this only keeps the <select> in sync and saves new choices.
// ===========================
const THEMES = ['blue', 'green', 'amber', 'paper'];
const THEME_KEY = 'portfolio-theme';

function initTheme() {
    const select = document.getElementById('theme-select');
    if (!select) return;

    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* storage blocked */ }

    const current = THEMES.includes(saved) ? saved : 'blue';
    document.documentElement.setAttribute('data-theme', current);
    select.value = current;

    select.addEventListener('change', () => {
        const next = THEMES.includes(select.value) ? select.value : 'blue';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* not fatal */ }
    });
}

initTheme();

// ===========================
// Boot sequence
// Counts come from the data files, so the numbers stay true as content changes.
// ===========================
function buildBootLines() {
    const data = window.PORTFOLIO_DATA || {};
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skills = (data.profile || {}).skills || [];

    // Pull real languages out of the project tags, in the order they appear.
    // Tags also carry frameworks and protocols ("Mobile", "BLE"), so match
    // against a known list rather than just taking the first tag.
    const LANGUAGES = ['java', 'dart', 'python', 'c++', 'kotlin', 'typescript', 'javascript'];
    const langs = [...new Set(
        projects.flatMap(p => p.tags || [])
            .map(t => String(t).toLowerCase())
            .filter(t => LANGUAGES.includes(t))
    )].sort((a, b) => LANGUAGES.indexOf(a) - LANGUAGES.indexOf(b)).slice(0, 5).join(' ');

    const missingShots = projects.filter(p => !p.image).length;

    const lines = [
        ['[  0.000000] portfolio kernel v2026.9 booting on tty1', ''],
        [`[  0.142318] mounting /dev/experience (${experience.length} entries) ... `, 'ok'],
        [`[  0.318204] loading modules: ${langs} ... `, 'ok'],
        [`[  0.506771] registering ${skills.length} skill groups ......... `, 'ok'],
        [`[  0.664092] indexing ${projects.length} projects ................. `, 'ok']
    ];

    if (missingShots) {
        lines.push([`[  0.812445] ${missingShots} projects have no screenshot ..... `, 'warn']);
    }
    lines.push(['[  0.940118] login: visitor (guest shell)', '']);

    return lines;
}

const BOOT_LINES = buildBootLines();

function runBoot() {
    const boot = document.getElementById('boot');
    if (!boot) return;

    const render = (index) => {
        const [text, state] = BOOT_LINES[index];
        boot.appendChild(document.createTextNode(text));

        if (state) {
            const badge = document.createElement('span');
            badge.className = state;
            badge.textContent = state === 'ok' ? '[ ok ]' : '[warn]';
            boot.appendChild(badge);
        }
        boot.appendChild(document.createTextNode('\n'));
    };

    if (prefersReducedMotion) {
        BOOT_LINES.forEach((_, i) => render(i));
        return;
    }

    BOOT_LINES.forEach((_, i) => {
        setTimeout(() => render(i), i * 130);
    });
}

runBoot();

// ===========================
// Navigation
// ===========================
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

function closeMenu() {
    navMenu.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(isOpen));

    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translateY(6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
    } else {
        closeMenu();
    }
});

// Smooth scroll, offset by both fixed bars.
// getBoundingClientRect().bottom, not offsetTop: navbar is position:fixed, so
// its offsetParent is null and offsetTop is not reliable across browsers.
const barHeight = () => navbar.getBoundingClientRect().bottom;

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        e.preventDefault();
        closeMenu();

        window.scrollTo({
            top: targetSection.offsetTop - barHeight() - 12,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });
});

// ===========================
// Typing effect
// Roles come from data/profile.js via profile-loader.js.
// ===========================
const typingText = document.querySelector('.typing-text');

const getRoles = () => (
    Array.isArray(window.PORTFOLIO_ROLES) && window.PORTFOLIO_ROLES.length
        ? window.PORTFOLIO_ROLES
        : ['Backend Developer']
);

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    if (!typingText) return;

    const roles = getRoles();
    const currentText = roles[textIndex % roles.length];
    let delay;

    if (isDeleting) {
        charIndex--;
        typingText.textContent = currentText.substring(0, charIndex);
        delay = 45;
    } else {
        charIndex++;
        typingText.textContent = currentText.substring(0, charIndex);
        delay = 90;
    }

    if (!isDeleting && charIndex === currentText.length) {
        delay = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % roles.length;
        delay = 400;
    }

    setTimeout(typeText, delay);
}

if (typingText && !prefersReducedMotion) {
    // Start after the boot sequence has finished printing.
    setTimeout(() => {
        charIndex = 0;
        typingText.textContent = '';
        typeText();
    }, BOOT_LINES.length * 130 + 300);
}

// ===========================
// Session uptime in the motd block
// ===========================
const uptimeEl = document.getElementById('uptime');
if (uptimeEl) {
    const start = Date.now();
    const tick = () => {
        const s = Math.floor((Date.now() - start) / 1000);
        const mm = String(Math.floor(s / 60)).padStart(2, '0');
        const ss = String(s % 60).padStart(2, '0');
        uptimeEl.textContent = `${mm}:${ss} — thanks for staying`;
    };
    tick();
    setInterval(tick, 1000);
}

// ===========================
// Scroll animations for static content
// (dynamic content is animated by its own loader)
// ===========================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section-head, .about-text, .resume-download, .shell, .contact-cards, .prompt-line')
        .forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
});

// ===========================
// Active nav highlight + status bar
// ===========================
const sections = document.querySelectorAll('section[id]');

const SECTION_FILES = {
    home: '~/README',
    about: '~/about.txt',
    portfolio: '~/projects/',
    experience: '~/.git/log',
    contact: '~/contact.sh'
};

const sbFile = document.getElementById('sb-file');
const sbPos = document.getElementById('sb-pos');

function updateChrome() {
    const scrollY = window.pageYOffset + barHeight() + 40;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
            });
            if (sbFile && SECTION_FILES[section.id]) {
                sbFile.textContent = SECTION_FILES[section.id];
            }
        }
    });

    // Scroll position as a line number, purely for the terminal feel
    if (sbPos) {
        const line = Math.max(1, Math.round(window.pageYOffset / 22) + 1);
        sbPos.textContent = `Ln ${line}, Col 1`;
    }
}

window.addEventListener('scroll', updateChrome, { passive: true });
window.addEventListener('load', updateChrome);

console.log('%cLim Jun Hao — portfolio', 'color:#35C1FF;font-family:monospace;font-size:14px;font-weight:bold;');
console.log('%cSource: github.com/Hao0819', 'color:#6B87A3;font-family:monospace;font-size:12px;');
