import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal
} from '@angular/core';
import {
	email,
	Field,
	form,
	maxLength,
	minLength,
	pattern,
	required
} from '@angular/forms/signals';
import { Router } from '@angular/router';

import { AuthService } from '../../services';

@Component({
	selector: 'sign-up',
	imports: [Field],
	templateUrl: './sign-up.component.html',
	styleUrl: './sign-up.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
	private router = inject(Router);
	private authService = inject(AuthService);

	readonly signupModel = signal({
		username: '',
		email: '',
		password: ''
	});

	signupForm = form(this.signupModel, (fieldPath) => {
		required(fieldPath.username, { message: 'Username is required' });
		minLength(fieldPath.username, 3, {
			message: 'Username must be at least 3 characters'
		});
		maxLength(fieldPath.username, 50, {
			message: 'Username must not exceed 50 characters'
		});
		pattern(fieldPath.username, /^[^\s]+$/, {
			message: 'Username must not contain spaces'
		});

		required(fieldPath.email, { message: 'Email is required' });
		email(fieldPath.email, { message: 'Please enter a valid email address' });

		required(fieldPath.password, { message: 'Password is required' });
		minLength(fieldPath.password, 6, {
			message: 'Password must be at least 6 characters'
		});
		pattern(
			fieldPath.password,
			/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
			{
				message:
					'Password must contain at least one uppercase letter, one digit, and one special character'
			}
		);
	});

	readonly isSubmitting = signal(false);

	readonly errorMessage = signal<string | null>(null);

	onSubmit(): void {
		if (this.signupForm().invalid()) {
			this.errorMessage.set('Please fix the errors before submitting');
			return;
		}

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		const formValue = this.signupModel();

		this.authService.signup(formValue).subscribe({
			next: (response) => {
				this.isSubmitting.set(false);
				this.router.navigate(['/']);
			},
			error: (error) => {
				this.isSubmitting.set(false);
				const errorMsg =
					error?.error?.message ||
					'An error occurred during signup. Please try again.';
				this.errorMessage.set(errorMsg);
			}
		});
	}
}
