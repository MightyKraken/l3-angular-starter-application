import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarLayoutService } from '@core';
import {
	LucideChartColumn,
	LucideHouse,
	LucideList,
	LucideSettings,
	provideLucideIcons
} from '@lucide/angular';

import { activatedRouteMock, routerMock } from '../../../../../tests';
import { AppLayoutComponent } from './app-layout.component';

describe('AppLayoutComponent', () => {
	let component: AppLayoutComponent;
	let fixture: ComponentFixture<AppLayoutComponent>;
	let sidebarLayout: SidebarLayoutService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppLayoutComponent],
			providers: [
				{ provide: ActivatedRoute, useValue: activatedRouteMock },
				{ provide: Router, useValue: routerMock },
				provideLucideIcons(
					LucideHouse,
					LucideChartColumn,
					LucideSettings,
					LucideList
				)
			]
		}).compileComponents();

		sidebarLayout = TestBed.inject(SidebarLayoutService);
		fixture = TestBed.createComponent(AppLayoutComponent);
		component = fixture.componentInstance;
		fixture.componentRef.setInput('showNavigation', true);
		fixture.componentRef.setInput('showToolbar', true);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should reflect sidebar mode on grid data attribute', () => {
		const grid: HTMLElement = fixture.nativeElement.querySelector('.grid');
		expect(grid.getAttribute('data-sidebar-mode')).toBe('expanded');

		sidebarLayout.toggleMode();
		fixture.detectChanges();
		expect(grid.getAttribute('data-sidebar-mode')).toBe('mini');
	});
});
