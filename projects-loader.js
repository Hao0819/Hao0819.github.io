// ===========================
// Work: grouped project rows that expand
// Each project is a native <details>, so expanding works with the keyboard
// and on touch without any JavaScript of its own.
// ===========================

function escapeHtml(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// The row header shows a short stack summary rather than every tag.
function stackSummary(project) {
    return (project.tags || []).slice(0, 2).join(' · ');
}

function buildProject(project, index) {
    const details = document.createElement('details');
    details.className = 'project';

    const tags = (project.tags || [])
        .map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('');

    const meta = project.meta
        ? `<p class="project-meta">${escapeHtml(project.meta)}</p>`
        : '';

    const link = project.github
        ? `<a class="project-link" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">
               View on GitHub
               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                 <path d="M7 17L17 7M9 7h8v8"></path>
               </svg>
           </a>`
        : '';

    const shot = project.image
        ? `<div class="project-shot">
               <img src="${escapeHtml(project.image)}" alt="Screenshot of ${escapeHtml(project.title)}" loading="lazy">
           </div>`
        : '';

    details.innerHTML = `
        <summary>
            <span class="project-name">${escapeHtml(project.title)}</span>
            <span class="project-stack">${escapeHtml(stackSummary(project))}</span>
            <svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
        </summary>
        <div class="project-body${project.image ? ' has-image' : ''}">
            <div class="project-detail">
                ${meta}
                <p class="project-desc">${escapeHtml(project.description)}</p>
                <div class="tags">${tags}</div>
                ${link}
            </div>
            ${shot}
        </div>
    `;

    // The first project of each group starts open, so the section never reads
    // as an unexplained list of titles.
    if (index === 0) details.open = true;

    return details;
}

function loadProjects() {
    try {
        const projects = (window.PORTFOLIO_DATA || {}).projects;
        if (!projects) {
            console.error('Projects data not found — is data/projects.js loaded before this script?');
            return;
        }

        const container = document.querySelector('.work-groups');
        if (!container) {
            console.error('Work container not found');
            return;
        }

        container.innerHTML = '';

        // Group by `category`, keeping the order each category first appears in.
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
            const section = document.createElement('div');
            section.className = 'work-group';

            if (group.name) {
                const head = document.createElement('div');
                head.className = 'group-head';

                const label = document.createElement('span');
                label.className = 'group-name';
                label.textContent = group.name;

                const count = document.createElement('span');
                count.className = 'group-count';
                count.textContent = group.items.length + (group.items.length === 1 ? ' project' : ' projects');

                head.append(label, count);
                section.appendChild(head);
            }

            group.items.forEach((project, i) => section.appendChild(buildProject(project, i)));
            container.appendChild(section);
        });

    } catch (error) {
        console.error('Error loading projects data:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
} else {
    loadProjects();
}
