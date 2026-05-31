import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LucideDynamicIcon } from '@lucide/angular';
import { of, switchMap } from 'rxjs';

import type { AppIconSource } from './app-icon.types';
import { IconAssetService } from './icon-asset.service';

/**
 * Renders Lucide icons by name or custom SVG files from `public/icons/`.
 *
 * @example
 * ```html
 * <app-icon name="home" />
 * <app-icon source="asset" name="brand/logo" ariaLabel="Company logo" />
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

	private readonly assetRequest = computed(() =>
		this.source() === 'asset' ? this.name() : null
	);

	readonly name = input.required<string>();
	readonly source = input<AppIconSource>('lucide');
	readonly size = input<string>('1.25rem');
	readonly strokeWidth = input<number>(2);
	readonly ariaLabel = input<string | undefined>(undefined);

	readonly isLucide = computed(() => this.source() === 'lucide');

	readonly assetSvg = toSignal(
		toObservable(this.assetRequest).pipe(
			switchMap((assetName) =>
				assetName ? this.iconAssetService.load(assetName) : of(null)
			)
		),
		{ initialValue: null }
	);
}
