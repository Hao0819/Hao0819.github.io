// ===========================
// Contact: linked rows
// ===========================

function loadContact() {
    try {
        const profile = (window.PORTFOLIO_DATA || {}).profile;
        if (!profile || !profile.contact) return;

        const container = document.querySelector('.contact-list');
        if (!container) return;

        container.innerHTML = '';

        const lead = document.getElementById('contact-lead');
        if (lead && profile.availability) {
            lead.textContent = `${profile.availability}. The fastest way to reach me is email.`;
        }

        const c = profile.contact;

        const rows = [
            {
                label: 'Email',
                value: c.email,
                href: c.email ? `mailto:${c.email}` : '',
                icon: '<rect x="2.5" y="4.5" width="19" height="15" rx="2"></rect><path d="M3 6.5l9 6.5 9-6.5"></path>'
            },
            {
                label: 'GitHub',
                value: c.github ? `github.com/${c.github}` : '',
                href: c.github ? `https://github.com/${c.github}` : '',
                external: true,
                icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>'
            },
            {
                label: 'LinkedIn',
                value: c.linkedin ? `linkedin.com/in/${c.linkedin}` : '',
                href: c.linkedin ? `https://www.linkedin.com/in/${c.linkedin}/` : '',
                external: true,
                icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.5A5.98 5.98 0 0 1 16 8z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>'
            },
            {
                label: 'Phone',
                value: c.phone,
                href: c.phone ? `tel:${c.phone.replace(/[^0-9+]/g, '')}` : '',
                icon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>'
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
                <span class="contact-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        ${r.icon}
                    </svg>
                </span>
                <span class="contact-label">${r.label}</span>
                <span class="contact-value"></span>
                <svg class="contact-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     aria-hidden="true">
                  <path d="M9 18l6-6-6-6"></path>
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
