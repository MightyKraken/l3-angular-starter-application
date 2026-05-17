import { InjectionToken, Signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface ScreenSize {
	width: number;
	height: number;
}

export interface IScreenSizeObserver {
	readonly isMobile: Signal<boolean | undefined>;
	readonly isSmall: Signal<boolean | undefined>;
	readonly isMedium: Signal<boolean | undefined>;
	readonly isLarge: Signal<boolean | undefined>;
	readonly isExtraLarge: Signal<boolean | undefined>;
	readonly screenSize$: Observable<ScreenSize>;
}

export const ScreenSizeObserver = new InjectionToken<IScreenSizeObserver>(
	'ScreenSizeObserver'
);
