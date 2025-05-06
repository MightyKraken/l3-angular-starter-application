import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPageNotFoundComponent } from './app-page-not-found.component';

describe('AppPageNotFoundComponent', () => {
	let component: AppPageNotFoundComponent;
	let fixture: ComponentFixture<AppPageNotFoundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppPageNotFoundComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(AppPageNotFoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain not found page text', () => {
		const htmlElement: HTMLElement = fixture.nativeElement;
		const div = htmlElement.querySelector('#page_not_found');
		expect(div?.textContent).toMatch(/not found/i);
	});
});
