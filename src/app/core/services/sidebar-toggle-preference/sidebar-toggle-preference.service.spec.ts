import { TestBed } from '@angular/core/testing';

import { CookieStorageService } from '../cookie-storage/cookie-storage.service';
import { SidebarTogglePreferenceService } from './sidebar-toggle-preference.service';

describe('SidebarTogglePreferenceService', () => {
	let service: SidebarTogglePreferenceService;
	let cookies: CookieStorageService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SidebarTogglePreferenceService);
		cookies = TestBed.inject(CookieStorageService);
		cookies.remove('app.sidebarToggle');
	});

	it('should default to expanded-mini', () => {
		service.initFromStorage();
		expect(service.preference()).toBe('expanded-mini');
	});

	it('should load preference from cookies', () => {
		cookies.set('app.sidebarToggle', 'expanded-hidden');
		service.initFromStorage();
		expect(service.preference()).toBe('expanded-hidden');
	});

	it('should persist preference changes', () => {
		service.initFromStorage();
		service.setPreference('expanded-hidden');

		expect(service.preference()).toBe('expanded-hidden');
		expect(cookies.get('app.sidebarToggle')).toBe('expanded-hidden');
	});

	it('should ignore setting the same preference', () => {
		service.initFromStorage();
		const setSpy = vi.spyOn(cookies, 'set');

		service.setPreference('expanded-mini');

		expect(setSpy).not.toHaveBeenCalled();
		setSpy.mockRestore();
	});
});
