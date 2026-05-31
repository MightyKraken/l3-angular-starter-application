import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	MatButtonToggle,
	MatButtonToggleGroup
} from '@angular/material/button-toggle';

import { AppLayoutModeService } from './app-layout-mode.service';
import {
	APP_LAYOUT_MODE_OPTIONS,
	APP_LAYOUT_MODES,
	type AppLayoutMode
} from './layout.const';

@Component({
	selector: 'app-layout-mode-picker',
	imports: [MatButtonToggle, MatButtonToggleGroup],
	templateUrl: './app-layout-mode-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutModePickerComponent {
	private readonly layoutModeService = inject(AppLayoutModeService);
	protected readonly appLayoutModes = APP_LAYOUT_MODES;
	readonly options = APP_LAYOUT_MODE_OPTIONS;
	readonly layoutMode = this.layoutModeService.layoutMode;

	select(mode: unknown): void {
		this.layoutModeService.setLayoutMode(mode as AppLayoutMode);
	}
}
