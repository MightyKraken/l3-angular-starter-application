import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SidebarLayoutService } from '@core';
import { LucideList, provideLucideIcons } from '@lucide/angular';

import { AppToolBarComponent } from './app-tool-bar.component';

describe('AppToolBarComponent', () => {
	let component: AppToolBarComponent;
	let fixture: ComponentFixture<AppToolBarComponent>;
	let sidebarLayout: SidebarLayoutService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppToolBarComponent],
			providers: [provideRouter([]), provideLucideIcons(LucideList)]
		}).compileComponents();

		sidebarLayout = TestBed.inject(SidebarLayoutService);
		fixture = TestBed.createComponent(AppToolBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should cycle sidebar mode when menu toggle is clicked', () => {
		expect(sidebarLayout.mode()).toBe('expanded');

		const button: HTMLButtonElement =
			fixture.nativeElement.querySelector('button.icon-button');
		button.click();
		fixture.detectChanges();

		expect(sidebarLayout.mode()).toBe('mini');
	});
});
