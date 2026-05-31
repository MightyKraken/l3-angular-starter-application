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
import { AppTitleStrategyService } from '@core';
import { provideLucideIcons } from '@lucide/angular';
import {
	AppLayoutModeService,
	SidebarTogglePreferenceService,
	ThemeService,
	ToolbarBehaviorPreferenceService
} from '@shared';
import { appLucideIcons } from '@shared';

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
