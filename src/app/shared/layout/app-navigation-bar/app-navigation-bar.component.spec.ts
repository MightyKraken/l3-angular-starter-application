import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
	LucideChevronDown,
	LucideChevronRight,
	LucideFlaskConical,
	LucideHouse,
	LucideList,
	LucideSettings,
	provideLucideIcons
} from '@lucide/angular';

import { SidebarLayoutService } from '../sidebar-layout/sidebar-layout.service';
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
				provideLucideIcons(
					LucideHouse,
					LucideSettings,
					LucideFlaskConical,
					LucideChevronRight,
					LucideChevronDown,
					LucideList
				)
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

	it('should render tree root items', () => {
		const rootItems = hostElement.querySelectorAll('li.nav-tree-item-depth-0');
		expect(rootItems.length).toBe(3);
	});

	it('should apply sidebar-mini class and collapse labels in mini mode', () => {
		sidebarLayout.toggleMode();
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

	it('should show sidebar toggle in header when showSidebarToggle is true', () => {
		fixture.componentRef.setInput('showSidebarToggle', true);
		fixture.detectChanges();

		expect(
			hostElement.querySelector('header app-sidebar-menu-toggle')
		).toBeTruthy();
	});

	it('should hide sidebar toggle when showSidebarToggle is false', () => {
		expect(hostElement.querySelector('header')).toBeNull();
	});

	it('should cycle sidebar from nav toggle when showSidebarToggle is true', () => {
		fixture.componentRef.setInput('showSidebarToggle', true);
		fixture.detectChanges();

		const toggle: HTMLButtonElement = hostElement.querySelector(
			'header .tooltip button'
		)!;
		toggle.click();
		fixture.detectChanges();

		expect(sidebarLayout.mode()).toBe('mini');
	});
});
