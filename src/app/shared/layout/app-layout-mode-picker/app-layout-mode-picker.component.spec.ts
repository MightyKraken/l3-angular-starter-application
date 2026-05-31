import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutModeService } from './app-layout-mode.service';
import { AppLayoutModePickerComponent } from './app-layout-mode-picker.component';
import { APP_LAYOUT_MODES } from './layout.const';

describe('AppLayoutModePickerComponent', () => {
	let fixture: ComponentFixture<AppLayoutModePickerComponent>;
	let layoutMode: AppLayoutModeService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppLayoutModePickerComponent]
		}).compileComponents();

		layoutMode = TestBed.inject(AppLayoutModeService);
		layoutMode.initFromStorage();

		fixture = TestBed.createComponent(AppLayoutModePickerComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should render layout preview options', () => {
		const options = fixture.nativeElement.querySelectorAll('[role="radio"]');
		expect(options.length).toBe(2);
		expect(
			fixture.nativeElement.querySelectorAll('[aria-hidden="true"]').length
		).toBeGreaterThanOrEqual(2);
	});

	it('should change layout mode when an option is selected', () => {
		const options: NodeListOf<HTMLButtonElement> =
			fixture.nativeElement.querySelectorAll('[role="radio"]');
		options[0].click();

		expect(layoutMode.layoutMode()).toBe(APP_LAYOUT_MODES.toolbarTop);
	});
});
