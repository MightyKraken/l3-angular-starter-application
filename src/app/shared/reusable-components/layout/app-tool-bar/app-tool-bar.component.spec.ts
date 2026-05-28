import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SidebarLayoutService } from '@core';
import {
	LucideCheck,
	LucideList,
	LucidePalette,
	provideLucideIcons
} from '@lucide/angular';

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

		const buttons: Array<HTMLButtonElement> = Array.from(
			fixture.nativeElement.querySelectorAll('app-icon-button button')
		);
		buttons[0].click();
		fixture.detectChanges();

		expect(sidebarLayout.mode()).toBe('mini');
	});

	it('should render theme picker without scheme toggle', () => {
		expect(
			fixture.nativeElement.querySelector('app-theme-picker')
		).toBeTruthy();

		const iconButtons: Array<HTMLButtonElement> = Array.from(
			fixture.nativeElement.querySelectorAll('app-icon-button button')
		);
		expect(iconButtons.length).toBe(1);
	});
});
