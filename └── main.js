
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

