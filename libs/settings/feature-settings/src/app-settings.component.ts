import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	AppLayoutModePickerComponent,
	AppSidebarTogglePickerComponent,
	AppToolbarBehaviorPickerComponent
} from '@shared/ui-layout';
import { AppThemeCardPickerComponent } from '@shared/ui-theme';

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
