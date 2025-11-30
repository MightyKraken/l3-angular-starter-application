import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AboutService } from './about.service';

@Component({
	selector: 'about',
	imports: [],
	templateUrl: './about.component.html',
	styleUrl: './about.component.scss'
})
export class AboutComponent {
	private aboutService = inject(AboutService);
	protected readonly bindValue = toSignal(this.aboutService.emitter);

	changeValue(): void {
		this.aboutService.change(Math.random());
	}
}
