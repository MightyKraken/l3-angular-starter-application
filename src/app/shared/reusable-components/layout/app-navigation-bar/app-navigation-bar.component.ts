import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarLayoutService } from '@core';

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

	readonly navigationItems = signal([
		{
			label: 'Home',
			route: '/',
			icon: 'house'
		},
		{
			label: 'Reports',
			route: '/reports',
			icon: 'chart-column'
		},
		{
			label: 'Settings',
			route: '/settings',
			icon: 'settings'
		}
	]);
}
