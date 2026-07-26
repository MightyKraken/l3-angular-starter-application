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
		document.cookie = 'app.theme=; Max-Age=0; Path=/';

		TestBed.configureTestingModule({});
		service = TestBed.inject(CookieStorageService);
	});

	it('should return null when cookie is missing', () => {
		expect(service.get('missing')).toBeNull();
	});

	it('should round-trip set and get', () => {
		service.set('app.theme', 'dracula');
		expect(service.get('app.theme')).toBe('dracula');
	});

	it('should encode cookie names and values', () => {
		service.set('encoded name', 'a=b&c');
		expect(service.get('encoded name')).toBe('a=b&c');
	});

	it('should remove a cookie', () => {
		service.set('app.theme', 'light');
		service.remove('app.theme');
		expect(service.get('app.theme')).toBeNull();
	});

	it('should honor maxAgeDays when setting', () => {
		const setSpy = vi.spyOn(document, 'cookie', 'set');

		const options: CookieSetOptions = { maxAgeDays: 7 };
		service.set('app.theme', 'aqua', options);

		expect(setSpy).toHaveBeenCalledWith(
			expect.stringContaining('Max-Age=604800')
		);

		setSpy.mockRestore();
	});
});
