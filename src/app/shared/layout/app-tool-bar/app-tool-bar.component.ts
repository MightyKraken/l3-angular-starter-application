import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal
} from '@angular/core';
import { environment } from '@environment';

import { AppIconComponent } from '../../app-icon/app-icon.component';
import { AppThemePickerComponent } from '../../app-theme/app-theme-picker/app-theme-picker.component';
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
