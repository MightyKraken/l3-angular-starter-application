import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	APP_LAYOUT_MODE_OPTIONS,
	APP_LAYOUT_MODES,
	type AppLayoutMode,
	AppLayoutModeService
} from '@core';

@Component({
	selector: 'app-layout-mode-picker',
	templateUrl: './app-layout-mode-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutModePickerComponent {
	private readonly layoutModeService = inject(AppLayoutModeService);
	protected readonly appLayoutModes = APP_LAYOUT_MODES;
	readonly options = APP_LAYOUT_MODE_OPTIONS;
	readonly layoutMode = this.layoutModeService.layoutMode;

	select(mode: AppLayoutMode): void {
		this.layoutModeService.setLayoutMode(mode);
	}

	isActive(mode: AppLayoutMode): boolean {
		return this.layoutMode() === mode;
	}
}
