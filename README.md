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

### Contact form

The "Send us a Message" form submits to **Formspree** (free plan, 50
submissions/month) so messages land in your inbox.

To configure:

1. Create a form at [formspree.io](https://formspree.io) and enter the email
   address that should receive submissions.
2. In `src/pages/ContactPage.tsx`, replace the `YOUR_FORM_ID` in
   `FORMSPREE_ENDPOINT` with your form's ID (e.g. `https://formspree.io/f/abcxyz`).
3. Commit, push, and deploy (auto-triggered).

### Optional: Render (free Blueprint)

The repo also includes a [`render.yaml`](./render.yaml) Blueprint if you ever
want to host on [Render](https://render.com) instead or in addition
(Static Site, free plan): Render dashboard → **New +** → **Blueprint** →
select this repo.

## Built with AI assistance

This project was developed with the aid of AI pair-programming tools:

- **[Cline](https://github.com/cline/cline)** — an AI coding agent running inside
  the IDE, used to write, refactor, and validate code (including this website's
  pages, state management, styles, deployment pipeline, and the automated
  GitHub Pages setup) via natural-language instructions.
- **DeepSeek** — the large-language model that powered the AI agent, handling
  tasks like generating React/TypeScript/MUI components, debugging build issues,
  configuring the GitHub Actions workflow, and the Formspree integration.

The human (repo owner) directed the work, reviewed changes, and controlled
what gets committed and deployed — the AI handled the heavy lifting of
implementation, troubleshooting, and iteration.
