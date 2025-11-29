import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnChanges,
	OnInit,
	signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
	ActivatedRoute,
	NavigationEnd,
	Router,
	RouterOutlet
} from '@angular/router';
import { COMMON_IMPORTS, ILayoutData, SHARED_COMPONENTS } from '@shared';
import { filter } from 'rxjs';

import { AppNavigationBarComponent } from '../app-navigation-bar/app-navigation-bar.component';
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
	styleUrl: './app-layout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent implements OnChanges, OnInit {
	route = inject(ActivatedRoute);
	router = inject(Router);

	readonly layoutData = signal<ILayoutData>({
		showNavigation: false,
		showToolbar: false
	});

	readonly showNavigation = computed<boolean>(
		() => this.layoutData().showNavigation
	);
	readonly showToolbar = computed<boolean>(() => this.layoutData().showToolbar);

	constructor() {
		this.setRouteData();
	}

	ngOnChanges(): void {
		console.log('ngOnChanges');
	}

	ngOnInit(): void {
		console.log('ngOnINit');
	}

	private setRouteData(): void {
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				takeUntilDestroyed()
			)
			.subscribe(() => {
				this.layoutData.set(this.getFirstRouteData());
			});
	}

	private getFirstRouteData(): ILayoutData {
		return <ILayoutData>this.route?.snapshot?.firstChild?.data;
	}
}
