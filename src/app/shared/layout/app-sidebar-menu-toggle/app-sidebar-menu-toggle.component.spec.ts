import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideList, provideLucideIcons } from '@lucide/angular';

import { SidebarLayoutService } from '../sidebar-layout/sidebar-layout.service';
import { AppSidebarMenuToggleComponent } from './app-sidebar-menu-toggle.component';

describe('AppSidebarMenuToggleComponent', () => {
	let fixture: ComponentFixture<AppSidebarMenuToggleComponent>;
	let sidebarLayout: SidebarLayoutService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppSidebarMenuToggleComponent],
			providers: [provideLucideIcons(LucideList)]
		}).compileComponents();

		sidebarLayout = TestBed.inject(SidebarLayoutService);
		fixture = TestBed.createComponent(AppSidebarMenuToggleComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should cycle sidebar mode when clicked', () => {
		expect(sidebarLayout.mode()).toBe('expanded');

		const toggle: HTMLButtonElement =
			fixture.nativeElement.querySelector('.tooltip button')!;
		toggle.click();
		fixture.detectChanges();

		expect(sidebarLayout.mode()).toBe('mini');
	});
});
