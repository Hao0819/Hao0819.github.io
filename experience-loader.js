// ===========================
// Experience: timeline
// ===========================
function loadExperience() {
    try {
        const data = (window.PORTFOLIO_DATA || {}).experience;
        if (!data) {
            console.error('Experience data not found — is data/experience.js loaded before this script?');
            return;
        }

        const container = document.getElementById('timeline-container');
        if (!container) {
            console.error('Timeline container not found');
            return;
        }

        container.innerHTML = '';

        data.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item slide-in-left';
            timelineItem.style.transitionDelay = `${index * 0.12}s`;

            const marker = document.createElement('div');
            marker.className = 'timeline-marker';

            const content = document.createElement('div');
            content.className = 'timeline-content';

            const date = document.createElement('span');
            date.className = 'timeline-date';
            date.textContent = item.date;

            const title = document.createElement('h3');
            title.textContent = item.title;

            const company = document.createElement('h4');
            company.textContent = item.company;

            const desc = document.createElement('p');
            desc.textContent = item.description;

            content.append(date, title, company, desc);
            timelineItem.append(marker, content);
            container.appendChild(timelineItem);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        container.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));

    } catch (error) {
        console.error('Error loading experience data:', error);
        const container = document.getElementById('timeline-container');
        if (container) {
            container.innerHTML =
                '<p style="color: var(--color-text-muted); font-family: var(--font-mono); font-size: 0.875rem;">Experience data could not be loaded.</p>';
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadExperience);
} else {
    loadExperience();
}
