import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ScreenSizeObserver } from '../../core/models/interfaces/IScreenSizeObserver.interface';

@Component({
	selector: 'app-playground',
	imports: [AsyncPipe],
	templateUrl: './app-playground.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlaygroundComponent {
	protected screenSizeObserver = inject(ScreenSizeObserver);
}
