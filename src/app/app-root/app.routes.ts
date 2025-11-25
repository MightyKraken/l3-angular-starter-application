import { Routes } from '@angular/router';
import { ILayoutData } from '@shared';

import { AboutComponent } from '../about/about.component';
import { AppHomeComponent } from '../app-home/app-home.component';
import { AppPageNotFoundComponent } from '../app-page-not-found/app-page-not-found.component';
import { AppLayoutComponent } from '../layout';

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
			},
			{
				path: 'about',
				component: AboutComponent,
				data: <ILayoutData>{
					showToolbar: false,
					showNavigation: true
				}
			},
			{
				path: 'auth',
				loadChildren: () =>
					import('../authentication/authentication.routes').then(
						(m) => m.AUTH_ROUTES
					),
				data: <ILayoutData>{
					showToolbar: false,
					showNavigation: false
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
