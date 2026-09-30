// ===========================
// Experience: rendered as a git log
// ===========================

// Deterministic 7-char hex "commit hash" from the entry text (FNV-1a), so the
// same entry shows the same hash on every reload.
function fakeHash(text) {
    let h = 0x811c9dc5;
    for (let i = 0; i < text.length; i++) {
        h ^= text.charCodeAt(i);
        h = (h * 0x01000193) >>> 0;
    }
    return h.toString(16).padStart(8, '0').slice(0, 7);
}

function loadExperience() {
    try {
        const data = (window.PORTFOLIO_DATA || {}).experience;
        if (!data) {
            console.error('Experience data not found — is data/experience.js loaded before this script?');
            return;
        }

        const host = document.getElementById('timeline');
        if (!host) {
            console.error('Timeline container not found');
            return;
        }

        host.innerHTML = '';

        data.forEach(item => {
            const commit = document.createElement('div');
            commit.className = 'commit rv';

            const hash = document.createElement('span');
            hash.className = 'chash';
            hash.textContent = fakeHash(item.title + item.company);

            const date = document.createElement('span');
            date.className = 'cdate';
            date.textContent = item.date;

            const title = document.createElement('h3');
            title.textContent = item.title;

            const org = document.createElement('p');
            org.className = 'corg';
            org.textContent = item.company;

            const desc = document.createElement('p');
            desc.textContent = item.description;

            commit.append(hash, date, title, org, desc);
            host.appendChild(commit);
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
