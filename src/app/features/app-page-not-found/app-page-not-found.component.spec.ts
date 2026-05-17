import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppPageNotFoundComponent } from './app-page-not-found.component';

describe('AppPageNotFoundComponent', () => {
	let component: AppPageNotFoundComponent;
	let fixture: ComponentFixture<AppPageNotFoundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppPageNotFoundComponent],
			providers: [provideRouter([])]
		}).compileComponents();

		fixture = TestBed.createComponent(AppPageNotFoundComponent);
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
