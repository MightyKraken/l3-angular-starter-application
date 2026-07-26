export const APP_TOOLBAR_BEHAVIOR_COOKIE = 'app.toolbarBehavior';

export const TOOLBAR_BEHAVIORS = {
	fixed: 'fixed',
	scrollAway: 'scroll-away'
} as const;

export type ToolbarBehavior =
	(typeof TOOLBAR_BEHAVIORS)[keyof typeof TOOLBAR_BEHAVIORS];

export const DEFAULT_TOOLBAR_BEHAVIOR: ToolbarBehavior =
	TOOLBAR_BEHAVIORS.scrollAway;

export interface ToolbarBehaviorOption {
	id: ToolbarBehavior;
	label: string;
	description: string;
}

export const APP_TOOLBAR_BEHAVIOR_OPTIONS: ReadonlyArray<ToolbarBehaviorOption> =
	[
		{
			id: TOOLBAR_BEHAVIORS.fixed,
			label: 'Fixed toolbar',
			description:
				'Toolbar stays visible while scrolling the main content area.'
		},
		{
			id: TOOLBAR_BEHAVIORS.scrollAway,
			label: 'Scroll-away toolbar',
			description:
				'Toolbar hides while scrolling down and reappears when scrolling up.'
		}
	];

export function isToolbarBehavior(
	value: string | null
): value is ToolbarBehavior {
	return (
		value !== null &&
		Object.values(TOOLBAR_BEHAVIORS).includes(value as ToolbarBehavior)
	);
}
