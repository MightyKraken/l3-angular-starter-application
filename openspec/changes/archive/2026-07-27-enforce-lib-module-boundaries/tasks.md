## 1. Plugin and tags

- [x] 1.1 Ensure `@nx/eslint-plugin` is installed
- [x] 1.2 Tag the application project (`type:app`, `scope:app`)
- [x] 1.3 Confirm all libs already have `scope:*` and `type:*` tags

## 2. ESLint boundaries

- [x] 2.1 Add `@nx/enforce-module-boundaries` with type + scope depConstraints (no wildcard allow-all)
- [x] 2.2 Allow the app to depend on feature/ui/util/data-access/shared as needed
- [x] 2.3 Fix any existing violations (granular imports)

## 3. Verify

- [x] 3.1 `npm run lint` passes on clean tree
- [x] 3.2 Spot-check: temporarily illegal import fails lint (then revert) OR document via a small fixture check
- [x] 3.3 `npm run build` and `npm run test:once` still pass
