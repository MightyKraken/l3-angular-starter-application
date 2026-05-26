import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { NavigationTreeStateService } from './navigation-tree-state.service';

describe('NavigationTreeStateService', () => {
	let service: NavigationTreeStateService;
	let router: Router;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				provideRouter([{ path: 'playground/ui/components', children: [] }])
			]
		}).compileComponents();

		service = TestBed.inject(NavigationTreeStateService);
		router = TestBed.inject(Router);
	});

	it('should toggle expansion for a section id', () => {
		expect(service.isExpanded('playground')).toBe(false);

		service.toggle('playground');
		expect(service.isExpanded('playground')).toBe(true);

		service.toggle('playground');
		expect(service.isExpanded('playground')).toBe(false);
	});

	it('should expand ancestor sections for the active route', async () => {
		await router.navigateByUrl('/playground/ui/components');

		expect(service.isExpanded('playground')).toBe(true);
		expect(service.isExpanded('playground-ui')).toBe(true);
	});
});
