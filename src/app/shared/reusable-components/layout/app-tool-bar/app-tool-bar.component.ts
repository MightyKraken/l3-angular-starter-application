import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject
} from '@angular/core';
import { SidebarLayoutService, ThemeService } from '@core';

import { AppIconButtonComponent } from '../../app-icon-button/app-icon-button.component';
import { AppThemePickerComponent } from '../../app-theme-picker/app-theme-picker.component';

@Component({
	selector: 'app-tool-bar',
	imports: [AppIconButtonComponent, AppThemePickerComponent],
	templateUrl: './app-tool-bar.component.html',
	styleUrl: './app-tool-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppToolBarComponent {
	private readonly sidebarLayout = inject(SidebarLayoutService);
	readonly theme = inject(ThemeService);

	readonly toggleAriaLabel = computed(() => {
		switch (this.sidebarLayout.mode()) {
			case 'mini':
				return 'Sidebar showing icons only. Click to hide sidebar.';
			case 'hidden':
				return 'Sidebar hidden. Click to expand sidebar.';
			default:
				return 'Sidebar expanded. Click to show icons only.';
		}
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
