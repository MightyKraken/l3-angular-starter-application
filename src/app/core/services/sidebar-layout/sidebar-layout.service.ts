import { inject, Injectable, signal } from '@angular/core';

import type { SidebarTogglePreference } from '../../constants/sidebar-toggle.const';
import { SidebarTogglePreferenceService } from '../sidebar-toggle-preference/sidebar-toggle-preference.service';

export type SidebarMode = 'expanded' | 'mini' | 'hidden';

@Injectable({ providedIn: 'root' })
export class SidebarLayoutService {
	private readonly togglePreference = inject(SidebarTogglePreferenceService);

	private readonly _mode = signal<SidebarMode>('expanded');

	readonly mode = this._mode.asReadonly();

	getToggleCycle(isOverlayViewport: boolean): SidebarMode[] {
		return getCycleForPreference(
			this.togglePreference.preference(),
			isOverlayViewport
		);
	}

	toggleMode(isOverlayViewport: boolean): void {
		if (
			isOverlayViewport &&
			this.togglePreference.preference() === 'expanded-mini'
		) {
			this.toggleExpandedMiniOverlay();
			return;
		}

		const cycle = this.getToggleCycle(isOverlayViewport);
		const current = this._mode();
		const currentIndex = cycle.indexOf(current);

		if (currentIndex === -1) {
			this._mode.set(cycle[0]);
			return;
		}

		this._mode.set(cycle[(currentIndex + 1) % cycle.length]);
	}

	private toggleExpandedMiniOverlay(): void {
		switch (this._mode()) {
			case 'hidden':
				this._mode.set('mini');
				break;
			case 'mini':
				this._mode.set('expanded');
				break;
			case 'expanded':
				this._mode.set('mini');
				break;
		}
	}

	setMode(mode: SidebarMode): void {
		this._mode.set(mode);
	}

	closeSidebar(): void {
		this.setMode('hidden');
	}

	normalizeModeForPreference(): void {
		const desktopCycle = getCycleForPreference(
			this.togglePreference.preference(),
			false
		);

		if (!desktopCycle.includes(this._mode())) {
			this._mode.set('expanded');
		}
	}
}

function getCycleForPreference(
	preference: SidebarTogglePreference,
	isOverlayViewport: boolean
): SidebarMode[] {
	if (isOverlayViewport) {
		return preference === 'expanded-mini'
			? ['hidden', 'mini', 'expanded'] // hidden via backdrop; menu toggles mini <-> expanded
			: ['hidden', 'expanded'];
	}

	return preference === 'expanded-mini'
		? ['expanded', 'mini']
		: ['expanded', 'hidden'];
}
