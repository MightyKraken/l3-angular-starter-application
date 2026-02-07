import {
    ChangeDetectionStrategy,
    Component
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SHARED_COMPONENTS } from '@shared';

import { AppLoaderComponent } from '../layout';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, AppLoaderComponent, ...SHARED_COMPONENTS],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
