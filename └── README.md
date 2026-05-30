
## Architecture

- No framework, bundler, npm, or build step.
- Hash router renders view templates into `#app`.
- Route lifecycle cleanup cancels timers and animation frames.
- `localStorage` persists calculator selections and workflow node state.
- Service worker caches app shell assets for offline reload.

## Design tokens

Core HSL tokens live in `css/style.css`:

- `--bg`: dark base
- `--surface`, `--glass`: frosted panels
- `--border`: translucent separators
- `--accent`: cyan primary glow
- `--accent-2`: violet gradient
- `--accent-3`: pink gradient
- `--success`, `--danger`, `--warn`: semantic states
- `--text`, `--muted`: readable foregrounds

## Service worker

`sw.js` uses cache `ai-factory-spa-v1` and stores:

- `./`
- `./index.html`
- `./css/style.css`
- `./js/main.js`
- `./manifest.json`

Navigation fallback serves cached `index.html` when offline.

## Run

Open directly:

