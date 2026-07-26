import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppIconComponent } from '@shared/ui-icon';

import { type NavigationNode } from './navigation-items.const';
import { NavigationTreeStateService } from './navigation-tree-state.service';

@Component({
	selector: 'li[app-nav-tree-item]',
	imports: [AppIconComponent, RouterLink, RouterLinkActive],
	templateUrl: './app-nav-tree-item.component.html',
	styleUrl: './app-nav-tree-item.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'class': 'nav-tree-item',
		'[class.nav-tree-item-depth-0]': 'depth() === 0',
		'[class.nav-tree-item-depth-1]': 'depth() === 1',
		'[class.nav-tree-item-depth-2]': 'depth() === 2',
		'[class.nav-tree-item-depth-3]': 'depth() >= 3'
	}
})
export class AppNavTreeItemComponent {
	private readonly treeState = inject(NavigationTreeStateService);

	readonly node = input.required<NavigationNode>();
	readonly depth = input.required<number>();
	readonly collapsedLabels = input(false);

	readonly isSection = computed(() => (this.node().children?.length ?? 0) > 0);
	readonly showIcon = computed(() => this.depth() === 0 && !!this.node().icon);
	readonly isExpanded = computed(() =>
		this.treeState.isExpanded(this.node().id)
	);
	readonly showChildren = computed(
		() => this.isSection() && this.isExpanded() && !this.collapsedLabels()
	);

	toggleSection(): void {
		this.treeState.toggle(this.node().id);
	}
}
