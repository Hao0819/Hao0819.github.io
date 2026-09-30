// ===========================
// Profile: hero, about text, installed-package list of skills
// ===========================

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

        // --- /etc/motd key-value block ---
        const status = document.querySelector('.spec-status');
        if (status && profile.status) status.textContent = profile.status;

        const target = document.querySelector('.spec-target');
        if (target && profile.targetRole) target.textContent = profile.targetRole;

        const stack = document.querySelector('.spec-stack');
        if (stack && profile.coreStack) stack.textContent = profile.coreStack;

        // --- Prompt hostname follows the GitHub handle ---
        if (profile.contact && profile.contact.github) {
            const handle = profile.contact.github.toLowerCase();
            document.querySelectorAll('.ps1').forEach(el => { el.textContent = `visitor@${handle}`; });
            document.querySelectorAll('.shell-ps1').forEach(el => { el.textContent = `visitor@${handle}:~$`; });
            const host = document.querySelector('.tb-host');
            if (host) host.textContent = handle;
        }

        // --- Document metadata ---
        document.title = `${profile.name} — Portfolio`;

        const metaAuthor = document.querySelector('meta[name="author"]');
        if (metaAuthor) metaAuthor.content = profile.name;

        const footer = document.querySelector('.footer p');
        if (footer) {
            footer.textContent =
                `© ${new Date().getFullYear()} ${profile.name}. Built by hand — no framework, no build step.`;
        }

        // --- About ---
        if (profile.about) {
            const aboutText = document.querySelector('.about-text');
            if (aboutText) {
                aboutText.innerHTML = '';
                ['intro', 'interests', 'goal'].forEach(key => {
                    if (!profile.about[key]) return;
                    const para = document.createElement('p');
                    para.textContent = profile.about[key];
                    aboutText.appendChild(para);
                });
            }
        }

        // --- Skills, rendered as `pkg list --installed` output ---
        if (Array.isArray(profile.skills)) {
            const list = document.querySelector('.skills-list');
            if (list) {
                list.innerHTML = '';

                profile.skills.forEach(skill => {
                    const row = document.createElement('div');
                    row.className = 'skill-row';

                    const flag = document.createElement('span');
                    flag.className = 'skill-flag';
                    flag.textContent = '[ok]';

                    const name = document.createElement('span');
                    name.className = 'skill-name';
                    name.textContent = skill.category;

                    const tech = document.createElement('span');
                    tech.className = 'skill-tech';
                    tech.textContent = skill.technologies;

                    row.append(flag, name, tech);
                    list.appendChild(row);
                });

                const skillObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) entry.target.classList.add('visible');
                    });
                }, { threshold: 0.1 });

                list.querySelectorAll('.skill-row').forEach((row, index) => {
                    row.classList.add('fade-in');
                    row.style.transitionDelay = `${index * 0.08}s`;
                    skillObserver.observe(row);
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
