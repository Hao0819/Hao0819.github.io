// ===========================
// Projects: pinned cards + the full list, both styled like GitHub repos
// ===========================

// GitHub's own linguist colours, so the dots match what people see on GitHub.
// Add a language here and set `language` on the project in data/projects.js.
const LANGUAGE_COLORS = {
    'Dart': '#00B4AB',
    'Java': '#B07219',
    'Python': '#3572A5',
    'JavaScript': '#F1E05A',
    'TypeScript': '#3178C6',
    'Kotlin': '#A97BFF',
    'C++': '#F34B7D',
    'C': '#555555',
    'Swift': '#F05138',
    'HTML': '#E34C26',
    'CSS': '#663399',
    'Jupyter Notebook': '#DA5B0B'
};

const ICON_REPO = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5 7V1.5h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8z"></path></svg>';

function escapeHtml(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// The language dot. Returns '' when a project has no language set, so the
// internship apps with no public repo simply show nothing.
function langMarkup(project) {
    if (!project.language) return '';
    const colour = LANGUAGE_COLORS[project.language] || '';
    const style = colour ? ` style="background:${colour}"` : '';
    return `<span class="lang"><span class="lang-dot"${style}></span>${escapeHtml(project.language)}</span>`;
}

// Cards are compact, so the description is trimmed at a sentence boundary.
function shorten(text, limit) {
    const s = String(text || '');
    if (s.length <= limit) return s;
    const cut = s.slice(0, limit);
    const stop = cut.lastIndexOf('. ');
    return (stop > limit * 0.4 ? cut.slice(0, stop + 1) : cut.trimEnd() + '…');
}

function buildPin(project) {
    const card = document.createElement('div');
    card.className = 'pin';

    const name = escapeHtml(project.repo || project.title);
    const title = project.github
        ? `<a class="pin-name" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">${name}</a>`
        : `<span class="pin-name pin-name-static">${name}</span>`;

    card.innerHTML = `
        <div class="pin-top">
            ${ICON_REPO}
            ${title}
            <span class="pill">${project.github ? 'Public' : 'Private'}</span>
        </div>
        <p class="pin-desc">${escapeHtml(shorten(project.description, 150))}</p>
        <div class="pin-foot">
            ${langMarkup(project)}
            ${project.meta ? `<span>${escapeHtml(project.meta)}</span>` : ''}
        </div>
    `;
    return card;
}

function buildRepo(project) {
    const item = document.createElement('div');
    item.className = 'repo';

    const name = escapeHtml(project.repo || project.title);
    const heading = project.github
        ? `<a class="repo-name" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">${name}</a>`
        : `<span class="repo-name repo-name-static">${name}</span>`;

    const topics = (project.tags || [])
        .map(tag => `<span class="topic">${escapeHtml(String(tag).toLowerCase())}</span>`).join('');

    const shot = project.image
        ? `<div class="repo-shot">
               <img src="${escapeHtml(project.image)}" alt="Screenshot of ${escapeHtml(project.title)}" loading="lazy">
           </div>`
        : '';

    item.innerHTML = `
        <div class="repo-top">
            ${heading}
            <span class="pill">${project.github ? 'Public' : 'Private'}</span>
        </div>
        <p class="repo-desc">${escapeHtml(project.description)}</p>
        <div class="topics">${topics}</div>
        ${shot}
        <div class="repo-foot">
            ${langMarkup(project)}
            ${project.meta ? `<span>${escapeHtml(project.meta)}</span>` : ''}
        </div>
    `;
    return item;
}

function loadProjects() {
    try {
        const projects = (window.PORTFOLIO_DATA || {}).projects;
        if (!projects) {
            console.error('Projects data not found — is data/projects.js loaded before this script?');
            return;
        }

        // --- Pinned ---
        const pinGrid = document.getElementById('pin-grid');
        if (pinGrid) {
            const pinned = projects.filter(p => p.pinned);
            pinGrid.innerHTML = '';
            // Nothing flagged in the data: fall back to the first six
            (pinned.length ? pinned : projects.slice(0, 6))
                .forEach(project => pinGrid.appendChild(buildPin(project)));
        }

        // --- Full list, grouped by category ---
        const list = document.getElementById('repo-list');
        if (list) {
            list.innerHTML = '';

            const groups = [];
            projects.forEach(project => {
                const name = project.category || '';
                let group = groups.find(g => g.name === name);
                if (!group) {
                    group = { name, items: [] };
                    groups.push(group);
                }
                group.items.push(project);
            });

            groups.forEach(group => {
                if (group.name) {
                    const head = document.createElement('p');
                    head.className = 'repo-group-head';
                    head.textContent = group.name;
                    list.appendChild(head);
                }
                group.items.forEach(project => list.appendChild(buildRepo(project)));
            });
        }

        // --- Counts in the tab and section header ---
        const count = document.getElementById('tab-count-projects');
        if (count) count.textContent = projects.length;

        const note = document.getElementById('projects-note');
        if (note) {
            const withRepo = projects.filter(p => p.github).length;
            note.textContent = `${projects.length} total · ${withRepo} with a public repo`;
        }

    } catch (error) {
        console.error('Error loading projects data:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
} else {
    loadProjects();
}
