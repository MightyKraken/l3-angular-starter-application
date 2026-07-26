import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLoaderComponent, AppLoaderService } from '@shared/ui-loader';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, AppLoaderComponent],
	templateUrl: './app.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	protected readonly appLoader = inject(AppLoaderService);
}
