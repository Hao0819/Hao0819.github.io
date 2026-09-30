// ===========================================================================
// contact.sh — the interactive shell in the Contact section.
// Reads everything from window.PORTFOLIO_DATA, so it stays in sync with the
// rest of the page: add a project to data/projects.js and `projects` lists it.
// ===========================================================================

(function () {
    const output = document.getElementById('shell-output');
    const form = document.getElementById('shell-form');
    const input = document.getElementById('shell-input');
    const clearBtn = document.getElementById('shell-clear');
    if (!output || !form || !input) return;

    const data = () => window.PORTFOLIO_DATA || {};
    const history = [];
    let historyIndex = 0;

    // --- output helpers ----------------------------------------------------

    function line(text, cls) {
        const el = document.createElement('div');
        el.className = 'shell-line ' + (cls || 'out');
        el.textContent = text;
        output.appendChild(el);
        return el;
    }

    function blank() { line(' ', 'out'); }

    function linkLine(label, href, external) {
        const el = document.createElement('div');
        el.className = 'shell-line out';
        el.appendChild(document.createTextNode(label + ' '));

        const a = document.createElement('a');
        a.href = href;
        a.textContent = href.replace(/^mailto:|^tel:|^https?:\/\//, '');
        if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        el.appendChild(a);

        output.appendChild(el);
    }

    function echo(cmd) {
        const el = document.createElement('div');
        el.className = 'shell-line echo';

        const ps1 = document.createElement('span');
        ps1.style.color = 'var(--green)';
        ps1.style.fontWeight = '600';
        const handle = ((data().profile || {}).contact || {}).github;
        ps1.textContent = `visitor@${(handle || 'hao0819').toLowerCase()}:~$ `;

        el.appendChild(ps1);
        el.appendChild(document.createTextNode(cmd));
        output.appendChild(el);
    }

    function scrollToEnd() { output.scrollTop = output.scrollHeight; }

    // --- commands ----------------------------------------------------------

    const commands = {
        help() {
            line('Available commands:', 'head');
            const rows = [
                ['whoami', 'who you are talking to'],
                ['about', 'the long version'],
                ['skills', 'languages, frameworks, tools'],
                ['projects', 'list every project on this page'],
                ['history', 'education and work, newest first'],
                ['contact', 'every way to reach me'],
                ['email', 'open a draft email'],
                ['resume', 'download the PDF'],
                ['github', 'open my GitHub profile'],
                ['linkedin', 'open my LinkedIn'],
                ['hire', 'the short pitch'],
                ['date', 'current date and time'],
                ['clear', 'clear this screen']
            ];
            rows.forEach(([cmd, desc]) => line(`  ${cmd.padEnd(12)}${desc}`, 'dim'));
        },

        whoami() {
            const p = data().profile || {};
            line(p.name || 'Lim Jun Hao', 'ok');
            if (p.title) line(p.title);
            if (p.status) line(p.status, 'dim');
        },

        about() {
            const about = (data().profile || {}).about || {};
            ['intro', 'interests', 'goal'].forEach(key => {
                if (!about[key]) return;
                line(about[key]);
                blank();
            });
        },

        skills() {
            const skills = (data().profile || {}).skills || [];
            if (!skills.length) return line('no skills recorded', 'dim');
            skills.forEach(s => {
                line(s.category, 'head');
                line('  ' + s.technologies);
            });
        },

        projects() {
            const projects = data().projects || [];
            if (!projects.length) return line('no projects recorded', 'dim');

            let currentGroup = null;
            projects.forEach(p => {
                if (p.category && p.category !== currentGroup) {
                    currentGroup = p.category;
                    line(currentGroup, 'head');
                }
                line(`  ${p.title}${p.meta ? '  —  ' + p.meta : ''}`);
                if (p.github) linkLine('    ', p.github, true);
            });
            blank();
            line(`${projects.length} project(s). Scroll up for the full write-ups.`, 'dim');
        },

        history() {
            const exp = data().experience || [];
            if (!exp.length) return line('no history recorded', 'dim');
            exp.forEach(e => {
                line(`${e.date}  ${e.title}`, 'head');
                line(`  ${e.company}`, 'dim');
            });
        },

        contact() {
            const c = (data().profile || {}).contact || {};
            if (c.email) linkLine('email    ', 'mailto:' + c.email);
            if (c.phone) linkLine('phone    ', 'tel:' + c.phone.replace(/[^0-9+]/g, ''));
            if (c.github) linkLine('github   ', 'https://github.com/' + c.github, true);
            if (c.linkedin) linkLine('linkedin ', 'https://www.linkedin.com/in/' + c.linkedin + '/', true);
        },

        email() {
            const c = (data().profile || {}).contact || {};
            if (!c.email) return line('no email on file', 'err');
            line('opening mail client…', 'ok');
            window.location.href = 'mailto:' + c.email;
        },

        resume() {
            line('downloading resume…', 'ok');
            const a = document.createElement('a');
            a.href = 'assets/LIMJUNHAO_resume.pdf';
            a.download = 'Lim_Jun_Hao_Resume.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        },

        github() {
            const c = (data().profile || {}).contact || {};
            if (!c.github) return line('no github on file', 'err');
            line('opening github.com/' + c.github + ' …', 'ok');
            window.open('https://github.com/' + c.github, '_blank', 'noopener');
        },

        linkedin() {
            const c = (data().profile || {}).contact || {};
            if (!c.linkedin) return line('no linkedin on file', 'err');
            line('opening LinkedIn…', 'ok');
            window.open('https://www.linkedin.com/in/' + c.linkedin + '/', '_blank', 'noopener');
        },

        hire() {
            const p = data().profile || {};
            line('Looking for: ' + (p.targetRole || 'Backend / Software Engineer'), 'head');
            line('Available: after graduation, and for internships now.');
            line('Core stack: ' + (p.coreStack || '—'));
            blank();
            line('Type `email` to get in touch, or `resume` for the PDF.', 'dim');
        },

        date() {
            line(new Date().toString());
        },

        pwd() { line('/home/visitor'); },

        ls() { commands.projects(); },

        clear() {
            output.innerHTML = '';
            return true; // suppress the trailing blank line
        },

        sudo() {
            line('visitor is not in the sudoers file. This incident will be reported.', 'err');
        },

        exit() {
            line('There is no exit. Only more scrolling.', 'dim');
        }
    };

    const ALIASES = {
        'who': 'whoami',
        'cv': 'resume',
        'experience': 'history',
        'work': 'history',
        'cls': 'clear',
        'man': 'help',
        '?': 'help',
        'mail': 'email'
    };

    function run(raw) {
        const trimmed = raw.trim();
        if (!trimmed) return;

        echo(trimmed);

        const [word, ...args] = trimmed.split(/\s+/);
        const typed = word.toLowerCase();
        // hasOwnProperty, not `in`: otherwise `toString`, `constructor` etc.
        // resolve through Object.prototype and get called as commands.
        const has = (obj, k) => Object.prototype.hasOwnProperty.call(obj, k);
        const key = has(ALIASES, typed) ? ALIASES[typed] : typed;

        if (key === 'echo') {
            line(args.join(' '));
        } else if (has(commands, key)) {
            const suppress = commands[key](args);
            if (!suppress) blank();
        } else {
            line(`${word}: command not found. Type \`help\` for the list.`, 'err');
            blank();
        }

        scrollToEnd();
    }

    // --- wiring ------------------------------------------------------------

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = input.value;
        if (value.trim()) {
            history.push(value.trim());
            historyIndex = history.length;
        }
        input.value = '';
        run(value);
    });

    input.addEventListener('keydown', (e) => {
        // Shell history
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) input.value = history[--historyIndex];
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                input.value = history[++historyIndex];
            } else {
                historyIndex = history.length;
                input.value = '';
            }
        } else if (e.key === 'Tab') {
            // Complete the command name from the first unique match
            e.preventDefault();
            const partial = input.value.trim().toLowerCase();
            if (!partial) return;
            const names = Object.keys(commands).concat(Object.keys(ALIASES));
            const matches = names.filter(n => n.startsWith(partial));
            if (matches.length === 1) {
                input.value = matches[0];
            } else if (matches.length > 1) {
                echo(input.value);
                line(matches.join('  '), 'dim');
                blank();
                scrollToEnd();
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            output.innerHTML = '';
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            output.innerHTML = '';
            input.focus();
        });
    }

    // Clicking anywhere in the output puts the caret back in the input,
    // unless the user was selecting text or following a link.
    output.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') return;
        if (String(window.getSelection())) return;
        input.focus();
    });

    // --- greeting ----------------------------------------------------------

    function greet() {
        const p = data().profile || {};
        line((p.name || 'Lim Jun Hao') + ' — contact shell', 'ok');
        line('Type `help` for a list of commands, or `hire` for the short version.', 'dim');
        blank();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', greet);
    } else {
        greet();
    }
})();
