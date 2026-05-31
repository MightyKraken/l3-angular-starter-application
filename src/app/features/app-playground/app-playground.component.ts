import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppLoaderService } from '@shared';

@Component({
	selector: 'app-playground',
	imports: [],
	templateUrl: './app-playground.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlaygroundComponent {
	private readonly loader = inject(AppLoaderService);

	loadIcon(): void {
		this.loader.show();
		setTimeout(() => {
			this.loader.hide();
		}, 2000);
	}
}
