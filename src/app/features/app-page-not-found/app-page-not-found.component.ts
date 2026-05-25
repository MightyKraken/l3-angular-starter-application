import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppIconComponent } from '../../shared/reusable-components/app-icon/app-icon.component';

@Component({
	selector: 'app-page-not-found',
	imports: [RouterLink, AppIconComponent],
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
