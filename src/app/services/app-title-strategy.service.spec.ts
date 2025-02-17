import { TestBed } from '@angular/core/testing';

import { AppTitleStrategyService } from './app-title-strategy.service';

describe('AppTitleStrategyService', () => {
	let service: AppTitleStrategyService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AppTitleStrategyService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
