import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
	AppLayoutModeService,
	COMMON_IMPORTS,
	SidebarLayoutService
} from '@core';

import { AppNavigationBarComponent } from '../app-navigation-bar/app-navigation-bar.component';
import { AppToolBarComponent } from '../app-tool-bar/app-tool-bar.component';

@Component({
	selector: 'app-layout',
	imports: [
		RouterOutlet,
		AppNavigationBarComponent,
		AppToolBarComponent,
		...COMMON_IMPORTS
	],
	templateUrl: './app-layout.component.html',
	styleUrl: './app-layout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent {
	private readonly sidebarLayout = inject(SidebarLayoutService);
	private readonly layoutModeService = inject(AppLayoutModeService);

	readonly showToolbar = input<boolean>(false);
	readonly showNavigation = input<boolean>(false);
	readonly sidebarMode = this.sidebarLayout.mode;
	readonly layoutMode = this.layoutModeService.layoutMode;
}
