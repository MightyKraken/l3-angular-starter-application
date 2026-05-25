import { Directive, effect, inject, input } from '@angular/core';

import { ScrollHideToolbarCoordinator } from './scroll-hide-toolbar-coordinator';

/**
 * Hides a toolbar when the user scrolls down registered content regions.
 *
 * Attach to a layout host via `hostDirectives`, mark scroll containers with
 * {@link ScrollHideToolbarRegionDirective}, and bind `hidden()` to toolbar classes.
 *
 * @example
 * ```typescript
 * @Component({
 *   hostDirectives: [ScrollHideToolbarDirective],
 *   imports: [ScrollHideToolbarRegionDirective],
 * })
 * export class AppLayoutComponent {
 *   protected readonly scrollHideToolbar = inject(ScrollHideToolbarDirective);
 * }
 * ```
 */
@Directive({
	selector: '[appScrollHideToolbar]',
	providers: [ScrollHideToolbarCoordinator],
	exportAs: 'scrollHideToolbar'
})
export class ScrollHideToolbarDirective {
	private readonly coordinator = inject(ScrollHideToolbarCoordinator);

	readonly hidden = this.coordinator.hidden;

	readonly scrollThreshold = input(8, {
		alias: 'appScrollHideToolbarScrollThreshold'
	});
	readonly topRevealOffset = input(16, {
		alias: 'appScrollHideToolbarTopRevealOffset'
	});

	constructor() {
		effect(() => {
			this.coordinator.scrollThreshold = this.scrollThreshold();
			this.coordinator.topRevealOffset = this.topRevealOffset();
		});
	}
}
