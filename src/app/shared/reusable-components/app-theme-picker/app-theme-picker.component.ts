import {
	ChangeDetectionStrategy,
	Component,
	inject,
	viewChild,
	ViewEncapsulation
} from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { DAISY_THEME_OPTIONS, type DaisyThemeId, ThemeService } from '@core';

import { AppIconComponent } from '../app-icon/app-icon.component';
import { AppThemePreviewComponent } from '../app-theme-preview/app-theme-preview.component';

@Component({
	selector: 'app-theme-picker',
	imports: [
		AppIconComponent,
		AppThemePreviewComponent,
		MatMenu,
		MatMenuTrigger
	],
	templateUrl: './app-theme-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class AppThemePickerComponent {
	private readonly theme = inject(ThemeService);
	private readonly menuTrigger = viewChild.required(MatMenuTrigger);

	readonly themes = DAISY_THEME_OPTIONS;
	readonly activeThemeId = this.theme.themeId;

	onSelect(themeId: DaisyThemeId): void {
		this.theme.setTheme(themeId);
		this.menuTrigger().closeMenu();
	}

	isActive(themeId: DaisyThemeId): boolean {
		return this.activeThemeId() === themeId;
	}
}
