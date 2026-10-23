# neha771.github.io

Personal portfolio: React + TypeScript + Vite.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # type-checks then builds to dist/
npm run preview   # serve the production build locally
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and publishes it via GitHub Pages (Deployments, not a branch). In this repo's Settings → Pages, the source must be set to **GitHub Actions**.

