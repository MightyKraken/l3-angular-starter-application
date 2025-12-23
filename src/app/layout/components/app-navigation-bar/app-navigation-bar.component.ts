import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-navigation-bar',
	imports: [RouterLink, RouterLinkActive],
	templateUrl: './app-navigation-bar.component.html',
	styleUrl: './app-navigation-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavigationBarComponent {
	readonly navigationItems = signal([
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
	]);
}
