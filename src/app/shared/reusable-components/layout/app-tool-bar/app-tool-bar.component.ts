import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject
} from '@angular/core';
import { SidebarLayoutService } from '@core';

import { AppIconButtonComponent } from '../../app-icon-button/app-icon-button.component';

@Component({
	selector: 'app-tool-bar',
	imports: [AppIconButtonComponent],
	templateUrl: './app-tool-bar.component.html',
	styleUrl: './app-tool-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppToolBarComponent {
	private readonly sidebarLayout = inject(SidebarLayoutService);

	readonly toggleAriaLabel = computed(() => {
		switch (this.sidebarLayout.mode()) {
			case 'mini':
				return 'Sidebar showing icons only. Click to hide sidebar.';
			case 'hidden':
				return 'Sidebar hidden. Click to expand sidebar.';
			default:
				return 'Sidebar expanded. Click to show icons only.';
		}
	});

	onMenuToggle(): void {
		this.sidebarLayout.toggleMode();
	}
}
