// ===========================
// Profile: hero, facts, about text, skill chips
// ===========================

function loadProfile() {
    try {
        const profile = (window.PORTFOLIO_DATA || {}).profile;
        if (!profile) {
            console.error('Profile data not found — is data/profile.js loaded before this script?');
            return;
        }

        const setText = (selector, value) => {
            if (!value) return;
            const el = document.querySelector(selector);
            if (el) el.textContent = value;
        };

        // --- Hero ---
        setText('.hero-name', profile.name);
        setText('#hero-headline', profile.headline || profile.description);
        setText('#availability-text', profile.availability);

        // --- Facts ---
        setText('.fact-status', profile.status);
        setText('.fact-target', profile.targetRole);
        setText('.fact-stack', profile.coreStack);

        // --- Document metadata ---
        if (profile.name) {
            document.title = `${profile.name} — ${profile.targetRole || 'Portfolio'}`;
            const metaAuthor = document.querySelector('meta[name="author"]');
            if (metaAuthor) metaAuthor.content = profile.name;
            setText('.footer-copy', `© ${new Date().getFullYear()} ${profile.name}`);
        }

        // --- About ---
        const aboutText = document.querySelector('.about-text');
        if (aboutText && profile.about) {
            aboutText.innerHTML = '';
            ['intro', 'interests', 'goal'].forEach(key => {
                if (!profile.about[key]) return;
                const para = document.createElement('p');
                para.textContent = profile.about[key];
                aboutText.appendChild(para);
            });
        }

        // --- Skills, as labelled chip groups ---
        const skills = document.querySelector('.skills');
        if (skills && Array.isArray(profile.skills)) {
            skills.innerHTML = '';

            profile.skills.forEach(skill => {
                const group = document.createElement('div');
                group.className = 'skill-group';

                const label = document.createElement('p');
                label.className = 'skill-label';
                label.textContent = skill.category;

                const chips = document.createElement('div');
                chips.className = 'skill-chips';

                // `technologies` is one comma-separated string in data/profile.js
                String(skill.technologies || '')
                    .split(',')
                    .map(t => t.trim())
                    .filter(Boolean)
                    .forEach(tech => {
                        const chip = document.createElement('span');
                        chip.className = 'chip';
                        chip.textContent = tech;
                        chips.appendChild(chip);
                    });

                group.append(label, chips);
                skills.appendChild(group);
            });
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
