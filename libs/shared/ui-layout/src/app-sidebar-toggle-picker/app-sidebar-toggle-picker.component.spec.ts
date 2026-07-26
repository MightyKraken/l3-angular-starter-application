import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLayoutService } from '../sidebar-layout/sidebar-layout.service';
import { AppSidebarTogglePickerComponent } from './app-sidebar-toggle-picker.component';
import { SidebarTogglePreferenceService } from './sidebar-toggle-preference.service';

describe('AppSidebarTogglePickerComponent', () => {
	let fixture: ComponentFixture<AppSidebarTogglePickerComponent>;
	let preference: SidebarTogglePreferenceService;
	let sidebarLayout: SidebarLayoutService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppSidebarTogglePickerComponent]
		}).compileComponents();

		preference = TestBed.inject(SidebarTogglePreferenceService);
		sidebarLayout = TestBed.inject(SidebarLayoutService);
		preference.initFromStorage();

		fixture = TestBed.createComponent(AppSidebarTogglePickerComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should render two toggle preference options', () => {
		const options = fixture.nativeElement.querySelectorAll('[role="radio"]');
		expect(options.length).toBe(2);
	});

	it('should change preference when an option is selected', () => {
		const options: NodeListOf<HTMLButtonElement> =
			fixture.nativeElement.querySelectorAll('[role="radio"]');
		options[1].click();

		expect(preference.preference()).toBe('expanded-hidden');
	});
});
