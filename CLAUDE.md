# CLAUDE.md — CC-Studio

This file provides guidance for AI assistants working in this repository.

## Project Overview

CC-Studio is a marketing agency project hosting client landing pages. The first client site is **Mustard** — a digital creative agency specializing in web design, SEO, paid advertising, brand identity, and AI automation, with a Matrix-inspired cyberpunk visual identity ("We Build Digital Realities.").

## Repository Structure

```
CC-Studio/
├── CLAUDE.md          # AI assistant guidance (this file)
├── index.html         # Mustard landing page
├── styles.css         # All styles (responsive, mobile-first)
├── script.js          # Interactivity (nav, matrix rain, terminal, animations, form handling)
└── assets/
    └── images/        # favicon.svg, og-image.svg
```

## Tech Stack

- **HTML5** — semantic markup, no framework
- **CSS3** — custom properties, grid, flexbox, media queries
- **Vanilla JavaScript** — no dependencies or build tools
- **Google Fonts** — Space Grotesk (headings) + Inter (body)

This is a static site with no build step, package manager, or server-side dependencies. Full backend features described in agency briefs (auth, CRM, payments, AI backend, admin/client dashboards) are explicitly out of scope for this static site — they'd require a framework migration, hosting infra, and real API credentials, and should only be pursued as a separate, deliberately scoped effort.

## Development Setup

1. Clone the repository
2. Open `index.html` in a browser (or use any local server, e.g. `npx serve .`)

No install commands, environment variables, or databases are needed.

## Landing Page Sections

The Mustard landing page includes:

| Section | Description |
|---------|-------------|
| Navbar | Fixed, transparent-to-dark on scroll, mobile slide-in menu |
| Hero | Matrix rain canvas background, headline, stats counter, CTAs |
| Marquee | Infinite-scroll ticker of capabilities |
| Services | 6-card grid: Web Design, SEO (featured), Paid Ads, Branding, AI Automation, Analytics |
| About | Why Mustard — features with icons, terminal-style stat panel |
| Process | 4-step horizontal flow: Discovery, Strategy, Execute, Optimize |
| Portfolio | 6 project cards with category filters and metrics |
| Testimonials | 3 client review cards with star ratings |
| Pricing | 3-tier cards with monthly/yearly toggle |
| CTA | Dark call-to-action banner with grid pattern |
| Contact | Interactive terminal (typed commands) + form (name, email, service, budget, message) |
| Footer | 4-column layout with links and social |

Easter eggs: Konami code (`↑↑↓↓←→←→BA`) triggers a "secret mode" overlay; the contact terminal accepts commands like `help`, `services`, `pricing`, `whoami`.

## Code Conventions

- **CSS**: BEM-inspired class naming, CSS custom properties in `:root`, mobile breakpoints at 1024px / 768px / 480px, respects `prefers-reduced-motion`
- **JS**: Single `DOMContentLoaded` listener, IntersectionObserver for scroll reveal, no global variables
- **Colors**: Neon palette (`--neon-green: #00ff88`, `--neon-cyan: #00ffc8`, `--electric-blue: #00e5ff`, `--purple-glow: #b026ff`) on near-black backgrounds (`--void: #020202`)
- **Responsive**: Desktop-first with progressive breakpoints

## Git Workflow

- Develop on feature branches prefixed with `claude/`
- Write clear, descriptive commit messages
- Keep commits focused on a single logical change

## Things to Avoid

- Do not commit secrets, API keys, or credentials
- Do not add large binary files to the repository
- Do not make changes outside the scope of the current task
- Do not add build tools or frameworks unless explicitly requested
