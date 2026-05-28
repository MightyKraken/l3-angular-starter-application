import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarLayoutService, SidebarTogglePreferenceService } from '@core';
import { environment } from '@environment';

import { AppIconComponent } from '../../app-icon/app-icon.component';
import { AppIconButtonComponent } from '../../app-icon-button/app-icon-button.component';
import { AppThemePickerComponent } from '../../app-theme-picker/app-theme-picker.component';

@Component({
	selector: 'app-tool-bar',
	imports: [
		AppIconButtonComponent,
		AppThemePickerComponent,
		AppIconComponent,
		MatTooltipModule
	],
	templateUrl: './app-tool-bar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppToolBarComponent {
	private readonly sidebarLayout = inject(SidebarLayoutService);
	private readonly sidebarTogglePreference = inject(
		SidebarTogglePreferenceService
	);

	protected readonly appTitle = signal(environment.PortalTitle);

	readonly toggleAriaLabel = computed(() => {
		const mode = this.sidebarLayout.mode();

		if (this.sidebarTogglePreference.preference() === 'expanded-hidden') {
			return mode === 'hidden'
				? 'Sidebar hidden. Click to expand sidebar.'
				: 'Sidebar expanded. Click to hide sidebar.';
		}

		return mode === 'mini'
			? 'Sidebar showing icons only. Click to expand sidebar.'
			: 'Sidebar expanded. Click to show icons only.';
	});

	onMenuToggle(): void {
		this.sidebarLayout.toggleMode();
	}
}
