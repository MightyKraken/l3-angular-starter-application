export interface NavigationNode {
	id: string;
	label: string;
	icon?: string;
	route?: string;
	children?: ReadonlyArray<NavigationNode>;
}

function validateNavigationTree(nodes: ReadonlyArray<NavigationNode>): void {
	for (const node of nodes) {
		if (node.children?.length) {
			if (node.route !== undefined) {
				console.warn(
					`[NAVIGATION_TREE] Node "${node.id}" has children and must not define route.`
				);
			}

			validateNavigationTree(node.children);
			continue;
		}

		if (node.route === undefined) {
			console.warn(
				`[NAVIGATION_TREE] Leaf node "${node.id}" must define route.`
			);
		}
	}
}

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

validateNavigationTree(NAVIGATION_TREE);
