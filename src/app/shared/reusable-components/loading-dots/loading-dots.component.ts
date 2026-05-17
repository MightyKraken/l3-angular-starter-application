import { Component, input } from '@angular/core';

@Component({
	selector: 'loading-dots',
	imports: [],
	templateUrl: './loading-dots.component.html',
	styleUrl: './loading-dots.component.scss',
	host: {
		'[style.--dot-size]': 'size()',
		'[style.--dot-gap]': 'gap()',
		'[style.--dot-jump]': 'jumpDistance()',
		'[style.--dot-speed]': 'speed()'
	}
})
export class LoadingDotsComponent {
	readonly size = input<string>('16px');
	readonly gap = input<string>('16px');
	readonly jumpDistance = input<string>('-15px');
	readonly speed = input<string>('1.8s');
}
