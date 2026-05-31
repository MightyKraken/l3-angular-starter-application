import { TestBed } from '@angular/core/testing';
import { CookieStorageService } from '@core';

import { AppLayoutModeService } from './app-layout-mode.service';
import { APP_LAYOUT_MODES } from './layout.const';

describe('AppLayoutModeService', () => {
	let service: AppLayoutModeService;
	let cookies: CookieStorageService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AppLayoutModeService);
		cookies = TestBed.inject(CookieStorageService);
		cookies.remove('app.layoutMode');
	});

	it('should default to sidebar-left', () => {
		service.initFromStorage();
		expect(service.layoutMode()).toBe(APP_LAYOUT_MODES.sidebarLeft);
	});

	it('should load layout mode from cookies', () => {
		cookies.set('app.layoutMode', APP_LAYOUT_MODES.toolbarTop);
		service.initFromStorage();
		expect(service.layoutMode()).toBe(APP_LAYOUT_MODES.toolbarTop);
	});

	it('should persist layout mode changes', () => {
		service.initFromStorage();
		service.setLayoutMode(APP_LAYOUT_MODES.toolbarTop);

		expect(service.layoutMode()).toBe(APP_LAYOUT_MODES.toolbarTop);
		expect(cookies.get('app.layoutMode')).toBe(APP_LAYOUT_MODES.toolbarTop);
	});

	it('should ignore setting the same layout mode', () => {
		service.initFromStorage();
		const setSpy = vi.spyOn(cookies, 'set');

		service.setLayoutMode(APP_LAYOUT_MODES.sidebarLeft);

		expect(setSpy).not.toHaveBeenCalled();
		setSpy.mockRestore();
	});
});
