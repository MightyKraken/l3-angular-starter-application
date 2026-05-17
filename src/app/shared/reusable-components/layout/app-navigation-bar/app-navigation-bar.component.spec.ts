import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppNavigationBarComponent } from './app-navigation-bar.component';

describe('AppNavigationBarComponent', () => {
	let component: AppNavigationBarComponent;
	let fixture: ComponentFixture<AppNavigationBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppNavigationBarComponent],
			providers: [provideRouter([])]
		}).compileComponents();

		fixture = TestBed.createComponent(AppNavigationBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
