import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideList, provideLucideIcons } from '@lucide/angular';

import { AppIconButtonComponent } from './app-icon-button.component';

describe('AppIconButtonComponent', () => {
	let fixture: ComponentFixture<AppIconButtonComponent>;
	let hostElement: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppIconButtonComponent],
			providers: [provideLucideIcons(LucideList)]
		}).compileComponents();

		fixture = TestBed.createComponent(AppIconButtonComponent);
		hostElement = fixture.nativeElement;
		fixture.componentRef.setInput('icon', 'list');
		fixture.componentRef.setInput('ariaLabel', 'Open menu');
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should render a circular button with app-icon', () => {
		const button = hostElement.querySelector('button.icon-button');
		expect(button).toBeTruthy();
		expect(button?.getAttribute('aria-label')).toBe('Open menu');
		expect(hostElement.querySelector('app-icon')).toBeTruthy();
	});

	it('should emit clicked on button click', () => {
		const clicked = vi.fn();
		fixture.componentInstance.clicked.subscribe(clicked);

		const button: HTMLButtonElement =
			hostElement.querySelector('button.icon-button')!;
		button.click();

		expect(clicked).toHaveBeenCalledTimes(1);
	});

	it('should not emit clicked when disabled', () => {
		const clicked = vi.fn();
		fixture.componentInstance.clicked.subscribe(clicked);
		fixture.componentRef.setInput('disabled', true);
		fixture.detectChanges();

		const button: HTMLButtonElement =
			hostElement.querySelector('button.icon-button')!;
		button.click();

		expect(clicked).not.toHaveBeenCalled();
	});
});
