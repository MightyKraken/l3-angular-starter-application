import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot } from '@angular/router';
import { environment } from '@environment';

import { AppTitleStrategyService } from './app-title-strategy.service';

describe('AppTitleStrategyService', () => {
	let service: AppTitleStrategyService;
	let titleService: Title;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AppTitleStrategyService, Title]
		});
		service = TestBed.inject(AppTitleStrategyService);
		titleService = TestBed.inject(Title);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('updateTitle', () => {
		it('should update to portal title based on undefined router state', () => {
			const routerState = {} as RouterStateSnapshot;
			const buildTitleSpy = vi
				.spyOn(service, 'buildTitle')
				.mockReturnValue(undefined);
			const setTitleSpy = vi.spyOn(titleService, 'setTitle');

			service.updateTitle(routerState);

			expect(buildTitleSpy).toHaveBeenCalledWith(routerState);
			expect(setTitleSpy).toHaveBeenCalledWith(environment.PortalTitle);
		});

		it('should update title based on router state', () => {
			const routerState = {} as RouterStateSnapshot;
			const buildTitleSpy = vi
				.spyOn(service, 'buildTitle')
				.mockReturnValue('Page 1');
			const setTitleSpy = vi.spyOn(titleService, 'setTitle');

			service.updateTitle(routerState);

			expect(buildTitleSpy).toHaveBeenCalledWith(routerState);
			expect(setTitleSpy).toHaveBeenCalledWith('Page 1');
		});
	});
});
