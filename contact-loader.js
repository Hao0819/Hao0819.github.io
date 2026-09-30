// ===========================
// Contact: linked rows
// ===========================

function loadContact() {
    try {
        const profile = (window.PORTFOLIO_DATA || {}).profile;
        if (!profile || !profile.contact) return;

        const container = document.getElementById('contact-list');
        if (!container) return;

        container.innerHTML = '';
        const c = profile.contact;

        const rows = [
            {
                label: 'Email',
                value: c.email,
                href: c.email ? `mailto:${c.email}` : '',
                icon: '<path d="M1.75 2h12.5A1.75 1.75 0 0 1 16 3.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2zM1.5 4.5v7.75c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V4.5L8 8.75 1.5 4.5z"></path>'
            },
            {
                label: 'GitHub',
                value: c.github ? `github.com/${c.github}` : '',
                href: c.github ? `https://github.com/${c.github}` : '',
                external: true,
                icon: '<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>'
            },
            {
                label: 'LinkedIn',
                value: c.linkedin ? `linkedin.com/in/${c.linkedin}` : '',
                href: c.linkedin ? `https://www.linkedin.com/in/${c.linkedin}/` : '',
                external: true,
                icon: '<path d="M2.5 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM1 6h3v8.5H1V6zm5 0h2.9v1.2h.04c.4-.76 1.4-1.56 2.87-1.56C14.7 5.64 16 7.2 16 9.9v4.6h-3v-4.1c0-1-.02-2.28-1.4-2.28-1.4 0-1.6 1.08-1.6 2.2v4.18H7V6z"></path>'
            },
            {
                label: 'Phone',
                value: c.phone,
                href: c.phone ? `tel:${c.phone.replace(/[^0-9+]/g, '')}` : '',
                icon: '<path d="M3.65 1.4a1.75 1.75 0 0 1 2.4.28l1.1 1.4a1.75 1.75 0 0 1-.15 2.33l-.75.75a9.2 9.2 0 0 0 3.6 3.6l.74-.75a1.75 1.75 0 0 1 2.33-.15l1.4 1.1a1.75 1.75 0 0 1 .28 2.4l-.9 1.2a2 2 0 0 1-2.3.66C8.2 13.1 2.9 7.8 1.8 4.6a2 2 0 0 1 .66-2.3l1.2-.9z"></path>'
            }
        ];

        // Skip any entry with nothing set in data/profile.js
        rows.filter(r => r.value && r.href).forEach(r => {
            const row = document.createElement('a');
            row.className = 'contact-row';
            row.href = r.href;
            if (r.external) {
                row.target = '_blank';
                row.rel = 'noopener noreferrer';
            }

            row.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">${r.icon}</svg>
                <span class="contact-label">${r.label}</span>
                <span class="contact-value"></span>
                <svg class="contact-arrow" width="14" height="14" viewBox="0 0 16 16" fill="currentColor"
                     aria-hidden="true">
                  <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06z"></path>
                </svg>
            `;
            row.querySelector('.contact-value').textContent = r.value;

            container.appendChild(row);
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
