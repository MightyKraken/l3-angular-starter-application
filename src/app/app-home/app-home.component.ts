import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { AppLoaderService } from '../app-loader';
import { SHARED_COMPONENTS } from '../app-shared/constants/imports.const';
import { AppHomeService } from './app-home.service';

@Component({
	selector: 'app-home',
	templateUrl: './app-home.component.html',
	styleUrl: './app-home.component.scss',
	imports: [JsonPipe, SHARED_COMPONENTS]
})
export class AppHomeComponent {
	appHomeService = inject(AppHomeService);
	appLoaderService = inject(AppLoaderService);

	data: unknown = null;
	ngOnInit(): void {}

	startLoading(): void {
		this.appLoaderService.show();
		setTimeout(() => {
			this.appLoaderService.hide();
		}, 5000);
	}
}
