# AI Agent Instructions for L3 Angular Starter Application

## Project Overview

This is an Angular 20 starter application with comprehensive tooling setup for code quality, testing, and containerization. The project uses angular material components with Aura theme, and follows a modular architecture.

## Key Architecture Patterns

### Application Structure

- Feature modules are organized in dedicated directories under `src/app/`
- Shared components and services are in `app-shared/`
- Environment-specific configurations in `environments/` (local, dev, prod)
- Global styling in `styles/` with modular SCSS files for colors, animations, and variables

## Development Workflow

### Essential Commands

```bash
npm install          # Install dependencies
npm run start       # Start dev server (port 4200)
npm run test        # Run Jest tests
npm run lint        # Run ESLint, Stylelint, HTMLHint
npm run lint:fix    # Auto-fix linting issues
npm run prettier    # Format code
```

### Docker Operations

```bash
npm run docker-build  # Build container image
npm run docker-run    # Run container (port 80)
npm run docker-stop   # Stop container
```

### Code Quality Automation

- Husky pre-commit hooks run prettier and linting
- Commitlint enforces conventional commit messages
- Jest configured for unit testing (`jest.config.ts`)

## Common Patterns

### Component Creation

1. Create new feature directory under `src/app/`
2. Include component files: `.ts`, `.html`, `.scss`, `.spec.ts`
3. Add routes in corresponding feature routing module
4.

### Environment Configuration

- Add new variables to appropriate environment file in `src/environments/`
- Access via environment imports in components/services
- Proxy configuration in `src/proxy.conf.json`

### Coding Conventions

- Implement functions with return types and always define types for parameters
- Use `const` and `let` instead of `var`
- Use arrow functions for callbacks
- For file naming use kebab-case for files and directories
- Use PascalCase for component class names
- Use camelCase for variables and method names
- Use single quotes for strings
- Use TakeUntilDestroy pattern for unsubscribing from Observables
- Always unsubscribe from Observables in components/services
- Use async pipe in templates for Observables when possible
- Use @if and @for in templates instead of ngIf/ngFor for better performance
- Use `trackBy` in ngFor loops to optimize rendering
- Ignore linting and formatting errors while code generation with copilot

### Testing Guidelines

- Use `toBeFalse` or `toBeTrue` for boolean assertions
- Use `toEqual` for object comparisons
- Use `toContain` for array checks
- Use `toHaveBeenCalled` for mocking functions
- Use `toHaveBeenCalledWith` to check function calls with specific arguments
- Use `beforeEach` for setup and `afterEach` for cleanup in tests
