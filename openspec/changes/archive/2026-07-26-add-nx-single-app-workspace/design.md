## Context

After M1, code lives under `src/app` with Nx naming but is still one Angular CLI project. Need real Nx libs for graph/tags without becoming a multi-product monorepo.

## Goals / Non-Goals

**Goals:**

- Nx integrated workspace; one app; libs under `libs/<scope>/<type>-*`.
- Each lib tagged `scope:<scope>,type:<type>`.
- Build/test still green.

**Non-Goals:**

- Boundary lint rules (M3).
- Multiple apps.

## Decisions

1. **`npx nx@latest init --integrated`** — Moves app into `apps/`; enables `@nx/angular` generators.
2. **Manual/generator move of M1 folders into `libs/`** — Prefer `@nx/angular:library` with `--directory` + `--tags`, then move sources into generated lib; or create libs by hand with `project.json` if generators fight existing code.
3. **Keep existing alias names where practical** (`@shared/ui-layout` → `libs/shared/ui-layout/src/index.ts`).
4. **Remove `@core` compat** once util libs are first-class under `@shared/util-*` (or keep thin re-export one release).
5. **Tag on create** so M3 only adds ESLint config.

## Risks / Trade-offs

- [nx init interactive prompts] → Use non-interactive flags / defaults; retry if needed.
- [Path churn] → Update tsconfig paths centrally; run build/test.
- [Generator vs hand move] → Prefer generator for project.json/tags; hand-copy sources to avoid rewriting components.

## Migration Plan

1. Commit-ready tree (M1 done).
2. Run Nx init --integrated.
3. Generate/move each lib; update aliases.
4. Verify build + test.

## Deferred

- M3: `@nx/enforce-module-boundaries`.
