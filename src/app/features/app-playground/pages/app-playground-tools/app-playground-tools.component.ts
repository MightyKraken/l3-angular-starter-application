import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingDotsComponent } from '@shared';

@Component({
	selector: 'app-playground-tools',
	imports: [LoadingDotsComponent],
	template: `
		<h1>Playground — Tools</h1>
		<loading-dots />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlaygroundToolsComponent {}
