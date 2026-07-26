import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { environment } from '@environment';
import { AppIconComponent } from '@shared/ui-icon';
import { AppThemePickerComponent } from '@shared/ui-theme';

import { AppSidebarMenuToggleComponent } from '../app-sidebar-menu-toggle/app-sidebar-menu-toggle.component';

@Component({
	selector: 'app-tool-bar',
	imports: [
		AppThemePickerComponent,
		AppIconComponent,
		AppSidebarMenuToggleComponent
	],
	templateUrl: './app-tool-bar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppToolBarComponent {
	protected readonly appTitle = signal(environment.PortalTitle);
}
