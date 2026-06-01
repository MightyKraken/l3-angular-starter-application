import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAISY_THEME_IDS } from '../theme.const';
import { ThemeService } from '../theme.service';
import { AppThemeCardPickerComponent } from './app-theme-card-picker.component';

describe('AppThemeCardPickerComponent', () => {
	let fixture: ComponentFixture<AppThemeCardPickerComponent>;
	let theme: ThemeService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppThemeCardPickerComponent]
		}).compileComponents();

		theme = TestBed.inject(ThemeService);
		theme.initFromStorage();

		fixture = TestBed.createComponent(AppThemeCardPickerComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should render one option per daisy theme', () => {
		const options = fixture.nativeElement.querySelectorAll('[role="radio"]');
		expect(options.length).toBe(Object.values(DAISY_THEME_IDS).length);
	});

	it('should change theme when an option is selected', () => {
		const options: NodeListOf<HTMLButtonElement> =
			fixture.nativeElement.querySelectorAll('[role="radio"]');
		options[2].click();

		expect(theme.themeId()).toBe('cupcake');
	});
});
