import { Routes } from '@angular/router';
import { AppHomeComponent } from '@home/feature-home';
import { AppPageNotFoundComponent } from '@page-not-found/feature-page-not-found';
import { AppLayoutComponent } from '@shared/ui-layout';

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
					import('@playground/feature-playground').then(
						(c) => c.AppPlaygroundComponent
					)
			},
			{
				path: 'settings',
				loadComponent: () =>
					import('@settings/feature-settings').then(
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
