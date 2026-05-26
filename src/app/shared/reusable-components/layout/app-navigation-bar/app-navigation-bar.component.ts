import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject
} from '@angular/core';
import { NAVIGATION_TREE, SidebarLayoutService } from '@core';

import { AppNavTreeItemComponent } from '../app-nav-tree-item/app-nav-tree-item.component';

@Component({
	selector: 'app-navigation-bar',
	imports: [AppNavTreeItemComponent],
	templateUrl: './app-navigation-bar.component.html',
	styleUrl: './app-navigation-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavigationBarComponent {
	private readonly sidebarLayout = inject(SidebarLayoutService);
	readonly sidebarMode = this.sidebarLayout.mode;
	readonly isSidebarMini = computed(() => this.sidebarLayout.mode() === 'mini');

	readonly navigationTree = NAVIGATION_TREE;
}
