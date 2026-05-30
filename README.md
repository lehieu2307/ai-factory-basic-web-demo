# AI Factory SPA Dashboard

Premium vanilla HTML/CSS/JS single page dashboard demo with dark glassmorphism, hash routing, interactive telemetry, cost estimation, workflow docs, form validation, toast notifications, and offline support.

## Features

- Hash-based SPA routing:
  - `#/home`
  - `#/dashboard`
  - `#/calculator`
  - `#/workflow`
  - `#/contact`
- Premium dark mode glassmorphism UI.
- Responsive sticky navigation with mobile hamburger menu.
- Canvas-based live throughput chart.
- Animated dashboard counters and rolling event logs.
- LLM usage cost calculator with local-storage persistence.
- Interactive SVG workflow visualizer.
- Searchable accordion FAQ/docs with copy-to-clipboard helper.
- Accessible contact form validation with visible error states.
- Toast notification system.
- Service worker offline shell caching.
- No npm, no bundler, no framework.

## Directory Structure

```text
├── css/
│   └── style.css
├── js/
│   └── main.js
├── index.html
├── manifest.json
├── sw.js
└── README.md
```

## Architecture

### `index.html`

Defines semantic shell markup:

- `<header>` with primary navigation.
- Skip link for keyboard users.
- `<main id="app">` as SPA render target.
- Toast live region.
- Footer.
- Linked stylesheet, manifest, Google Fonts, and app script.

### `js/main.js`

Contains all client-side SPA logic:

- Route table and hash router.
- View render functions.
- Dashboard counter animation and Canvas API chart.
- Calculator state, model rates, and local-storage persistence.
- Workflow SVG interactions.
- FAQ filtering and copy helper.
- Contact form validation.
- Toast notifications.
- Service worker registration.

### `css/style.css`

Contains design system and responsive layout:

- CSS custom properties.
- Glassmorphism surfaces.
- Gradients, glow borders, shadows.
- Grid and flex layouts.
- Mobile breakpoints.
- Reduced-motion safety.
- Focus-visible accessibility styles.

### `sw.js`

Caches core app shell assets:

- `./`
- `./index.html`
- `./css/style.css`
- `./js/main.js`
- `./manifest.json`

Uses cache-first reads with network fallback and offline navigation fallback to `index.html`.

### `manifest.json`

Provides installable app metadata for standalone display.

## Design Tokens

Core CSS variables live in `css/style.css`.
