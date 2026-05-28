import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DAISY_THEME_OPTIONS, type DaisyThemeId, ThemeService } from '@core';

import { AppLayoutModePickerComponent } from '../../shared/reusable-components/app-layout-mode-picker/app-layout-mode-picker.component';
import { AppSidebarTogglePickerComponent } from '../../shared/reusable-components/app-sidebar-toggle-picker/app-sidebar-toggle-picker.component';
import { AppThemePreviewComponent } from '../../shared/reusable-components/app-theme-preview/app-theme-preview.component';

@Component({
	selector: 'app-settings',
	imports: [
		AppLayoutModePickerComponent,
		AppSidebarTogglePickerComponent,
		AppThemePreviewComponent
	],
	templateUrl: './app-settings.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingsComponent {
	private readonly theme = inject(ThemeService);

	readonly themes = DAISY_THEME_OPTIONS;
	readonly themeId = this.theme.themeId;

	setTheme(id: DaisyThemeId): void {
		this.theme.setTheme(id);
	}

	isThemeActive(id: DaisyThemeId): boolean {
		return this.themeId() === id;
	}
}
