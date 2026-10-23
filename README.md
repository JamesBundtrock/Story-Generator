# The Scenario Generator

An atmospheric, modular story scenario generator with lockable categories, individual slot rerolling, custom loadouts, and dedicated category data files.

## Live Deployment on GitHub Pages

This repository is configured with an automated GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and publishes the app to GitHub Pages on every push.

### Required 1-Time GitHub Setting:
If you haven't enabled GitHub Actions for Pages yet:
1. Open your repository on GitHub: `https://github.com/jamesbundtrock/Story-Generator`
2. Go to **Settings** → **Pages** (under the "Code and automation" section in the left sidebar).
3. Under **Build and deployment**:
   - Change **Source** from *"Deploy from a branch"* to **"GitHub Actions"**.
4. Push or re-run the workflow under the **Actions** tab.

Your site will automatically build and publish to:
`https://jamesbundtrock.github.io/Story-Generator/`

---

## Modular Category Files

Each scenario category has its own separate TypeScript file located in `src/data/categories/`:
- `world.ts` — 1. The World (Setting)
- `role.ts` — 2. Your Role (The Protagonist)
- `women.ts` — 3. My Role(s) (The Women)
- `dynamic.ts` — 4. The Dynamic / The Hook
- `taboo.ts` — 5. The Twist / The Taboo

You can add, edit, or remove lines directly in these files, or use the in-app **"Files & Options"** modal to manage and export them.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
