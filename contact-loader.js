// ===========================
// Contact: getInTouch() rows
// ===========================

const CONTACT_ICONS = {
    Email: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/></svg>',
    GitHub: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.24-.02-2.25-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.22.7.83.58C20.57 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z"/></svg>',
    LinkedIn: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM2.4 21.5h5.16V9.5H2.4v12zM9.5 9.5h4.95v1.64h.07c.69-1.24 2.37-2.55 4.88-2.55 5.22 0 6.18 3.1 6.18 7.13V21.5h-5.15v-5.35c0-1.28-.02-2.92-1.9-2.92-1.9 0-2.19 1.39-2.19 2.83V21.5H9.5v-12z"/></svg>',
    Phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
};

function loadContact() {
    try {
        const profile = (window.PORTFOLIO_DATA || {}).profile;
        if (!profile || !profile.contact) return;

        const host = document.getElementById('touchlist');
        if (!host) return;

        host.innerHTML = '';
        const c = profile.contact;

        const rows = [
            { k: 'Email', v: c.email, href: c.email && 'mailto:' + c.email },
            { k: 'GitHub', v: c.github && 'github.com/' + c.github, href: c.github && 'https://github.com/' + c.github, ext: true },
            { k: 'LinkedIn', v: c.linkedin && 'linkedin.com/in/' + c.linkedin, href: c.linkedin && 'https://www.linkedin.com/in/' + c.linkedin + '/', ext: true },
            { k: 'Phone', v: c.phone, href: c.phone && 'tel:' + c.phone.replace(/[^0-9+]/g, '') }
        ];

        // Skip any entry with nothing set in data/profile.js
        rows.filter(r => r.v && r.href).forEach(r => {
            const row = document.createElement('a');
            row.className = 'trow';
            row.href = r.href;
            if (r.ext) { row.target = '_blank'; row.rel = 'noopener noreferrer'; }

            row.innerHTML = `
                <span class="ticon">${CONTACT_ICONS[r.k] || ''}</span>
                <span class="ttext"><span class="tk">${r.k}</span><span class="tv"></span></span>
            `;
            row.querySelector('.tv').textContent = r.v;

            host.appendChild(row);
        });

    } catch (error) {
        console.error('Error loading contact data:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContact);
} else {
    loadContact();
}
