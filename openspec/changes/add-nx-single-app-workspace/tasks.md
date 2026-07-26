## 1. Nx init

- [x] 1.1 Run `npx nx@latest init --integrated` (non-interactive where possible)
- [x] 1.2 Confirm `nx.json`, app under `apps/`, scripts still runnable

## 2. Create tagged libs and move sources

- [x] 2.1 Create/move shared UI libs (`ui-layout`, `ui-theme`, `ui-icon`, `ui-loader`) under `libs/shared/` with tags
- [x] 2.2 Create/move shared util libs under `libs/shared/` with tags
- [x] 2.3 Create/move feature libs (`home`, `settings`, `playground`, `page-not-found`) with tags
- [x] 2.4 Thin the app shell; remove duplicated sources from the app tree

## 3. Wiring and verify

- [x] 3.1 Update tsconfig path aliases to `libs/.../src/index.ts`
- [x] 3.2 Update routes/imports; drop obsolete `@core` if unused
- [x] 3.3 Verify: build and test via Nx/npm
