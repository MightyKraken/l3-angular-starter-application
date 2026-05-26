import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-playground-ui-components',
	template: `<h1>Playground — UI Components</h1>`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlaygroundUiComponentsComponent {}
