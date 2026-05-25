export interface NavigationItem {
	label: string;
	route: string;
	icon: string;
}

export const NAVIGATION_ITEMS: ReadonlyArray<NavigationItem> = [
	{
		label: 'Home',
		route: '/',
		icon: 'house'
	},
	{
		label: 'Playground',
		route: '/playground',
		icon: 'flask-conical'
	},
	{
		label: 'Settings',
		route: '/settings',
		icon: 'settings'
	}
];
