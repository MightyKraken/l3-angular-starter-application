export const APP_THEME_COOKIE = 'app.theme';

export const DAISY_THEME_IDS = [
	'light',
	'dark',
	'cupcake',
	'bumblebee',
	'emerald',
	'corporate',
	'synthwave',
	'retro',
	'cyberpunk',
	'valentine',
	'halloween',
	'garden',
	'forest',
	'aqua',
	'lofi',
	'pastel',
	'fantasy',
	'wireframe',
	'black',
	'luxury',
	'dracula',
	'cmyk',
	'autumn',
	'business',
	'acid',
	'lemonade',
	'night',
	'coffee',
	'winter',
	'dim',
	'nord',
	'sunset',
	'caramellatte',
	'abyss',
	'silk'
] as const;

export type DaisyThemeId = (typeof DAISY_THEME_IDS)[number];

export interface DaisyThemeOption {
	id: DaisyThemeId;
	label: string;
}

export const DAISY_THEME_OPTIONS: ReadonlyArray<DaisyThemeOption> =
	DAISY_THEME_IDS.map((id) => ({
		id,
		label: id.charAt(0).toUpperCase() + id.slice(1)
	}));

export const DEFAULT_DAISY_THEME: DaisyThemeId = 'nord';

export function isDaisyThemeId(value: string | null): value is DaisyThemeId {
	return (
		value !== null && (DAISY_THEME_IDS as ReadonlyArray<string>).includes(value)
	);
}
