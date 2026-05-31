export const APP_THEME_COOKIE = 'app.theme';

export const DAISY_THEME_IDS = {
	light: 'light',
	dark: 'dark',
	cupcake: 'cupcake',
	bumblebee: 'bumblebee',
	emerald: 'emerald',
	corporate: 'corporate',
	synthwave: 'synthwave',
	retro: 'retro',
	cyberpunk: 'cyberpunk',
	valentine: 'valentine',
	halloween: 'halloween',
	garden: 'garden',
	forest: 'forest',
	aqua: 'aqua',
	lofi: 'lofi',
	pastel: 'pastel',
	fantasy: 'fantasy',
	wireframe: 'wireframe',
	black: 'black',
	luxury: 'luxury',
	dracula: 'dracula',
	cmyk: 'cmyk',
	autumn: 'autumn',
	business: 'business',
	acid: 'acid',
	lemonade: 'lemonade',
	night: 'night',
	coffee: 'coffee',
	winter: 'winter',
	dim: 'dim',
	nord: 'nord',
	sunset: 'sunset',
	caramellatte: 'caramellatte',
	abyss: 'abyss',
	silk: 'silk'
} as const;

export type DaisyThemeId =
	(typeof DAISY_THEME_IDS)[keyof typeof DAISY_THEME_IDS];

export interface DaisyThemeOption {
	id: DaisyThemeId;
	label: string;
}

export const DAISY_THEME_OPTIONS: ReadonlyArray<DaisyThemeOption> =
	Object.values(DAISY_THEME_IDS).map((id) => ({
		id,
		label: id.charAt(0).toUpperCase() + id.slice(1)
	}));

export const DEFAULT_DAISY_THEME: DaisyThemeId = DAISY_THEME_IDS.nord;

export function isDaisyThemeId(value: string | null): value is DaisyThemeId {
	return (
		value !== null &&
		Object.values(DAISY_THEME_IDS).includes(value as DaisyThemeId)
	);
}
