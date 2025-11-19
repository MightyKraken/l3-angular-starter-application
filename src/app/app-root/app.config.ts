import { provideHttpClient } from '@angular/common/http';
import {
	ApplicationConfig,
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
		{ provide: TitleStrategy, useClass: AppTitleStrategyService }
	]
};
