# Lim Jun Hao — Portfolio

A single-page portfolio site. Pure HTML, CSS and JavaScript — no framework, no build step.

## Before you publish

A few placeholders need your real details:

- `index.html` → `mailto:your-email@example.com` — replace with your real email (used in two places)
- `index.html` → `assets/resume.pdf` — add your resume PDF into `assets/` with that exact filename, or remove the link if you'd rather not include one
- Experience section → the three `<span class="timeline-date">—</span>` entries need real dates (e.g. "2025 – Present")
- Project cards for `pethub`, `mqtt-manbo`, and `ebqcontrol-wifi` have short placeholder descriptions — swap in a real sentence about what each one does and what you built

## Preview locally

```
cd portfolio
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Publish with GitHub Pages (free)

1. Create a new GitHub repository named exactly `Hao0819.github.io` (must match your GitHub username)
2. Push these files to it:
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Hao0819/Hao0819.github.io.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, set Source to the `main` branch, and save
4. Your site goes live at `https://Hao0819.github.io` within a few minutes

## Structure

```
portfolio/
├── index.html      # all page content
├── style.css       # design system + layout
├── script.js       # active-section nav highlight on scroll
├── assets/         # put resume.pdf and any project images here
└── README.md
```
