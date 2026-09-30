# Lim Jun Hao — Portfolio

A single-page portfolio site. Clean and typographic — no gimmicks, no framework,
no build step. Content lives in `data/`, so the site updates without touching HTML.

The page works by **double-clicking `index.html`** — no server needed.

## The design

| Piece | What it is |
| --- | --- |
| Hero | Availability pill, name, one positioning sentence, two actions, three quick facts |
| Selected work | Projects grouped by category as rows that expand — each is a native `<details>`, so it works with the keyboard and on touch without any JavaScript |
| About | Two columns: prose on the left, skills as labelled chip groups on the right |
| Experience | A dated list — date column beside title, organisation and description |
| Contact | Linked rows: email, GitHub, LinkedIn, phone |

**Themes.** Dark by default, and it follows the system preference on its own. The
toggle in the nav overrides that and saves the choice to `localStorage`; a small
inline script in `<head>` applies it before first paint so nothing flashes.

Every colour is a CSS custom property in the two token blocks at the top of
`style.css`. Nothing below those blocks contains a literal colour — retheming
means editing only those blocks. All 28 text/background pairs across both themes
are at or above WCAG AA (4.5:1).

## Editing your content

You almost never need to open `index.html`. Edit these instead:

| File | Controls |
| --- | --- |
| `data/profile.js` | Name, headline, availability, the three quick facts, About paragraphs, skill groups, contact details |
| `data/projects.js` | The project rows in Selected work |
| `data/experience.js` | The Experience entries |

Each file is plain data wrapped in one line of JavaScript. Keep the
`window.PORTFOLIO_DATA... =` line at the top and the `;` at the very bottom —
edit only the part in between. (They are `.js` rather than `.json` so the page
works when opened directly from your file system; browsers block `fetch()` on
`file://` URLs.)

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

- `category` — projects sharing a category are grouped, in first-seen order
- `tags` — the first two also form the stack summary shown on the collapsed row
- `image` — leave as `""` and the row simply has no screenshot; with one, the
  expanded body becomes two columns
- `github` — leave as `""` and the "View on GitHub" link is hidden
- `meta` — optional one-line context above the description

The first project in each group starts expanded, so the section never reads as an
unexplained list of titles.

### The hero sentence

`data/profile.js` → `headline` is the line under your name, and `availability`
fills both the pill at the top and the lead sentence in Contact.

## Still to fill in

- `data/projects.js` — 6 of 10 projects have no screenshot. **Music Player is
  your own app, so nothing blocks screenshotting it** — that is the highest-value
  thing left to do here
- `data/projects.js` — PetHub's description is still a placeholder
  ("See the repository for full details")
- Internship rows name the employer and product names — check these are cleared
  for public publication before an interview

## Preview locally

Just **double-click `index.html`**. It opens straight in your browser.

To serve it over HTTP instead (closer to how GitHub Pages behaves), run `run.bat`
and open `http://localhost:8000`.

## Publish

This repo is `Hao0819/Hao0819.github.io`, so GitHub Pages serves `main` automatically:

```
git add .
git commit -m "Describe what changed"
git push
```

The site is live at <https://hao0819.github.io> within a minute or two. GitHub Pages
sends `Cache-Control: max-age=600`, so a recent visitor may see the old version for
up to 10 minutes — hard-refresh with <kbd>Ctrl</kbd>+<kbd>F5</kbd> to skip it.

**Filenames are case-sensitive on GitHub Pages but not on Windows.** If a link works
locally and 404s live, check the capitalisation Git recorded (`git ls-files assets/`),
not what Explorer shows.

## Structure

```
.
├── index.html             # page structure
├── style.css              # theme tokens + all layout
├── script.js              # theme toggle, nav state, scroll reveals
├── profile-loader.js      # hero, facts, about, skills   <- data/profile.js
├── projects-loader.js     # project rows                 <- data/projects.js
├── experience-loader.js   # experience list              <- data/experience.js
├── contact-loader.js      # contact rows                 <- data/profile.js
├── data/
│   ├── profile.js         # your details, skills, contact
│   ├── projects.js        # project entries
│   └── experience.js      # experience entries
├── assets/                # resume PDF, project screenshots
└── run.bat                # local preview server
```
