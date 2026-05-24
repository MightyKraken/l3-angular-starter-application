import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import {
	AppLayoutModeService,
	BreakPointDetectorService,
	ScreenSizeObserver,
	SidebarLayoutService,
	SidebarTogglePreferenceService
} from '@core';
import {
	LucideHouse,
	LucideList,
	LucideMoon,
	LucidePalette,
	LucideSettings,
	LucideSun,
	provideLucideIcons
} from '@lucide/angular';

import { activatedRouteMock, routerMock } from '../../../../../tests';
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
				{ provide: ScreenSizeObserver, useClass: BreakPointDetectorService },
				provideLucideIcons(
					LucideHouse,
					LucideSettings,
					LucideList,
					LucidePalette,
					LucideSun,
					LucideMoon
				)
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
		expect(grid.getAttribute('data-layout')).toBe('sidebar-left');

		layoutMode.setLayoutMode('toolbar-top');
		fixture.detectChanges();
		expect(grid.getAttribute('data-layout')).toBe('toolbar-top');
	});

	it('should reflect sidebar mode on grid data attribute', () => {
		const grid: HTMLElement = fixture.nativeElement.querySelector('.grid');
		expect(grid.getAttribute('data-sidebar-mode')).toBe('expanded');

		sidebarLayout.toggleMode(false);
		fixture.detectChanges();
		expect(grid.getAttribute('data-sidebar-mode')).toBe('mini');
	});

	it('should keep nav in DOM and collapse width when hidden on desktop', () => {
		const preference = TestBed.inject(SidebarTogglePreferenceService);
		preference.setPreference('expanded-hidden');
		sidebarLayout.setMode('expanded');
		fixture.detectChanges();

		sidebarLayout.toggleMode(false);
		fixture.detectChanges();

		const grid: HTMLElement = fixture.nativeElement.querySelector('.grid');
		const nav = fixture.nativeElement.querySelector('.nav') as HTMLElement;

		expect(grid.getAttribute('data-sidebar-mode')).toBe('hidden');
		expect(nav).toBeTruthy();
		expect(getComputedStyle(nav).display).not.toBe('none');
	});
});
