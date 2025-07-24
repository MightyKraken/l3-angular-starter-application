import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SHARED_COMPONENTS } from '../app-shared/constants/imports.const';

@Component({
	selector: 'root',
	templateUrl: './app.html',
	styleUrl: './app.scss',
	imports: [RouterOutlet, ...SHARED_COMPONENTS]
})
export class App {}
