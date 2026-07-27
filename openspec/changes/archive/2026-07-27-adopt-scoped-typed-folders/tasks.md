## 1. Shared UI libs

- [x] 1.1 Move `shared/layout` → `shared/ui-layout` and add `index.ts` barrel
- [x] 1.2 Move `shared/app-theme` → `shared/ui-theme` and add `index.ts` barrel
- [x] 1.3 Move `shared/app-icon` → `shared/ui-icon` and add `index.ts` barrel
- [x] 1.4 Move `shared/app-loader` → `shared/ui-loader` and add `index.ts` barrel

## 2. Shared util libs (from core)

- [x] 2.1 Move `core/cookie-storage` → `shared/util-cookie-storage` with barrel
- [x] 2.2 Move `core/break-point-detector` → `shared/util-break-point-detector` with barrel
- [x] 2.3 Move `core/app-title-strategy` → `shared/util-app-title-strategy` with barrel
- [x] 2.4 Remove empty `core/` (or leave thin re-export via `@core`)

## 3. Feature scopes

- [x] 3.1 Move `features/app-home` → `home/feature-home` with barrel
- [x] 3.2 Move `features/app-settings` → `settings/feature-settings` with barrel
- [x] 3.3 Move `features/app-playground` → `playground/feature-playground` with barrel
- [x] 3.4 Move `features/app-page-not-found` → `page-not-found/feature-page-not-found` with barrel
- [x] 3.5 Remove empty `features/` directory

## 4. Aliases and wiring

- [x] 4.1 Update `tsconfig.json` paths for granular aliases + `@shared` / `@core` compat barrels
- [x] 4.2 Rewrite `shared/index.ts` and `@core` entry to re-export new libs
- [x] 4.3 Update `app-root` routes and any remaining deep imports
- [x] 4.4 Verify: `npm run build` and `npm run test:once`
