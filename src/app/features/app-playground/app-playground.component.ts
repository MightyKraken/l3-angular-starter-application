import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingDotsComponent } from '@shared';

@Component({
	selector: 'app-playground',
	imports: [LoadingDotsComponent],
	templateUrl: './app-playground.component.html',
	styleUrl: './app-playground.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlaygroundComponent {}
