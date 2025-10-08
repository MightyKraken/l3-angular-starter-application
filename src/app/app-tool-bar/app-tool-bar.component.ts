import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButton } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
@Component({
	selector: 'app-tool-bar',
	imports: [
		ToolbarModule,
		ButtonModule,
		SplitButton,
		InputTextModule,
		IconField,
		InputIcon
	],
	templateUrl: './app-tool-bar.component.html',
	styleUrl: './app-tool-bar.component.scss'
})
export class AppToolBarComponent {
	items: Array<MenuItem> | undefined;
	ngOnInit(): void {
		this.items = [
			{
				label: 'Update',
				icon: 'pi pi-refresh'
			},
			{
				label: 'Delete',
				icon: 'pi pi-times'
			}
		];
	}
}
