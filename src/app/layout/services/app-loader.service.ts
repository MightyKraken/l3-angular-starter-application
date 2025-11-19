import { effect, Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AppLoaderService {
	private _isAppLoading = signal(false);

	isAppLoading = this._isAppLoading.asReadonly();

	constructor() {
		this.toggleOverflowHidden();
	}

	show(): void {
		this._isAppLoading.set(true);
	}

	hide(): void {
		this._isAppLoading.set(false);
	}

	private toggleOverflowHidden(): void {
		effect(() => {
			document.body.classList.toggle('overflow-hidden', this._isAppLoading());
		});
	}
}
