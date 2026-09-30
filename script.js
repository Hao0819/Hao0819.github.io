// ===========================================================================
// Theme toggle, typing effect, scroll reveals, nav state.
// ===========================================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const THEME_KEY = 'portfolio-theme';

// ===========================
// Theme
// The saved choice is applied by the inline script in <head> before first
// paint; with nothing saved the page follows the system preference and the
// html element carries no data-theme at all.
// ===========================
function currentTheme() {
    const set = document.documentElement.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initTheme() {
    const btn = document.getElementById('theme-btn');
    if (!btn) return;

    const label = () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        btn.setAttribute('aria-label', `Switch to ${next} theme`);
    };
    label();

    btn.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage blocked */ }
        label();
    });

    // Keep following the system while the visitor has never chosen explicitly
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* storage blocked */ }
    if (!saved) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', label);
    }
}

initTheme();

// ===========================
// Typing effect
// Roles come from data/profile.js via profile-loader.js.
// ===========================
function initTyping() {
    const el = document.getElementById('role');
    if (!el) return;

    const roles = (Array.isArray(window.PORTFOLIO_ROLES) && window.PORTFOLIO_ROLES.length)
        ? window.PORTFOLIO_ROLES
        : ['Software Engineering Student'];

    if (prefersReducedMotion) { el.textContent = roles[0]; return; }

    let i = 0, chars = 0, deleting = false;

    (function tick() {
        const word = roles[i % roles.length];
        chars += deleting ? -1 : 1;
        el.textContent = word.slice(0, chars);

        let wait = deleting ? 40 : 85;
        if (!deleting && chars === word.length) { wait = 1900; deleting = true; }
        else if (deleting && chars === 0) { deleting = false; i++; wait = 320; }

        setTimeout(tick, wait);
    })();
}

// ===========================
// Scroll reveals
// Runs after the loaders have injected their cards and commits.
// ===========================
function initReveals() {
    const items = document.querySelectorAll('.rv');
    if (prefersReducedMotion) { items.forEach(el => el.classList.add('in')); return; }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in');
            io.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el, i) => {
        el.style.transitionDelay = Math.min(i % 8, 5) * 0.06 + 's';
        io.observe(el);
    });
}

// ===========================
// Nav: hairline on scroll, highlight the section in view
// ===========================
function initNav() {
    const bar = document.getElementById('nav');
    const links = [...document.querySelectorAll('.nav-links a')];
    const targets = links
        .map(a => ({ a, el: document.querySelector(a.getAttribute('href')) }))
        .filter(t => t.el);

    function update() {
        if (bar) bar.classList.toggle('stuck', window.scrollY > 12);

        const line = window.scrollY + 150;
        let active = targets[0];
        targets.forEach(t => { if (t.el.offsetTop <= line) active = t; });
        links.forEach(a => a.classList.toggle('on', active && a === active.a));
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    // Section offsets move once the loaders have injected their content
    window.addEventListener('load', update);
    update();
}

function start() {
    initTyping();
    initReveals();
    initNav();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}

console.log('%cLim Jun Hao', 'font-weight:700;font-size:13px;');
console.log('%cgithub.com/Hao0819', 'color:#888;font-size:12px;');
