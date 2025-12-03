import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMMON_IMPORTS, SHARED_COMPONENTS } from '@shared';

import { AboutComponent } from '../about/about.component';

@Component({
	selector: 'app-home',
	imports: [SHARED_COMPONENTS, COMMON_IMPORTS, AboutComponent],
	templateUrl: './app-home.component.html',
	styleUrl: './app-home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHomeComponent {}
