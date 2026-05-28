import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
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
	let overlayContainer: OverlayContainer;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppThemePickerComponent],
			providers: [
				provideNoopAnimations(),
				provideLucideIcons(LucidePalette, LucideCheck)
			]
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

	it('should render all daisy themes in the menu', () => {
		const trigger: HTMLButtonElement = fixture.nativeElement.querySelector(
			'button[aria-label="Choose theme"]'
		)!;
		trigger.click();
		fixture.detectChanges();

		const options = overlayContainer
			.getContainerElement()
			.querySelectorAll('[role="option"]');
		expect(options.length).toBe(DAISY_THEME_IDS.length);
	});

	it('should change theme when an option is selected', () => {
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

		expect(theme.themeId()).toBe('dark');
	});
});
