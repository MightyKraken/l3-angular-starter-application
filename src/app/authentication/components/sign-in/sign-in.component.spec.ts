import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
	let component: SignInComponent;
	let fixture: ComponentFixture<SignInComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				SignInComponent,
				CommonModule,
				FormsModule,
				RouterLink,
				RouterModule
			],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							queryParams: {}
						}
					}
				}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(SignInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
