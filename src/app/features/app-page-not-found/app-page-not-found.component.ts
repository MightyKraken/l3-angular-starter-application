import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-page-not-found',
	imports: [RouterLink],
	templateUrl: './app-page-not-found.component.html',
	styleUrl: './app-page-not-found.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPageNotFoundComponent {
	private location = inject(Location);

	goBack(): void {
		this.location.back();
	}
}
