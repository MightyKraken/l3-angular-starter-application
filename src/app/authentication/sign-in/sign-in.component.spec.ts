import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

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
				ButtonModule,
				CardModule,
				InputTextModule,
				PasswordModule,
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
