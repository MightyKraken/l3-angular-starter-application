import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

import { ScreenBreakPoints } from '../../constants/screen-break-points.const';
import { BreakPointDetectorService } from './break-point-detector.service';

describe('BreakPointDetectorService', () => {
	let service: BreakPointDetectorService;
	let observeMock: Mock;

	const createBreakpointState = (matches: boolean): BreakpointState => ({
		matches,
		breakpoints: {}
	});

	beforeEach(() => {
		observeMock = vi.fn().mockReturnValue(of(createBreakpointState(false)));

		TestBed.configureTestingModule({
			providers: [
				BreakPointDetectorService,
				{
					provide: BreakpointObserver,
					useValue: { observe: observeMock }
				}
			]
		});

		service = TestBed.inject(BreakPointDetectorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should observe mobile breakpoint with correct query (<= 600px)', () => {
		expect(observeMock).toHaveBeenCalledWith(
			`(max-width: ${ScreenBreakPoints.ScreenBreakWidthMobile}px)`
		);
	});

	it('should observe small breakpoint with correct query (601px - 768px)', () => {
		expect(observeMock).toHaveBeenCalledWith(
			`(min-width: ${ScreenBreakPoints.ScreenBreakWidthMobile + 1}px) and (max-width: ${ScreenBreakPoints.ScreenBreakWidthSmall}px)`
		);
	});

	it('should observe medium breakpoint with correct query (769px - 1024px)', () => {
		expect(observeMock).toHaveBeenCalledWith(
			`(min-width: ${ScreenBreakPoints.ScreenBreakWidthSmall + 1}px) and (max-width: ${ScreenBreakPoints.ScreenBreakWidthMedium}px)`
		);
	});

	it('should observe large breakpoint with correct query (1025px - 1200px)', () => {
		expect(observeMock).toHaveBeenCalledWith(
			`(min-width: ${ScreenBreakPoints.ScreenBreakWidthMedium + 1}px) and (max-width: ${ScreenBreakPoints.ScreenBreakWidthLarge}px)`
		);
	});

	it('should observe extra large breakpoint with correct query (> 1200px)', () => {
		expect(observeMock).toHaveBeenCalledWith(
			`(min-width: ${ScreenBreakPoints.ScreenBreakWidthLarge + 1}px)`
		);
	});

	it('should have initial value of false for all breakpoints', () => {
		expect(service.isMobile()).toBeFalsy();
		expect(service.isSmall()).toBeFalsy();
		expect(service.isMedium()).toBeFalsy();
		expect(service.isLarge()).toBeFalsy();
		expect(service.isExtraLarge()).toBeFalsy();
	});
});
