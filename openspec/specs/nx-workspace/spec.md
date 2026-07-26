## Requirements

### Requirement: Single-app Nx workspace

The repository SHALL be an Nx workspace containing exactly one application project and multiple library projects. The application SHALL remain the sole deployable product for this phase.

#### Scenario: Workspace has one app

- **WHEN** a developer lists Nx projects
- **THEN** there is one application project and one or more library projects under `libs/`

### Requirement: Libraries live under libs by scope and type

Library source that was organized under scoped typed folders SHALL live under `libs/<scope>/<type>-*/` with a public barrel entry used by path aliases.

#### Scenario: Shared UI layout library path

- **WHEN** a developer opens the layout library
- **THEN** it SHALL be located at `libs/shared/ui-layout/` (or equivalent Nx project root) with an export barrel

### Requirement: Libraries carry scope and type tags

Each library project SHALL declare Nx tags `scope:<scope>` and `type:<type>` matching its folder classifiers.

#### Scenario: Feature home tags

- **WHEN** inspecting the home feature library project configuration
- **THEN** it MUST include tags equivalent to `scope:home` and `type:feature`
