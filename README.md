# Lim Jun Hao — Portfolio

A single-page portfolio site styled as a **blue-phosphor CRT terminal**. Every section is
the output of a command; the Contact section is a shell you can actually type into.

Pure HTML, CSS and JavaScript — no framework, no build step. Content lives in `data/`,
so you can update the site without touching HTML. The page works by
**double-clicking `index.html`** — no server needed.

## The design

| Piece | What it is |
| --- | --- |
| Title bar + status bar | Fixed terminal chrome; the status bar tracks which "file" you're viewing |
| Boot sequence | Prints on load, above the hero |
| `$ whoami` / `$ cat about.txt` / `$ ls -la ~/projects` … | Each section is introduced by its prompt line |
| Projects | A directory listing — `-rw-r--r--  project-name.jsx` above each card |
| History | A `git log` with deterministic commit hashes derived from each entry |
| `./contact.sh` | A real interactive shell — `help`, `projects`, `hire`, `resume`, ↑/↓ history, Tab completion |
| CRT overlay | Scanlines, phosphor glow and vignette; disabled under `prefers-reduced-motion` |

### Themes

Four colour themes — **blue** (default), **green**, **amber** and **paper** (light).
Switch from the picker in the status bar, or type `theme green` in the contact shell.
The choice is saved in `localStorage` and applied before first paint, so it never flashes.

Each theme is one block of tokens in `style.css` under `html[data-theme="…"]`. To add a
fifth, copy a block, change the values, and add an `<option>` to the picker in `index.html`.
Nothing else needs touching — no colour is hardcoded anywhere else in the stylesheet.

All 84 text/background pairs (7 foregrounds × 3 surfaces × 4 themes) are at or above
WCAG AA (4.5:1).

## Editing your content

You almost never need to open `index.html`. Edit these instead:

| File | Controls |
| --- | --- |
| `data/profile.js` | Name, typing-effect roles, hero text, the `/etc/motd` block, About paragraphs, skill rows, contact details |
| `data/projects.js` | The project entries in the Projects section |
| `data/experience.js` | The History (git log) entries |

Each file is plain data wrapped in one line of JavaScript. Keep the
`window.PORTFOLIO_DATA... =` line at the top and the `;` at the very bottom —
edit only the part in between. (They are `.js` rather than `.json` so the page
works when opened directly from your file system; browsers block `fetch()` on
`file://` URLs.)

The interactive shell reads the same data, so adding a project to `data/projects.js`
also makes it show up when someone types `projects` in the terminal.

### Adding a project

Append an object to the list in `data/projects.js`:

```js
{
  "category": "Coursework & personal builds",
  "title": "My Project",
  "repo": "my-project",
  "description": "What it does and what you built.",
  "meta": "Coursework · team project",
  "image": "assets/my-project.png",
  "github": "https://github.com/Hao0819/my-project",
  "tags": ["Java", "Spring"]
}
```

- `category` — projects sharing a category are grouped under one heading, in first-seen order
- `image` — leave as `""` and the card shows a grid placeholder instead of a broken image
- `github` — leave as `""` and the `git clone` link is hidden
- `meta` — optional one-line context under the title
- `tags` — the first tag also picks the fake file extension in the card header
  (`Java → .java`, `React Native → .jsx`, `Python → .py`, `C++ → .cpp`, `Kotlin → .kt`)

### Typing effect

`data/profile.js` → `roles` is the list the hero cycles through. Add or remove entries freely.

### Terminal commands

Commands live in the `commands` object in `terminal.js`. Add one by adding a method:

```js
courses() {
    line('Data Structures, AI/ML, Software Engineering');
}
```

It is then available immediately, including in Tab completion and `help`
(add a row to the `help` table so it's discoverable).

## Still to fill in

- `data/projects.js` — the four internship projects have no screenshots; drop PNGs in
  `assets/` and point each `image` at them once you have clearance to publish them
- `data/projects.js` — PetHub's description is still a placeholder
  ("See the repository for full details")
- Internship cards name the employer and product names — check these are cleared for
  public publication before an interview

## Preview locally

Just **double-click `index.html`**. It opens straight in your browser — no server, no build step.

If you prefer serving it over HTTP (closer to how GitHub Pages behaves), run `run.bat`
and open `http://localhost:8000`. Both work.

## Publish

This repo is `Hao0819/Hao0819.github.io`, so GitHub Pages serves `main` automatically:

```
git add .
git commit -m "Describe what changed"
git push
```

The site is live at <https://hao0819.github.io> within a minute or two. GitHub Pages sends
`Cache-Control: max-age=600`, so a visitor who loaded the page recently may see the old
version for up to 10 minutes — hard-refresh with <kbd>Ctrl</kbd>+<kbd>F5</kbd> to skip it.

**Filenames are case-sensitive on GitHub Pages but not on Windows.** If a link works locally
and 404s live, check the capitalisation of the file as Git recorded it
(`git ls-files assets/`), not as Explorer shows it.

## Structure

```
.
├── index.html             # page structure — terminal chrome + section shells
├── style.css              # colour tokens, CRT overlay, all layout
├── script.js              # boot sequence, typing effect, nav, status bar
├── terminal.js            # the interactive contact.sh shell
├── profile-loader.js      # hero, about, skill rows   <- data/profile.js
├── projects-loader.js     # project entries           <- data/projects.js
├── experience-loader.js   # git-log history           <- data/experience.js
├── contact-loader.js      # contact rows              <- data/profile.js
├── data/
│   ├── profile.js         # your details, skills, contact
│   ├── projects.js        # project entries
│   └── experience.js      # history entries
├── assets/                # resume PDF, project screenshots
└── run.bat                # local preview server
```
