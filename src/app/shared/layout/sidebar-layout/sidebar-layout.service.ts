import { inject, Injectable, signal } from '@angular/core';

import {
	SIDEBAR_TOGGLE_PREFERENCES,
	type SidebarTogglePreference
} from '../app-sidebar-toggle-picker/sidebar-toggle.const';
import { SidebarTogglePreferenceService } from '../app-sidebar-toggle-picker/sidebar-toggle-preference.service';

export type SidebarMode = 'expanded' | 'mini' | 'hidden';

@Injectable({ providedIn: 'root' })
export class SidebarLayoutService {
	private readonly togglePreference = inject(SidebarTogglePreferenceService);

	private readonly _mode = signal<SidebarMode>('expanded');

	readonly mode = this._mode.asReadonly();

	getToggleCycle(): Array<SidebarMode> {
		return getCycleForPreference(this.togglePreference.preference());
	}

	toggleMode(): void {
		const cycle = this.getToggleCycle();
		const current = this._mode();
		const currentIndex = cycle.indexOf(current);

		if (currentIndex === -1) {
			this._mode.set(cycle[0]);
			return;
		}

		this._mode.set(cycle[(currentIndex + 1) % cycle.length]);
	}

	setMode(mode: SidebarMode): void {
		this._mode.set(mode);
	}

	closeSidebar(): void {
		this.setMode('hidden');
	}

	normalizeModeForPreference(): void {
		const cycle = getCycleForPreference(this.togglePreference.preference());

		if (!cycle.includes(this._mode())) {
			this._mode.set('expanded');
		}
	}
}

function getCycleForPreference(
	preference: SidebarTogglePreference
): Array<SidebarMode> {
	return preference === SIDEBAR_TOGGLE_PREFERENCES.expandedMini
		? ['expanded', 'mini']
		: ['expanded', 'hidden'];
}
