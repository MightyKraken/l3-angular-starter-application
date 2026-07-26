import {
	ChangeDetectionStrategy,
	Component,
	inject,
	ViewEncapsulation
} from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { AppIconComponent } from '@shared/ui-icon';

import { AppThemePreviewComponent } from '../app-theme-preview/app-theme-preview.component';
import { DAISY_THEME_OPTIONS, type DaisyThemeId } from '../theme.const';
import { ThemeService } from '../theme.service';

@Component({
	selector: 'app-theme-picker',
	imports: [
		AppIconComponent,
		AppThemePreviewComponent,
		MatMenu,
		MatMenuItem,
		MatMenuTrigger
	],
	templateUrl: './app-theme-picker.component.html',
	styleUrl: './app-theme-picker-menu.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class AppThemePickerComponent {
	private readonly theme = inject(ThemeService);

	readonly themes = DAISY_THEME_OPTIONS;
	readonly activeThemeId = this.theme.themeId;

	onSelect(themeId: DaisyThemeId): void {
		this.theme.setTheme(themeId);
	}

	isActive(themeId: DaisyThemeId): boolean {
		return this.activeThemeId() === themeId;
	}
}
