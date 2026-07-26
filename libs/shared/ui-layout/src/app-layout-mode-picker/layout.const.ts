export const APP_LAYOUT_MODE_COOKIE = 'app.layoutMode';

export const APP_LAYOUT_MODES = {
	sidebarLeft: 'sidebar-left',
	toolbarTop: 'toolbar-top'
} as const;
export type AppLayoutMode =
	(typeof APP_LAYOUT_MODES)[keyof typeof APP_LAYOUT_MODES];

export const DEFAULT_LAYOUT_MODE: AppLayoutMode = APP_LAYOUT_MODES.sidebarLeft;

export interface AppLayoutModeOption {
	id: AppLayoutMode;
	label: string;
	description: string;
}

export const APP_LAYOUT_MODE_OPTIONS: ReadonlyArray<AppLayoutModeOption> = [
	{
		id: APP_LAYOUT_MODES.toolbarTop,
		label: 'Top toolbar',
		description: 'Toolbar across the top, navigation on the left below'
	},
	{
		id: APP_LAYOUT_MODES.sidebarLeft,
		label: 'Side navigation',
		description: 'Navigation on the left, toolbar above the main content'
	}
];

export function isAppLayoutMode(value: string | null): value is AppLayoutMode {
	return (
		value !== null &&
		Object.values(APP_LAYOUT_MODES).includes(value as AppLayoutMode)
	);
}
