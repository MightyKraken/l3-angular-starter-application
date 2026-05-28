import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
	SidebarLayoutService,
	SidebarTogglePreferenceService,
	ThemeService
} from '@core';
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
	private readonly theme = inject(ThemeService);

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

	readonly schemeToggleAriaLabel = computed(() =>
		this.theme.colorScheme() === 'light'
			? 'Switch to dark mode'
			: 'Switch to light mode'
	);

	readonly schemeIcon = computed(() =>
		this.theme.colorScheme() === 'light' ? 'sun' : 'moon'
	);

	onMenuToggle(): void {
		this.sidebarLayout.toggleMode();
	}

	onSchemeToggle(): void {
		this.theme.toggleColorScheme();
	}
}
