import { inject, Injectable, signal } from '@angular/core';

import {
	APP_COLOR_SCHEME_COOKIE,
	APP_PALETTE_COOKIE,
	type AppColorScheme,
	type AppPaletteId,
	DEFAULT_COLOR_SCHEME,
	DEFAULT_PALETTE_ID,
	isAppColorScheme,
	isAppPaletteId
} from '../../constants/theme.const';
import { CookieStorageService } from '../cookie-storage/cookie-storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
	private readonly cookies = inject(CookieStorageService);

	private readonly _colorScheme = signal<AppColorScheme>(DEFAULT_COLOR_SCHEME);
	private readonly _paletteId = signal<AppPaletteId>(DEFAULT_PALETTE_ID);

	readonly colorScheme = this._colorScheme.asReadonly();
	readonly paletteId = this._paletteId.asReadonly();

	initFromStorage(): void {
		const storedScheme = this.cookies.get(APP_COLOR_SCHEME_COOKIE);
		const storedPalette = this.cookies.get(APP_PALETTE_COOKIE);

		this._colorScheme.set(
			isAppColorScheme(storedScheme) ? storedScheme : DEFAULT_COLOR_SCHEME
		);
		this._paletteId.set(
			isAppPaletteId(storedPalette) ? storedPalette : DEFAULT_PALETTE_ID
		);

		this.applyToDocument();
	}

	toggleColorScheme(): void {
		this._colorScheme.update((scheme) =>
			scheme === 'light' ? 'dark' : 'light'
		);
		this.persistAndApply();
	}

	setColorScheme(colorScheme: AppColorScheme): void {
		if (this._colorScheme() === colorScheme) {
			return;
		}

		this._colorScheme.set(colorScheme);
		this.persistAndApply();
	}

	setPalette(id: AppPaletteId): void {
		this.setTheme(id, this._colorScheme());
	}

	setTheme(paletteId: AppPaletteId, colorScheme: AppColorScheme): void {
		if (
			this._paletteId() === paletteId &&
			this._colorScheme() === colorScheme
		) {
			return;
		}

		this._paletteId.set(paletteId);
		this._colorScheme.set(colorScheme);
		this.persistAndApply();
	}

	applyToDocument(): void {
		if (typeof document === 'undefined') {
			return;
		}

		const root = document.documentElement;
		root.dataset['colorScheme'] = this._colorScheme();
		root.dataset['palette'] = this._paletteId();
		root.style.colorScheme = this._colorScheme();
	}

	private persistAndApply(): void {
		this.cookies.set(APP_COLOR_SCHEME_COOKIE, this._colorScheme());
		this.cookies.set(APP_PALETTE_COOKIE, this._paletteId());
		this.applyToDocument();
	}
}
