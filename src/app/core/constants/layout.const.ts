export const APP_LAYOUT_MODE_COOKIE = 'app.layoutMode';

export const APP_LAYOUT_MODES = ['sidebar-left', 'toolbar-top'] as const;
export type AppLayoutMode = (typeof APP_LAYOUT_MODES)[number];

export const DEFAULT_LAYOUT_MODE: AppLayoutMode = 'sidebar-left';

export interface AppLayoutModeOption {
	id: AppLayoutMode;
	label: string;
	description: string;
}

export const APP_LAYOUT_MODE_OPTIONS: ReadonlyArray<AppLayoutModeOption> = [
	{
		id: 'toolbar-top',
		label: 'Top toolbar',
		description: 'Toolbar across the top, navigation on the left below'
	},
	{
		id: 'sidebar-left',
		label: 'Side navigation',
		description: 'Navigation on the left, toolbar above the main content'
	}
];

export function isAppLayoutMode(value: string | null): value is AppLayoutMode {
	return (
		value !== null &&
		(APP_LAYOUT_MODES as ReadonlyArray<string>).includes(value)
	);
}
