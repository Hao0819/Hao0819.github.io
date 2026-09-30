// ===========================================================================
// Theme toggle and active-tab tracking.
// ===========================================================================

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

    // Keep following the system while the visitor has never chosen explicitly
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* storage blocked */ }
    if (!saved) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', label);
    }
}

initTheme();

// ===========================
// Tabs: underline whichever section is in view
// ===========================
const tabs = [...document.querySelectorAll('.tab')];

// #top is the page wrapper rather than a section, so it maps to the very top
const targets = tabs
    .map(tab => ({ tab, el: document.querySelector(tab.getAttribute('href')) }))
    .filter(t => t.el);

function updateTabs() {
    const line = window.scrollY + 140;

    let active = targets[0];
    targets.forEach(t => {
        if (t.el.offsetTop <= line) active = t;
    });

    tabs.forEach(tab => tab.classList.toggle('active', active && tab === active.tab));
}

window.addEventListener('scroll', updateTabs, { passive: true });
window.addEventListener('resize', updateTabs);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateTabs);
} else {
    updateTabs();
}
// Content is injected by the loaders, so section offsets move after first paint
window.addEventListener('load', updateTabs);

console.log('%cLim Jun Hao', 'font-weight:600;font-size:13px;');
console.log('%cgithub.com/Hao0819', 'color:#888;font-size:12px;');
