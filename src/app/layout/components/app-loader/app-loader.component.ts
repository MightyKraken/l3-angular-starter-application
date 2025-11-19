import { Component, inject } from '@angular/core';
import { COMMON_IMPORTS, SHARED_COMPONENTS } from '@shared';

import { AppLoaderService } from '../../services/app-loader.service';

@Component({
	selector: 'app-loader',
	imports: [SHARED_COMPONENTS, COMMON_IMPORTS],
	templateUrl: './app-loader.component.html',
	styleUrl: './app-loader.component.scss'
})
export class AppLoaderComponent {
	protected appLoaderService = inject(AppLoaderService);
}
