import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppLayoutModeService } from '@core';

import { AppLayoutModePickerComponent } from './app-layout-mode-picker.component';

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
		const options = fixture.nativeElement.querySelectorAll('.layout-mode-option');
		expect(options.length).toBe(2);
		expect(
			fixture.nativeElement.querySelector('.layout-preview-toolbar-top')
		).toBeTruthy();
		expect(
			fixture.nativeElement.querySelector('.layout-preview-sidebar-left')
		).toBeTruthy();
	});

	it('should change layout mode when an option is selected', () => {
		const options: NodeListOf<HTMLButtonElement> =
			fixture.nativeElement.querySelectorAll('.layout-mode-option');
		options[0].click();

		expect(layoutMode.layoutMode()).toBe('toolbar-top');
	});
});
