// ===========================
// Profile: sidebar identity, bio, meta rows, skill chips
// ===========================

const SIDE_ICONS = {
    location: '<path d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383-.143.85.147 1.71.766 2.4A7.6 7.6 0 0 0 8 16s5.5-4.5 5.5-9.5A5.5 5.5 0 0 0 8 0zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>',
    school: '<path d="M7.693 1.066a.75.75 0 0 1 .614 0l7 3.25a.75.75 0 0 1 0 1.368L13 6.831v3.94c0 .58-.335 1.07-.768 1.387-.44.323-1.02.57-1.652.745C9.312 13.256 8.196 13.4 8 13.4s-1.312-.144-2.58-.497c-.632-.175-1.213-.422-1.652-.745C3.335 11.84 3 11.35 3 10.77V6.83L1.693 6.22a.75.75 0 0 1 0-1.368l7-3.25z"></path>',
    role: '<path d="M6.75 0h2.5A1.75 1.75 0 0 1 11 1.75V3h3.25c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25v-8.5C0 3.784.784 3 1.75 3H5V1.75C5 .784 5.784 0 6.75 0zm2.75 3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25V3h3z"></path>',
    email: '<path d="M1.75 2h12.5A1.75 1.75 0 0 1 16 3.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2zM1.5 4.5v7.75c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V4.5L8 8.75 1.5 4.5z"></path>',
    link: '<path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z"></path>'
};

function metaRow(iconKey, text, href, external) {
    const li = document.createElement('li');
    li.className = 'meta-row';

    li.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">${SIDE_ICONS[iconKey] || ''}</svg>`;

    if (href) {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = text;
        if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        li.appendChild(a);
    } else {
        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);
    }
    return li;
}

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

        // --- Identity ---
        setText('.side-name', profile.name);
        setText('#side-handle', profile.handle);
        setText('#topbar-handle', profile.handle);
        setText('#availability-text', profile.availability);

        // Initials in the avatar circle
        const avatar = document.getElementById('avatar');
        if (avatar && profile.name) {
            avatar.textContent = profile.name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase();
        }

        // --- Bio: one <p> per line in data/profile.js ---
        const bio = document.getElementById('side-bio');
        if (bio && Array.isArray(profile.bio)) {
            bio.innerHTML = '';
            profile.bio.forEach(sentence => {
                const p = document.createElement('p');
                p.textContent = sentence;
                bio.appendChild(p);
            });
        }

        // --- Document metadata ---
        if (profile.name) {
            document.title = `${profile.name}${profile.handle ? ' — ' + profile.handle : ''}`;
            const metaAuthor = document.querySelector('meta[name="author"]');
            if (metaAuthor) metaAuthor.content = profile.name;
            setText('.footer-copy', `© ${new Date().getFullYear()} ${profile.name}`);
        }

        // --- Sidebar meta rows ---
        const meta = document.getElementById('side-meta');
        const c = profile.contact || {};
        if (meta) {
            meta.innerHTML = '';
            if (profile.location) meta.appendChild(metaRow('location', profile.location));
            if (profile.school) meta.appendChild(metaRow('school', profile.school));
            if (profile.targetRole) meta.appendChild(metaRow('role', profile.targetRole));
            if (c.email) meta.appendChild(metaRow('email', c.email, 'mailto:' + c.email));
            if (c.linkedin) {
                meta.appendChild(metaRow('link', 'linkedin.com/in/' + c.linkedin,
                    'https://www.linkedin.com/in/' + c.linkedin + '/', true));
            }
        }

        // --- Skills, as labelled chip groups ---
        const skills = document.getElementById('skills');
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
