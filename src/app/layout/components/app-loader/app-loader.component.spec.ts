import { DestroyRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoaderComponent } from './app-loader.component';

describe('AppLoaderComponent', () => {
	let component: AppLoaderComponent;
	let fixture: ComponentFixture<AppLoaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppLoaderComponent],
			providers: [
				{
					provide: Renderer2,
					useValue: {
						addClass: jasmine.createSpy('addClass'),
						removeClass: jasmine.createSpy('removeClass')
					}
				},
				DestroyRef
			]
		}).compileComponents();

		fixture = TestBed.createComponent(AppLoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
