import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input
} from '@angular/core';

import { AppNavTreeItemComponent } from '../app-nav-tree-item/app-nav-tree-item.component';
import { NAVIGATION_TREE } from '../app-nav-tree-item/navigation-items.const';
import { AppSidebarMenuToggleComponent } from '../app-sidebar-menu-toggle/app-sidebar-menu-toggle.component';
import { SidebarLayoutService } from '../sidebar-layout/sidebar-layout.service';

@Component({
	selector: 'app-navigation-bar',
	imports: [AppNavTreeItemComponent, AppSidebarMenuToggleComponent],
	templateUrl: './app-navigation-bar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex min-h-0 min-w-0 flex-1 self-stretch'
	}
})
export class AppNavigationBarComponent {
	private readonly sidebarLayout = inject(SidebarLayoutService);

	/** When true, show sidebar toggle at top (used when toolbar is absent). */
	readonly showSidebarToggle = input(false);

	readonly isSidebarMini = computed(() => this.sidebarLayout.mode() === 'mini');
	readonly isSidebarHidden = computed(
		() => this.sidebarLayout.mode() === 'hidden'
	);

	readonly navigationTree = NAVIGATION_TREE;
}
