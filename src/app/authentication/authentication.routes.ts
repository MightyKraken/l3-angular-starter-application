import { Routes } from '@angular/router';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const AUTH_ROUTES: Routes = [
	{
		path: 'signin',
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
		redirectTo: 'signin',
		pathMatch: 'full'
	}
];
