import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { NavigationNode } from '@core';
import { NAVIGATION_TREE, NavigationTreeStateService } from '@core';
import {
	LucideChevronDown,
	LucideChevronRight,
	LucideFlaskConical,
	LucideHouse,
	LucideSettings,
	provideLucideIcons
} from '@lucide/angular';

import { AppNavTreeItemComponent } from './app-nav-tree-item.component';

const PLAYGROUND_SECTION: NavigationNode = {
	id: 'playground',
	label: 'Playground',
	icon: 'flask-conical',
	children: [
		{
			id: 'playground-ui',
			label: 'UI',
			children: [
				{
					id: 'playground-components',
					label: 'Components',
					route: '/playground/ui/components'
				}
			]
		}
	]
};

describe('AppNavTreeItemComponent', () => {
	let fixture: ComponentFixture<AppNavTreeItemComponent>;
	let treeState: NavigationTreeStateService;
	let hostElement: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppNavTreeItemComponent],
			providers: [
				provideRouter([]),
				provideLucideIcons(
					LucideHouse,
					LucideSettings,
					LucideFlaskConical,
					LucideChevronRight,
					LucideChevronDown
				)
			]
		}).compileComponents();

		treeState = TestBed.inject(NavigationTreeStateService);
		fixture = TestBed.createComponent(AppNavTreeItemComponent);
		hostElement = fixture.nativeElement;
	});

	it('should render a leaf link with routerLink at depth 0', () => {
		fixture.componentRef.setInput('node', NAVIGATION_TREE[0]);
		fixture.componentRef.setInput('depth', 0);
		fixture.detectChanges();

		const link = hostElement.querySelector('a.nav-leaf');
		expect(link).toBeTruthy();
		expect(link?.getAttribute('href')).toBe('/');
		expect(hostElement.querySelector('.nav-icon')).toBeTruthy();
	});

	it('should toggle section expansion on button click', () => {
		fixture.componentRef.setInput('node', PLAYGROUND_SECTION);
		fixture.componentRef.setInput('depth', 0);
		fixture.detectChanges();

		const button =
			hostElement.querySelector<HTMLButtonElement>('button.nav-section');
		expect(button?.getAttribute('aria-expanded')).toBe('false');

		button?.click();
		fixture.detectChanges();

		expect(treeState.isExpanded('playground')).toBe(true);
		expect(button?.getAttribute('aria-expanded')).toBe('true');
	});

	it('should indent nested child lists under the parent label column', () => {
		fixture.componentRef.setInput('node', PLAYGROUND_SECTION);
		fixture.componentRef.setInput('depth', 0);
		treeState.expand('playground');
		fixture.detectChanges();

		const nestedList = hostElement.querySelector(':scope > .nav-tree');
		expect(nestedList).toBeTruthy();
		expect(getComputedStyle(nestedList!).paddingInlineStart).not.toBe('0px');
	});

	it('should not render icons for nested leaves', () => {
		const componentsLeaf = PLAYGROUND_SECTION.children![0].children![0];

		fixture.componentRef.setInput('node', componentsLeaf);
		fixture.componentRef.setInput('depth', 2);
		treeState.expand('playground');
		treeState.expand('playground-ui');
		fixture.detectChanges();

		expect(hostElement.querySelector('a.nav-leaf')).toBeTruthy();
		expect(hostElement.querySelector('.nav-icon')).toBeFalsy();
	});

	it('should hide children when collapsedLabels is true', () => {
		fixture.componentRef.setInput('node', PLAYGROUND_SECTION);
		fixture.componentRef.setInput('depth', 0);
		fixture.componentRef.setInput('collapsedLabels', true);
		treeState.expand('playground');
		fixture.detectChanges();

		expect(hostElement.querySelector('.nav-tree')).toBeFalsy();
	});
});
