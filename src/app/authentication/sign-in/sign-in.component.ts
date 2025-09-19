import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
	selector: 'sign-in',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		RouterLink,
		ButtonModule,
		CardModule,
		InputTextModule,
		PasswordModule,
		RouterModule
	],
	templateUrl: './sign-in.component.html',
	styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
	username: string = '';
	password: string = '';

	onSubmit(): void {
		// Handle login logic here
		console.log('Login attempt with:', { username: this.username });
	}
}
