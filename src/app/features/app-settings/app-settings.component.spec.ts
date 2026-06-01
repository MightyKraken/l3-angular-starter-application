import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSettingsComponent } from './app-settings.component';

describe('AppSettingsComponent', () => {
	let fixture: ComponentFixture<AppSettingsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppSettingsComponent]
		}).compileComponents();

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

	it('should render theme card picker', () => {
		expect(
			fixture.nativeElement.querySelector('app-theme-card-picker')
		).toBeTruthy();
	});
});
