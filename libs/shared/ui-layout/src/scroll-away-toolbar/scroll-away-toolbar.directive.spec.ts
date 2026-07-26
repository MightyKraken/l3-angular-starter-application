import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TOOLBAR_BEHAVIORS } from '../app-toolbar-behavior-picker/toolbar-behavior.const';
import {
	ScrollAwayToolbarDirective,
	TOOLBAR_SCROLL_HIDDEN_CLASS
} from './scroll-away-toolbar.directive';

@Component({
	imports: [ScrollAwayToolbarDirective],
	template: `
		<div
			class="app-layout-shell"
			[attr.data-toolbar-behavior]="behavior()"
			style="--toolbar-height: 64px"
		>
			<div class="content" style="height: 200px; overflow: hidden">
				<div
					#scrollHost
					class="content-scroll"
					appScrollAwayToolbar
					style="height: 100%; overflow: auto"
				>
					<div style="height: 2000px"></div>
				</div>
			</div>
		</div>
	`
})
class TestHostComponent {
	readonly behavior = signal<string>(TOOLBAR_BEHAVIORS.scrollAway);
}

@Component({
	imports: [ScrollAwayToolbarDirective],
	template: `
		<div
			class="app-layout-shell"
			[attr.data-toolbar-behavior]="behavior()"
			style="--toolbar-height: 64px"
		>
			<div class="content" style="height: 200px; overflow: hidden">
				<div
					#scrollHost
					class="content-scroll"
					appScrollAwayToolbar
					style="height: 100%; overflow: auto"
				>
					<div style="height: 2000px"></div>
				</div>
			</div>
		</div>
	`
})
class FixedFirstHostComponent {
	readonly behavior = signal<string>(TOOLBAR_BEHAVIORS.fixed);
}

describe('ScrollAwayToolbarDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let scrollHost: HTMLElement;
	let shell: HTMLElement;

	const dispatchScroll = (scrollTop: number): void => {
		Object.defineProperty(scrollHost, 'scrollTop', {
			configurable: true,
			writable: true,
			value: scrollTop
		});
		scrollHost.dispatchEvent(new Event('scroll'));
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestHostComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
		// afterNextRender setup runs after the first CD cycle
		await fixture.whenStable();
		fixture.detectChanges();

		scrollHost = fixture.nativeElement.querySelector(
			'.content-scroll'
		) as HTMLElement;
		shell = fixture.nativeElement.querySelector(
			'.app-layout-shell'
		) as HTMLElement;
	});

	it('should attach after switching from fixed to scroll-away', async () => {
		const fixedFixture = TestBed.createComponent(FixedFirstHostComponent);
		fixedFixture.detectChanges();
		await fixedFixture.whenStable();
		fixedFixture.detectChanges();

		const fixedScrollHost = fixedFixture.nativeElement.querySelector(
			'.content-scroll'
		) as HTMLElement;
		const fixedShell = fixedFixture.nativeElement.querySelector(
			'.app-layout-shell'
		) as HTMLElement;

		fixedFixture.componentInstance.behavior.set(TOOLBAR_BEHAVIORS.scrollAway);
		fixedFixture.detectChanges();
		await fixedFixture.whenStable();

		Object.defineProperty(fixedScrollHost, 'scrollTop', {
			configurable: true,
			writable: true,
			value: 120
		});
		fixedScrollHost.dispatchEvent(new Event('scroll'));

		expect(fixedShell.classList.contains(TOOLBAR_SCROLL_HIDDEN_CLASS)).toBe(
			true
		);
	});

	it('should not hide when scrolling down within toolbar height zone', () => {
		dispatchScroll(40);

		expect(shell.classList.contains(TOOLBAR_SCROLL_HIDDEN_CLASS)).toBe(false);
	});

	it('should hide when scrolling down past toolbar height', () => {
		dispatchScroll(80);

		expect(shell.classList.contains(TOOLBAR_SCROLL_HIDDEN_CLASS)).toBe(true);
	});

	it('should show when scrolling up from mid-page without reaching top', () => {
		dispatchScroll(120);
		expect(shell.classList.contains(TOOLBAR_SCROLL_HIDDEN_CLASS)).toBe(true);

		dispatchScroll(100);

		expect(shell.classList.contains(TOOLBAR_SCROLL_HIDDEN_CLASS)).toBe(false);
	});

	it('should show when scrolling into top toolbar-height zone', () => {
		dispatchScroll(120);
		expect(shell.classList.contains(TOOLBAR_SCROLL_HIDDEN_CLASS)).toBe(true);

		dispatchScroll(40);

		expect(shell.classList.contains(TOOLBAR_SCROLL_HIDDEN_CLASS)).toBe(false);
	});

	it('should not hide when behavior is fixed', () => {
		fixture.componentInstance.behavior.set(TOOLBAR_BEHAVIORS.fixed);
		fixture.detectChanges();

		dispatchScroll(120);

		expect(shell.classList.contains(TOOLBAR_SCROLL_HIDDEN_CLASS)).toBe(false);
	});

	it('should clear hidden class on destroy', () => {
		dispatchScroll(120);
		expect(shell.classList.contains(TOOLBAR_SCROLL_HIDDEN_CLASS)).toBe(true);

		fixture.destroy();

		expect(shell.classList.contains(TOOLBAR_SCROLL_HIDDEN_CLASS)).toBe(false);
	});
});
