import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
	BreakPointDetectorService,
	ScreenSizeObserver,
	SidebarLayoutService
} from '@core';
import { LucideHouse, LucideSettings, provideLucideIcons } from '@lucide/angular';

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
				{ provide: ScreenSizeObserver, useClass: BreakPointDetectorService },
				provideLucideIcons(LucideHouse, LucideSettings)
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

	it('should apply sidebar-mini class and collapse labels in mini mode', () => {
		sidebarLayout.toggleMode(false);
		fixture.detectChanges();

		expect(hostElement.querySelector('.sidebar-mini')).toBeTruthy();

		const labels = hostElement.querySelectorAll<HTMLElement>('.nav-label');
		labels.forEach((label) => {
			const style = getComputedStyle(label);
			expect(style.opacity).toBe('0');
			expect(style.maxInlineSize).toBe('0px');
			expect(style.visibility).toBe('hidden');
		});
	});
});
