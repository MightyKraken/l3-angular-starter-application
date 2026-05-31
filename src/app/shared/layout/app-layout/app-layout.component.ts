import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppLayoutModeService } from '../app-layout-mode-picker/app-layout-mode.service';
import { AppNavigationBarComponent } from '../app-navigation-bar/app-navigation-bar.component';
import { AppToolBarComponent } from '../app-tool-bar/app-tool-bar.component';
import { ToolbarBehaviorPreferenceService } from '../app-toolbar-behavior-picker/toolbar-behavior-preference.service';
import { SidebarLayoutService } from '../sidebar-layout/sidebar-layout.service';

@Component({
	selector: 'app-layout',
	imports: [
		RouterOutlet,
		AppNavigationBarComponent,
		AppToolBarComponent,
		NgTemplateOutlet
	],
	templateUrl: './app-layout.component.html',
	styleUrl: './app-layout.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block min-h-dvh' }
})
export class AppLayoutComponent {
	private readonly sidebarLayout = inject(SidebarLayoutService);
	private readonly layoutModeService = inject(AppLayoutModeService);
	private readonly toolbarBehaviorPreference = inject(
		ToolbarBehaviorPreferenceService
	);

	readonly showToolbar = input<boolean>(false);
	readonly showNavigation = input<boolean>(false);
	readonly sidebarMode = this.sidebarLayout.mode;
	readonly layoutMode = this.layoutModeService.layoutMode;
	readonly toolbarBehavior = this.toolbarBehaviorPreference.behavior;
}
