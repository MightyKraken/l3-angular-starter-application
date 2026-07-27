## Context

Single Angular 21 app with `app-root`, `core`, `features/*`, and `shared/*`. Milestone 1 adopts Nx naming under `src/app` only so milestone 2 is mostly a physical move to `libs/`.

## Goals / Non-Goals

**Goals:**

- Scope folders + type-prefixed lib folders with public barrels.
- Path aliases for cross-lib imports; app-root stays thin.

**Non-Goals:**

- Nx, top-level `libs/`, tag-based boundary lint (milestones 2–3).
- Splitting theme preference services into separate `data-access` libs unless already clear (defer).

## Decisions

1. **Stay under `src/app`** — Avoid double-move pain of inventing `libs/` before Nx.
2. **Type prefix on folder name** (`ui-layout`) not nested `ui/layout` — Matches enterprise Angular monorepo PDF.
3. **Map `core` → `shared/util-*`** — Core is shared infrastructure, not a domain scope.
4. **Keep `@shared` as a convenience re-export** of shared UI/util barrels for gradual migration; also add granular aliases (`@shared/ui-layout`, etc.). Prefer granular aliases for new code.
5. **Keep `@core` as deprecated re-export** pointing at util barrels during M1 so tests/imports break less; remove in M2 if desired.
6. **No empty `data-access-*`** — YAGNI until real API/state exists.

### Target tree

```
src/app/
  app-root/
  shared/
    ui-layout/
    ui-theme/
    ui-icon/
    ui-loader/
    util-cookie-storage/
    util-break-point-detector/
    util-app-title-strategy/
    index.ts          # re-exports shared libs (compat)
  home/feature-home/
  settings/feature-settings/
  playground/feature-playground/
  page-not-found/feature-page-not-found/
```

## Risks / Trade-offs

- [Large import churn] → Move folders with git mv; fix aliases; run build/test/lint.
- [Compat barrels hide boundaries] → Accept for M1; M3 lint will force real edges after Nx.

## Migration Plan

1. Create new folders; move files.
2. Add barrels + tsconfig paths.
3. Fix routes and imports.
4. Verify `npm run build` and `npm run test:once`.

## Open Questions

- None for M1; theme service split deferred to a later change if needed.

## Deferred to later milestones

- M2: Nx init + move to `libs/` + project tags.
- M3: `@nx/enforce-module-boundaries` rules.
