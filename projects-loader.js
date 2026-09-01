// ===========================
// Portfolio: project cards
// ===========================

// Escape text that goes into innerHTML so a stray < in JSON can't break markup.
function escapeHtml(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Projects without a screenshot get a blueprint panel instead of a broken image.
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

            // Only show the "View on GitHub" bar when there is a repo to link to.
            const overlay = project.github
                ? `<div class="project-overlay">
                       <a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer"
                          class="project-link">View on GitHub &#8599;</a>
                   </div>`
                : '';

            const meta = project.meta
                ? `<p class="project-meta">${escapeHtml(project.meta)}</p>`
                : '';

            article.innerHTML = `
                <div class="project-image">
                    ${buildThumb(project)}
                    ${overlay}
                </div>
                <div class="project-info">
                    <h3>${escapeHtml(project.title)}</h3>
                    ${meta}
                    <p>${escapeHtml(project.description)}</p>
                    <div class="project-tags">
                        ${(project.tags || []).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                    </div>
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
