## Context

Libs exist under `libs/` with `scope:*` and `type:*` tags. Need PDF-style boundary lint.

## Goals / Non-Goals

**Goals:** Illegal cross-type/cross-scope imports fail ESLint. CI/`npm run lint` catches them.

**Non-Goals:** Generators, multi-app constraints beyond current scopes.

## Decisions

1. **`@nx/enforce-module-boundaries`** — Official Nx rule from the PDF.
2. **Type constraints** (all as `error`):
   - `type:util` → only `type:util`
   - `type:ui` → `type:ui`, `type:util`
   - `type:data-access` → `type:data-access`, `type:util`
   - `type:feature` → `type:feature`, `type:ui`, `type:data-access`, `type:util`
3. **Scope constraints**:
   - `scope:shared` → only `scope:shared`
   - each domain scope (`home`, `settings`, `playground`, `page-not-found`) → own scope + `scope:shared`
4. **App tags** — Tag app `type:app,scope:app` and allow it to depend on all feature/shared tags (or use `*` for app only).
5. **Remove wildcard `*` → `*`** — Force explicit constraints.
6. **Broad `@shared` barrel** — May cause false dependency edges. Prefer granular imports inside libs; keep `@shared` for app shell if needed. If lint complains about barrel pulling wrong deps, switch app to granular aliases too.

## Risks / Trade-offs

- [Existing `@shared` imports in features] → Granularize if boundaries fail.
- [Compat `@core`] → Point only at util; or remove.

## Migration Plan

1. Install plugin; configure eslint.
2. Tag app.
3. Run lint; fix violations.
4. Verify build/test still green.
