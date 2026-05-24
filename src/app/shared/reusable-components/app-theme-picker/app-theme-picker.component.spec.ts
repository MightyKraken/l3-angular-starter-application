import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucidePalette, provideLucideIcons } from '@lucide/angular';
import { ThemeService } from '@core';

import { AppThemePickerComponent } from './app-theme-picker.component';

describe('AppThemePickerComponent', () => {
	let fixture: ComponentFixture<AppThemePickerComponent>;
	let theme: ThemeService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppThemePickerComponent],
			providers: [provideLucideIcons(LucidePalette)]
		}).compileComponents();

		theme = TestBed.inject(ThemeService);
		theme.initFromStorage();

		fixture = TestBed.createComponent(AppThemePickerComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should render ten palette swatches in a grid', () => {
		const trigger: HTMLButtonElement =
			fixture.nativeElement.querySelector('.theme-picker-trigger');
		trigger.click();
		fixture.detectChanges();

		const options = fixture.nativeElement.querySelectorAll('[role="option"]');
		expect(options.length).toBe(10);
	});

	it('should change palette without changing color scheme', () => {
		expect(theme.colorScheme()).toBe('light');

		const trigger: HTMLButtonElement =
			fixture.nativeElement.querySelector('.theme-picker-trigger');
		trigger.click();
		fixture.detectChanges();

		const options: NodeListOf<HTMLButtonElement> =
			fixture.nativeElement.querySelectorAll('[role="option"]');
		options[1].click();

		expect(theme.paletteId()).toBe('ocean');
		expect(theme.colorScheme()).toBe('light');
	});
});
