import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SHARED_COMPONENTS } from '@shared';

import { AppLoaderService } from '../layout';

@Component({
	selector: 'app-home',
	templateUrl: './app-home.component.html',
	styleUrl: './app-home.component.scss',
	imports: [JsonPipe, SHARED_COMPONENTS]
})
export class AppHomeComponent {
	appLoaderService = inject(AppLoaderService);
	data: unknown = null;
	ngOnInit(): void {
		this.startLoading();
	}

	startLoading(): void {
		this.appLoaderService.show();
		setTimeout(() => {
			this.appLoaderService.hide();
		}, 5000);
	}
}
