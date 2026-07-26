import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	MatButtonToggle,
	MatButtonToggleGroup
} from '@angular/material/button-toggle';

import { AppThemePreviewComponent } from '../app-theme-preview/app-theme-preview.component';
import { DAISY_THEME_OPTIONS, type DaisyThemeId } from '../theme.const';
import { ThemeService } from '../theme.service';

@Component({
	selector: 'app-theme-card-picker',
	imports: [AppThemePreviewComponent, MatButtonToggle, MatButtonToggleGroup],
	templateUrl: './app-theme-card-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppThemeCardPickerComponent {
	private readonly theme = inject(ThemeService);

	readonly themes = DAISY_THEME_OPTIONS;
	readonly themeId = this.theme.themeId;

	setTheme(id: unknown): void {
		this.theme.setTheme(id as DaisyThemeId);
	}
}
