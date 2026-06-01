import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
	LucideCheck,
	LucideList,
	LucidePalette,
	provideLucideIcons
} from '@lucide/angular';

import { SidebarLayoutService } from '../sidebar-layout/sidebar-layout.service';
import { AppToolBarComponent } from './app-tool-bar.component';

describe('AppToolBarComponent', () => {
	let fixture: ComponentFixture<AppToolBarComponent>;
	let sidebarLayout: SidebarLayoutService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppToolBarComponent],
			providers: [
				provideRouter([]),
				provideLucideIcons(LucideList, LucidePalette, LucideCheck)
			]
		}).compileComponents();

		sidebarLayout = TestBed.inject(SidebarLayoutService);

		fixture = TestBed.createComponent(AppToolBarComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should cycle sidebar mode when menu toggle is clicked', () => {
		expect(sidebarLayout.mode()).toBe('expanded');

		const toggle: HTMLButtonElement = fixture.nativeElement.querySelector(
			'app-sidebar-menu-toggle .tooltip button[aria-label]'
		)!;
		toggle.click();
		fixture.detectChanges();

		expect(sidebarLayout.mode()).toBe('mini');
	});

	it('should render theme picker', () => {
		expect(
			fixture.nativeElement.querySelector('app-theme-picker')
		).toBeTruthy();

		const menuToggle: HTMLButtonElement | null =
			fixture.nativeElement.querySelector(
				'app-sidebar-menu-toggle .tooltip button'
			);
		expect(menuToggle).toBeTruthy();
	});
});
