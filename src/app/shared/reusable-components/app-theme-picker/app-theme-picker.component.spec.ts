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

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppThemePickerComponent],
			providers: [provideLucideIcons(LucidePalette, LucideCheck)]
		}).compileComponents();

		theme = TestBed.inject(ThemeService);
		theme.initFromStorage();

		fixture = TestBed.createComponent(AppThemePickerComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should render all daisy themes in the menu', () => {
		const options = fixture.nativeElement.querySelectorAll('[role="option"]');
		expect(options.length).toBe(DAISY_THEME_IDS.length);
	});

	it('should change theme when an option is selected', () => {
		const options: NodeListOf<HTMLButtonElement> =
			fixture.nativeElement.querySelectorAll('[role="option"]');
		options[1].click();
		fixture.detectChanges();

		expect(theme.themeId()).toBe('dark');
	});
});
