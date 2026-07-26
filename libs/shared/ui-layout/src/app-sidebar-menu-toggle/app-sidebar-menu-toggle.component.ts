import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject
} from '@angular/core';
import { AppIconComponent } from '@shared/ui-icon';

import { SidebarTogglePreferenceService } from '../app-sidebar-toggle-picker/sidebar-toggle-preference.service';
import { SidebarLayoutService } from '../sidebar-layout/sidebar-layout.service';

@Component({
	selector: 'app-sidebar-menu-toggle',
	imports: [AppIconComponent],
	templateUrl: './app-sidebar-menu-toggle.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSidebarMenuToggleComponent {
	private readonly sidebarLayout = inject(SidebarLayoutService);
	private readonly sidebarTogglePreference = inject(
		SidebarTogglePreferenceService
	);

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

	/** Short label for daisyUI tooltip (avoids clipping on small viewports). */
	readonly toggleTooltip = computed(() => {
		const mode = this.sidebarLayout.mode();

		if (this.sidebarTogglePreference.preference() === 'expanded-hidden') {
			return mode === 'hidden' ? 'Expand sidebar' : 'Hide sidebar';
		}

		return mode === 'mini' ? 'Expand sidebar' : 'Icons only';
	});

	onMenuToggle(): void {
		this.sidebarLayout.toggleMode();
	}
}
