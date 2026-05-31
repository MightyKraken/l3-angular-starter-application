import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	MatButtonToggle,
	MatButtonToggleGroup
} from '@angular/material/button-toggle';

import { SidebarLayoutService } from '../sidebar-layout/sidebar-layout.service';
import {
	APP_SIDEBAR_TOGGLE_OPTIONS,
	type SidebarTogglePreference
} from './sidebar-toggle.const';
import { SidebarTogglePreferenceService } from './sidebar-toggle-preference.service';

@Component({
	selector: 'app-sidebar-toggle-picker',
	imports: [MatButtonToggle, MatButtonToggleGroup],
	templateUrl: './app-sidebar-toggle-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'block w-full min-w-0 max-w-full'
	}
})
export class AppSidebarTogglePickerComponent {
	private readonly togglePreference = inject(SidebarTogglePreferenceService);
	private readonly sidebarLayout = inject(SidebarLayoutService);

	readonly options = APP_SIDEBAR_TOGGLE_OPTIONS;
	readonly preference = this.togglePreference.preference;

	select(preference: unknown): void {
		this.togglePreference.setPreference(preference as SidebarTogglePreference);
		this.sidebarLayout.normalizeModeForPreference();
	}
}
