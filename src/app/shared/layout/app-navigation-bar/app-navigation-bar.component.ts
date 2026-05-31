import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject
} from '@angular/core';

import { AppNavTreeItemComponent } from '../app-nav-tree-item/app-nav-tree-item.component';
import { NAVIGATION_TREE } from '../app-nav-tree-item/navigation-items.const';
import { SidebarLayoutService } from '../sidebar-layout/sidebar-layout.service';

@Component({
	selector: 'app-navigation-bar',
	imports: [AppNavTreeItemComponent],
	templateUrl: './app-navigation-bar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex min-h-0 min-w-0 flex-1 self-stretch'
	}
})
export class AppNavigationBarComponent {
	private readonly sidebarLayout = inject(SidebarLayoutService);
	readonly sidebarMode = this.sidebarLayout.mode;
	readonly isSidebarMini = computed(() => this.sidebarLayout.mode() === 'mini');

	readonly navigationTree = NAVIGATION_TREE;
}
