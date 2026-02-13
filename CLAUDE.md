# CLAUDE.md — CC-Studio

This file provides guidance for AI assistants working in this repository.

## Project Overview

CC-Studio is a marketing agency project hosting client landing pages. The first client site is **Mustard Digital Marketing** — a digital marketing agency specializing in websites, SEO, and digital advertising.

## Repository Structure

```
CC-Studio/
├── CLAUDE.md          # AI assistant guidance (this file)
├── index.html         # Mustard Digital Marketing landing page
├── styles.css         # All styles (responsive, mobile-first)
├── script.js          # Interactivity (nav, animations, form handling)
└── assets/
    └── images/        # Image assets (placeholder)
```

## Tech Stack

- **HTML5** — semantic markup, no framework
- **CSS3** — custom properties, grid, flexbox, media queries
- **Vanilla JavaScript** — no dependencies or build tools
- **Google Fonts** — Inter + Playfair Display

This is a static site with no build step, package manager, or server-side dependencies.

## Development Setup

1. Clone the repository
2. Open `index.html` in a browser (or use any local server, e.g. `npx serve .`)

No install commands, environment variables, or databases are needed.

## Landing Page Sections

The Mustard Digital Marketing landing page includes:

| Section | Description |
|---------|-------------|
| Navbar | Fixed, transparent-to-white on scroll, mobile hamburger menu |
| Hero | Headline, stats counter, animated graphic cards |
| Services | 3-card grid: Web Design, SEO (featured), Digital Ads |
| About | Why Mustard — features with icons, experience badge |
| Process | 4-step horizontal flow: Discovery, Strategy, Execute, Optimize |
| Portfolio | 3 project showcase cards |
| Testimonials | 3 client review cards with star ratings |
| CTA | Dark call-to-action banner |
| Contact | Info + form (name, email, service, budget, message) |
| Footer | 4-column layout with links and social |

## Code Conventions

- **CSS**: BEM-inspired class naming, CSS custom properties in `:root`, mobile breakpoints at 1024px / 768px / 480px
- **JS**: Single `DOMContentLoaded` listener, IntersectionObserver for scroll animations, no global variables
- **Colors**: Mustard brand palette (`--mustard: #D4A017`), navy accents, gray scale
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
