export const APP_COLOR_SCHEME_COOKIE = 'app.colorScheme';
export const APP_PALETTE_COOKIE = 'app.palette';

export const APP_COLOR_SCHEMES = ['light', 'dark'] as const;
export type AppColorScheme = (typeof APP_COLOR_SCHEMES)[number];

export type ThemeForegroundTone = 'on-dark-bg' | 'on-light-bg';

export interface AppThemeContrast {
	toolbar: ThemeForegroundTone;
	nav: ThemeForegroundTone;
}

export const APP_PALETTE_IDS = [
	'default',
	'ocean',
	'forest',
	'violet',
	'sunset',
	'rose',
	'slate',
	'amber',
	'mint',
	'monochrome'
] as const;
export type AppPaletteId = (typeof APP_PALETTE_IDS)[number];

export interface AppPaletteOption {
	id: AppPaletteId;
	label: string;
	previewColor: string;
	contrast: Record<AppColorScheme, AppThemeContrast>;
}

export const APP_PALETTE_OPTIONS: ReadonlyArray<AppPaletteOption> = [
	{
		id: 'default',
		label: 'Default',
		previewColor: '#1976d2',
		contrast: {
			light: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' },
			dark: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' }
		}
	},
	{
		id: 'ocean',
		label: 'Ocean',
		previewColor: '#0077b6',
		contrast: {
			light: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' },
			dark: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' }
		}
	},
	{
		id: 'forest',
		label: 'Forest',
		previewColor: '#2d6a4f',
		contrast: {
			light: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' },
			dark: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' }
		}
	},
	{
		id: 'violet',
		label: 'Violet',
		previewColor: '#7b2cbf',
		contrast: {
			light: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' },
			dark: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' }
		}
	},
	{
		id: 'sunset',
		label: 'Sunset',
		previewColor: '#e85d04',
		contrast: {
			light: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' },
			dark: { toolbar: 'on-light-bg', nav: 'on-dark-bg' }
		}
	},
	{
		id: 'rose',
		label: 'Rose',
		previewColor: '#db2777',
		contrast: {
			light: { toolbar: 'on-dark-bg', nav: 'on-light-bg' },
			dark: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' }
		}
	},
	{
		id: 'slate',
		label: 'Slate',
		previewColor: '#475569',
		contrast: {
			light: { toolbar: 'on-light-bg', nav: 'on-light-bg' },
			dark: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' }
		}
	},
	{
		id: 'amber',
		label: 'Amber',
		previewColor: '#d97706',
		contrast: {
			light: { toolbar: 'on-light-bg', nav: 'on-light-bg' },
			dark: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' }
		}
	},
	{
		id: 'mint',
		label: 'Mint',
		previewColor: '#059669',
		contrast: {
			light: { toolbar: 'on-light-bg', nav: 'on-light-bg' },
			dark: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' }
		}
	},
	{
		id: 'monochrome',
		label: 'Minimal',
		previewColor: '#ffffff',
		contrast: {
			light: { toolbar: 'on-light-bg', nav: 'on-light-bg' },
			dark: { toolbar: 'on-dark-bg', nav: 'on-dark-bg' }
		}
	}
];

export const DEFAULT_COLOR_SCHEME: AppColorScheme = 'light';
export const DEFAULT_PALETTE_ID: AppPaletteId = 'default';

export function isAppColorScheme(
	value: string | null
): value is AppColorScheme {
	return value === 'light' || value === 'dark';
}

export function isAppPaletteId(value: string | null): value is AppPaletteId {
	return (
		value !== null && (APP_PALETTE_IDS as ReadonlyArray<string>).includes(value)
	);
}
