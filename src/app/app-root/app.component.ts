import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppLoaderComponent } from '../app-loader';
import { SHARED_COMPONENTS } from '../app-shared/constants/imports.const';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [RouterOutlet, AppLoaderComponent, ...SHARED_COMPONENTS]
})
export class AppComponent {}
