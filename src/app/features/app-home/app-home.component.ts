import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMMON_IMPORTS } from '@core';

@Component({
	selector: 'app-home',
	imports: [COMMON_IMPORTS],
	templateUrl: './app-home.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHomeComponent {}
