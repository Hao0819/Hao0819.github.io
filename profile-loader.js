// ===========================
// Profile: hero, system_profiler spec table, skill chips
// ===========================

function escapeHtml(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function loadProfile() {
    try {
        const profile = (window.PORTFOLIO_DATA || {}).profile;
        if (!profile) {
            console.error('Profile data not found — is data/profile.js loaded before this script?');
            return;
        }

        const setText = (sel, txt) => {
            if (!txt) return;
            const el = document.querySelector(sel);
            if (el) el.textContent = txt;
        };

        // --- Hero: the name stacks on two lines ---
        const parts = String(profile.name || '').trim().split(/\s+/);
        setText('#name-first', parts[0]);
        setText('#name-last', parts.slice(1).join(' '));

        setText('#avail', profile.availability);
        setText('#lede', (profile.bio || []).join(' '));

        // Roles for the typing effect in script.js
        window.PORTFOLIO_ROLES = (profile.roles && profile.roles.length)
            ? profile.roles
            : [profile.title].filter(Boolean);

        // --- Document metadata ---
        if (profile.name) {
            document.title = `${profile.name} — ${profile.title || 'Portfolio'}`;
            const metaAuthor = document.querySelector('meta[name="author"]');
            if (metaAuthor) metaAuthor.content = profile.name;
            setText('#copy', `© ${new Date().getFullYear()} ${profile.name}`);
        }

        // --- system_profiler spec table ---
        const spec = document.getElementById('spec');
        if (spec) {
            const rows = [
                ['Name', profile.name],
                ['Role', profile.targetRole],
                ['Education', profile.school],
                ['Location', profile.location]
            ].filter(r => r[1]);

            spec.innerHTML = rows
                .map(([k, v]) => `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`)
                .join('');
        }

        // --- Skills live inside system_profiler: a system listing what is
        //     installed is the natural place for them, so there is no separate
        //     skills section. ---
        const kit = document.getElementById('kit');
        if (kit && Array.isArray(profile.skills)) {
            kit.innerHTML = profile.skills.map(s => `
                <div class="kit-row">
                    <span class="kit-k">${escapeHtml(s.category)}</span>
                    <span class="chips">${String(s.technologies || '')
                        .split(',').map(t => t.trim()).filter(Boolean)
                        .map(t => `<span class="chip">${escapeHtml(t)}</span>`).join('')}</span>
                </div>`).join('');
        }

    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProfile);
} else {
    loadProfile();
}
