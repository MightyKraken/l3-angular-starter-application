import { Routes } from '@angular/router';

import { AboutComponent } from '../about/about.component';
import { AppHomeComponent } from '../app-home/app-home.component';
import { AppPageNotFoundComponent } from '../app-page-not-found/app-page-not-found.component';

export const routes: Routes = [
	{
		path: '',
		component: AppHomeComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('../authentication/authentication.routes').then(
				(m) => m.AUTH_ROUTES
			)
	},
	{ path: '**', component: AppPageNotFoundComponent }
];
