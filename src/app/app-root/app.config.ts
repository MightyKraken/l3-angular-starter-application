import { provideHttpClient } from '@angular/common/http';
import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideZonelessChangeDetection
} from '@angular/core';
import {
	provideRouter,
	TitleStrategy,
	withComponentInputBinding
} from '@angular/router';
import { provideLucideIcons } from '@lucide/angular';
import { appLucideIcons } from '@shared/ui-icon';
import {
	AppLayoutModeService,
	SidebarTogglePreferenceService,
	ToolbarBehaviorPreferenceService
} from '@shared/ui-layout';
import { ThemeService } from '@shared/ui-theme';
import { AppTitleStrategyService } from '@shared/util-app-title-strategy';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(),
		provideLucideIcons(...appLucideIcons),
		provideZonelessChangeDetection(),
		provideAppInitializer(() => {
			inject(ThemeService).initFromStorage();
			inject(AppLayoutModeService).initFromStorage();
			inject(SidebarTogglePreferenceService).initFromStorage();
			inject(ToolbarBehaviorPreferenceService).initFromStorage();
		}),
		{ provide: TitleStrategy, useClass: AppTitleStrategyService }
	]
};
