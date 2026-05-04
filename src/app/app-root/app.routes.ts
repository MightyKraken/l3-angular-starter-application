import { Routes } from '@angular/router';
import { ILayoutData } from '@shared';

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
			}
		],
		data: <ILayoutData>{
			showToolbar: false,
			showNavigation: false
		}
	},
	{ path: '**', component: AppPageNotFoundComponent }
];
