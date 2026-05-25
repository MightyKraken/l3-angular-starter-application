import { DestroyRef, inject, Injectable, NgZone, signal } from '@angular/core';

/**
 * Tracks scroll on registered regions and exposes whether a collapsible toolbar
 * should be hidden. Provided by {@link ScrollHideToolbarDirective}.
 */
@Injectable()
export class ScrollHideToolbarCoordinator {
	private readonly ngZone = inject(NgZone);
	private readonly destroyRef = inject(DestroyRef);

	private readonly regions = new Set<HTMLElement>();
	private removeScrollListeners: Array<() => void> = [];
	private rafId: number | null = null;
	private activeScrollElement: HTMLElement | null = null;
	private pendingScrollTop = 0;
	private lastScrollTop = 0;

	readonly hidden = signal(false);

	scrollThreshold = 8;
	topRevealOffset = 16;

	constructor() {
		this.destroyRef.onDestroy(() => {
			this.clearScrollListeners();

			if (this.rafId !== null) {
				cancelAnimationFrame(this.rafId);
				this.rafId = null;
			}
		});
	}

	register(element: HTMLElement): void {
		this.regions.add(element);
		this.bindScrollListeners();
	}

	unregister(element: HTMLElement): void {
		this.regions.delete(element);

		if (this.activeScrollElement === element) {
			this.activeScrollElement = null;
		}

		this.bindScrollListeners();

		if (this.regions.size === 0) {
			this.setHidden(false);
		}
	}

	private bindScrollListeners(): void {
		this.clearScrollListeners();

		for (const element of this.regions) {
			this.ngZone.runOutsideAngular(() => {
				const onScroll = (): void => {
					this.onNativeScroll(element);
				};

				element.addEventListener('scroll', onScroll, { passive: true });
				this.removeScrollListeners.push(() => {
					element.removeEventListener('scroll', onScroll);
				});
			});
		}
	}

	private clearScrollListeners(): void {
		for (const removeListener of this.removeScrollListeners) {
			removeListener();
		}

		this.removeScrollListeners = [];
	}

	private onNativeScroll(element: HTMLElement): void {
		if (this.activeScrollElement !== element) {
			this.activeScrollElement = element;
			this.lastScrollTop = Math.max(0, element.scrollTop);
		}

		this.pendingScrollTop = Math.max(0, element.scrollTop);

		if (this.rafId !== null) {
			return;
		}

		this.rafId = requestAnimationFrame(() => {
			this.rafId = null;
			this.processScroll(this.pendingScrollTop);
		});
	}

	private processScroll(currentScrollTop: number): void {
		if (currentScrollTop <= this.topRevealOffset) {
			this.setHidden(false);
			this.lastScrollTop = currentScrollTop;
			return;
		}

		const scrollDelta = currentScrollTop - this.lastScrollTop;

		if (scrollDelta > this.scrollThreshold) {
			this.setHidden(true);
		} else if (scrollDelta < -this.scrollThreshold) {
			this.setHidden(false);
		}

		this.lastScrollTop = currentScrollTop;
	}

	private setHidden(hidden: boolean): void {
		if (this.hidden() === hidden) {
			return;
		}

		this.ngZone.run(() => {
			this.hidden.set(hidden);
		});
	}
}
