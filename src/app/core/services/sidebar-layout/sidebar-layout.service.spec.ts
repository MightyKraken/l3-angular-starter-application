import { TestBed } from '@angular/core/testing';

import { SidebarLayoutService } from './sidebar-layout.service';

describe('SidebarLayoutService', () => {
	let service: SidebarLayoutService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SidebarLayoutService);
	});

	it('should start in expanded mode', () => {
		expect(service.mode()).toBe('expanded');
	});

	it('should cycle expanded -> mini -> hidden -> expanded', () => {
		service.toggleMode();
		expect(service.mode()).toBe('mini');

		service.toggleMode();
		expect(service.mode()).toBe('hidden');

		service.toggleMode();
		expect(service.mode()).toBe('expanded');
	});
});
