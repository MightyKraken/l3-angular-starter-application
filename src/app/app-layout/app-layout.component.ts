import { Component, computed, inject, signal } from '@angular/core';
import {
	ActivatedRoute,
	NavigationEnd,
	Router,
	RouterOutlet
} from '@angular/router';
import { filter } from 'rxjs';

import { AppNavigationBarComponent } from '../app-navigation-bar/app-navigation-bar.component';
import { ILayoutData } from '../app-shared';
import {
	COMMON_IMPORTS,
	SHARED_COMPONENTS
} from '../app-shared/constants/imports.const';
import { AppToolBarComponent } from '../app-tool-bar/app-tool-bar.component';

@Component({
	selector: 'app-layout',
	imports: [
		RouterOutlet,
		AppNavigationBarComponent,
		AppToolBarComponent,
		...SHARED_COMPONENTS,
		...COMMON_IMPORTS
	],
	templateUrl: './app-layout.component.html',
	styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {
	route = inject(ActivatedRoute);
	router = inject(Router);

	showNavigation = computed<boolean>(() => this.layoutData().showNavigation);
	showToolbar = computed<boolean>(() => this.layoutData().showToolbar);
	layoutData = signal<ILayoutData>({
		showNavigation: false,
		showToolbar: false
	});

	constructor() {
		this.setRouteData();
	}

	private setRouteData(): void {
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => {
				this.layoutData.set(this.getFirstRouteData());
			});
	}

	private getFirstRouteData(): ILayoutData {
		return <ILayoutData>this.route?.snapshot?.firstChild?.data;
	}
}
