import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-navigation-bar',
	imports: [RouterLink, RouterLinkActive],
	templateUrl: './app-navigation-bar.component.html',
	styleUrl: './app-navigation-bar.component.scss'
})
export class AppNavigationBarComponent {
	navigationItems = [
		{
			label: 'Home',
			route: '/',
			icon: '🏠'
		},
		{
			label: 'About',
			route: '/about',
			icon: 'ℹ️'
		},
		{
			label: 'Sign In',
			route: '/auth/sign-in',
			icon: '🔐'
		}
	];
}
