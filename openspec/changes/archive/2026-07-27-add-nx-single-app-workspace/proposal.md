## Why

Milestone 1 established scope + type-prefixed folders under `src/app`. Milestone 2 introduces Nx so those folders become real workspace libraries under `libs/`, enabling project graph, tags, and later boundary lint—while keeping a single application.

## What Changes

- Initialize Nx on the existing Angular workspace (integrated layout: `apps/` + `libs/`).
- Move scoped typed folders from the app into `libs/<scope>/<type>-*` as Nx libraries with public barrels.
- Leave a thin app shell in `apps/...` (bootstrap, routes, config).
- Tag each lib with `scope:*` and `type:*` on create for milestone 3.
- Update path aliases and npm scripts to use Nx where appropriate.
- **BREAKING**: import paths and workspace layout change (`src/app/...` libs → `libs/...`).

## Non-goals

- Multi-app products, publishable libs, microfrontends.
- Module-boundary ESLint rules (milestone 3).
- Empty `data-access-*` libraries.

## Capabilities

### New Capabilities

- `nx-workspace`: Single-app Nx workspace with `apps/` + tagged `libs/` matching scoped typed folders.

### Modified Capabilities

- `scoped-typed-folders`: Physical location moves from `src/app/<scope>/...` to `libs/<scope>/...`; conventions otherwise unchanged.

## Impact

- Workspace root config (`nx.json`, `project.json`, path maps), CI/scripts, all library imports.
- Milestone: **2** of the Nx-style structure roadmap.
