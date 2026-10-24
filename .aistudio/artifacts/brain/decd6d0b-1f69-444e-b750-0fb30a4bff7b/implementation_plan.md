# Fix for npm ERESOLVE Peer Dependency Conflict

Resolve the `npm error ERESOLVE could not resolve` failure in GitHub Actions caused by a version mismatch between `vite` and the explicit `esbuild` devDependency.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Cause of the Failure:**
> `package.json` has `"esbuild": "^0.25.0"` listed under `devDependencies`.
> However, `vite@8.3.5` requires `esbuild@"^0.27.0 || ^0.28.0"`.
> In npm v7+, peer dependency conflicts trigger strict `ERESOLVE` errors during clean CI installations unless the conflict is eliminated or `--legacy-peer-deps` is passed.

- **Solution 1 (Codebase)**: Remove `"esbuild": "^0.25.0"` from `package.json` `devDependencies`. Vite manages its own internal `esbuild` version and does not need it declared manually.
- **Solution 2 (CI Resilience)**: Update `.github/workflows/deploy.yml` to run `npm install --legacy-peer-deps`. This guarantees that future minor dependency peer mismatches will never break CI builds.

---

## 1. Overview & Core Concept

Clean CI environments like GitHub Actions install packages in a strictly isolated environment. By aligning `package.json` with Vite's bundled dependencies and configuring `--legacy-peer-deps` in the deployment workflow, `npm install` and `npm run build` will complete without errors.

---

## 2. Technical Architecture & Data Strategy

### Resolution Steps

```
Current State (Error):
  package.json -> devDependencies: "esbuild": "^0.25.0"
  vite@8.3.5   -> peerOptional: "esbuild": "^0.27.0 || ^0.28.0"
  Result       -> ERESOLVE error in npm install

Fixed State (Success):
  1. Remove explicit esbuild from package.json (Vite provides it)
  2. Run `npm install --legacy-peer-deps` in .github/workflows/deploy.yml
  Result       -> Clean installation & successful Vite production build
```

### Action Items
1. **`package.json`**: Remove the redundant `"esbuild": "^0.25.0"` line from `devDependencies`.
2. **`.github/workflows/deploy.yml`**: Update `run: npm install` to `run: npm install --legacy-peer-deps`.
3. Verify local compilation with `compile_applet`.
