import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-home',
	imports: [],
	templateUrl: './app-home.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHomeComponent {}
