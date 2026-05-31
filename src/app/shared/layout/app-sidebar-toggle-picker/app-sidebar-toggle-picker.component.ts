import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SidebarLayoutService } from '../sidebar-layout/sidebar-layout.service';
import {
	APP_SIDEBAR_TOGGLE_OPTIONS,
	type SidebarTogglePreference
} from './sidebar-toggle.const';
import { SidebarTogglePreferenceService } from './sidebar-toggle-preference.service';

@Component({
	selector: 'app-sidebar-toggle-picker',
	templateUrl: './app-sidebar-toggle-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSidebarTogglePickerComponent {
	private readonly togglePreference = inject(SidebarTogglePreferenceService);
	private readonly sidebarLayout = inject(SidebarLayoutService);

	readonly options = APP_SIDEBAR_TOGGLE_OPTIONS;
	readonly preference = this.togglePreference.preference;

	select(preference: SidebarTogglePreference): void {
		this.togglePreference.setPreference(preference);
		this.sidebarLayout.normalizeModeForPreference();
	}

	isActive(preference: SidebarTogglePreference): boolean {
		return this.preference() === preference;
	}
}
