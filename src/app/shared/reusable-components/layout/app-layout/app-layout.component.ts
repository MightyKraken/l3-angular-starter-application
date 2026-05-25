import {
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	effect,
	ElementRef,
	inject,
	input,
	NgZone,
	signal,
	viewChildren
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
	AppLayoutModeService,
	COMMON_IMPORTS,
	ScreenSizeObserver,
	SidebarLayoutService
} from '@core';

import { AppNavigationBarComponent } from '../app-navigation-bar/app-navigation-bar.component';
import { AppToolBarComponent } from '../app-tool-bar/app-tool-bar.component';

@Component({
	selector: 'app-layout',
	imports: [
		RouterOutlet,
		AppNavigationBarComponent,
		AppToolBarComponent,
		...COMMON_IMPORTS
	],
	templateUrl: './app-layout.component.html',
	styleUrl: './app-layout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent {
	private readonly sidebarLayout = inject(SidebarLayoutService);
	private readonly layoutModeService = inject(AppLayoutModeService);
	private readonly screenSize = inject(ScreenSizeObserver);

	private readonly contentContainers =
		viewChildren<ElementRef<HTMLElement>>('scrollContent');
	private readonly ngZone = inject(NgZone);
	private readonly destroyRef = inject(DestroyRef);
	private removeScrollListeners: Array<() => void> = [];
	private rafId: number | null = null;
	private activeScrollElement: HTMLElement | null = null;
	private pendingScrollTop = 0;
	private lastScrollTop = 0;
	private readonly scrollThreshold = 8;
	private readonly topRevealOffset = 16;
	private wasSidebarOverlay = false;

	readonly showToolbar = input<boolean>(false);
	readonly showNavigation = input<boolean>(false);
	readonly sidebarMode = this.sidebarLayout.mode;
	readonly isToolbarHidden = signal(false);
	readonly layoutMode = this.layoutModeService.layoutMode;

	readonly isSidebarOverlay = computed(
		() => !!this.screenSize.isMobile() || !!this.screenSize.isSmall()
	);

	constructor() {
		effect(() => {
			const isOverlay = this.isSidebarOverlay();

			if (isOverlay && !this.wasSidebarOverlay) {
				const mode = this.sidebarLayout.mode();

				if (mode === 'expanded' || mode === 'mini') {
					this.sidebarLayout.setMode('hidden');
				}
			}

			this.wasSidebarOverlay = isOverlay;
		});

		effect(() => {
			this.contentContainers();
			this.bindScrollListeners();
		});

		this.destroyRef.onDestroy(() => {
			this.clearScrollListeners();

			if (this.rafId !== null) {
				cancelAnimationFrame(this.rafId);
				this.rafId = null;
			}
		});
	}

	closeSidebar(): void {
		this.sidebarLayout.closeSidebar();
	}

	private bindScrollListeners(): void {
		this.clearScrollListeners();

		for (const contentRef of this.contentContainers()) {
			const element = contentRef.nativeElement;

			this.ngZone.runOutsideAngular(() => {
				const onScroll = (): void => {
					this.onNativeContentScroll(element);
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

	private onNativeContentScroll(element: HTMLElement): void {
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
			this.updateToolbarHidden(false);
			this.lastScrollTop = currentScrollTop;
			return;
		}

		const scrollDelta = currentScrollTop - this.lastScrollTop;

		if (scrollDelta > this.scrollThreshold) {
			this.updateToolbarHidden(true);
		} else if (scrollDelta < -this.scrollThreshold) {
			this.updateToolbarHidden(false);
		}

		this.lastScrollTop = currentScrollTop;
	}

	private updateToolbarHidden(hidden: boolean): void {
		if (this.isToolbarHidden() === hidden) {
			return;
		}

		this.ngZone.run(() => {
			this.isToolbarHidden.set(hidden);
		});
	}
}
