import { Routes } from '@angular/router';
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
				component: AppHomeComponent
			},
			{
				path: 'playground',
				loadComponent: () =>
					import('../features/app-playground/app-playground.component').then(
						(c) => c.AppPlaygroundComponent
					)
			},
			{
				path: 'settings',
				loadComponent: () =>
					import('../features/app-settings/app-settings.component').then(
						(c) => c.AppSettingsComponent
					),
				data: { title: 'Settings' }
			}
		],
		data: {
			showToolbar: true,
			showNavigation: true
		}
	},
	{ path: '**', component: AppPageNotFoundComponent }
];
