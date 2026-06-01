import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	AppLayoutModePickerComponent,
	AppSidebarTogglePickerComponent,
	AppThemeCardPickerComponent,
	AppToolbarBehaviorPickerComponent
} from '@shared';

@Component({
	selector: 'app-settings',
	imports: [
		AppLayoutModePickerComponent,
		AppSidebarTogglePickerComponent,
		AppThemeCardPickerComponent,
		AppToolbarBehaviorPickerComponent
	],
	templateUrl: './app-settings.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingsComponent {}
