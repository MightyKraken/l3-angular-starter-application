import { TestBed } from '@angular/core/testing';

import { SidebarTogglePreferenceService } from '../app-sidebar-toggle-picker/sidebar-toggle-preference.service';
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

		service.toggleMode();
		expect(service.mode()).toBe('mini');

		service.toggleMode();
		expect(service.mode()).toBe('expanded');
	});

	it('should cycle expanded and hidden on desktop with expanded-hidden preference', () => {
		preference.setPreference('expanded-hidden');

		service.toggleMode();
		expect(service.mode()).toBe('hidden');

		service.toggleMode();
		expect(service.mode()).toBe('expanded');
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
