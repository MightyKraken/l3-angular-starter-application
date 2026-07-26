import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LucideDynamicIcon } from '@lucide/angular';
import { of, switchMap } from 'rxjs';

import { AppRegisteredLucideIcon } from './app-lucide-icons';
import { IconAssetService } from './icon-asset.service';

/**
 * Renders Lucide icons by name or custom SVG files from `public/icons/`.
 *
 * @example
 * ```html
 * <app-icon icon="registeredIcon" />
 * <app-icon svgPath="svgPath" />
 * ```
 */
@Component({
	selector: 'app-icon',
	imports: [LucideDynamicIcon],
	templateUrl: './app-icon.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'class':
			'inline-flex size-[var(--icon-size,1.25rem)] shrink-0 items-center justify-center text-current',
		'[style.--icon-size]': 'size()',
		'[attr.aria-label]': 'ariaLabel()',
		'[attr.aria-hidden]': 'ariaLabel() ? null : "true"'
	}
})
export class AppIconComponent {
	private readonly iconAssetService = inject(IconAssetService);

	readonly icon = input<AppRegisteredLucideIcon>();
	readonly svgPath = input<string>();
	readonly size = input<string>('1.25rem');
	readonly strokeWidth = input<number>(2);
	readonly ariaLabel = input<string | undefined>(undefined);

	readonly assetSvg = toSignal(
		toObservable(this.svgPath).pipe(
			switchMap((path) => (path ? this.iconAssetService.load(path) : of(null)))
		),
		{ initialValue: null }
	);
}
