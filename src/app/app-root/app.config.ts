import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
	provideRouter,
	TitleStrategy,
	withComponentInputBinding
} from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { AppTitleStrategyService } from '@shared';
import { providePrimeNG } from 'primeng/config';
import { DialogService } from 'primeng/dynamicdialog';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(),
		provideAnimationsAsync(),
		providePrimeNG({
			theme: {
				preset: Aura
			}
		}),
		{ provide: TitleStrategy, useClass: AppTitleStrategyService },
		DialogService
	]
};
