# wuerzburg-church-app

St. Marqos Orthodox Church website — a React + TypeScript + Vite app with
trilingual support (English, አማርኛ, Deutsch). Built with MUI v9 and React Router.

## Local development

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build (outputs to dist/)
npm run lint     # eslint
```

## Deployment (GitHub Pages)

The repo is published to GitHub Pages via the
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) workflow and is
live at **https://elezersolomon.github.io/wuerzburg-church-app/**

Every push to `master` automatically:

1. Installs dependencies (`npm ci`) with Node 22.
2. Builds the site with `vite build --base=/wuerzburg-church-app/`.
3. Uploads `dist/` as a Pages artifact and deploys it.

Config notes:

- **Base path**: all asset and data URLs are prefixed with
  `/wuerzburg-church-app/` (via the `--base` flag, mirrored in code through
  `import.meta.env.BASE_URL`).
- **Routing**: the app uses `HashRouter` (`#/news`, `#/contact`), which works on
  GitHub Pages without server-side rewrites (pages don't support SPA fallbacks).
- **Environment variables**: none required — the app is fully static; content
  is fetched from `/data/*.json` in `public/`. Add any future `VITE_*` vars to
  the workflow's `env:` block and the build.

### Optional: Render (free Blueprint)

The repo also includes a [`render.yaml`](./render.yaml) Blueprint if you ever
want to host on [Render](https://render.com) instead or in addition
(Static Site, free plan): Render dashboard → **New +** → **Blueprint** →
select this repo.
