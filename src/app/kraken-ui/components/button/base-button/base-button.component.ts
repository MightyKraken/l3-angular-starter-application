import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
	selector: 'base-button',
	imports: [MatButtonModule],
	templateUrl: './base-button.component.html',
	styleUrl: './base-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseButtonComponent {}
