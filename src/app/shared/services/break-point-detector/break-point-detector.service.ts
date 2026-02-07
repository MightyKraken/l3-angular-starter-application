import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    fromEvent,
    map,
    Observable,
    shareReplay,
    startWith,
    throttleTime
} from 'rxjs';
import { ScreenBreakPoints } from '../../constants/screen-break-points.const';
import {
    IScreenSizeObserver,
    ScreenSize
} from '../../interfaces/IScreenSizeObserver.interface';

@Injectable()
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
		shareReplay(1)
	);

	// Zone changeDetection Implementation
	//     readonly screenSize$: Observable<any> = this.createScreenSize$();

	//   private createScreenSize$(): Observable<any> {
	//     const resize$ = new Subject<Event>();

	//     this.zone.runOutsideAngular(() => {
	//       window.addEventListener('resize', (e) => resize$.next(e));
	//     });

	//     return resize$.pipe(
	//       throttleTime(500),
	//       startWith(null),
	//       map(() => ({
	//         width: window.innerWidth,
	//         height: window.innerHeight,
	//       })),
	//       shareReplay(1),
	//     );
	//   }
}
