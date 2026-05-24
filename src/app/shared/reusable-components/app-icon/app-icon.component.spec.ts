import { provideHttpClient } from '@angular/common/http';
import {
	HttpTestingController,
	provideHttpClientTesting
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideHouse, LucideMenu, provideLucideIcons } from '@lucide/angular';

import { AppIconComponent } from './app-icon.component';

describe('AppIconComponent', () => {
	let fixture: ComponentFixture<AppIconComponent>;
	let httpMock: HttpTestingController;
	let hostElement: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppIconComponent],
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(),
				provideLucideIcons(LucideMenu, LucideHouse)
			]
		}).compileComponents();

		httpMock = TestBed.inject(HttpTestingController);
		fixture = TestBed.createComponent(AppIconComponent);
		hostElement = fixture.nativeElement;
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should create', () => {
		fixture.componentRef.setInput('name', 'house');
		fixture.detectChanges();
		expect(fixture.componentInstance).toBeTruthy();
	});

	describe('Lucide source', () => {
		it('should render a lucide svg for a registered icon name', () => {
			fixture.componentRef.setInput('name', 'house');
			fixture.detectChanges();

			const svg = hostElement.querySelector('svg.lucide-icon');
			expect(svg).toBeTruthy();
		});

		it('should apply default size on host', () => {
			fixture.componentRef.setInput('name', 'house');
			fixture.detectChanges();

			expect(hostElement.style.getPropertyValue('--icon-size')).toBe('1.25rem');
		});

		it('should accept custom size input', () => {
			fixture.componentRef.setInput('name', 'house');
			fixture.componentRef.setInput('size', '2rem');
			fixture.detectChanges();

			expect(hostElement.style.getPropertyValue('--icon-size')).toBe('2rem');
		});
	});

	describe('Asset source', () => {
		it('should load and inline svg from public icons path', () => {
			fixture.componentRef.setInput('name', 'test');
			fixture.componentRef.setInput('source', 'asset');
			fixture.detectChanges();

			const request = httpMock.expectOne('/icons/test.svg');
			expect(request.request.method).toBe('GET');
			request.flush(
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>'
			);
			fixture.detectChanges();

			const asset = hostElement.querySelector('.icon-asset svg');
			expect(asset).toBeTruthy();
		});

		it('should not request invalid asset names', () => {
			fixture.componentRef.setInput('name', '../secret');
			fixture.componentRef.setInput('source', 'asset');
			fixture.detectChanges();

			httpMock.expectNone('/icons/../secret.svg');
			expect(hostElement.querySelector('.icon-asset')).toBeNull();
		});
	});
});
