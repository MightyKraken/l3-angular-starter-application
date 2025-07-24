import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PageNotFound } from './page-not-found';

describe('PageNotFound', () => {
	let component: PageNotFound;
	let fixture: ComponentFixture<PageNotFound>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PageNotFound]
		}).compileComponents();

		fixture = TestBed.createComponent(PageNotFound);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain not found page text', () => {
		const container = fixture.debugElement.query(
			By.css('[data-testid="page-container"]')
		);
		expect(container.nativeElement?.textContent).toMatch(/not found/i);
	});
});
