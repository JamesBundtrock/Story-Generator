# GitHub Pages Automated Deployment & Asset Path Fix

Resolve the blank screen issue on `https://jamesbundtrock.github.io/Story-Generator/` by setting relative asset base paths in Vite and providing an automated GitHub Actions build workflow.

## User Review & Critical Decisions

> [!IMPORTANT]
> The blank page occurs because:
> 1. Raw source code was pushed to GitHub with `<script type="module" src="/src/main.tsx"></script>`, which web browsers cannot execute directly without building.
> 2. Vite's default base path is `/` (root), whereas your GitHub Pages site is hosted at subpath `/Story-Generator/`, causing asset 404s.

- **Confirmed Decision 1**: Pushed source code directly to GitHub repository.
- **Confirmed Decision 2**: Preferred solution is an automatic GitHub Actions workflow that installs dependencies, builds the Vite production bundle, and deploys the `dist` folder to GitHub Pages on every push.
- **Confirmed Decision 3**: Configure `base: './'` in `vite.config.ts` so all bundled JavaScript, CSS, and font assets resolve properly under `/Story-Generator/` (and any local or preview environments).

---

## 1. Overview & Core Concept

When a user accesses `https://jamesbundtrock.github.io/Story-Generator/`, GitHub Pages should serve a fully optimized, compiled production build of The Scenario Generator rather than uncompiled TypeScript files. 

This update delivers:
- **Zero-Config Automatic Deployment**: An official GitHub Actions workflow (`.github/workflows/deploy.yml`) that triggers whenever code is pushed to `main`, compiles the applet, and publishes it live to Pages.
- **Subpath Asset Resolution**: Configuring Vite's `base` setting so assets load from `./assets/...` instead of `/assets/...`, preventing 404 MIME type errors.
- **Setup Guide**: A clear 2-step setting check in GitHub (Settings → Pages → Source: "GitHub Actions") to ensure the repository accepts the workflow.

---

## 2. User Experience & Visual Design

- **End User**: Visiting `https://jamesbundtrock.github.io/Story-Generator/` immediately displays the rich dark gothic crimson interface with all 5 category cards, instant randomizer, and working lock buttons.
- **Developer / Creator**: Pushing changes to the GitHub repository automatically runs the build check and deploys the latest version in under 45 seconds without needing to run manual build commands on a local machine.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: GitHub Actions vs. Manual `dist` Commit**
  - *Chosen Approach*: Official GitHub Pages Action (`actions/deploy-pages@v4`).
  - *Why*: Keeps the Git repository clean without committing compiled binary bundles, handles Node.js caching, and runs automatic checks before publishing.
  - *Alternative Considered*: Building to `gh-pages` branch manually (cumbersome and error-prone on every update).

- **Decision 2: Relative Asset Path (`base: './'`) vs. Fixed Subpath (`base: '/Story-Generator/'`)**
  - *Chosen Approach*: `base: './'` (relative paths).
  - *Why*: Allows the applet to run seamlessly on GitHub Pages at `/Story-Generator/`, on custom domains, in preview environments, and in local development without needing hardcoded repository names.

---

## 4. Technical Architecture & Data Strategy

### System Workflow Diagram

```
┌────────────────────────────┐
│      Developer Machine     │
│   git push origin main     │
└──────────────┬─────────────┘
               │ (Trigger Push)
               ▼
┌────────────────────────────────────────────────────────┐
│            GitHub Actions CI/CD Runner                 │
│                                                        │
│  1. actions/checkout@v4                                │
│  2. actions/setup-node@v4 (Node 22)                    │
│  3. npm ci / npm install                               │
│  4. npm run build (Vite relative base output to dist/) │
│  5. actions/upload-pages-artifact@v3 (path: ./dist)    │
│  6. actions/deploy-pages@v4                            │
└──────────────┬─────────────────────────────────────────┘
               │ (Artifact Deployed)
               ▼
┌────────────────────────────────────────────────────────┐
│             GitHub Pages CDN                           │
│  https://jamesbundtrock.github.io/Story-Generator/     │
│  - Serves compiled dist/index.html                     │
│  - Assets load from ./assets/index-[hash].js           │
└────────────────────────────────────────────────────────┘
```

### Components to Update
1. **`vite.config.ts`**:
   Add `base: './'` to configuration so generated script and stylesheet links are relative.
2. **`.github/workflows/deploy.yml`**:
   Create the GitHub Actions workflow file with permissions `pages: write` and `id-token: write`.
3. **Repository Instructions**:
   Provide the single toggle needed in the GitHub Web UI (Settings → Pages → Build and deployment → Source: GitHub Actions).
