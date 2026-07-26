import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPlaygroundComponent } from './app-playground.component';

describe('AppPlaygroundComponent', () => {
	let component: AppPlaygroundComponent;
	let fixture: ComponentFixture<AppPlaygroundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppPlaygroundComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(AppPlaygroundComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
