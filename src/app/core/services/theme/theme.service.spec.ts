import { TestBed } from '@angular/core/testing';

import { CookieStorageService } from '../cookie-storage/cookie-storage.service';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
	let service: ThemeService;
	let cookies: CookieStorageService;

	beforeEach(() => {
		document.documentElement.removeAttribute('data-theme');

		TestBed.configureTestingModule({});
		service = TestBed.inject(ThemeService);
		cookies = TestBed.inject(CookieStorageService);
		cookies.remove('app.theme');
		cookies.remove('app.colorScheme');
		cookies.remove('app.palette');
	});

	it('should default to nord theme', () => {
		service.initFromStorage();

		expect(service.themeId()).toBe('nord');
		expect(document.documentElement.getAttribute('data-theme')).toBe('nord');
	});

	it('should load theme from cookie', () => {
		cookies.set('app.theme', 'dracula');

		service.initFromStorage();

		expect(service.themeId()).toBe('dracula');
		expect(document.documentElement.getAttribute('data-theme')).toBe('dracula');
	});

	it('should set theme and persist', () => {
		service.initFromStorage();
		service.setTheme('cupcake');

		expect(service.themeId()).toBe('cupcake');
		expect(cookies.get('app.theme')).toBe('cupcake');
		expect(document.documentElement.getAttribute('data-theme')).toBe('cupcake');
	});

	it('should ignore setting the same theme', () => {
		service.initFromStorage();
		const setSpy = vi.spyOn(cookies, 'set');

		service.setTheme('nord');

		expect(setSpy).not.toHaveBeenCalled();
		setSpy.mockRestore();
	});

	it('should clear legacy cookies on init', () => {
		cookies.set('app.colorScheme', 'dark');
		cookies.set('app.palette', 'ocean');

		service.initFromStorage();

		expect(cookies.get('app.colorScheme')).toBeNull();
		expect(cookies.get('app.palette')).toBeNull();
		expect(service.themeId()).toBe('nord');
	});
});
