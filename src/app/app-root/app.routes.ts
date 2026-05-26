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
				component: AppHomeComponent
			},
			{
				path: 'playground',
				children: [
					{
						path: '',
						pathMatch: 'full',
						redirectTo: 'ui/components'
					},
					{
						path: 'ui/components',
						loadComponent: () =>
							import('../features/app-playground/pages/app-playground-ui-components/app-playground-ui-components.component').then(
								(c) => c.AppPlaygroundUiComponentsComponent
							)
					},
					{
						path: 'ui/layout',
						loadComponent: () =>
							import('../features/app-playground/pages/app-playground-ui-layout/app-playground-ui-layout.component').then(
								(c) => c.AppPlaygroundUiLayoutComponent
							)
					},
					{
						path: 'tools',
						loadComponent: () =>
							import('../features/app-playground/pages/app-playground-tools/app-playground-tools.component').then(
								(c) => c.AppPlaygroundToolsComponent
							)
					}
				]
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
		data: <ILayoutData>{
			showToolbar: true,
			showNavigation: true
		}
	},
	{ path: '**', component: AppPageNotFoundComponent }
];
