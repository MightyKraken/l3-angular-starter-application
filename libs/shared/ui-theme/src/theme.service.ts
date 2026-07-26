import { inject, Injectable, signal } from '@angular/core';
import { CookieStorageService } from '@shared/util-cookie-storage';

import {
	APP_THEME_COOKIE,
	DAISY_THEME_IDS,
	type DaisyThemeId,
	DEFAULT_DAISY_THEME
} from './theme.const';

@Injectable({ providedIn: 'root' })
export class ThemeService {
	private readonly cookies = inject(CookieStorageService);

	private readonly _themeId = signal<DaisyThemeId>(DEFAULT_DAISY_THEME);

	readonly themeId = this._themeId.asReadonly();

	initFromStorage(): void {
		const storedTheme = this.cookies.get(APP_THEME_COOKIE);

		this._themeId.set(
			this.isDaisyThemeId(storedTheme) ? storedTheme : DEFAULT_DAISY_THEME
		);

		this.applyToDocument();
	}

	setTheme(themeId: DaisyThemeId): void {
		if (this._themeId() === themeId) {
			return;
		}

		this._themeId.set(themeId);
		this.persistAndApply();
	}

	applyToDocument(): void {
		if (typeof document === 'undefined') {
			return;
		}

		document.documentElement.setAttribute('data-theme', this._themeId());
	}

	private persistAndApply(): void {
		this.cookies.set(APP_THEME_COOKIE, this._themeId());
		this.applyToDocument();
	}

	private isDaisyThemeId(value: string | null): value is DaisyThemeId {
		return (
			value !== null &&
			Object.values(DAISY_THEME_IDS).includes(value as DaisyThemeId)
		);
	}
}
