import { computed, Directive, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent, map, startWith, tap } from 'rxjs';

import { ScreenSize } from '../constants/screen-size.const';

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
		() => this.width() <= ScreenSize.ScreenBreakWidthExtraSmall
	);

	readonly isSmall = computed(
		() => this.width() <= ScreenSize.ScreenBreakWidthSmall
	);

	readonly isMedium = computed(
		() => this.width() <= ScreenSize.ScreenBreakWidthMedium
	);

	readonly isLarge = computed(
		() => this.width() > ScreenSize.ScreenBreakWidthMedium
	);
}
