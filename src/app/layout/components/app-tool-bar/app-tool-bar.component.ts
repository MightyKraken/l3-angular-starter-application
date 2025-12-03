import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-tool-bar',
	imports: [RouterLink, RouterLinkActive],
	templateUrl: './app-tool-bar.component.html',
	styleUrl: './app-tool-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppToolBarComponent {}
