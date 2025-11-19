import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SHARED_COMPONENTS } from '@shared';

import { AppLoaderComponent } from '../layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [RouterOutlet, AppLoaderComponent, ...SHARED_COMPONENTS]
})
export class AppComponent {}
