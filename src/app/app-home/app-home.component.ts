import { Component, inject, OnInit } from '@angular/core';
import { COMMON_IMPORTS, SHARED_COMPONENTS } from '@shared';

import { AppLoaderService } from '../layout';

@Component({
	selector: 'app-home',
	imports: [SHARED_COMPONENTS, COMMON_IMPORTS],
	templateUrl: './app-home.component.html',
	styleUrl: './app-home.component.scss'
})
export class AppHomeComponent implements OnInit {
	private xa = true;
	appLoaderService = inject(AppLoaderService);
	data: unknown = null;
	x = false;
	d = 22;

	ngOnInit(): void {
		this.startLoading();
	}

	startLoading(): void {
		this.appLoaderService.show();
		setTimeout(() => {
			this.appLoaderService.hide();
		}, 200);
	}
}
