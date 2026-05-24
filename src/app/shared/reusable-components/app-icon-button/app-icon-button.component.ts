import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	output
} from '@angular/core';
import { MatRipple } from '@angular/material/core';

import { AppIconComponent } from '../app-icon/app-icon.component';

/**
 * Circular icon button with hover background and Material ripple.
 *
 * @example
 * ```html
 * <app-icon-button icon="list" ariaLabel="Open menu" (clicked)="open()" />
 * ```
 */
@Component({
	selector: 'app-icon-button',
	imports: [AppIconComponent, MatRipple],
	templateUrl: './app-icon-button.component.html',
	styleUrl: './app-icon-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'class': 'app-icon-button',
		'[style.--icon-button-size]': 'buttonSize()'
	}
})
export class AppIconButtonComponent {
	readonly icon = input.required<string>();
	readonly ariaLabel = input.required<string>();
	readonly iconSize = input('1.25rem');
	readonly disabled = input(false, { transform: booleanAttribute });
	readonly type = input<'button' | 'submit' | 'reset'>('button');

	readonly clicked = output<MouseEvent>();

	readonly buttonSize = computed(() => {
		const size = this.iconSize();
		const match = /^([\d.]+)rem$/.exec(size.trim());

		if (match) {
			const rem = Number(match[1]);
			return `${Math.max(rem * 2, 2.5)}rem`;
		}

		return '2.5rem';
	});

	readonly rippleColor = computed(
		() =>
			'var(--icon-button-ripple-color, color-mix(in srgb, currentColor 25%, transparent))'
	);

	onClick(event: MouseEvent): void {
		if (this.disabled()) {
			return;
		}

		this.clicked.emit(event);
	}
}
