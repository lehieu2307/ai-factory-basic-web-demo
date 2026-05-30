
## Architecture

- Vanilla SPA using hash routing.
- Route map lives in `js/main.js`.
- Views render into `<main id="app">`.
- Route cleanup registry stops timers/animation frames on navigation.
- Responsive nav uses a mobile hamburger with ARIA state.
- Dashboard uses animated counters, Canvas API charting, and simulated logs.
- Calculator persists last model/token settings in `localStorage`.
- Workflow view contains SVG nodes, keyboard activation, details panel, searchable FAQ, and copy snippets.
- Contact form validates client-side only; no network requests.
- Toasts use an accessible live region.
- Service worker caches app shell assets for offline reload support.

## Design

Core tokens are defined in `css/style.css`.

- Background: deep navy HSL tones
- Surfaces: translucent glass panels
- Accents: cyan, violet, pink, emerald
- Radius: large rounded cards/buttons
- Effects: backdrop blur, glow shadows, gradient highlights
- Motion: subtle animations with `prefers-reduced-motion` fallback

## Run

Basic file preview:

