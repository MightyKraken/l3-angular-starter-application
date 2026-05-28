import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-playground',
	templateUrl: './app-playground.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlaygroundComponent {}
