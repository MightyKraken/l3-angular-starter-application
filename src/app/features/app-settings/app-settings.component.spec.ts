import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from '@core';
import { LucideMoon, LucideSun, provideLucideIcons } from '@lucide/angular';

import { AppSettingsComponent } from './app-settings.component';

describe('AppSettingsComponent', () => {
	let fixture: ComponentFixture<AppSettingsComponent>;
	let theme: ThemeService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppSettingsComponent],
			providers: [provideLucideIcons(LucideSun, LucideMoon)]
		}).compileComponents();

		theme = TestBed.inject(ThemeService);
		theme.initFromStorage();

		fixture = TestBed.createComponent(AppSettingsComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should set color scheme from segmented control', () => {
		const darkButton: HTMLButtonElement =
			fixture.nativeElement.querySelectorAll(
				'[role="radiogroup"] [role="radio"]'
			)[1];
		darkButton.click();

		expect(theme.colorScheme()).toBe('dark');

		const lightButton: HTMLButtonElement =
			fixture.nativeElement.querySelectorAll(
				'[role="radiogroup"] [role="radio"]'
			)[0];
		lightButton.click();

		expect(theme.colorScheme()).toBe('light');
	});

	it('should render layout mode picker', () => {
		expect(
			fixture.nativeElement.querySelector('app-layout-mode-picker')
		).toBeTruthy();
	});

	it('should render sidebar toggle picker', () => {
		expect(
			fixture.nativeElement.querySelector('app-sidebar-toggle-picker')
		).toBeTruthy();
	});

	it('should set palette from theme cards', () => {
		const cards: NodeListOf<HTMLButtonElement> =
			fixture.nativeElement.querySelectorAll(
				'[role="listbox"] [role="option"]'
			);
		expect(cards.length).toBe(10);

		cards[2].click();
		expect(theme.paletteId()).toBe('forest');
	});
});
