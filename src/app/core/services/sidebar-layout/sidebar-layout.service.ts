import { Injectable, signal } from '@angular/core';

type SidebarMode = 'expanded' | 'mini' | 'hidden';

const SIDEBAR_MODE_CYCLE: Array<SidebarMode> = ['expanded', 'mini', 'hidden'];

@Injectable({ providedIn: 'root' })
export class SidebarLayoutService {
	private readonly _mode = signal<SidebarMode>('expanded');

	readonly mode = this._mode.asReadonly();

	toggleMode(): void {
		const currentIndex = SIDEBAR_MODE_CYCLE.indexOf(this._mode());
		const nextIndex = (currentIndex + 1) % SIDEBAR_MODE_CYCLE.length;
		this._mode.set(SIDEBAR_MODE_CYCLE[nextIndex]);
	}
}
