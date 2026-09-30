# Lim Jun Hao — Portfolio

Plain HTML, CSS and JavaScript. No framework, no build step. Content lives in
`data/`, so the site updates without touching HTML, and the page works by
**double-clicking `index.html`**.

## The design: one skeleton, two textures

The layout, spacing, type scale and section order are **identical** in both themes.
What changes is the *material*:

| | Light | Dark |
| --- | --- | --- |
| Surface | Graph paper `#F4F1E8` | Deep navy `#0A0F1A` |
| Borders | 2px solid ink | 1px translucent white |
| Corners | Square | 14px rounded |
| Depth | 5px hard offset shadow | Frosted glass + soft glow |

That is expressed through five texture tokens at the top of `style.css` —
`--radius`, `--bd`, `--card`, `--blur`, `--shadow`. Every rule below uses them, so
neither theme carries its own layout rules and **the two can never drift apart**.

Dark follows the system preference on its own; the toggle in the nav overrides it
and saves the choice. An inline script in `<head>` applies it before first paint,
so nothing flashes.

## Sections

Each is labelled as a piece of code, in this order:

| Label | Holds |
| --- | --- |
| `$ whoami` | Name, rotating title, two-line bio, availability, Projects + Resume |
| `system_profiler` | Name / role / education / location, then the skill groups |
| `const projects = [ … ]` | All projects, grouped, with screenshots where they exist |
| `git log --oneline --graph` | Experience, as commits with stable hashes |
| `function getInTouch() { }` | Email, GitHub, LinkedIn, phone |

There is no separate About section — the bio under the name is the introduction, and
it is deliberately two sentences. Skills sit inside `system_profiler`, since a system
listing what is installed is the natural place for them.

## Editing your content

You almost never need to open `index.html`. Edit these instead:

| File | Controls |
| --- | --- |
| `data/profile.js` | Name, handle, rotating titles, bio, availability, the spec table, skill groups, contact details |
| `data/projects.js` | Every project |
| `data/experience.js` | The git-log entries |

Each file is plain data wrapped in one line of JavaScript. Keep the
`window.PORTFOLIO_DATA... =` line at the top and the `;` at the very bottom — edit
only the part in between. (They are `.js` rather than `.json` so the page works when
opened straight from the file system; browsers block `fetch()` on `file://` URLs.)

### House style for project descriptions

**2–3 sentences, 35–55 words, active voice, only what is true.** All ten currently sit
between 36 and 50 words. Keep new ones in that band — a wall of text next to a
one-liner is what made the section look uneven before.

```js
{
  "category": "Coursework & personal builds",
  "title": "My Project",
  "repo": "my-project",
  "description": "What it does, and what you specifically built.",
  "meta": "Coursework · team project",
  "language": "Java",
  "pinned": false,
  "image": "assets/my-project.png",
  "github": "https://github.com/Hao0819/my-project",
  "tags": ["Java", "Spring"]
}
```

- `image` — leave `""` and the card shows a styled placeholder, not a gap
- `github` — leave `""` and the card is marked as a private repo
- `language` — kept for future use; add the colour to `LANGUAGE_COLORS` if you use it

### Keeping the three places in sync

The site, the [GitHub profile README](https://github.com/Hao0819/Hao0819) and the
resume should say the same things. Currently aligned:

- **"Software engineering student at TARUMT"** — same wording in both
- **"Software Engineering Student" / "Mobile App Developer"** — the profile README's
  tagline is the first two entries of `roles` in `data/profile.js`
- **Skill groups** — the site's Languages and Mobile rows match the profile README's
  icon rows

Change one, change the others.

## Still to fill in

- **Screenshots.** 7 of 10 projects have none. **Music Player is your own app, so
  nothing blocks screenshotting it** — the highest-value thing left here
- The four internship projects are marked private because their `github` is empty.
  Three exist as public repos on your account (`EBQControl_Wifi`, `BLE_ChangeOver_RN`,
  `MeterImageUploader`) — add the links if you want them shown
- Internship entries name the employer and product names. Check these are cleared for
  public publication before an interview

## Preview locally

**Double-click `index.html`.** Or run `run.bat` to serve at `http://localhost:8000`,
which is closer to how GitHub Pages behaves.

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
├── style.css              # theme tokens + all layout
├── script.js              # theme toggle, typing, reveals, nav
├── profile-loader.js      # hero + system_profiler   <- data/profile.js
├── projects-loader.js     # project cards            <- data/projects.js
├── experience-loader.js   # git log                  <- data/experience.js
├── contact-loader.js      # getInTouch rows          <- data/profile.js
├── data/
│   ├── profile.js
│   ├── projects.js
│   └── experience.js
├── assets/                # resume PDF, screenshots
└── run.bat                # local preview server
```
