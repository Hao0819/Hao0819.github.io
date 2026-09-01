// ===========================
// Contact: linked contact rows
// ===========================
function loadContactCards() {
    try {
        const profile = (window.PORTFOLIO_DATA || {}).profile;
        if (!profile) return;

        const container = document.querySelector('.contact-cards');
        if (!container || !profile.contact) return;

        container.innerHTML = '';

        const c = profile.contact;

        const configs = [
            {
                label: 'Email',
                value: c.email,
                link: c.email ? `mailto:${c.email}` : '',
                icon: '<rect x="2" y="4" width="20" height="16" rx="1"></rect><polyline points="2,6 12,13 22,6"></polyline>'
            },
            {
                label: 'GitHub',
                value: c.github ? `github.com/${c.github}` : '',
                link: c.github ? `https://github.com/${c.github}` : '',
                external: true,
                icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>'
            },
            {
                label: 'LinkedIn',
                value: c.linkedin ? `linkedin.com/in/${c.linkedin}` : '',
                link: c.linkedin ? `https://www.linkedin.com/in/${c.linkedin}/` : '',
                external: true,
                icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>'
            },
            {
                label: 'Phone',
                value: c.phone,
                link: c.phone ? `tel:${c.phone.replace(/[^0-9+]/g, '')}` : '',
                icon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>'
            }
        ];

        // Skip any entry with no value in profile.json (e.g. an unset phone number).
        configs.filter(item => item.value && item.link).forEach(item => {
            const card = document.createElement('a');
            card.href = item.link;
            card.className = 'contact-card';
            if (item.external) {
                card.target = '_blank';
                card.rel = 'noopener noreferrer';
            }

            card.innerHTML = `
                <div class="card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        ${item.icon}
                    </svg>
                </div>
                <div class="card-content">
                    <span class="card-label">${item.label}</span>
                    <span class="card-value"></span>
                </div>
            `;
            card.querySelector('.card-value').textContent = item.value;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading contact data:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContactCards);
} else {
    loadContactCards();
}
