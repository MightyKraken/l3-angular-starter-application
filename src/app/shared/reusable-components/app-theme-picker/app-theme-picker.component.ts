import {
	ChangeDetectionStrategy,
	Component,
	inject,
	viewChild,
	ViewEncapsulation
} from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { APP_PALETTE_OPTIONS, type AppPaletteId, ThemeService } from '@core';

import { AppIconComponent } from '../app-icon/app-icon.component';

@Component({
	selector: 'app-theme-picker',
	imports: [AppIconComponent, MatMenu, MatMenuTrigger],
	templateUrl: './app-theme-picker.component.html',
	styleUrl: './app-theme-picker.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppThemePickerComponent {
	private readonly theme = inject(ThemeService);
	private readonly menuTrigger = viewChild.required(MatMenuTrigger);

	readonly palettes = APP_PALETTE_OPTIONS;
	readonly activePaletteId = this.theme.paletteId;

	onSelect(paletteId: AppPaletteId): void {
		this.theme.setPalette(paletteId);
		this.menuTrigger().closeMenu();
	}

	isActive(paletteId: AppPaletteId): boolean {
		return this.activePaletteId() === paletteId;
	}
}
