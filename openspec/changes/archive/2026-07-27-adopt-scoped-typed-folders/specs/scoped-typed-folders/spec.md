## ADDED Requirements

### Requirement: Scope and type folder layout

The application source under `src/app` SHALL organize code by scope grouping folders and type-prefixed library folders (`feature-*`, `ui-*`, `data-access-*`, `util-*`). Type MUST NOT be expressed as a parent folder of the library name (e.g. `ui/layout` is forbidden; `ui-layout` is required).

#### Scenario: Shared UI layout lives under typed folder

- **WHEN** a developer locates layout shell components
- **THEN** they SHALL find them under `src/app/shared/ui-layout/` (or equivalent type-prefixed path under scope `shared`)

#### Scenario: Feature pages live under domain scope

- **WHEN** a developer locates the home page feature
- **THEN** they SHALL find it under `src/app/home/feature-home/` (not under a flat `features/` bag)

### Requirement: Public barrel per library folder

Each type-prefixed library folder under `src/app` SHALL expose a public API via an `index.ts` barrel. Code outside that folder MUST import through the barrel or a path alias that resolves to that barrel, not via deep relative paths into another library’s internals.

#### Scenario: Cross-library import uses barrel or alias

- **WHEN** `feature-settings` needs a layout component from `ui-layout`
- **THEN** the import MUST resolve through `@shared/ui-layout` (or the shared barrel) rather than a deep relative path into `ui-layout` internals

### Requirement: App shell remains thin

The `app-root` folder SHALL contain application bootstrap, root config, and route wiring only. Domain and shared library code MUST live in scoped typed folders.

#### Scenario: Routes load features from scoped folders

- **WHEN** application routes are defined in `app-root`
- **THEN** feature components MUST be imported from their scope/`feature-*` paths (or aliases), not from a legacy flat `features/` directory
