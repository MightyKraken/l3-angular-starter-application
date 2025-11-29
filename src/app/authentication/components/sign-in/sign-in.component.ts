import { Component } from '@angular/core';

@Component({
	selector: 'sign-in',
	imports: [],
	standalone: true,
	templateUrl: './sign-in.component.html',
	styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
	username: string = '';
	password: string = '';
}
