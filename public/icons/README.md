# Custom SVG icons

Place custom SVG files here for use with `app-icon`:

```html
<app-icon source="asset" name="brand/logo" ariaLabel="Company logo" />
```

Maps to `public/icons/brand/logo.svg` (served as `/icons/brand/logo.svg`).

## Conventions

- Use kebab-case file and folder names.
- One icon per `.svg` file.
- Optimize SVGs (remove editor metadata, prefer `currentColor` for fills/strokes).
- Keep viewBox; avoid fixed `width`/`height` when possible.
