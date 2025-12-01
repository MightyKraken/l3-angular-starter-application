import { Routes } from '@angular/router';

import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { OtpComponent } from './components/otp/otp.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const AUTH_ROUTES: Routes = [
	{
		path: 'sign-in',
		component: SignInComponent
	},
	{
		path: 'signup',
		component: SignUpComponent
	},
	{
		path: 'reset-password',
		component: ResetPasswordComponent
	},
	{
		path: 'change-password',
		component: ChangePasswordComponent
	},
	{
		path: 'otp-enter',
		component: OtpComponent
	},
	{
		path: '',
		redirectTo: 'sign-in',
		pathMatch: 'full'
	}
];
