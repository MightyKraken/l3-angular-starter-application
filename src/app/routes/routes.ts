import { Routes } from '@angular/router';

import { AboutComponent } from '../about/about.component';
import { AppHomeComponent } from '../home/app-home.component';
import { PageNotFound } from '../page-not-found/page-not-found';

export const routes: Routes = [
	{
		path: '',
		component: AppHomeComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{ path: '**', component: PageNotFound }
];
