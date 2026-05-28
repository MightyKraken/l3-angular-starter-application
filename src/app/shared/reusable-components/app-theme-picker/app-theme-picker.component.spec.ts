import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ThemeService } from '@core';
import { LucidePalette, provideLucideIcons } from '@lucide/angular';

import { AppThemePickerComponent } from './app-theme-picker.component';

describe('AppThemePickerComponent', () => {
	let fixture: ComponentFixture<AppThemePickerComponent>;
	let theme: ThemeService;
	let overlayContainer: OverlayContainer;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppThemePickerComponent],
			providers: [provideNoopAnimations(), provideLucideIcons(LucidePalette)]
		}).compileComponents();

		theme = TestBed.inject(ThemeService);
		overlayContainer = TestBed.inject(OverlayContainer);
		theme.initFromStorage();

		fixture = TestBed.createComponent(AppThemePickerComponent);
		fixture.detectChanges();
	});

	afterEach(() => {
		overlayContainer.ngOnDestroy();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should render ten palette swatches in a grid', () => {
		const trigger: HTMLButtonElement = fixture.nativeElement.querySelector(
			'button[aria-label="Choose theme"]'
		)!;
		trigger.click();
		fixture.detectChanges();

		const options = overlayContainer
			.getContainerElement()
			.querySelectorAll('[role="option"]');
		expect(options.length).toBe(10);
	});

	it('should change palette without changing color scheme', () => {
		expect(theme.colorScheme()).toBe('light');

		const trigger: HTMLButtonElement = fixture.nativeElement.querySelector(
			'button[aria-label="Choose theme"]'
		)!;
		trigger.click();
		fixture.detectChanges();

		const options: NodeListOf<HTMLButtonElement> = overlayContainer
			.getContainerElement()
			.querySelectorAll('[role="option"]');
		options[1].click();
		fixture.detectChanges();

		expect(theme.paletteId()).toBe('ocean');
		expect(theme.colorScheme()).toBe('light');
	});
});
