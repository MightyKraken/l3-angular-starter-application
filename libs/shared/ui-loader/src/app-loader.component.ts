import { CdkTrapFocus } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AppLoaderService } from './app-loader.service';

@Component({
	selector: 'app-loader',
	imports: [CdkTrapFocus],
	templateUrl: './app-loader.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLoaderComponent {
	protected appLoaderService = inject(AppLoaderService);
}
