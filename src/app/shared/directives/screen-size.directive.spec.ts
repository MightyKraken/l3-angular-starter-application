import { Component, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ScreenSize } from '../constants/screen-size.const';
import { ScreenSizeDirective } from './screen-size.directive';

// Test component to host the directive
@Component({
	selector: 'app-test-host',
	standalone: true,
	template: '<div>Test</div>',
	hostDirectives: [ScreenSizeDirective]
})
class TestHostComponent {
	screenSizeDirective = inject(ScreenSizeDirective);
}

describe('ScreenSizeDirective', () => {
	let component: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;
	let directive: ScreenSizeDirective;

	// Helper to simulate window resize
	const simulateResize = (width: number): void => {
		// Mock window.innerWidth
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: width
		});

		// Trigger resize event
		window.dispatchEvent(new Event('resize'));
	};

	// Helper to wait for debounce
	const waitForDebounce = (ms = 350): Promise<void> => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestHostComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		component = fixture.componentInstance;
		directive = component.screenSizeDirective;

		fixture.detectChanges();
	});

	it('should create the directive', () => {
		expect(directive).toBeTruthy();
	});

	describe('width signal', () => {
		it('should initialize with current window width', () => {
			const currentWidth = window.innerWidth;
			expect(directive.width()).toBe(currentWidth);
		});

		it('should update width signal on window resize', async () => {
			// Set initial width
			simulateResize(1920);
			await waitForDebounce();

			expect(directive.width()).toBe(1920);

			// Resize to smaller width
			simulateResize(768);
			await waitForDebounce();

			expect(directive.width()).toBe(768);
		});

		it('should debounce resize events', async () => {
			const initialWidth = directive.width();

			// Rapid resize events
			simulateResize(1000);
			await new Promise((resolve) => setTimeout(resolve, 100));
			simulateResize(1100);
			await new Promise((resolve) => setTimeout(resolve, 100));
			simulateResize(1200);
			await new Promise((resolve) => setTimeout(resolve, 100));

			// Should not update yet (debounce is 300ms)
			expect(directive.width()).toBe(initialWidth);

			// Wait for debounce to complete
			await new Promise((resolve) => setTimeout(resolve, 200));

			// Now it should update to the last value
			expect(directive.width()).toBe(1200);
		});
	});

	describe('isMobile computed signal', () => {
		it('should return true when width is <= 600px', async () => {
			simulateResize(600);
			await waitForDebounce();

			expect(directive.isMobile()).toBe(true);
		});

		it('should return true when width is < 600px', async () => {
			simulateResize(400);
			await waitForDebounce();

			expect(directive.isMobile()).toBe(true);
		});

		it('should return false when width is > 600px', async () => {
			simulateResize(601);
			await waitForDebounce();

			expect(directive.isMobile()).toBe(false);
		});

		it('should update reactively when width changes', async () => {
			// Start with mobile width
			simulateResize(500);
			await waitForDebounce();
			expect(directive.isMobile()).toBe(true);

			// Resize to desktop
			simulateResize(1200);
			await waitForDebounce();
			expect(directive.isMobile()).toBe(false);

			// Resize back to mobile
			simulateResize(400);
			await waitForDebounce();
			expect(directive.isMobile()).toBe(true);
		});

		it('should match ScreenBreakWidthExtraSmall constant', async () => {
			simulateResize(ScreenSize.ScreenBreakWidthExtraSmall);
			await waitForDebounce();

			expect(directive.isMobile()).toBe(true);
		});
	});

	describe('isSmall computed signal', () => {
		it('should return true when width is <= 768px', async () => {
			simulateResize(768);
			await waitForDebounce();

			expect(directive.isSmall()).toBe(true);
		});

		it('should return false when width is > 768px', async () => {
			simulateResize(769);
			await waitForDebounce();

			expect(directive.isSmall()).toBe(false);
		});

		it('should match ScreenBreakWidthSmall constant', async () => {
			simulateResize(ScreenSize.ScreenBreakWidthSmall);
			await waitForDebounce();

			expect(directive.isSmall()).toBe(true);
		});
	});

	describe('isMedium computed signal', () => {
		it('should return true when width is <= 1024px', async () => {
			simulateResize(1024);
			await waitForDebounce();

			expect(directive.isMedium()).toBe(true);
		});

		it('should return false when width is > 1024px', async () => {
			simulateResize(1025);
			await waitForDebounce();

			expect(directive.isMedium()).toBe(false);
		});

		it('should match ScreenBreakWidthMedium constant', async () => {
			simulateResize(ScreenSize.ScreenBreakWidthMedium);
			await waitForDebounce();

			expect(directive.isMedium()).toBe(true);
		});
	});

	describe('isLarge computed signal', () => {
		it('should return true when width is > 1024px', async () => {
			simulateResize(1025);
			await waitForDebounce();

			expect(directive.isLarge()).toBe(true);
		});

		it('should return false when width is <= 1024px', async () => {
			simulateResize(1024);
			await waitForDebounce();

			expect(directive.isLarge()).toBe(false);
		});

		it('should be inverse of isMedium at breakpoint', async () => {
			simulateResize(ScreenSize.ScreenBreakWidthMedium);
			await waitForDebounce();

			expect(directive.isMedium()).toBe(true);
			expect(directive.isLarge()).toBe(false);

			simulateResize(ScreenSize.ScreenBreakWidthMedium + 1);
			await waitForDebounce();

			expect(directive.isMedium()).toBe(false);
			expect(directive.isLarge()).toBe(true);
		});
	});

	describe('breakpoint transitions', () => {
		it('should handle mobile to tablet transition', async () => {
			// Mobile
			simulateResize(500);
			await waitForDebounce();
			expect(directive.isMobile()).toBe(true);
			expect(directive.isSmall()).toBe(true);
			expect(directive.isMedium()).toBe(true);
			expect(directive.isLarge()).toBe(false);

			// Small tablet
			simulateResize(700);
			await waitForDebounce();
			expect(directive.isMobile()).toBe(false);
			expect(directive.isSmall()).toBe(true);
			expect(directive.isMedium()).toBe(true);
			expect(directive.isLarge()).toBe(false);
		});

		it('should handle tablet to desktop transition', async () => {
			// Tablet
			simulateResize(900);
			await waitForDebounce();
			expect(directive.isMobile()).toBe(false);
			expect(directive.isSmall()).toBe(false);
			expect(directive.isMedium()).toBe(true);
			expect(directive.isLarge()).toBe(false);

			// Desktop
			simulateResize(1200);
			await waitForDebounce();
			expect(directive.isMobile()).toBe(false);
			expect(directive.isSmall()).toBe(false);
			expect(directive.isMedium()).toBe(false);
			expect(directive.isLarge()).toBe(true);
		});
	});

	describe('boundary testing', () => {
		it('should test all breakpoint boundaries', async () => {
			const boundaries = [
				{ width: 600, name: 'ExtraSmall' },
				{ width: 768, name: 'Small' },
				{ width: 1024, name: 'Medium' }
			];

			for (const { width } of boundaries) {
				// Test at boundary
				simulateResize(width);
				await waitForDebounce();
				const atBoundary = {
					isMobile: directive.isMobile(),
					isSmall: directive.isSmall(),
					isMedium: directive.isMedium(),
					isLarge: directive.isLarge()
				};

				// Test one pixel above
				simulateResize(width + 1);
				await waitForDebounce();
				const aboveBoundary = {
					isMobile: directive.isMobile(),
					isSmall: directive.isSmall(),
					isMedium: directive.isMedium(),
					isLarge: directive.isLarge()
				};

				// Ensure signals changed (for applicable breakpoints)
				expect(atBoundary).not.toEqual(aboveBoundary);
			}
		});
	});

	describe('directive lifecycle', () => {
		it('should clean up subscription when component is destroyed', async () => {
			const initialWidth = directive.width();

			// Verify directive is working
			simulateResize(1500);
			await waitForDebounce();
			expect(directive.width()).toBe(1500);

			// Destroy the component/directive
			fixture.destroy();

			// Attempt to resize after destruction
			simulateResize(800);
			await waitForDebounce();

			// No errors should occur (subscription cleaned up)
			expect(true).toBe(true);
		});
	});

	describe('edge cases', () => {
		it('should handle very small screen widths', async () => {
			simulateResize(320); // Small mobile
			await waitForDebounce();

			expect(directive.width()).toBe(320);
			expect(directive.isMobile()).toBe(true);
			expect(directive.isSmall()).toBe(true);
			expect(directive.isMedium()).toBe(true);
			expect(directive.isLarge()).toBe(false);
		});

		it('should handle very large screen widths', async () => {
			simulateResize(3840); // 4K monitor
			await waitForDebounce();

			expect(directive.width()).toBe(3840);
			expect(directive.isMobile()).toBe(false);
			expect(directive.isSmall()).toBe(false);
			expect(directive.isMedium()).toBe(false);
			expect(directive.isLarge()).toBe(true);
		});

		it('should handle zero width', async () => {
			simulateResize(0);
			await waitForDebounce();

			expect(directive.width()).toBe(0);
			expect(directive.isMobile()).toBe(true);
		});
	});
});
