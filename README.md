# Profile Website + CI/CD Pipeline

A personal single-page profile website built with pure HTML, CSS3, and Vanilla JavaScript. Inspired by clean, scroll-based personal brand sites. Includes a full GitHub Actions CI/CD pipeline for validation, deployment, quality checks, performance auditing, and notifications.

## Features

- **Single-page design** with smooth scrolling navigation
- **Six sections**: Hero, Professional Journey (timeline), Personal Likings (cards), Family (flip cards), Hobbies (gallery + lightbox), Footer
- **Responsive** — works on mobile, tablet, and desktop
- **Theme system** — entire visual identity controlled by one CSS variables file (`css/theme.css`)
- **Vanilla JS interactions**: hamburger menu, scroll-triggered animations (IntersectionObserver), show-more toggles, lightbox modal, back-to-top button
- **Semantic HTML5** throughout
- **Full CI/CD** with 5 GitHub Actions workflows

## Tech Stack (Strict Constraints)

| Layer       | Allowed                                      | Not Allowed                  |
|-------------|----------------------------------------------|------------------------------|
| Markup      | HTML5 (semantic tags)                        | React, Angular, Vue, etc.    |
| Styling     | CSS3 (Flexbox, Grid, Variables, Animations)  | Bootstrap, Tailwind, SASS    |
| Scripting   | Vanilla JavaScript (ES6+)                    | jQuery, TypeScript, npm pkgs |
| Deployment  | GitHub Pages via GitHub Actions              | Netlify, Vercel, FTP         |
| Version Ctrl| Git + GitHub                                 | Other platforms              |

No frameworks. No libraries. No package managers for the site itself.

## Folder Structure

```
profile-website/
├── index.html                 # Single-page application
├── css/
│   ├── theme.css              # CSS Variables ONLY (the theme file)
│   └── style.css              # All layout and component styles
├── js/
│   └── main.js                # Navigation, scroll effects, lightbox, interactions
├── images/                    # (placeholders used; add real images as needed)
│   ├── hero/
│   ├── journey/
│   ├── interests/
│   ├── family/
│   └── hobbies/
├── .github/
│   └── workflows/
│       ├── validate.yml       # Workflow 1: HTML & CSS linting
│       ├── deploy.yml         # Workflow 2: Auto-deploy to GitHub Pages
│       ├── pr-checks.yml      # Workflow 3: PR quality gates
│       ├── lighthouse.yml     # Workflow 4: Performance audit
│       └── notify.yml         # Workflow 5: Deployment notifications
├── .htmlhintrc                # HTMLHint configuration
├── .gitignore
└── README.md
```

## Theming System — Theme Change via Git

The core concept: **the entire site’s visual identity lives in ONE file** — `css/theme.css`.

Every color, font, spacing value, and border-radius is a CSS variable defined in `:root`.  
`style.css` and all HTML elements reference these variables. Changing `theme.css` updates the entire site. No HTML or `style.css` edits are needed.

### Light Theme (Default)

See `css/theme.css`.

### Theme Switch Exercise

1. Create a new branch: `theme/dark-mode`
2. Change **only** the values inside `:root` in `css/theme.css`
3. Commit → push → open a Pull Request
4. Merge to `main` → GitHub Actions deploys the updated theme automatically

Example dark theme variables (replace the `:root` block):

```css
:root {
  --color-primary: #1abc9c;
  --color-primary-light: #48d1cc;
  --color-primary-dark: #16a085;

  --color-bg: #1a1a2e;
  --color-bg-secondary: #16213e;
  --color-bg-card: #0f3460;

  --color-text: #e0e0e0;
  --color-text-secondary: #a0a0b0;
  --color-text-inverse: #1a1a2e;

  --color-accent: #e94560;
  --color-border: #2a2a4a;
  --color-shadow: rgba(0, 0, 0, 0.4);

  /* keep the rest of the variables the same */
  --font-primary: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --font-heading: Georgia, serif;
  --font-size-base: 16px;
  --font-size-h1: 2.5rem;
  --font-size-h2: 2rem;
  --font-size-h3: 1.5rem;

  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;

  --max-width: 1200px;
  --border-radius: 8px;
  --transition-speed: 0.3s;
}
```

You can create additional themes (e.g. `theme/warm-tones`) the same way.

## CI/CD Pipeline — GitHub Actions

Five workflows teach real-world automation:

| Workflow              | File              | Triggers                          | Purpose                                      |
|-----------------------|-------------------|-----------------------------------|----------------------------------------------|
| HTML & CSS Validation | `validate.yml`    | push, pull_request                | HTMLHint + CSSLint; broken code blocks merge |
| Auto-Deploy           | `deploy.yml`      | push to `main`                    | Deploys site to GitHub Pages                 |
| PR Quality Checks     | `pr-checks.yml`   | pull_request to `main`            | Title tags, image alts, no console.log       |
| Lighthouse Audit      | `lighthouse.yml`  | after deploy + weekly schedule    | Performance report as downloadable artifact  |
| Notifications         | `notify.yml`      | after deploy workflow completes   | Success/failure messages (optional Slack)    |

### Setting up GitHub Pages

1. Go to repo **Settings → Pages**
2. Source: **GitHub Actions**
3. After first successful deploy, the site will be live at the URL shown in the Actions log.

### Branch Protection (Recommended)

1. Settings → Branches → Add rule for `main`
2. Require a pull request before merging
3. Require status checks to pass (select the PR checks jobs)
4. Optionally require at least 1 review

### Slack Notifications (Optional)

1. Create a Slack Incoming Webhook
2. Add secret `SLACK_WEBHOOK_URL` under Settings → Secrets and variables → Actions
3. Uncomment the `curl` lines in `notify.yml`

## Git Branching Strategy

```
main          ← Production (auto-deploys)
└── develop   ← Integration branch
    ├── feature/hero-section
    ├── feature/journey-timeline
    ├── feature/interests-cards
    ├── feature/family-section
    ├── feature/hobbies-gallery
    ├── theme/dark-mode
    ├── theme/warm-tones
    ├── ci/setup-validation
    ├── ci/setup-deploy
    ├── ci/setup-pr-checks
    ├── ci/setup-lighthouse
    └── ci/setup-notifications
```

**Rules**
- No direct commits to `main`
- Feature / theme / ci branches merge to `develop` via PR
- `develop` merges to `main` when a phase is complete
- At least 1 peer review before merging

## Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# Open index.html in a browser (or use a simple local server)
python -m http.server 8000
# then visit http://localhost:8000
```

No build step. No `npm install`. Just open the file or serve the folder.

## Customization Checklist

- [ ] Replace “Alex Rivera” and personal content with your own details
- [ ] Update the Professional Journey milestones
- [ ] Fill in real interests, family descriptions, and hobbies
- [ ] Add real photos under `images/` and update the HTML (remember `alt` attributes)
- [ ] Create a `theme/dark-mode` branch and change only `theme.css`
- [ ] Push to GitHub and watch the Actions tab light up green
- [ ] Enable branch protection and required status checks
- [ ] (Optional) Add Slack webhook secret for deployment notifications

## Evaluation Mapping

| Area                     | Weight | Covered by this solution                                      |
|--------------------------|--------|---------------------------------------------------------------|
| Website Content & Design | 25%    | All 6 sections, personal sample content, semantic HTML        |
| HTML / CSS / JS Quality  | 20%    | CSS variables throughout, no inline styles, vanilla JS, responsive |
| Theming System           | 15%    | `theme.css` owns all variables; theme switch via one file     |
| CI/CD Pipeline           | 25%    | All 5 workflows present and functional                        |
| Git Practices            | 15%    | Documented branching model, PR-friendly structure             |

## License

This project is provided as a learning template for the Profile Website + CI/CD assignment.
Feel free to fork, personalize, and make it your own.
