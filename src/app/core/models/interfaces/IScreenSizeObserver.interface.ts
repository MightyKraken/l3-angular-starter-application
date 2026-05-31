import { Signal } from '@angular/core';
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
	readonly isGreaterThanMobile: Signal<boolean | undefined>;
	readonly isLessThanMobile: Signal<boolean | undefined>;
	readonly isGreaterThanSmall: Signal<boolean | undefined>;
	readonly isLessThanSmall: Signal<boolean | undefined>;
	readonly isGreaterThanMedium: Signal<boolean | undefined>;
	readonly isLessThanMedium: Signal<boolean | undefined>;
	readonly isGreaterThanLarge: Signal<boolean | undefined>;
	readonly isLessThanLarge: Signal<boolean | undefined>;
	readonly isGreaterThanExtraLarge: Signal<boolean | undefined>;
	readonly isLessThanExtraLarge: Signal<boolean | undefined>;
	readonly screenSize$: Observable<ScreenSize>;
}
