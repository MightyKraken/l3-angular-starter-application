## ADDED Requirements

### Requirement: Type-based dependency constraints

The workspace SHALL enforce library type dependency rules via ESLint (`@nx/enforce-module-boundaries`):

- `type:util` libraries MUST only depend on other `type:util` libraries.
- `type:ui` libraries MUST only depend on `type:ui` and `type:util` libraries.
- `type:data-access` libraries MUST only depend on `type:data-access` and `type:util` libraries.
- `type:feature` libraries MAY depend on `type:feature`, `type:ui`, `type:data-access`, and `type:util` libraries.

#### Scenario: Util cannot import feature

- **WHEN** a `type:util` library imports a symbol from a `type:feature` library
- **THEN** ESLint MUST report an `@nx/enforce-module-boundaries` error

#### Scenario: UI may import util

- **WHEN** a `type:ui` library imports from a `type:util` library via its public path alias
- **THEN** ESLint MUST allow the import

### Requirement: Scope-based dependency constraints

The workspace SHALL enforce scope dependency rules:

- `scope:shared` libraries MUST only depend on other `scope:shared` libraries.
- A domain-scoped library (`scope:home`, `scope:settings`, `scope:playground`, `scope:page-not-found`) MUST only depend on libraries with the same scope tag or `scope:shared`.

#### Scenario: Shared cannot import home

- **WHEN** a `scope:shared` library imports from `scope:home`
- **THEN** ESLint MUST report an `@nx/enforce-module-boundaries` error

### Requirement: Lint fails on boundary violations

Running the project lint command SHALL fail when module-boundary rules are violated.

#### Scenario: Lint exit code on violation

- **WHEN** an illegal cross-boundary import exists in the workspace
- **THEN** `npm run lint` (or the ESLint portion) MUST exit non-zero
