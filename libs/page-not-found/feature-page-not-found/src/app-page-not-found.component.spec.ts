import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
	LucideArrowLeft,
	LucideHouse,
	LucideSearchX,
	provideLucideIcons
} from '@lucide/angular';

import { AppPageNotFoundComponent } from './app-page-not-found.component';

describe('AppPageNotFoundComponent', () => {
	let component: AppPageNotFoundComponent;
	let fixture: ComponentFixture<AppPageNotFoundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppPageNotFoundComponent],
			providers: [
				provideRouter([]),
				provideLucideIcons(LucideSearchX, LucideHouse, LucideArrowLeft)
			]
		}).compileComponents();

		fixture = TestBed.createComponent(AppPageNotFoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain not found page text', () => {
		expect(fixture.nativeElement.textContent).toMatch(/page not found/i);
	});
});
