import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
	provideRouter,
	TitleStrategy,
	withComponentInputBinding
} from '@angular/router';
import { AppTitleStrategyService } from 'src/app/shared';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(),
		{ provide: TitleStrategy, useClass: AppTitleStrategyService }
	]
};
