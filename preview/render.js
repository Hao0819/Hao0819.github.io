// ===========================================================================
// Shared renderer for the three style previews.
// All three pages use the same class names and element ids, so one renderer
// fills them and each page's own <style> decides how it looks.
// Data comes from ../data/*.js — the real content, not placeholders.
// ===========================================================================

window.PORTFOLIO_PREVIEW = (function () {

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const esc = (v) => String(v == null ? '' : v)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const $ = (sel) => document.querySelector(sel);

    // Deterministic 7-char hex "commit hash" from the entry text (FNV-1a),
    // so the same entry shows the same hash on every reload.
    function hash(text) {
        let h = 0x811c9dc5;
        for (let i = 0; i < text.length; i++) {
            h ^= text.charCodeAt(i);
            h = (h * 0x01000193) >>> 0;
        }
        return h.toString(16).padStart(8, '0').slice(0, 7);
    }

    const ICONS = {
        Email: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/></svg>',
        GitHub: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.24-.02-2.25-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.22.7.83.58C20.57 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z"/></svg>',
        LinkedIn: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM2.4 21.5h5.16V9.5H2.4v12zM9.5 9.5h4.95v1.64h.07c.69-1.24 2.37-2.55 4.88-2.55 5.22 0 6.18 3.1 6.18 7.13V21.5h-5.15v-5.35c0-1.28-.02-2.92-1.9-2.92-1.9 0-2.19 1.39-2.19 2.83V21.5H9.5v-12z"/></svg>',
        Phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
    };

    // ---- sections -----------------------------------------------------------

    function hero(profile) {
        const set = (sel, txt) => { const el = $(sel); if (el && txt) el.textContent = txt; };
        set('#name', profile.name);
        // Some previews stack the name on two lines instead of one
        if ($('#name-first') && $('#name-last')) {
            const parts = String(profile.name || '').trim().split(/\s+/);
            set('#name-first', parts.shift());
            set('#name-last', parts.join(' '));
        }
        set('#avail', profile.availability);
        set('#lede', (profile.bio || []).join(' '));
        set('#copy', `© ${new Date().getFullYear()} ${profile.name}`);

        // Role cycles through the bio-free list of things he actually is
        const roles = ['Mobile Developer', 'Flutter · React Native', 'Backend-bound', profile.title]
            .filter(Boolean);
        const el = $('#role');
        if (!el) return;

        if (reduced) { el.textContent = roles[0]; return; }

        let i = 0, c = 0, del = false;
        (function tick() {
            const word = roles[i % roles.length];
            c += del ? -1 : 1;
            el.textContent = word.slice(0, c);
            let wait = del ? 40 : 85;
            if (!del && c === word.length) { wait = 1900; del = true; }
            else if (del && c === 0) { del = false; i++; wait = 320; }
            setTimeout(tick, wait);
        })();
    }

    function system(profile) {
        const spec = $('#spec');
        if (spec) {
            const rows = [
                ['Name', profile.name],
                ['Role', profile.targetRole],
                ['Education', profile.school],
                ['Location', profile.location]
            ].filter(r => r[1]);
            spec.innerHTML = rows
                .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
        }

        // Skills live here rather than in a section of their own — a system
        // profile listing what is installed is the natural place for them.
        const kit = $('#kit');
        if (kit) {
            kit.innerHTML = (profile.skills || []).map(s => `
                <div class="kit-row">
                    <span class="kit-k">${esc(s.category)}</span>
                    <span class="chips">${String(s.technologies || '').split(',')
                        .map(t => t.trim()).filter(Boolean)
                        .map(t => `<span class="chip">${esc(t)}</span>`).join('')}</span>
                </div>`).join('');
        }
    }

    function projects(list) {
        const host = $('#projwrap');
        if (!host) return;

        const groups = [];
        list.forEach(p => {
            const name = p.category || '';
            let g = groups.find(x => x.name === name);
            if (!g) { g = { name, items: [] }; groups.push(g); }
            g.items.push(p);
        });

        host.innerHTML = groups.map(g => `
            ${g.name ? `<p class="grp rv">${esc(g.name)} <span class="grp-n">(${g.items.length})</span></p>` : ''}
            <div class="cards">${g.items.map(card).join('')}</div>
        `).join('');
    }

    function card(p) {
        const shot = p.image
            ? `<img src="../${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">`
            : `<div class="ph"><span>${esc(p.repo || p.title)}</span></div>`;

        const link = p.github
            ? `<a class="clink" href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">View source &rarr;</a>`
            : `<span class="priv">Private repo</span>`;

        return `<article class="card glass rv">
            <div class="shot">${shot}</div>
            <div class="cbody">
                <h3>${esc(p.title)}</h3>
                ${p.meta ? `<p class="cmeta">${esc(p.meta)}</p>` : ''}
                <p>${esc(p.description)}</p>
                <div class="tags">${(p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
                ${link}
            </div>
        </article>`;
    }

    function gitlog(entries) {
        const host = $('#log');
        if (!host) return;
        host.innerHTML = entries.map(e => `
            <div class="commit rv">
                <span class="chash">${hash(e.title + e.company)}</span><span class="cdate">${esc(e.date)}</span>
                <h3>${esc(e.title)}</h3>
                <p class="corg">${esc(e.company)}</p>
                <p>${esc(e.description)}</p>
            </div>`).join('');
    }

    function touch(profile) {
        const host = $('#touchlist');
        if (!host) return;
        const c = profile.contact || {};

        const rows = [
            { k: 'Email', v: c.email, href: c.email && 'mailto:' + c.email },
            { k: 'GitHub', v: c.github && 'github.com/' + c.github, href: c.github && 'https://github.com/' + c.github, ext: true },
            { k: 'LinkedIn', v: c.linkedin && 'linkedin.com/in/' + c.linkedin, href: c.linkedin && 'https://www.linkedin.com/in/' + c.linkedin + '/', ext: true },
            { k: 'Phone', v: c.phone, href: c.phone && 'tel:' + c.phone.replace(/[^0-9+]/g, '') }
        ].filter(r => r.v && r.href);

        host.innerHTML = rows.map(r => `
            <a class="trow" href="${esc(r.href)}"${r.ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>
                <span class="ticon">${ICONS[r.k] || ''}</span>
                <span class="ttext"><span class="tk">${esc(r.k)}</span><span class="tv">${esc(r.v)}</span></span>
            </a>`).join('');
    }

    // ---- chrome -------------------------------------------------------------

    function reveals() {
        const items = document.querySelectorAll('.rv');
        if (reduced) { items.forEach(el => el.classList.add('in')); return; }

        const io = new IntersectionObserver((es) => {
            es.forEach(e => {
                if (!e.isIntersecting) return;
                e.target.classList.add('in');
                io.unobserve(e.target);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        items.forEach((el, i) => {
            el.style.transitionDelay = Math.min(i % 8, 5) * 0.06 + 's';
            io.observe(el);
        });
    }

    function nav() {
        const bar = document.getElementById('nav');
        const links = [...document.querySelectorAll('.nav-links a')];
        const targets = links
            .map(a => ({ a, el: document.querySelector(a.getAttribute('href')) }))
            .filter(t => t.el);

        function update() {
            if (bar) bar.classList.toggle('stuck', window.scrollY > 12);
            const line = window.scrollY + 150;
            let active = targets[0];
            targets.forEach(t => { if (t.el.offsetTop <= line) active = t; });
            links.forEach(a => a.classList.toggle('on', active && a === active.a));
        }

        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        window.addEventListener('load', update);
        update();
    }

    // ---- entry --------------------------------------------------------------

    function render() {
        const data = window.PORTFOLIO_DATA || {};
        if (!data.profile || !data.projects || !data.experience) {
            console.error('Preview data missing — are ../data/*.js loaded before render.js?');
            return;
        }

        hero(data.profile);
        system(data.profile);
        projects(data.projects);
        gitlog(data.experience);
        touch(data.profile);

        // Cards and commits are injected above, so reveals must run afterwards
        reveals();
        nav();
    }

    return { render };
})();
