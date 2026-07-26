import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	MatButtonToggle,
	MatButtonToggleGroup
} from '@angular/material/button-toggle';

import {
	APP_TOOLBAR_BEHAVIOR_OPTIONS,
	type ToolbarBehavior
} from './toolbar-behavior.const';
import { ToolbarBehaviorPreferenceService } from './toolbar-behavior-preference.service';

@Component({
	selector: 'app-toolbar-behavior-picker',
	imports: [MatButtonToggle, MatButtonToggleGroup],
	templateUrl: './app-toolbar-behavior-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'block w-full min-w-0 max-w-full'
	}
})
export class AppToolbarBehaviorPickerComponent {
	private readonly toolbarBehavior = inject(ToolbarBehaviorPreferenceService);

	readonly options = APP_TOOLBAR_BEHAVIOR_OPTIONS;
	readonly behavior = this.toolbarBehavior.behavior;

	select(behavior: unknown): void {
		this.toolbarBehavior.setBehavior(behavior as ToolbarBehavior);
	}
}
