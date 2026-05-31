import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DAISY_THEME_OPTIONS, type DaisyThemeId, ThemeService } from '@shared';
import {
	AppLayoutModePickerComponent,
	AppSidebarTogglePickerComponent,
	AppThemePreviewComponent,
	AppToolbarBehaviorPickerComponent
} from '@shared';

@Component({
	selector: 'app-settings',
	imports: [
		AppLayoutModePickerComponent,
		AppSidebarTogglePickerComponent,
		AppToolbarBehaviorPickerComponent,
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
