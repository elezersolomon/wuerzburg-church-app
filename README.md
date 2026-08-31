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

## Deployment (Render, free plan)

The repo contains a [`render.yaml`](./render.yaml) Blueprint that deploys this
app as a **Static Site** on Render's free plan ($0/month, no credit card needed).

To deploy:

1. Push the repo to GitHub (branch `master`).
2. Go to [render.com](https://render.com) → **New +** → **Blueprint**.
3. Connect GitHub and select the `elezersolomon/wuerzburg-church-app` repo.
4. Render reads `render.yaml`, provisions a static site, and deploys it.
5. Your site is live at `https://wuerzburg-church-app.onrender.com`.

Config notes:

- **Build command**: `npm ci && npm run build` — outputs to `dist/`.
- **Publish directory**: `./dist`.
- **Spa rewrites**: all routes fall back to `/index.html` so client-side
  routes (`/news`, `/contact`) work on deep links/refresh.
- **Node version**: pinned via `.nvmrc` (`22`) and `engines` in `package.json`.
- **Environment variables**: none required — the app is fully static; all
  content is fetched from `/data/*.json` in `public/`. If you later add
  env vars, list them under `envVars` in `render.yaml` or set them in the
  Render dashboard (Dashboard → your static site → Environment).
