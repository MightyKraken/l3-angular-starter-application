import { Routes } from '@angular/router';
import { ILayoutData } from '@core';
import { AppLayoutComponent } from '@shared';

import { AppHomeComponent } from '../features/app-home/app-home.component';
import { AppPageNotFoundComponent } from '../features/app-page-not-found/app-page-not-found.component';
import { AppSettingsComponent } from '../features/app-settings/app-settings.component';

export const routes: Routes = [
	{
		path: '',
		component: AppLayoutComponent,
		children: [
			{
				path: '',
				component: AppHomeComponent
			},
			{
				path: 'settings',
				component: AppSettingsComponent,
				data: { title: 'Settings' }
			}
		],
		data: <ILayoutData>{
			showToolbar: true,
			showNavigation: true
		}
	},
	{ path: '**', component: AppPageNotFoundComponent }
];
