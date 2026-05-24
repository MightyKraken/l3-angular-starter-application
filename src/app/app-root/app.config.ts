import { provideHttpClient } from '@angular/common/http';
import {
	ApplicationConfig,
	provideAppInitializer,
	provideZonelessChangeDetection
} from '@angular/core';
import {
	provideRouter,
	TitleStrategy,
	withComponentInputBinding
} from '@angular/router';
import {
	AppTitleStrategyService,
	BreakPointDetectorService,
	ScreenSizeObserver
} from '@core';
import { provideLucideIcons } from '@lucide/angular';
import { appLucideIcons } from '@shared';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(),
		provideLucideIcons(...appLucideIcons),
		provideZonelessChangeDetection(),
		provideAppInitializer(() => {
			console.log(
				'Loads Before app bootstraps and blocks bootstrap until work is done'
			);
		}),
		{ provide: TitleStrategy, useClass: AppTitleStrategyService },
		{ provide: ScreenSizeObserver, useClass: BreakPointDetectorService }
	]
};
