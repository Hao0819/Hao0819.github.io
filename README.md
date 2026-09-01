# Lim Jun Hao — Portfolio

A single-page portfolio site. Pure HTML, CSS and JavaScript — no framework, no build step.

Content lives in `data/`, so you can update the site without touching HTML.
The page works by **double-clicking `index.html`** — no server needed.

## Editing your content

You almost never need to open `index.html`. Edit these instead:

| File | Controls |
| --- | --- |
| `data/profile.js` | Name, typing-effect roles, hero text, spec table, About paragraphs, skill cards, contact details |
| `data/projects.js` | The project cards in the Portfolio section |
| `data/experience.js` | The Experience timeline entries |

Each file is plain data wrapped in one line of JavaScript. Keep the
`window.PORTFOLIO_DATA... =` line at the top and the `;` at the very bottom —
edit only the part in between. (They are `.js` rather than `.json` so the page
works when opened directly from your file system; browsers block `fetch()` on
`file://` URLs.)

### Adding a project

Append an object to the list in `data/projects.js`:

```json
{
  "title": "My Project",
  "repo": "my-project",
  "description": "What it does and what you built.",
  "meta": "Coursework · team project",
  "image": "assets/my-project.png",
  "github": "https://github.com/Hao0819/my-project",
  "tags": ["Java", "Spring"]
}
```

- `image` — leave as `""` and the card shows a blueprint placeholder instead of a broken image
- `github` — leave as `""` and the "View on GitHub" bar is hidden
- `meta` — optional one-line context under the title

### Typing effect

`data/profile.js` → `roles` is the list the hero cycles through. Add or remove entries freely.

## Still to fill in

- `assets/resume.pdf` — add your resume with that exact filename, or remove the Download Resume button from `index.html`
- `data/experience.js` — two entries have `"date": "—"`; replace with real months/years (e.g. `"Jun 2025 – Aug 2025"`)
- `data/profile.js` → `contact.email` is set to `junhao060103@gmail.com`; change it if you'd rather publish a different address
- `data/profile.js` → `contact.phone` is empty, so no Phone card is rendered. Add a number to show one
- `data/projects.js` — the first two projects have no repo link; add one if those are public
- Project screenshots — drop PNGs in `assets/` and point each project's `image` at them

## Preview locally

Just **double-click `index.html`**. It opens straight in your browser — no server, no build step.

If you prefer serving it over HTTP (closer to how GitHub Pages behaves), run `run.bat`
and open `http://localhost:8000`. Both work.

## Publish with GitHub Pages (free)

1. Create a GitHub repository named exactly `Hao0819.github.io`
2. Push these files:
   ```
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/Hao0819/Hao0819.github.io.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages**, set Source to the `main` branch, save
4. The site goes live at `https://Hao0819.github.io` within a few minutes

## Structure

```
.
├── index.html             # page structure
├── style.css              # design system + layout
├── script.js              # nav, typing effect, scroll animations
├── profile-loader.js      # hero, about, skills   <- data/profile.js
├── projects-loader.js     # project cards         <- data/projects.js
├── experience-loader.js   # timeline              <- data/experience.js
├── contact-loader.js      # contact rows          <- data/profile.js
├── data/
│   ├── profile.js         # your details, skills, contact
│   ├── projects.js        # project cards
│   └── experience.js      # timeline entries
├── assets/                # resume.pdf, project screenshots
└── run.bat                # local preview server
```
