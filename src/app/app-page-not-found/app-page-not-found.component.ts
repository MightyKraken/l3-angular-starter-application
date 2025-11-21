import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-page-not-found',
	imports: [RouterLink],
	templateUrl: './app-page-not-found.component.html',
	styleUrl: './app-page-not-found.component.scss'
})
export class AppPageNotFoundComponent {
	constructor(private location: Location) {}

	goBack(): void {
		this.location.back();
	}
}
