import { TestBed } from '@angular/core/testing';

import { SidebarTogglePreferenceService } from '../sidebar-toggle-preference/sidebar-toggle-preference.service';
import { SidebarLayoutService } from './sidebar-layout.service';

describe('SidebarLayoutService', () => {
	let service: SidebarLayoutService;
	let preference: SidebarTogglePreferenceService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SidebarLayoutService);
		preference = TestBed.inject(SidebarTogglePreferenceService);
		preference.initFromStorage();
		service.setMode('expanded');
	});

	it('should start in expanded mode', () => {
		expect(service.mode()).toBe('expanded');
	});

	it('should cycle expanded and mini on desktop with expanded-mini preference', () => {
		preference.setPreference('expanded-mini');

		service.toggleMode(false);
		expect(service.mode()).toBe('mini');

		service.toggleMode(false);
		expect(service.mode()).toBe('expanded');
	});

	it('should cycle expanded and hidden on desktop with expanded-hidden preference', () => {
		preference.setPreference('expanded-hidden');

		service.toggleMode(false);
		expect(service.mode()).toBe('hidden');

		service.toggleMode(false);
		expect(service.mode()).toBe('expanded');
	});

	it('should open mini then alternate mini and expanded on overlay with expanded-mini preference', () => {
		preference.setPreference('expanded-mini');
		service.setMode('hidden');

		service.toggleMode(true);
		expect(service.mode()).toBe('mini');

		service.toggleMode(true);
		expect(service.mode()).toBe('expanded');

		service.toggleMode(true);
		expect(service.mode()).toBe('mini');
	});

	it('should close overlay drawer via closeSidebar without menu cycling to hidden from expanded', () => {
		preference.setPreference('expanded-mini');
		service.setMode('expanded');
		service.closeSidebar();
		expect(service.mode()).toBe('hidden');
	});

	it('should cycle hidden and expanded on overlay with expanded-hidden preference', () => {
		preference.setPreference('expanded-hidden');
		service.setMode('hidden');

		service.toggleMode(true);
		expect(service.mode()).toBe('expanded');

		service.toggleMode(true);
		expect(service.mode()).toBe('hidden');
	});

	it('should close sidebar by setting hidden mode', () => {
		service.setMode('expanded');
		service.closeSidebar();
		expect(service.mode()).toBe('hidden');
	});

	it('should normalize mini to expanded when switching to expanded-hidden preference', () => {
		service.setMode('mini');
		preference.setPreference('expanded-hidden');
		service.normalizeModeForPreference();
		expect(service.mode()).toBe('expanded');
	});
});
