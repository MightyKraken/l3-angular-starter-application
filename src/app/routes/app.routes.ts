import { Routes } from '@angular/router';

import { AppHomeComponent } from '../app-home/app-home.component';
import { AppPageNotFoundComponent } from '../app-page-not-found/app-page-not-found.component';

export const routes: Routes = [
	{
		path: '',
		component: AppHomeComponent
	},
	{ path: '**', component: AppPageNotFoundComponent }
];
