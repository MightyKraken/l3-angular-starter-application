import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	APP_PALETTE_OPTIONS,
	type AppColorScheme,
	type AppPaletteId,
	ThemeService
} from '@core';

import { AppIconComponent } from '../../shared/reusable-components/app-icon/app-icon.component';
import { AppLayoutModePickerComponent } from '../../shared/reusable-components/app-layout-mode-picker/app-layout-mode-picker.component';

@Component({
	selector: 'app-settings',
	imports: [AppIconComponent, AppLayoutModePickerComponent],
	templateUrl: './app-settings.component.html',
	styleUrl: './app-settings.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingsComponent {
	private readonly theme = inject(ThemeService);

	readonly palettes = APP_PALETTE_OPTIONS;
	readonly colorScheme = this.theme.colorScheme;
	readonly paletteId = this.theme.paletteId;

	setColorScheme(scheme: AppColorScheme): void {
		this.theme.setColorScheme(scheme);
	}

	setPalette(id: AppPaletteId): void {
		this.theme.setPalette(id);
	}

	isPaletteActive(id: AppPaletteId): boolean {
		return this.paletteId() === id;
	}
}
