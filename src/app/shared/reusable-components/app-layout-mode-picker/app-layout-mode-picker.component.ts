import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	APP_LAYOUT_MODE_OPTIONS,
	type AppLayoutMode,
	AppLayoutModeService
} from '@core';

@Component({
	selector: 'app-layout-mode-picker',
	templateUrl: './app-layout-mode-picker.component.html',
	styleUrl: './app-layout-mode-picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutModePickerComponent {
	private readonly layoutModeService = inject(AppLayoutModeService);

	readonly options = APP_LAYOUT_MODE_OPTIONS;
	readonly layoutMode = this.layoutModeService.layoutMode;

	select(mode: AppLayoutMode): void {
		this.layoutModeService.setLayoutMode(mode);
	}

	isActive(mode: AppLayoutMode): boolean {
		return this.layoutMode() === mode;
	}
}
