import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	APP_SIDEBAR_TOGGLE_OPTIONS,
	SidebarLayoutService,
	type SidebarTogglePreference,
	SidebarTogglePreferenceService
} from '@core';

@Component({
	selector: 'app-sidebar-toggle-picker',
	templateUrl: './app-sidebar-toggle-picker.component.html',
	styleUrl: './app-sidebar-toggle-picker.component.scss',
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
