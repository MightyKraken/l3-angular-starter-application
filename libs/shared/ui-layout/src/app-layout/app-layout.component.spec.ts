import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { provideLucideIcons } from '@lucide/angular';
import { appLucideIcons } from '@shared/ui-icon';
import { activatedRouteMock, routerMock } from '@test';

import { AppLayoutModeService } from '../app-layout-mode-picker/app-layout-mode.service';
import { APP_LAYOUT_MODES } from '../app-layout-mode-picker/layout.const';
import { SidebarTogglePreferenceService } from '../app-sidebar-toggle-picker/sidebar-toggle-preference.service';
import { SidebarLayoutService } from '../sidebar-layout/sidebar-layout.service';
import { AppLayoutComponent } from './app-layout.component';

describe('AppLayoutComponent', () => {
	let component: AppLayoutComponent;
	let fixture: ComponentFixture<AppLayoutComponent>;
	let sidebarLayout: SidebarLayoutService;
	let layoutMode: AppLayoutModeService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppLayoutComponent],
			providers: [
				{ provide: ActivatedRoute, useValue: activatedRouteMock },
				{ provide: Router, useValue: routerMock },
				provideLucideIcons(...appLucideIcons)
			]
		}).compileComponents();

		sidebarLayout = TestBed.inject(SidebarLayoutService);
		layoutMode = TestBed.inject(AppLayoutModeService);
		layoutMode.initFromStorage();
		fixture = TestBed.createComponent(AppLayoutComponent);
		component = fixture.componentInstance;
		fixture.componentRef.setInput('showNavigation', true);
		fixture.componentRef.setInput('showToolbar', true);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should reflect layout mode on grid data attribute', () => {
		const grid: HTMLElement = fixture.nativeElement.querySelector('.grid');
		expect(grid.getAttribute('data-layout')).toBe(APP_LAYOUT_MODES.sidebarLeft);

		layoutMode.setLayoutMode(APP_LAYOUT_MODES.toolbarTop);
		fixture.detectChanges();
		expect(grid.getAttribute('data-layout')).toBe(APP_LAYOUT_MODES.toolbarTop);
	});

	it('should reflect sidebar mode on grid data attribute', () => {
		const grid: HTMLElement = fixture.nativeElement.querySelector('.grid');
		expect(grid.getAttribute('data-sidebar-mode')).toBe('expanded');

		sidebarLayout.toggleMode();
		fixture.detectChanges();
		expect(grid.getAttribute('data-sidebar-mode')).toBe('mini');
	});

	it('should keep nav in DOM and collapse width when hidden on desktop', () => {
		const preference = TestBed.inject(SidebarTogglePreferenceService);
		preference.setPreference('expanded-hidden');
		sidebarLayout.setMode('expanded');
		fixture.detectChanges();

		sidebarLayout.toggleMode();
		fixture.detectChanges();

		const grid: HTMLElement = fixture.nativeElement.querySelector('.grid');
		const nav = fixture.nativeElement.querySelector('.nav') as HTMLElement;

		expect(grid.getAttribute('data-sidebar-mode')).toBe('hidden');
		expect(nav).toBeTruthy();
		expect(getComputedStyle(nav).display).not.toBe('none');
	});
});
