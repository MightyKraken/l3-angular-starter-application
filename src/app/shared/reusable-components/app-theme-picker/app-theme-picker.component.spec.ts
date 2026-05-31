import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DAISY_THEME_IDS, ThemeService } from '@core';
import {
	LucideCheck,
	LucidePalette,
	provideLucideIcons
} from '@lucide/angular';

import { AppThemePickerComponent } from './app-theme-picker.component';

describe('AppThemePickerComponent', () => {
	let fixture: ComponentFixture<AppThemePickerComponent>;
	let theme: ThemeService;
	let host: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppThemePickerComponent],
			providers: [provideLucideIcons(LucidePalette, LucideCheck)]
		}).compileComponents();

		theme = TestBed.inject(ThemeService);
		theme.initFromStorage();

		fixture = TestBed.createComponent(AppThemePickerComponent);
		fixture.detectChanges();
		host = fixture.nativeElement;
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should render all daisy themes in the menu', () => {
		const options = host.querySelectorAll('[role="option"]');
		expect(options.length).toBe(Object.values(DAISY_THEME_IDS).length);
	});

	it('should change theme when an option is selected', () => {
		const options: NodeListOf<HTMLButtonElement> =
			host.querySelectorAll('[role="option"]');
		options[1].click();
		fixture.detectChanges();

		expect(theme.themeId()).toBe('dark');
	});

	it('should close on Escape when the menu is open', () => {
		const trigger = host.querySelector(
			'[aria-label="Choose theme"]'
		) as HTMLElement;
		trigger.focus();
		fixture.componentInstance.onFocusIn();
		fixture.detectChanges();

		fixture.componentInstance.onKeydown(
			new KeyboardEvent('keydown', { key: 'Escape' })
		);
		fixture.detectChanges();

		const dropdown = host.querySelector('.dropdown')!;

		expect(trigger.getAttribute('aria-expanded')).toBe('false');
		expect(dropdown.classList.contains('dropdown-close')).toBe(true);
	});

	it('should move focus with arrow keys when the menu is open', () => {
		const trigger = host.querySelector(
			'[aria-label="Choose theme"]'
		) as HTMLElement;
		const options = host.querySelectorAll<HTMLButtonElement>('[role="option"]');

		trigger.focus();
		fixture.componentInstance.onFocusIn();
		fixture.detectChanges();

		fixture.componentInstance.onKeydown(
			new KeyboardEvent('keydown', { key: 'ArrowDown' })
		);
		fixture.detectChanges();

		expect(document.activeElement).toBe(options[0]);

		fixture.componentInstance.onKeydown(
			new KeyboardEvent('keydown', { key: 'ArrowDown' })
		);
		fixture.detectChanges();

		expect(document.activeElement).toBe(options[1]);
	});
});
