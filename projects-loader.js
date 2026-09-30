// ===========================
// Projects: grouped cards
// ===========================

function esc(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildCard(project) {
    const shot = project.image
        ? `<img src="${esc(project.image)}" alt="Screenshot of ${esc(project.title)}" loading="lazy">`
        : `<div class="ph"><span>${esc(project.repo || project.title)}</span></div>`;

    const link = project.github
        ? `<a class="clink" href="${esc(project.github)}" target="_blank" rel="noopener noreferrer">View source &rarr;</a>`
        : `<span class="priv">Private repo</span>`;

    return `<article class="card rv">
        <div class="shot">${shot}</div>
        <div class="cbody">
            <h3>${esc(project.title)}</h3>
            ${project.meta ? `<p class="cmeta">${esc(project.meta)}</p>` : ''}
            <p>${esc(project.description)}</p>
            <div class="tags">${(project.tags || [])
                .map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
            ${link}
        </div>
    </article>`;
}

function loadProjects() {
    try {
        const projects = (window.PORTFOLIO_DATA || {}).projects;
        if (!projects) {
            console.error('Projects data not found — is data/projects.js loaded before this script?');
            return;
        }

        const host = document.getElementById('projwrap');
        if (!host) {
            console.error('Projects container not found');
            return;
        }

        // Group by `category`, keeping the order each category first appears in
        const groups = [];
        projects.forEach(project => {
            const name = project.category || '';
            let group = groups.find(g => g.name === name);
            if (!group) { group = { name, items: [] }; groups.push(group); }
            group.items.push(project);
        });

        host.innerHTML = groups.map(g => `
            ${g.name ? `<p class="grp rv">${esc(g.name)} <span class="grp-n">(${g.items.length})</span></p>` : ''}
            <div class="cards">${g.items.map(buildCard).join('')}</div>
        `).join('');

    } catch (error) {
        console.error('Error loading projects data:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
} else {
    loadProjects();
}
