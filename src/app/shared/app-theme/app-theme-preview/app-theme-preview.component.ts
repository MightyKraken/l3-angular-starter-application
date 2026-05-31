import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { DaisyThemeId } from '../theme.const';

@Component({
	selector: 'app-theme-preview',
	templateUrl: './app-theme-preview.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'inline-flex shrink-0'
	}
})
export class AppThemePreviewComponent {
	readonly themeId = input.required<DaisyThemeId>();
	readonly swatchSize = input<'sm' | 'md'>('sm');
}
