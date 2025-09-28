import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AppLoaderService {
	private _isAppLoading = new BehaviorSubject<boolean>(false);

	isAppLoading$ = this._isAppLoading.asObservable();

	show(): void {
		this._isAppLoading.next(true);
	}

	hide(): void {
		this._isAppLoading.next(false);
	}
}
