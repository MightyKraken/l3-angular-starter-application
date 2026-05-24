import { TestBed } from '@angular/core/testing';

import {
	type CookieSetOptions,
	CookieStorageService
} from './cookie-storage.service';

describe('CookieStorageService', () => {
	let service: CookieStorageService;

	beforeEach(() => {
		document.cookie = 'existing=; Max-Age=0; Path=/';
		document.cookie = 'encoded%20name=; Max-Age=0; Path=/';
		document.cookie = 'app.colorScheme=; Max-Age=0; Path=/';

		TestBed.configureTestingModule({});
		service = TestBed.inject(CookieStorageService);
	});

	it('should return null when cookie is missing', () => {
		expect(service.get('missing')).toBeNull();
	});

	it('should round-trip set and get', () => {
		service.set('app.colorScheme', 'dark');
		expect(service.get('app.colorScheme')).toBe('dark');
	});

	it('should encode cookie names and values', () => {
		service.set('encoded name', 'a=b&c');
		expect(service.get('encoded name')).toBe('a=b&c');
	});

	it('should remove a cookie', () => {
		service.set('app.colorScheme', 'light');
		service.remove('app.colorScheme');
		expect(service.get('app.colorScheme')).toBeNull();
	});

	it('should honor maxAgeDays when setting', () => {
		const setSpy = vi.spyOn(document, 'cookie', 'set');

		const options: CookieSetOptions = { maxAgeDays: 7 };
		service.set('app.palette', 'ocean', options);

		expect(setSpy).toHaveBeenCalledWith(
			expect.stringContaining('Max-Age=604800')
		);

		setSpy.mockRestore();
	});
});
