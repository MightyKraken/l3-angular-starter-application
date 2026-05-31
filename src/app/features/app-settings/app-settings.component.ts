import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	MatButtonToggle,
	MatButtonToggleGroup
} from '@angular/material/button-toggle';
import {
	AppLayoutModePickerComponent,
	AppSidebarTogglePickerComponent,
	AppThemePreviewComponent,
	AppToolbarBehaviorPickerComponent,
	DAISY_THEME_OPTIONS,
	type DaisyThemeId,
	ThemeService
} from '@shared';

@Component({
	selector: 'app-settings',
	imports: [
		AppLayoutModePickerComponent,
		AppSidebarTogglePickerComponent,
		AppToolbarBehaviorPickerComponent,
		AppThemePreviewComponent,
		MatButtonToggle,
		MatButtonToggleGroup
	],
	templateUrl: './app-settings.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingsComponent {
	private readonly theme = inject(ThemeService);

	readonly themes = DAISY_THEME_OPTIONS;
	readonly themeId = this.theme.themeId;

	setTheme(id: unknown): void {
		this.theme.setTheme(id as DaisyThemeId);
	}
}
