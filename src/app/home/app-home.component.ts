import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { AppHomeService } from './app-home.service';

@Component({
	selector: 'app-home',
	templateUrl: './app-home.component.html',
	styleUrl: './app-home.component.scss',
	imports: [JsonPipe]
})
export class AppHomeComponent {
	appHomeService = inject(AppHomeService);
	data: unknown = null;

	ngOnInit(): void {
		this.appHomeService.getData('').subscribe((data) => {
			this.data = data;
		});
	}
}
