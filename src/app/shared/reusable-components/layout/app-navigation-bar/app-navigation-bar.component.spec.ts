import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SidebarLayoutService } from '@core';
import {
	LucideChartColumn,
	LucideHouse,
	LucideSettings,
	provideLucideIcons
} from '@lucide/angular';

import { AppNavigationBarComponent } from './app-navigation-bar.component';

describe('AppNavigationBarComponent', () => {
	let component: AppNavigationBarComponent;
	let fixture: ComponentFixture<AppNavigationBarComponent>;
	let sidebarLayout: SidebarLayoutService;
	let hostElement: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppNavigationBarComponent],
			providers: [
				provideRouter([]),
				provideLucideIcons(LucideHouse, LucideChartColumn, LucideSettings)
			]
		}).compileComponents();

		sidebarLayout = TestBed.inject(SidebarLayoutService);
		fixture = TestBed.createComponent(AppNavigationBarComponent);
		component = fixture.componentInstance;
		hostElement = fixture.nativeElement;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should apply sidebar-mini class and hide labels in mini mode', () => {
		sidebarLayout.toggleMode();
		fixture.detectChanges();

		expect(hostElement.querySelector('.sidebar-mini')).toBeTruthy();

		const labels = hostElement.querySelectorAll<HTMLElement>('.nav-label');
		labels.forEach((label) => {
			expect(getComputedStyle(label).display).toBe('none');
		});
	});
});
