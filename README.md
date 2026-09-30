# Lim Jun Hao — Portfolio

A single-page portfolio laid out like a **GitHub profile** — sidebar with the person,
main column with pinned projects, the full project list, experience and contact.

Plain HTML, CSS and JavaScript. No framework, no build step, no web fonts. Content
lives in `data/`, so the site updates without touching HTML, and the page works by
**double-clicking `index.html`**.

## The design

| Piece | What it is |
| --- | --- |
| Top bar + tabs | GitHub's chrome: handle, theme toggle, and tabs that underline whichever section is in view |
| Sidebar | Initials avatar, name, handle, a two-line bio, "open to work" badge, resume button, meta rows, skills as chips |
| Pinned | The projects flagged `pinned: true`, as repo cards with a language dot |
| All projects | Every project, grouped by category, with description, topic pills and screenshot |
| Experience | A dated list |
| Contact | Linked rows |

There is no separate "About" section — the bio in the sidebar is the introduction,
and it is deliberately two lines.

**Themes.** Dark by default, and it follows the system preference on its own. The
toggle in the top bar overrides that and saves the choice to `localStorage`; a small
inline script in `<head>` applies it before first paint so nothing flashes.

Colours are GitHub's own Primer tokens, defined in the blocks at the top of
`style.css`. Nothing below those blocks contains a literal colour.

## Editing your content

You almost never need to open `index.html`. Edit these instead:

| File | Controls |
| --- | --- |
| `data/profile.js` | Name, handle, bio, availability, sidebar meta, skill groups, contact details |
| `data/projects.js` | Pinned cards and the project list |
| `data/experience.js` | The Experience entries |

Each file is plain data wrapped in one line of JavaScript. Keep the
`window.PORTFOLIO_DATA... =` line at the top and the `;` at the very bottom —
edit only the part in between. (They are `.js` rather than `.json` so the page works
when opened directly from your file system; browsers block `fetch()` on `file://` URLs.)

### Adding a project

```js
{
  "category": "Coursework & personal builds",
  "title": "My Project",
  "repo": "my-project",
  "description": "What it does and what you built.",
  "meta": "Coursework · team project",
  "language": "Java",
  "pinned": false,
  "image": "assets/my-project.png",
  "github": "https://github.com/Hao0819/my-project",
  "tags": ["Java", "Spring"]
}
```

- `repo` — the name shown on the card, so use the real repository name
- `pinned` — `true` puts it in the Pinned grid at the top. Keep it to about six
- `language` — drives the coloured dot. It must appear in `LANGUAGE_COLORS` in
  `projects-loader.js`; leave it `""` and no dot is shown
- `github` — leave `""` and the card shows **Private** instead of **Public**, and the
  name stops being a link
- `image` — leave `""` and no screenshot block is rendered

### The bio

`data/profile.js` → `bio` is an array; each entry becomes one line under your name.
Keep it to two or three short sentences — that is the whole point of this layout.

## Still to fill in

- **Screenshots.** 7 of 10 projects have none. **Music Player is your own app, so
  nothing blocks screenshotting it** — that is the highest-value thing left here
- `data/projects.js` — "EBQ Control Hybrid" has no `language` set, because there is no
  public repo to read it from. Set it if you know it, or leave it blank
- `data/projects.js` — PetHub's description is still a placeholder
- The four internship projects are marked **Private** because their `github` is empty.
  Three of them do exist as public repos on your account (`EBQControl_Wifi`,
  `BLE_ChangeOver_RN`, `MeterImageUploader`) — add the links if you want them shown
- Internship entries name the employer and product names. Check these are cleared for
  public publication before an interview

## Preview locally

**Double-click `index.html`.** Or run `run.bat` to serve over HTTP at
`http://localhost:8000`, which is closer to how GitHub Pages behaves.

## Publish

This repo is `Hao0819/Hao0819.github.io`, so GitHub Pages serves `main` automatically:

```
git add .
git commit -m "Describe what changed"
git push
```

Live at <https://hao0819.github.io> within a minute or two. GitHub Pages sends
`Cache-Control: max-age=600`, so a recent visitor may see the old version for up to
10 minutes — hard-refresh with <kbd>Ctrl</kbd>+<kbd>F5</kbd> to skip it.

**Filenames are case-sensitive on GitHub Pages but not on Windows.** If a link works
locally and 404s live, check the capitalisation Git recorded (`git ls-files assets/`),
not what Explorer shows.

## Structure

```
.
├── index.html             # page structure
├── style.css              # Primer colour tokens + all layout
├── script.js              # theme toggle, active tab
├── profile-loader.js      # sidebar, bio, meta, skills  <- data/profile.js
├── projects-loader.js     # pinned cards + project list <- data/projects.js
├── experience-loader.js   # experience list             <- data/experience.js
├── contact-loader.js      # contact rows                <- data/profile.js
├── data/
│   ├── profile.js         # your details, skills, contact
│   ├── projects.js        # project entries
│   └── experience.js      # experience entries
├── assets/                # resume PDF, project screenshots
└── run.bat                # local preview server
```
