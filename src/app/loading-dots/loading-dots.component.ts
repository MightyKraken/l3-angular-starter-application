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
	size = input<string>('16px');
	gap = input<string>('16px');
	jumpDistance = input<string>('-15px');
	speed = input<string>('1.8s');
}
