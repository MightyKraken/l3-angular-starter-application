import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
	APP_TOOLBAR_BEHAVIOR_OPTIONS,
	type ToolbarBehavior
} from './toolbar-behavior.const';
import { ToolbarBehaviorPreferenceService } from './toolbar-behavior-preference.service';

@Component({
	selector: 'app-toolbar-behavior-picker',
	templateUrl: './app-toolbar-behavior-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppToolbarBehaviorPickerComponent {
	private readonly toolbarBehavior = inject(ToolbarBehaviorPreferenceService);

	readonly options = APP_TOOLBAR_BEHAVIOR_OPTIONS;
	readonly behavior = this.toolbarBehavior.behavior;

	select(behavior: ToolbarBehavior): void {
		this.toolbarBehavior.setBehavior(behavior);
	}

	isActive(behavior: ToolbarBehavior): boolean {
		return this.behavior() === behavior;
	}
}
