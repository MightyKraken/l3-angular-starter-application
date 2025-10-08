import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'sign-in',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './sign-in.component.html',
	styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
	username: string = '';
	password: string = '';
}
