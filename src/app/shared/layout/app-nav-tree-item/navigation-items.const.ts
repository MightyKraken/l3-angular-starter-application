interface BaseNavigationNode {
	id: string;
	label: string;
	icon?: string;
}

interface RouteNode extends BaseNavigationNode {
	route: string;
	children?: never;
}

interface ParentNode extends BaseNavigationNode {
	children: ReadonlyArray<NavigationNode>;
	route?: never;
}

export type NavigationNode = RouteNode | ParentNode;

export const NAVIGATION_TREE: ReadonlyArray<NavigationNode> = [
	{
		id: 'home',
		label: 'Home',
		route: '/',
		icon: 'house'
	},
	{
		id: 'playground',
		label: 'Playground',
		route: '/playground',
		icon: 'flask-conical'
	},
	{
		id: 'settings',
		label: 'Settings',
		route: '/settings',
		icon: 'settings'
	}
];
