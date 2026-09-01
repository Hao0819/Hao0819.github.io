// ===========================
// Navigation
// ===========================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hairline darkens once the page has scrolled off the top.
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
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
        spans[0].style.transform = 'rotate(45deg) translateY(9px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-9px)';
    } else {
        closeMenu();
    }
});

// Smooth scroll, offset by the fixed navbar height
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        e.preventDefault();
        closeMenu();

        window.scrollTo({
            top: targetSection.offsetTop - navbar.offsetHeight,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });
});

// ===========================
// Typing effect
// Roles come from data/profile.json via profile-loader.js.
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
    // Let profile-loader.js populate the role list first.
    setTimeout(() => {
        charIndex = 0;
        typingText.textContent = '';
        typeText();
    }, 800);
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
    document.querySelectorAll('.section-header, .about-text, .resume-download, .contact-left, .contact-right')
        .forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
});

// ===========================
// Active navigation highlight
// ===========================
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset + navbar.offsetHeight + 40;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav);

console.log('%cLim Jun Hao — portfolio', 'color:#B9862E;font-family:monospace;font-size:14px;font-weight:bold;');
console.log('%cSource: github.com/Hao0819', 'color:#5C6670;font-family:monospace;font-size:12px;');
