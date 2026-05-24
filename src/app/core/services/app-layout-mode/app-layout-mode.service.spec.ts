import { TestBed } from '@angular/core/testing';

import { CookieStorageService } from '../cookie-storage/cookie-storage.service';
import { AppLayoutModeService } from './app-layout-mode.service';

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
		expect(service.layoutMode()).toBe('sidebar-left');
	});

	it('should load layout mode from cookies', () => {
		cookies.set('app.layoutMode', 'toolbar-top');
		service.initFromStorage();
		expect(service.layoutMode()).toBe('toolbar-top');
	});

	it('should persist layout mode changes', () => {
		service.initFromStorage();
		service.setLayoutMode('toolbar-top');

		expect(service.layoutMode()).toBe('toolbar-top');
		expect(cookies.get('app.layoutMode')).toBe('toolbar-top');
	});

	it('should ignore setting the same layout mode', () => {
		service.initFromStorage();
		const setSpy = vi.spyOn(cookies, 'set');

		service.setLayoutMode('sidebar-left');

		expect(setSpy).not.toHaveBeenCalled();
		setSpy.mockRestore();
	});
});
