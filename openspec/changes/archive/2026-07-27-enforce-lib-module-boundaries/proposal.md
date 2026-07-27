## Why

Milestone 2 created tagged Nx libraries. Without dependency constraints, util can still import feature and shared can import domain scopes. Milestone 3 adds `@nx/enforce-module-boundaries` so architecture stays enforceable in lint/CI—the main reason for adopting Nx here.

## What Changes

- Install/configure `@nx/eslint-plugin` with `enforce-module-boundaries`.
- Add depConstraints for type tags (`util`, `ui`, `data-access`, `feature`) and scope tags (`shared`, domain scopes).
- Tag the application project appropriately so app may depend on features/shared.
- Fix any existing violations (e.g. replace `@shared` barrel imports inside libs with granular allowed aliases if needed).
- Ensure `npm run lint` fails on illegal imports.

## Non-goals

- Multi-app monorepo; publishable libs; generators for scaffolding (later).

## Capabilities

### New Capabilities

- `lib-module-boundaries`: ESLint-enforced type and scope dependency rules between Nx projects.

### Modified Capabilities

- (none at requirement level beyond new enforcement)

## Impact

- `eslint.config.mjs`, `project.json` tags on the app, possibly import cleanup in libs that use overly broad barrels.
- Milestone: **3** of the Nx-style structure roadmap.
