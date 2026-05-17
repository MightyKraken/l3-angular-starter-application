import { Routes } from '@angular/router';

import { ILayoutData } from '@core';
import { AppLayoutComponent } from '@shared';
import { AppHomeComponent } from '../features/app-home/app-home.component';
import { AppPageNotFoundComponent } from '../features/app-page-not-found/app-page-not-found.component';

export const routes: Routes = [
	{
		path: '',
		component: AppLayoutComponent,
		children: [
			{
				path: '',
				component: AppHomeComponent,
				data: <ILayoutData>{
					showToolbar: true,
					showNavigation: true
				}
			}
		],
		data: <ILayoutData>{
			showToolbar: false,
			showNavigation: false
		}
	},
	{ path: '**', component: AppPageNotFoundComponent }
];
