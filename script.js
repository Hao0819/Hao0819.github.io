// ===========================================================================
// Nav state, theme toggle, scroll reveals.
// ===========================================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===========================
// Theme
// The saved choice is applied by the inline script in <head> before first
// paint; with nothing saved the page follows the system preference and the
// html element carries no data-theme at all.
// ===========================
const THEME_KEY = 'portfolio-theme';

function currentTheme() {
    const set = document.documentElement.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
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

    // Follow the system while the visitor has never chosen explicitly
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* storage blocked */ }
    if (!saved) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', label);
    }
}

initTheme();

// ===========================
// Nav: hairline on scroll, active section
// ===========================
const nav = document.getElementById('nav');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function updateNav() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);

    // The section whose top has most recently passed under the nav bar
    const line = window.scrollY + (nav ? nav.offsetHeight : 0) + 80;
    let active = null;
    sections.forEach(section => {
        if (section.offsetTop <= line) active = section.id;
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${active}`);
    });
}

window.addEventListener('scroll', updateNav, { passive: true });
window.addEventListener('resize', updateNav);
updateNav();

// ===========================
// Reveal on scroll
// Runs after the loaders have injected their content.
// ===========================
function initReveals() {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('shown');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.section-head, .work-group, .about-text, .skills, .entry, .contact-list, .contact-lead')
        .forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${Math.min(i, 6) * 0.05}s`;
            observer.observe(el);
        });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { initReveals(); updateNav(); });
} else {
    initReveals();
}

console.log('%cLim Jun Hao', 'font-weight:600;font-size:13px;');
console.log('%cgithub.com/Hao0819', 'color:#888;font-size:12px;');
