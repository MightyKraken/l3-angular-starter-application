import { inject, Injectable, signal } from '@angular/core';
import { CookieStorageService } from '@core';

import {
	APP_SIDEBAR_TOGGLE_COOKIE,
	DEFAULT_SIDEBAR_TOGGLE_PREFERENCE,
	isSidebarTogglePreference,
	type SidebarTogglePreference
} from './sidebar-toggle.const';

@Injectable({ providedIn: 'root' })
export class SidebarTogglePreferenceService {
	private readonly cookies = inject(CookieStorageService);

	private readonly _preference = signal<SidebarTogglePreference>(
		DEFAULT_SIDEBAR_TOGGLE_PREFERENCE
	);

	readonly preference = this._preference.asReadonly();

	initFromStorage(): void {
		const stored = this.cookies.get(APP_SIDEBAR_TOGGLE_COOKIE);
		this._preference.set(
			isSidebarTogglePreference(stored)
				? stored
				: DEFAULT_SIDEBAR_TOGGLE_PREFERENCE
		);
	}

	setPreference(preference: SidebarTogglePreference): void {
		if (this._preference() === preference) {
			return;
		}

		this._preference.set(preference);
		this.cookies.set(APP_SIDEBAR_TOGGLE_COOKIE, preference);
	}
}
