## Why

Code today mixes `core/`, flat `features/`, and a catch-all `shared/` without Nx-style scope and type classifiers. Milestone 1 reshapes folders under `src/app` so later Nx + boundary lint map cleanly without a second mental model.

## What Changes

- Reorganize `src/app` into scope grouping folders with type-prefixed lib folders (`feature-*`, `ui-*`, `util-*`).
- Add per-lib public barrel `index.ts` files; update path aliases in `tsconfig.json`.
- Move `core/*` into `shared/util-*`; split `shared` layout/theme/icon/loader into typed folders; move feature pages into `*/feature-*`.
- Keep `app-root` as the thin shell (bootstrap, routes, config).
- **BREAKING** for local imports: relative paths and `@core` / `@shared` barrels change; update all imports.

## Non-goals

- No Nx install, no top-level `libs/`, no module-boundary ESLint rules (milestones 2–3).
- No empty `data-access-*` folders; no multi-app layout.

## Capabilities

### New Capabilities

- `scoped-typed-folders`: Conventions for scope folders, type prefixes, barrels, and path aliases under `src/app`.

### Modified Capabilities

- (none)

## Impact

- Touches nearly all `src/app/**` paths, `tsconfig.json` path maps, route imports, and tests that import moved modules.
- Milestone: **1** of the Nx-style structure roadmap.
