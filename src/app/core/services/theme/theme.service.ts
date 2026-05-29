import { inject, Injectable, signal } from '@angular/core';

import {
	APP_THEME_COOKIE,
	type DaisyThemeId,
	DEFAULT_DAISY_THEME,
	isDaisyThemeId
} from '../../constants/theme.const';
import { CookieStorageService } from '../cookie-storage/cookie-storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
	private readonly cookies = inject(CookieStorageService);

	private readonly _themeId = signal<DaisyThemeId>(DEFAULT_DAISY_THEME);

	readonly themeId = this._themeId.asReadonly();

	initFromStorage(): void {
		const storedTheme = this.cookies.get(APP_THEME_COOKIE);

		this._themeId.set(
			isDaisyThemeId(storedTheme) ? storedTheme : DEFAULT_DAISY_THEME
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
}
