import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DAISY_THEME_IDS, ThemeService } from '@shared';

import { AppSettingsComponent } from './app-settings.component';

describe('AppSettingsComponent', () => {
	let fixture: ComponentFixture<AppSettingsComponent>;
	let theme: ThemeService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppSettingsComponent]
		}).compileComponents();

		theme = TestBed.inject(ThemeService);
		theme.initFromStorage();

		fixture = TestBed.createComponent(AppSettingsComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
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

	it('should render toolbar behavior picker', () => {
		expect(
			fixture.nativeElement.querySelector('app-toolbar-behavior-picker')
		).toBeTruthy();
	});

	it('should set theme from theme cards', () => {
		const cards: NodeListOf<HTMLButtonElement> =
			fixture.nativeElement.querySelectorAll(
				'[role="listbox"] [role="option"]'
			);
		expect(cards.length).toBe(Object.values(DAISY_THEME_IDS).length);

		cards[2].click();
		expect(theme.themeId()).toBe('cupcake');
	});
});
