import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAVIGATION_ITEMS, SidebarLayoutService } from '@core';

import { AppIconComponent } from '../../app-icon/app-icon.component';

@Component({
	selector: 'app-navigation-bar',
	imports: [AppIconComponent, RouterLink, RouterLinkActive],
	templateUrl: './app-navigation-bar.component.html',
	styleUrl: './app-navigation-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavigationBarComponent {
	private readonly sidebarLayout = inject(SidebarLayoutService);
	readonly sidebarMode = this.sidebarLayout.mode;
	readonly isSidebarMini = computed(() => this.sidebarLayout.mode() === 'mini');

	readonly navigationItems = NAVIGATION_ITEMS;
}
