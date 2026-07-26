import { inject, Injectable, signal } from '@angular/core';
import { CookieStorageService } from '@shared/util-cookie-storage';

import {
	APP_LAYOUT_MODE_COOKIE,
	type AppLayoutMode,
	DEFAULT_LAYOUT_MODE,
	isAppLayoutMode
} from './layout.const';

@Injectable({ providedIn: 'root' })
export class AppLayoutModeService {
	private readonly cookies = inject(CookieStorageService);

	private readonly _layoutMode = signal<AppLayoutMode>(DEFAULT_LAYOUT_MODE);

	readonly layoutMode = this._layoutMode.asReadonly();

	initFromStorage(): void {
		const stored = this.cookies.get(APP_LAYOUT_MODE_COOKIE);
		this._layoutMode.set(
			isAppLayoutMode(stored) ? stored : DEFAULT_LAYOUT_MODE
		);
	}

	setLayoutMode(mode: AppLayoutMode): void {
		if (this._layoutMode() === mode) {
			return;
		}

		this._layoutMode.set(mode);
		this.cookies.set(APP_LAYOUT_MODE_COOKIE, mode);
	}
}
