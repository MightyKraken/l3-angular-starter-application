import {
	DestroyRef,
	Directive,
	ElementRef,
	inject,
	NgZone,
	OnInit
} from '@angular/core';

import { TOOLBAR_BEHAVIORS } from '../app-toolbar-behavior-picker/toolbar-behavior.const';

export const TOOLBAR_SCROLL_HIDDEN_CLASS = 'is-toolbar-scroll-hidden';

const SCROLL_DELTA_THRESHOLD = 5;
const DEFAULT_TOOLBAR_HEIGHT_PX = 64;
const LAYOUT_SHELL_SELECTOR = '.app-layout-shell';

@Directive({
	selector: '[appScrollAwayToolbar]'
})
export class ScrollAwayToolbarDirective implements OnInit {
	private readonly elementRef = inject(ElementRef<HTMLElement>);
	private readonly ngZone = inject(NgZone);
	private readonly destroyRef = inject(DestroyRef);

	private shell: HTMLElement | null = null;
	private lastScrollTop = 0;
	private toolbarHeightPx = DEFAULT_TOOLBAR_HEIGHT_PX;
	private scrollHandler: (() => void) | null = null;
	private resizeObserver: ResizeObserver | null = null;
	private toolbarHidden = false;

	ngOnInit(): void {
		const scrollElement = this.elementRef.nativeElement;
		this.shell = scrollElement.closest(LAYOUT_SHELL_SELECTOR);

		if (!this.shell || !this.isScrollAwayBehavior()) {
			return;
		}

		// if (this.prefersReducedMotion()) {
		// 	return;
		// }

		this.refreshToolbarHeight();
		this.lastScrollTop = scrollElement.scrollTop;

		this.scrollHandler = () => this.onScroll();
		this.ngZone.runOutsideAngular(() => {
			scrollElement.addEventListener('scroll', this.scrollHandler!, {
				passive: true
			});
		});

		if (typeof ResizeObserver !== 'undefined') {
			this.resizeObserver = new ResizeObserver(() =>
				this.refreshToolbarHeight()
			);
			this.resizeObserver.observe(this.shell);
		}

		this.destroyRef.onDestroy(() => this.teardown());
	}

	private teardown(): void {
		const scrollElement = this.elementRef.nativeElement;

		if (this.scrollHandler) {
			scrollElement.removeEventListener('scroll', this.scrollHandler);
			this.scrollHandler = null;
		}

		this.resizeObserver?.disconnect();
		this.resizeObserver = null;
		this.toolbarHidden = false;
		this.shell?.classList.remove(TOOLBAR_SCROLL_HIDDEN_CLASS);
	}

	private onScroll(): void {
		if (!this.shell) {
			return;
		}

		if (!this.isScrollAwayBehavior()) {
			this.setToolbarHidden(false);
			return;
		}

		const scrollElement = this.elementRef.nativeElement;
		const scrollTop = scrollElement.scrollTop;

		if (scrollTop < this.toolbarHeightPx) {
			this.setToolbarHidden(false);
			this.lastScrollTop = scrollTop;
			return;
		}

		const delta = scrollTop - this.lastScrollTop;

		if (Math.abs(delta) < SCROLL_DELTA_THRESHOLD) {
			return;
		}

		if (delta > 0) {
			this.setToolbarHidden(true);
		} else {
			this.setToolbarHidden(false);
		}

		this.lastScrollTop = scrollTop;
	}

	private isScrollAwayBehavior(): boolean {
		return (
			this.shell?.getAttribute('data-toolbar-behavior') ===
			TOOLBAR_BEHAVIORS.scrollAway
		);
	}

	private setToolbarHidden(hidden: boolean): void {
		if (this.toolbarHidden === hidden) {
			return;
		}

		this.toolbarHidden = hidden;
		this.shell?.classList.toggle(TOOLBAR_SCROLL_HIDDEN_CLASS, hidden);
	}

	private refreshToolbarHeight(): void {
		if (!this.shell) {
			return;
		}

		const raw = getComputedStyle(this.shell)
			.getPropertyValue('--toolbar-height')
			.trim();
		const parsed = parseFloat(raw);

		this.toolbarHeightPx =
			Number.isFinite(parsed) && parsed > 0
				? parsed
				: DEFAULT_TOOLBAR_HEIGHT_PX;
	}

	private prefersReducedMotion(): boolean {
		if (typeof window.matchMedia !== 'function') {
			return false;
		}

		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}
}
