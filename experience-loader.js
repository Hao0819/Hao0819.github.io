// ===========================
// Experience: a dated list
// ===========================

function loadExperience() {
    try {
        const data = (window.PORTFOLIO_DATA || {}).experience;
        if (!data) {
            console.error('Experience data not found — is data/experience.js loaded before this script?');
            return;
        }

        const list = document.getElementById('timeline');
        if (!list) {
            console.error('Timeline container not found');
            return;
        }

        list.innerHTML = '';

        data.forEach(item => {
            const entry = document.createElement('li');
            entry.className = 'entry';

            const date = document.createElement('p');
            date.className = 'entry-date';
            date.textContent = item.date;

            const body = document.createElement('div');

            const title = document.createElement('h3');
            title.className = 'entry-title';
            title.textContent = item.title;

            const org = document.createElement('p');
            org.className = 'entry-org';
            org.textContent = item.company;

            const desc = document.createElement('p');
            desc.className = 'entry-desc';
            desc.textContent = item.description;

            body.append(title, org, desc);
            entry.append(date, body);
            list.appendChild(entry);
        });

    } catch (error) {
        console.error('Error loading experience data:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadExperience);
} else {
    loadExperience();
}
