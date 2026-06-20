# SMK Teknovo Portal

Public marketing portal for SMK Teknovo — static shell in `public/` plus an immersive React/R3F experience built from `apps/immersive-portal`.

**Repository:** [github.com/SaenaAsColeAllStar/webtest](https://github.com/SaenaAsColeAllStar/webtest)

![CI](https://github.com/SaenaAsColeAllStar/webtest/actions/workflows/ci.yml/badge.svg)

## Requirements

- Node.js 22+
- npm

## Local development

```bash
npm ci               # installs root + apps/immersive-portal (npm workspaces)
npm run dev          # Vite dev server (immersive app)
npm run serve        # Static preview of merged `public/` on :8080
```

## Build

```bash
npm run build        # build immersive app, merge into public/, validate
npm run lint         # typecheck + Vite build (immersive)
```

## Deploy

Production deploy uses [Cloudflare Wrangler](https://developers.cloudflare.com/workers/wrangler/) with assets from `public/`:

```bash
npm run build
npm run deploy       # wrangler deploy (requires Cloudflare credentials locally)
```

**CI/CD:** Pushes to `main` run [`.github/workflows/ci.yml`](.github/workflows/ci.yml) and [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Configure GitHub Actions secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` for automated deploy.

**Cloudflare Git build (dashboard):** use install command `npm ci` and build command `npm run build`. Workspaces hoist `apps/immersive-portal` devDependencies (TypeScript, Vite) on a single root install — do not use a separate `npm ci --prefix apps/immersive-portal`.

In the Cloudflare dashboard, ensure the Workers/Pages project tracks the `main` branch if you use Pages Git integration alongside Wrangler.

## Teknovo AI platform

Enterprise agent workstation lives under [`.cursor/`](.cursor/) — see [`.cursor/INDEX.md`](.cursor/INDEX.md) and [`.cursor/docs/AGENTS.md`](.cursor/docs/AGENTS.md).

## Docs

- Phase roadmap: [`docs/roadmap/smk-teknovo-portal-phases.md`](docs/roadmap/smk-teknovo-portal-phases.md)
- Changelog: [`CHANGELOG.md`](CHANGELOG.md)
