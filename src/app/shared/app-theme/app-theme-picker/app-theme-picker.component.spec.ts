import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	LucideCheck,
	LucidePalette,
	provideLucideIcons
} from '@lucide/angular';

import { DAISY_THEME_IDS } from '../theme.const';
import { ThemeService } from '../theme.service';
import { AppThemePickerComponent } from './app-theme-picker.component';

describe('AppThemePickerComponent', () => {
	let fixture: ComponentFixture<AppThemePickerComponent>;
	let theme: ThemeService;
	let host: HTMLElement;

	const openMenu = (): void => {
		const trigger = host.querySelector(
			'[aria-label="Choose theme"]'
		) as HTMLButtonElement;
		trigger.click();
		fixture.detectChanges();
	};

	const getMenuItems = (): NodeListOf<HTMLButtonElement> =>
		document.querySelectorAll('.cdk-overlay-container .theme-picker-menu-item');

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

	it('should open the menu when the trigger is clicked', () => {
		openMenu();

		expect(getMenuItems().length).toBeGreaterThan(0);
	});

	it('should render all daisy themes in the menu', () => {
		openMenu();

		expect(getMenuItems().length).toBe(Object.values(DAISY_THEME_IDS).length);
	});

	it('should change theme when an option is selected', () => {
		openMenu();

		getMenuItems()[1].click();
		fixture.detectChanges();

		expect(theme.themeId()).toBe('dark');
	});
});
