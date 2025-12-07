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

import { AppTitleStrategyService } from '../shared';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(),
		provideZonelessChangeDetection(),
		provideAppInitializer(() => {
			console.log(
				'Loads Before app bootstraps and blocks bootstrap until work is done'
			);
		}),
		{ provide: TitleStrategy, useClass: AppTitleStrategyService }
	]
};
