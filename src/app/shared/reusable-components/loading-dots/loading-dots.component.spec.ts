import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDotsComponent } from './loading-dots.component';

describe('LoadingDotsComponent', () => {
	let component: LoadingDotsComponent;
	let fixture: ComponentFixture<LoadingDotsComponent>;
	let hostElement: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LoadingDotsComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(LoadingDotsComponent);
		component = fixture.componentInstance;
		hostElement = fixture.nativeElement;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Default Input Values', () => {
		it('should have default size of 16px', () => {
			expect(component.size()).toBe('16px');
		});

		it('should have default gap of 16px', () => {
			expect(component.gap()).toBe('16px');
		});

		it('should have default jumpDistance of -15px', () => {
			expect(component.jumpDistance()).toBe('-15px');
		});

		it('should have default speed of 1.8s', () => {
			expect(component.speed()).toBe('1.8s');
		});
	});

	describe('Custom Input Values', () => {
		it('should accept custom size input', () => {
			fixture.componentRef.setInput('size', '20px');
			expect(component.size()).toBe('20px');
		});

		it('should accept custom gap input', () => {
			fixture.componentRef.setInput('gap', '24px');
			expect(component.gap()).toBe('24px');
		});

		it('should accept custom jumpDistance input', () => {
			fixture.componentRef.setInput('jumpDistance', '-20px');
			expect(component.jumpDistance()).toBe('-20px');
		});

		it('should accept custom speed input', () => {
			fixture.componentRef.setInput('speed', '2.5s');
			expect(component.speed()).toBe('2.5s');
		});

		it('should accept different CSS units', () => {
			fixture.componentRef.setInput('size', '2rem');
			fixture.componentRef.setInput('gap', '1.5em');
			expect(component.size()).toBe('2rem');
			expect(component.gap()).toBe('1.5em');
		});
	});

	describe('Host Element CSS Custom Properties', () => {
		it('should set --dot-size CSS variable with default value', () => {
			const computedStyle = getComputedStyle(hostElement);
			expect(computedStyle.getPropertyValue('--dot-size')).toBe('16px');
		});

		it('should set --dot-gap CSS variable with default value', () => {
			const computedStyle = getComputedStyle(hostElement);
			expect(computedStyle.getPropertyValue('--dot-gap')).toBe('16px');
		});

		it('should set --dot-jump CSS variable with default value', () => {
			const computedStyle = getComputedStyle(hostElement);
			expect(computedStyle.getPropertyValue('--dot-jump')).toBe('-15px');
		});

		it('should set --dot-speed CSS variable with default value', () => {
			const computedStyle = getComputedStyle(hostElement);
			expect(computedStyle.getPropertyValue('--dot-speed')).toBe('1.8s');
		});

		it('should update --dot-size CSS variable when input changes', () => {
			fixture.componentRef.setInput('size', '24px');
			fixture.detectChanges();
			const computedStyle = getComputedStyle(hostElement);
			expect(computedStyle.getPropertyValue('--dot-size')).toBe('24px');
		});

		it('should update all CSS variables when inputs change', () => {
			fixture.componentRef.setInput('size', '20px');
			fixture.componentRef.setInput('gap', '18px');
			fixture.componentRef.setInput('jumpDistance', '-18px');
			fixture.componentRef.setInput('speed', '2s');
			fixture.detectChanges();

			const computedStyle = getComputedStyle(hostElement);
			expect(computedStyle.getPropertyValue('--dot-size')).toBe('20px');
			expect(computedStyle.getPropertyValue('--dot-gap')).toBe('18px');
			expect(computedStyle.getPropertyValue('--dot-jump')).toBe('-18px');
			expect(computedStyle.getPropertyValue('--dot-speed')).toBe('2s');
		});
	});

	describe('Template Rendering', () => {
		it('should render a container with class "loading-dots"', () => {
			const container = hostElement.querySelector('.loading-dots');
			expect(container).toBeTruthy();
		});

		it('should render exactly 4 dots', () => {
			const dots = hostElement.querySelectorAll('.dot');
			expect(dots.length).toBe(4);
		});

		it('should render dots inside the loading-dots container', () => {
			const container = hostElement.querySelector('.loading-dots');
			const dots = container?.querySelectorAll('.dot');
			expect(dots?.length).toBe(4);
		});

		it('should have dots with correct class name', () => {
			const dots = hostElement.querySelectorAll('.dot');
			dots.forEach((dot) => {
				expect(dot.classList.contains('dot')).toBe(true);
			});
		});
	});
});
