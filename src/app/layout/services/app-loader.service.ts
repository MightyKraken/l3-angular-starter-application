import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AppLoaderService {
	private readonly _isAppLoading = signal(false);

	isAppLoading = this._isAppLoading.asReadonly();

	show(): void {
		this._isAppLoading.set(true);
		document.body.classList.add('overflow-hidden');
	}

	hide(): void {
		this._isAppLoading.set(false);
		document.body.classList.remove('overflow-hidden');
	}
}
