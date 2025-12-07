import { computed, Directive, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent, map, startWith, tap } from 'rxjs';

import { ScreenBreakPoints } from '../constants/screen-break-points.const';

interface WindowSize {
	width: number;
	height: number;
}

@Directive({
	standalone: true
})
export class ScreenSizeDirective {
	private readonly resize$ =
		typeof window !== 'undefined'
			? fromEvent(window, 'resize').pipe(
					debounceTime(300),
					tap(() => {
						console.log('wowman');
					}),
					map(
						(): WindowSize => ({
							width: window.innerWidth,
							height: window.innerHeight
						})
					),
					startWith({
						width: window.innerWidth,
						height: window.innerHeight
					})
				)
			: undefined;

	private readonly windowSize: Signal<WindowSize> = toSignal(this.resize$!, {
		initialValue:
			typeof window !== 'undefined'
				? { width: window.innerWidth, height: window.innerHeight }
				: { width: 0, height: 0 }
	});

	readonly width = computed(() => this.windowSize().width);
	readonly height = computed(() => this.windowSize().height);

	readonly isMobile = computed(
		() => this.width() <= ScreenBreakPoints.ScreenBreakWidthMobile
	);

	readonly isSmall = computed(
		() => this.width() <= ScreenBreakPoints.ScreenBreakWidthSmall
	);

	readonly isMedium = computed(
		() => this.width() <= ScreenBreakPoints.ScreenBreakWidthMedium
	);

	readonly isLarge = computed(
		() => this.width() > ScreenBreakPoints.ScreenBreakWidthMedium
	);
}
