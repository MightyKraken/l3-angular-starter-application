import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingDotsComponent } from '@shared';

@Component({
	selector: 'app-playground',
	imports: [LoadingDotsComponent],
	templateUrl: './app-playground.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlaygroundComponent {}
