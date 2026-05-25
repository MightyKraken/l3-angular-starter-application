import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';

import { ScrollHideToolbarCoordinator } from './scroll-hide-toolbar-coordinator';

/**
 * Marks a scrollable element whose scroll position drives
 * {@link ScrollHideToolbarDirective}.
 */
@Directive({
	selector: '[appScrollHideToolbarRegion]'
})
export class ScrollHideToolbarRegionDirective {
	private readonly elementRef = inject(ElementRef<HTMLElement>);
	private readonly coordinator = inject(ScrollHideToolbarCoordinator, {
		optional: true
	});
	private readonly destroyRef = inject(DestroyRef);

	constructor() {
		const element = this.elementRef.nativeElement;
		this.coordinator?.register(element);

		this.destroyRef.onDestroy(() => {
			this.coordinator?.unregister(element);
		});
	}
}
