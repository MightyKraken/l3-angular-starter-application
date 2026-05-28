export const APP_TOOLBAR_BEHAVIOR_COOKIE = 'app.toolbarBehavior';

export const TOOLBAR_BEHAVIORS = ['fixed', 'scroll-away'] as const;

export type ToolbarBehavior = (typeof TOOLBAR_BEHAVIORS)[number];

export const DEFAULT_TOOLBAR_BEHAVIOR: ToolbarBehavior = 'scroll-away';

export interface ToolbarBehaviorOption {
	id: ToolbarBehavior;
	label: string;
	description: string;
}

export const APP_TOOLBAR_BEHAVIOR_OPTIONS: ReadonlyArray<ToolbarBehaviorOption> =
	[
		{
			id: 'fixed',
			label: 'Fixed toolbar',
			description:
				'Toolbar stays visible while scrolling the main content area.'
		},
		{
			id: 'scroll-away',
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
		(TOOLBAR_BEHAVIORS as ReadonlyArray<string>).includes(value)
	);
}
