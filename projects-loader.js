// ===========================
// Portfolio: projects rendered as a directory listing
// ===========================

// Escape text that goes into innerHTML so a stray < in the data can't break markup.
function escapeHtml(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Pick a plausible source extension from the project's first tag, so the
// file-header strip reads like a real `ls` line rather than a generic label.
const EXT_BY_TAG = {
    'flutter': 'dart',
    'dart': 'dart',
    'java': 'java',
    'python': 'py',
    'c++': 'cpp',
    'kotlin': 'kt',
    'react native': 'jsx',
    'javascript': 'js',
    'typescript': 'ts',
    'mobile': 'kt',
    'cli': 'sh'
};

function extensionFor(project) {
    for (const tag of project.tags || []) {
        const ext = EXT_BY_TAG[String(tag).toLowerCase()];
        if (ext) return ext;
    }
    return 'md';
}

// Projects without a screenshot get a grid panel instead of a broken image.
function buildThumb(project) {
    if (project.image) {
        return `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy">`;
    }

    const mark = escapeHtml(project.repo || project.title);
    return `
        <div class="project-placeholder">
            <span class="ph-mark">${mark}</span>
            <span class="ph-note">no screenshot yet</span>
        </div>
    `;
}

function loadProjects() {
    try {
        const projects = (window.PORTFOLIO_DATA || {}).projects;
        if (!projects) {
            console.error('Projects data not found — is data/projects.js loaded before this script?');
            return;
        }

        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (!portfolioGrid) {
            console.error('Portfolio grid not found');
            return;
        }

        portfolioGrid.innerHTML = '';

        // Group by `category`, keeping the order each category first appears in.
        // Projects with no category fall into a single unlabelled group.
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

        const buildCard = (project) => {
            const article = document.createElement('article');
            article.className = 'project-card';

            const filename = `${project.repo || project.title}.${extensionFor(project)}`;

            const meta = project.meta
                ? `<p class="project-meta">${escapeHtml(project.meta)}</p>`
                : '';

            // Only show the repo line when there is something to link to.
            const link = project.github
                ? `<a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer"
                      class="project-link">git clone &#8599;</a>`
                : '';

            article.innerHTML = `
                <div class="project-head">
                    <span class="project-perm">-rw-r--r--</span>
                    <span class="project-file">${escapeHtml(filename)}</span>
                </div>
                <div class="project-image">
                    ${buildThumb(project)}
                </div>
                <div class="project-info">
                    <h3>${escapeHtml(project.title)}</h3>
                    ${meta}
                    <p>${escapeHtml(project.description)}</p>
                    <div class="project-tags">
                        ${(project.tags || []).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                    </div>
                    ${link}
                </div>
            `;

            return article;
        };

        groups.forEach(group => {
            if (group.name) {
                const label = document.createElement('h3');
                label.className = 'group-label';
                label.textContent = group.name;
                portfolioGrid.appendChild(label);
            }

            const grid = document.createElement('div');
            grid.className = 'project-grid';
            group.items.forEach(project => grid.appendChild(buildCard(project)));
            portfolioGrid.appendChild(grid);
        });

        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        portfolioGrid.querySelectorAll('.project-card').forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.08}s`;
            projectObserver.observe(card);
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
