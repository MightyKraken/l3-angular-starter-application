import { inject, Injectable, signal } from '@angular/core';
import { CookieStorageService } from '@core';

import {
	APP_TOOLBAR_BEHAVIOR_COOKIE,
	DEFAULT_TOOLBAR_BEHAVIOR,
	isToolbarBehavior,
	type ToolbarBehavior
} from './toolbar-behavior.const';

@Injectable({ providedIn: 'root' })
export class ToolbarBehaviorPreferenceService {
	private readonly cookies = inject(CookieStorageService);

	private readonly _behavior = signal<ToolbarBehavior>(
		DEFAULT_TOOLBAR_BEHAVIOR
	);

	readonly behavior = this._behavior.asReadonly();

	initFromStorage(): void {
		const stored = this.cookies.get(APP_TOOLBAR_BEHAVIOR_COOKIE);
		this._behavior.set(
			isToolbarBehavior(stored) ? stored : DEFAULT_TOOLBAR_BEHAVIOR
		);
	}

	setBehavior(behavior: ToolbarBehavior): void {
		if (this._behavior() === behavior) {
			return;
		}

		this._behavior.set(behavior);
		this.cookies.set(APP_TOOLBAR_BEHAVIOR_COOKIE, behavior);
	}
}
