import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
	{
		path: 'signin',
		loadComponent: () =>
			import('./sign-in/sign-in.component').then((m) => m.SignInComponent)
	},
	{
		path: 'signup',
		loadComponent: () =>
			import('./sign-up/sign-up.component').then((m) => m.SignUpComponent)
	},
	{
		path: 'reset-password',
		loadComponent: () =>
			import('./reset-password/reset-password.component').then(
				(m) => m.ResetPasswordComponent
			)
	},
	{
		path: 'change-password',
		loadComponent: () =>
			import('./change-password/change-password.component').then(
				(m) => m.ChangePasswordComponent
			)
	},
	{
		path: 'otp-enter',
		loadComponent: () =>
			import('./otp/otp.component').then((m) => m.OtpComponent)
	},
	{
		path: '',
		redirectTo: 'signin',
		pathMatch: 'full'
	}
];
