## MODIFIED Requirements

### Requirement: Scope and type folder layout

The application source SHALL organize libraries by scope grouping folders and type-prefixed library folders (`feature-*`, `ui-*`, `data-access-*`, `util-*`) under `libs/`. Type MUST NOT be expressed as a parent folder of the library name (e.g. `ui/layout` is forbidden; `ui-layout` is required). The deployable application shell MAY remain under `apps/`.

#### Scenario: Shared UI layout lives under typed folder

- **WHEN** a developer locates layout shell components
- **THEN** they SHALL find them under `libs/shared/ui-layout/` (or equivalent type-prefixed path under scope `shared`)

#### Scenario: Feature pages live under domain scope

- **WHEN** a developer locates the home page feature
- **THEN** they SHALL find it under `libs/home/feature-home/` (not under a flat `features/` bag)

### Requirement: Public barrel per library folder

Each type-prefixed library under `libs/` SHALL expose a public API via an `index.ts` barrel. Code outside that library MUST import through the barrel or a path alias that resolves to that barrel, not via deep relative paths into another library’s internals.

#### Scenario: Cross-library import uses barrel or alias

- **WHEN** `feature-settings` needs a layout component from `ui-layout`
- **THEN** the import MUST resolve through `@shared/ui-layout` (or the shared barrel) rather than a deep relative path into `ui-layout` internals

### Requirement: App shell remains thin

The application project SHALL contain application bootstrap, root config, and route wiring only. Domain and shared library code MUST live in `libs/` scoped typed folders.

#### Scenario: Routes load features from scoped folders

- **WHEN** application routes are defined in the app shell
- **THEN** feature components MUST be imported from their scope/`feature-*` library paths (or aliases)
