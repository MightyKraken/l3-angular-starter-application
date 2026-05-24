import { TestBed } from '@angular/core/testing';

import { CookieStorageService } from '../cookie-storage/cookie-storage.service';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
	let service: ThemeService;
	let cookies: CookieStorageService;

	beforeEach(() => {
		document.documentElement.removeAttribute('data-color-scheme');
		document.documentElement.removeAttribute('data-palette');
		document.documentElement.style.colorScheme = '';

		TestBed.configureTestingModule({});
		service = TestBed.inject(ThemeService);
		cookies = TestBed.inject(CookieStorageService);
		cookies.remove('app.colorScheme');
		cookies.remove('app.palette');
	});

	it('should default to light and default palette', () => {
		service.initFromStorage();

		expect(service.colorScheme()).toBe('light');
		expect(service.paletteId()).toBe('default');
		expect(document.documentElement.dataset['colorScheme']).toBe('light');
		expect(document.documentElement.dataset['palette']).toBe('default');
	});

	it('should load scheme and palette from cookies', () => {
		cookies.set('app.colorScheme', 'dark');
		cookies.set('app.palette', 'ocean');

		service.initFromStorage();

		expect(service.colorScheme()).toBe('dark');
		expect(service.paletteId()).toBe('ocean');
	});

	it('should set color scheme and persist', () => {
		service.initFromStorage();
		service.setColorScheme('dark');

		expect(service.colorScheme()).toBe('dark');
		expect(cookies.get('app.colorScheme')).toBe('dark');
	});

	it('should ignore setting the same color scheme', () => {
		service.initFromStorage();
		const setSpy = vi.spyOn(cookies, 'set');

		service.setColorScheme('light');

		expect(setSpy).not.toHaveBeenCalled();
		setSpy.mockRestore();
	});

	it('should toggle color scheme and persist', () => {
		service.initFromStorage();
		service.toggleColorScheme();

		expect(service.colorScheme()).toBe('dark');
		expect(cookies.get('app.colorScheme')).toBe('dark');
		expect(document.documentElement.dataset['colorScheme']).toBe('dark');

		service.toggleColorScheme();
		expect(service.colorScheme()).toBe('light');
	});

	it('should set palette and persist', () => {
		service.initFromStorage();
		service.setPalette('forest');

		expect(service.paletteId()).toBe('forest');
		expect(cookies.get('app.palette')).toBe('forest');
		expect(document.documentElement.dataset['palette']).toBe('forest');
	});

	it('should ignore setting the same palette', () => {
		service.initFromStorage();
		const setSpy = vi.spyOn(cookies, 'set');

		service.setPalette('default');

		expect(setSpy).not.toHaveBeenCalled();
		setSpy.mockRestore();
	});

	it('should set palette and scheme together', () => {
		service.initFromStorage();
		service.setTheme('mint', 'dark');

		expect(service.paletteId()).toBe('mint');
		expect(service.colorScheme()).toBe('dark');
		expect(cookies.get('app.palette')).toBe('mint');
		expect(cookies.get('app.colorScheme')).toBe('dark');
	});

	it('should set palette without changing color scheme', () => {
		service.initFromStorage();
		service.setPalette('ocean');

		expect(service.paletteId()).toBe('ocean');
		expect(service.colorScheme()).toBe('light');
		expect(cookies.get('app.colorScheme')).toBe('light');
	});
});
