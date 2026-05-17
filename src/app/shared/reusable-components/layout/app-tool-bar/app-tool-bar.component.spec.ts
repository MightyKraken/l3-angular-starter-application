import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppToolBarComponent } from './app-tool-bar.component';

describe('AppToolBarComponent', () => {
	let component: AppToolBarComponent;
	let fixture: ComponentFixture<AppToolBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppToolBarComponent],
			providers: [provideRouter([])]
		}).compileComponents();

		fixture = TestBed.createComponent(AppToolBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
