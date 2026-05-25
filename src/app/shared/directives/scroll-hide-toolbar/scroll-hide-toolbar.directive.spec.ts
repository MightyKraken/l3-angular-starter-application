import { Component, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollHideToolbarDirective } from './scroll-hide-toolbar.directive';
import { ScrollHideToolbarRegionDirective } from './scroll-hide-toolbar-region.directive';

@Component({
	selector: 'app-scroll-hide-toolbar-host',
	imports: [ScrollHideToolbarRegionDirective],
	hostDirectives: [ScrollHideToolbarDirective],
	template: `<div appScrollHideToolbarRegion class="scroll-region"></div>`
})
class ScrollHideToolbarHostComponent {
	readonly scrollHideToolbar = inject(ScrollHideToolbarDirective);
}

async function flushAnimationFrames(count = 2): Promise<void> {
	for (let i = 0; i < count; i++) {
		await new Promise<void>((resolve) =>
			requestAnimationFrame(() => resolve())
		);
	}
}

describe('ScrollHideToolbarDirective', () => {
	let fixture: ComponentFixture<ScrollHideToolbarHostComponent>;
	let scrollRegion: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ScrollHideToolbarHostComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ScrollHideToolbarHostComponent);
		scrollRegion = fixture.nativeElement.querySelector(
			'.scroll-region'
		) as HTMLElement;
		Object.defineProperty(scrollRegion, 'scrollTop', {
			writable: true,
			value: 0
		});
		fixture.detectChanges();
	});

	it('should start with toolbar visible', () => {
		expect(fixture.componentInstance.scrollHideToolbar.hidden()).toBe(false);
	});

	it('should hide toolbar when scrolling down past threshold', async () => {
		scrollRegion.scrollTop = 10;
		scrollRegion.dispatchEvent(new Event('scroll'));
		await flushAnimationFrames();

		scrollRegion.scrollTop = 40;
		scrollRegion.dispatchEvent(new Event('scroll'));
		await flushAnimationFrames();
		fixture.detectChanges();

		expect(fixture.componentInstance.scrollHideToolbar.hidden()).toBe(true);
	});

	it('should show toolbar when scrolling back to top', async () => {
		scrollRegion.scrollTop = 10;
		scrollRegion.dispatchEvent(new Event('scroll'));
		await flushAnimationFrames();

		scrollRegion.scrollTop = 40;
		scrollRegion.dispatchEvent(new Event('scroll'));
		await flushAnimationFrames();

		scrollRegion.scrollTop = 0;
		scrollRegion.dispatchEvent(new Event('scroll'));
		await flushAnimationFrames();
		fixture.detectChanges();

		expect(fixture.componentInstance.scrollHideToolbar.hidden()).toBe(false);
	});
});
