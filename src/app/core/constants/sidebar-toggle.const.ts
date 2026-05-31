export const APP_SIDEBAR_TOGGLE_COOKIE = 'app.sidebarToggle';

export const SIDEBAR_TOGGLE_PREFERENCES = {
	expandedMini: 'expanded-mini',
	expandedHidden: 'expanded-hidden'
} as const;

export type SidebarTogglePreference =
	(typeof SIDEBAR_TOGGLE_PREFERENCES)[keyof typeof SIDEBAR_TOGGLE_PREFERENCES];

export const DEFAULT_SIDEBAR_TOGGLE_PREFERENCE: SidebarTogglePreference =
	SIDEBAR_TOGGLE_PREFERENCES.expandedMini;

export interface SidebarToggleOption {
	id: SidebarTogglePreference;
	label: string;
	description: string;
}

export const APP_SIDEBAR_TOGGLE_OPTIONS: ReadonlyArray<SidebarToggleOption> = [
	{
		id: SIDEBAR_TOGGLE_PREFERENCES.expandedMini,
		label: 'Expanded + mini',
		description:
			'Menu toggles full sidebar and icons-only. On small screens: mini drawer and full drawer; tap backdrop to close.'
	},
	{
		id: SIDEBAR_TOGGLE_PREFERENCES.expandedHidden,
		label: 'Expanded + hidden',
		description:
			'Menu toggles full sidebar and hidden. On small screens: closed or full drawer only.'
	}
];

export function isSidebarTogglePreference(
	value: string | null
): value is SidebarTogglePreference {
	return (
		value !== null &&
		Object.values(SIDEBAR_TOGGLE_PREFERENCES).includes(
			value as SidebarTogglePreference
		)
	);
}
