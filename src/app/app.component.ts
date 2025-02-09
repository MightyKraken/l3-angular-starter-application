import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'l3-angular-starter-application';
	ngOnInit(): void {}

	x(): void {
		console.log('sss');
	}
}
