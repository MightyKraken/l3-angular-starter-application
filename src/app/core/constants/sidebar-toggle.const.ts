export const APP_SIDEBAR_TOGGLE_COOKIE = 'app.sidebarToggle';

export const SIDEBAR_TOGGLE_PREFERENCES = [
	'expanded-mini',
	'expanded-hidden'
] as const;

export type SidebarTogglePreference =
	(typeof SIDEBAR_TOGGLE_PREFERENCES)[number];

export const DEFAULT_SIDEBAR_TOGGLE_PREFERENCE: SidebarTogglePreference =
	'expanded-mini';

export interface SidebarToggleOption {
	id: SidebarTogglePreference;
	label: string;
	description: string;
}

export const APP_SIDEBAR_TOGGLE_OPTIONS: ReadonlyArray<SidebarToggleOption> = [
	{
		id: 'expanded-mini',
		label: 'Expanded + mini',
		description:
			'Menu toggles full sidebar and icons-only. On small screens: mini drawer and full drawer; tap backdrop to close.'
	},
	{
		id: 'expanded-hidden',
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
		(SIDEBAR_TOGGLE_PREFERENCES as ReadonlyArray<string>).includes(value)
	);
}
