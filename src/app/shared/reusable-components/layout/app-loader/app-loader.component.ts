import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AppLoaderService, COMMON_IMPORTS } from '@core';
import { LoadingDotsComponent } from '../../loading-dots/loading-dots.component';

@Component({
	selector: 'app-loader',
	imports: [LoadingDotsComponent, COMMON_IMPORTS],
	templateUrl: './app-loader.component.html',
	styleUrl: './app-loader.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLoaderComponent {
	protected appLoaderService = inject(AppLoaderService);
}
