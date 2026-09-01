// ===========================
// Profile: hero, about text, skill cards
// ===========================

// Line-art icon per skill category (matches the blueprint look).
function getSkillIcon(category) {
    const svg = (inner) =>
        `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

    const icons = {
        'Languages': svg('<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>'),
        'Backend': svg('<rect x="2" y="3" width="20" height="8" rx="1"></rect><rect x="2" y="13" width="20" height="8" rx="1"></rect><line x1="6" y1="7" x2="6.01" y2="7"></line><line x1="6" y1="17" x2="6.01" y2="17"></line>'),
        'Frontend': svg('<rect x="2" y="3" width="20" height="14" rx="1"></rect><path d="M8 21h8M12 17v4"></path>'),
        'Mobile & Frontend': svg('<rect x="6" y="2" width="12" height="20" rx="2"></rect><line x1="11" y1="18" x2="13" y2="18"></line>'),
        'Database': svg('<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>'),
        'Tools': svg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>')
    };

    return icons[category] || icons['Tools'];
}

function loadProfile() {
    try {
        const profile = (window.PORTFOLIO_DATA || {}).profile;
        if (!profile) {
            console.error('Profile data not found — is data/profile.js loaded before this script?');
            return;
        }

        // --- Hero ---
        const heroName = document.querySelector('.hero-name');
        if (heroName) heroName.textContent = profile.name;

        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) heroDescription.textContent = profile.description;

        // Seed the typing effect with the role list (script.js reads this).
        window.PORTFOLIO_ROLES = (profile.roles && profile.roles.length)
            ? profile.roles
            : [profile.title];

        const typingText = document.querySelector('.typing-text');
        if (typingText) typingText.textContent = profile.title;

        // --- Spec table ---
        const status = document.querySelector('.spec-status');
        if (status && profile.status) status.textContent = profile.status;

        const target = document.querySelector('.spec-target');
        if (target && profile.targetRole) target.textContent = profile.targetRole;

        const stack = document.querySelector('.spec-stack');
        if (stack && profile.coreStack) stack.textContent = profile.coreStack;

        // --- Document metadata ---
        document.title = `${profile.name} — Portfolio`;

        const metaAuthor = document.querySelector('meta[name="author"]');
        if (metaAuthor) metaAuthor.content = profile.name;

        const footer = document.querySelector('.footer p');
        if (footer) {
            footer.innerHTML =
                `&copy; ${new Date().getFullYear()} ${profile.name}. Built by hand — no framework, no build step.`;
        }

        // --- Social links ---
        if (profile.contact) {
            document.querySelectorAll('.social-btn[aria-label="GitHub"]').forEach(link => {
                if (profile.contact.github) link.href = `https://github.com/${profile.contact.github}`;
            });
            document.querySelectorAll('.social-btn[aria-label="LinkedIn"]').forEach(link => {
                if (profile.contact.linkedin) link.href = `https://www.linkedin.com/in/${profile.contact.linkedin}/`;
            });
        }

        // --- About ---
        if (profile.about) {
            const aboutText = document.querySelector('.about-text');
            if (aboutText) {
                const heading = aboutText.querySelector('h3');
                if (heading && profile.about.heading) heading.textContent = profile.about.heading;

                aboutText.innerHTML = '';
                if (heading) aboutText.appendChild(heading);

                ['intro', 'interests', 'goal'].forEach(key => {
                    if (!profile.about[key]) return;
                    const para = document.createElement('p');
                    para.textContent = profile.about[key];
                    aboutText.appendChild(para);
                });
            }
        }

        // --- Skills ---
        if (Array.isArray(profile.skills)) {
            const skillsGrid = document.querySelector('.skills-grid');
            if (skillsGrid) {
                skillsGrid.innerHTML = '';

                profile.skills.forEach(skill => {
                    const card = document.createElement('div');
                    card.className = 'skill-card';
                    card.innerHTML = `
                        <div class="skill-icon">${getSkillIcon(skill.category)}</div>
                        <h4>${skill.category}</h4>
                        <p>${skill.technologies}</p>
                    `;
                    skillsGrid.appendChild(card);
                });

                // Animate the cards we just injected.
                const skillObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) entry.target.classList.add('visible');
                    });
                }, { threshold: 0.1 });

                skillsGrid.querySelectorAll('.skill-card').forEach((card, index) => {
                    card.classList.add('fade-in');
                    card.style.transitionDelay = `${index * 0.08}s`;
                    skillObserver.observe(card);
                });
            }
        }

    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProfile);
} else {
    loadProfile();
}
