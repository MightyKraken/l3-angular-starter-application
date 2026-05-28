import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DAISY_THEME_OPTIONS, type DaisyThemeId, ThemeService } from '@core';

import { AppIconComponent } from '../app-icon/app-icon.component';
import { AppThemePreviewComponent } from '../app-theme-preview/app-theme-preview.component';

@Component({
	selector: 'app-theme-picker',
	imports: [AppIconComponent, AppThemePreviewComponent],
	templateUrl: './app-theme-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppThemePickerComponent {
	private readonly theme = inject(ThemeService);
	private readonly document = inject(DOCUMENT);

	readonly themes = DAISY_THEME_OPTIONS;
	readonly activeThemeId = this.theme.themeId;

	onSelect(themeId: DaisyThemeId): void {
		this.theme.setTheme(themeId);
		(this.document.activeElement as HTMLElement | null)?.blur();
	}

	isActive(themeId: DaisyThemeId): boolean {
		return this.activeThemeId() === themeId;
	}
}
