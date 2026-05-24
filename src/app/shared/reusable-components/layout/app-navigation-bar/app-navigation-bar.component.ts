import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScreenSizeObserver, SidebarLayoutService } from '@core';

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
	private readonly screenSize = inject(ScreenSizeObserver);

	readonly sidebarMode = this.sidebarLayout.mode;
	readonly isSidebarMini = computed(
		() => this.sidebarLayout.mode() === 'mini'
	);

	private readonly isSidebarOverlay = computed(
		() => !!this.screenSize.isMobile() || !!this.screenSize.isSmall()
	);

	readonly navigationItems = signal([
		{
			label: 'Home',
			route: '/',
			icon: 'house'
		},
		{
			label: 'Settings',
			route: '/settings',
			icon: 'settings'
		}
	]);

	onNavItemClick(): void {
		if (this.isSidebarOverlay()) {
			this.sidebarLayout.closeSidebar();
		}
	}
}
