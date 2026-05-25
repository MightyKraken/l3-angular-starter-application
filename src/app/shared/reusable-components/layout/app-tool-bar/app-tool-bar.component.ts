import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
	ScreenSizeObserver,
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
	styleUrl: './app-tool-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppToolBarComponent {
	private readonly sidebarLayout = inject(SidebarLayoutService);
	private readonly screenSize = inject(ScreenSizeObserver);
	private readonly sidebarTogglePreference = inject(
		SidebarTogglePreferenceService
	);
	private readonly theme = inject(ThemeService);

	private readonly isSidebarOverlay = computed(
		() => !!this.screenSize.isMobile() || !!this.screenSize.isSmall()
	);

	protected readonly appTitle = signal(environment.PortalTitle);

	readonly toggleAriaLabel = computed(() => {
		const mode = this.sidebarLayout.mode();
		const isOverlay = this.isSidebarOverlay();

		if (
			isOverlay &&
			this.sidebarTogglePreference.preference() === 'expanded-mini'
		) {
			switch (mode) {
				case 'hidden':
					return 'Navigation closed. Click to open icons-only menu.';
				case 'mini':
					return 'Icons-only menu open. Click for full width menu.';
				default:
					return 'Full menu open. Click for icons-only menu.';
			}
		}

		if (isOverlay) {
			return mode === 'hidden'
				? 'Navigation closed. Click to open menu.'
				: 'Navigation open. Click to close menu.';
		}

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
		this.sidebarLayout.toggleMode(this.isSidebarOverlay());
	}

	onSchemeToggle(): void {
		this.theme.toggleColorScheme();
	}
}
