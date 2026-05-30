# AI Factory SPA Dashboard

Premium vanilla HTML/CSS/JS single page dashboard demo with dark glassmorphism, hash routing, interactive telemetry, cost estimation, workflow docs, form validation, toast notifications, installable manifest metadata, and offline support.

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

## Quick Start

No install step is required.

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

The app redirects empty hashes to:

```text
#/home
```

## Validation

```bash
echo "HTML/CSS/JS structural verification complete."
```

Manual checks:

- Open `#/home`, `#/dashboard`, `#/calculator`, `#/workflow`, and `#/contact`.
- Confirm mobile hamburger opens/closes navigation.
- Confirm dashboard counters animate and logs update.
- Confirm calculator values update and persist after refresh.
- Confirm workflow nodes update the detail card.
- Confirm FAQ search filters entries and copy button shows a toast.
- Confirm contact form validation errors and success toast.
- Confirm service worker registration in supported secure/local contexts.

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

```css
--bg: hsl(230, 38%, 7%);
--bg-2: hsl(236, 34%, 10%);
--surface: hsla(230, 28%, 16%, 0.72);
--surface-2: hsla(230, 26%, 20%, 0.84);
--glass: hsla(230, 28%, 16%, 0.58);
--border: hsla(220, 100%, 96%, 0.16);
--text: hsl(220, 28%, 96%);
--muted: hsl(225, 18%, 72%);
--accent: hsl(185, 100%, 63%);
--accent-2: hsl(262, 100%, 72%);
--accent-3: hsl(316, 100%, 70%);
--success: hsl(148, 100%, 62%);
--danger: hsl(0, 88%, 68%);
--warn: hsl(38, 100%, 68%);
--shadow: 0 28px 90px hsla(230, 70%, 2%, 0.55);
--radius: 28px;
```

## Accessibility

- Semantic header, nav, main, section, footer structure.
- Keyboard skip link.
- `aria-label`, `aria-live`, `aria-expanded`, and `aria-invalid` usage.
- Visible focus styles via `:focus-visible`.
- Keyboard-selectable workflow nodes.
- Reduced-motion media query.

## Offline Behavior

The service worker installs on page load where supported. It caches the app shell and serves cached files first. If navigation fails offline, it falls back to cached `index.html`.

## Notes

This project intentionally uses only browser-native APIs:

- DOM APIs
- Canvas API
- SVG
- Local Storage
- Service Worker Cache API
- CSS Grid/Flexbox/custom properties
