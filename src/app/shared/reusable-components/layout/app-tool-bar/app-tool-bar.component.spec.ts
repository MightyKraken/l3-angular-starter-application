import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SidebarLayoutService, ThemeService } from '@core';
import {
	LucideList,
	LucideMoon,
	LucidePalette,
	LucideSun,
	provideLucideIcons
} from '@lucide/angular';

import { AppToolBarComponent } from './app-tool-bar.component';

describe('AppToolBarComponent', () => {
	let fixture: ComponentFixture<AppToolBarComponent>;
	let sidebarLayout: SidebarLayoutService;
	let theme: ThemeService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppToolBarComponent],
			providers: [
				provideRouter([]),
				provideLucideIcons(LucideList, LucidePalette, LucideSun, LucideMoon)
			]
		}).compileComponents();

		sidebarLayout = TestBed.inject(SidebarLayoutService);
		theme = TestBed.inject(ThemeService);
		theme.initFromStorage();

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

	it('should render theme picker and scheme toggle', () => {
		expect(
			fixture.nativeElement.querySelector('app-theme-picker')
		).toBeTruthy();

		const iconButtons: Array<HTMLButtonElement> = Array.from(
			fixture.nativeElement.querySelectorAll('app-icon-button button')
		);
		expect(iconButtons.length).toBe(2);
	});

	it('should toggle color scheme when scheme button is clicked', () => {
		expect(theme.colorScheme()).toBe('light');

		const iconButtons: Array<HTMLButtonElement> = Array.from(
			fixture.nativeElement.querySelectorAll('app-icon-button button')
		);
		iconButtons[1].click();
		fixture.detectChanges();

		expect(theme.colorScheme()).toBe('dark');
		expect(theme.paletteId()).toBe('default');
	});
});
