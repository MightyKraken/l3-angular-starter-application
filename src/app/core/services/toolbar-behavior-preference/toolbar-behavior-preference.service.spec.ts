import { TestBed } from '@angular/core/testing';

import { CookieStorageService } from '../cookie-storage/cookie-storage.service';
import { ToolbarBehaviorPreferenceService } from './toolbar-behavior-preference.service';

describe('ToolbarBehaviorPreferenceService', () => {
	let service: ToolbarBehaviorPreferenceService;
	let cookies: CookieStorageService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ToolbarBehaviorPreferenceService);
		cookies = TestBed.inject(CookieStorageService);
		cookies.remove('app.toolbarBehavior');
	});

	it('should default to scroll-away', () => {
		service.initFromStorage();
		expect(service.behavior()).toBe('scroll-away');
	});

	it('should load behavior from cookies', () => {
		cookies.set('app.toolbarBehavior', 'fixed');
		service.initFromStorage();
		expect(service.behavior()).toBe('fixed');
	});

	it('should persist behavior changes', () => {
		service.initFromStorage();
		service.setBehavior('fixed');

		expect(service.behavior()).toBe('fixed');
		expect(cookies.get('app.toolbarBehavior')).toBe('fixed');
	});

	it('should ignore setting the same behavior', () => {
		service.initFromStorage();
		const setSpy = vi.spyOn(cookies, 'set');

		service.setBehavior('scroll-away');

		expect(setSpy).not.toHaveBeenCalled();
	});
});
