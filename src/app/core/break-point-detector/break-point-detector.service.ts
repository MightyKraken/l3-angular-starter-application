import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
	fromEvent,
	map,
	Observable,
	shareReplay,
	startWith,
	throttleTime
} from 'rxjs';

import {
	IScreenSizeObserver,
	ScreenSize
} from './IScreenSizeObserver.interface';
import { ScreenBreakPoints } from './screen-break-points.const';

@Injectable({
	providedIn: 'root'
})
export class BreakPointDetectorService implements IScreenSizeObserver {
	private readonly breakpointObserver = inject(BreakpointObserver);

	// <= 600px
	readonly isMobile = toSignal(
		this.breakpointObserver
			.observe(`(max-width: ${ScreenBreakPoints.ScreenBreakWidthMobile}px)`)
			.pipe(map((result) => result.matches)),
		{ initialValue: false }
	);

	// 601px - 768px
	readonly isSmall = toSignal(
		this.breakpointObserver
			.observe(
				`(min-width: ${ScreenBreakPoints.ScreenBreakWidthMobile + 1}px) and (max-width: ${ScreenBreakPoints.ScreenBreakWidthSmall}px)`
			)
			.pipe(map((result) => result.matches)),
		{ initialValue: false }
	);

	// 769px - 1024px
	readonly isMedium = toSignal(
		this.breakpointObserver
			.observe(
				`(min-width: ${ScreenBreakPoints.ScreenBreakWidthSmall + 1}px) and (max-width: ${ScreenBreakPoints.ScreenBreakWidthMedium}px)`
			)
			.pipe(map((result) => result.matches)),
		{ initialValue: false }
	);

	// 1025px - 1200px
	readonly isLarge = toSignal(
		this.breakpointObserver
			.observe(
				`(min-width: ${ScreenBreakPoints.ScreenBreakWidthMedium + 1}px) and (max-width: ${ScreenBreakPoints.ScreenBreakWidthLarge}px)`
			)
			.pipe(map((result) => result.matches)),
		{ initialValue: false }
	);

	// > 1200px
	readonly isExtraLarge = toSignal(
		this.breakpointObserver
			.observe(`(min-width: ${ScreenBreakPoints.ScreenBreakWidthLarge + 1}px)`)
			.pipe(map((result) => result.matches)),
		{ initialValue: false }
	);

	readonly isGreaterThanMobile = computed(() => !this.isMobile());
	readonly isLessThanMobile = computed(() => this.isMobile());

	readonly isGreaterThanSmall = computed(
		() => this.isMedium() || this.isLarge() || this.isExtraLarge()
	);
	readonly isLessThanSmall = computed(() => this.isMobile());

	readonly isGreaterThanMedium = computed(
		() => this.isLarge() || this.isExtraLarge()
	);
	readonly isLessThanMedium = computed(() => this.isMobile() || this.isSmall());

	readonly isGreaterThanLarge = computed(() => this.isExtraLarge());
	readonly isLessThanLarge = computed(
		() => this.isMobile() || this.isSmall() || this.isMedium()
	);

	readonly isGreaterThanExtraLarge = computed(() => this.isExtraLarge());
	readonly isLessThanExtraLarge = computed(() => !this.isExtraLarge());

	readonly screenSize$: Observable<ScreenSize> = fromEvent(
		window,
		'resize'
	).pipe(
		throttleTime(500),
		startWith(null),
		map(() => ({
			width: window.innerWidth,
			height: window.innerHeight
		})),
		shareReplay({ bufferSize: 1, refCount: true })
	);
}
