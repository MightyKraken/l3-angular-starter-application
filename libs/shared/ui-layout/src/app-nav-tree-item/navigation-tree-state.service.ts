import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NAVIGATION_TREE, type NavigationNode } from './navigation-items.const';

@Injectable({ providedIn: 'root' })
export class NavigationTreeStateService {
	private readonly router = inject(Router);
	private readonly destroyRef = inject(DestroyRef);

	private readonly _expandedIds = signal<ReadonlySet<string>>(new Set());

	readonly expandedIds = this._expandedIds.asReadonly();

	constructor() {
		this.syncExpandedForUrl(this.router.url || '/');

		this.router.events
			.pipe(
				filter(
					(event): event is NavigationEnd => event instanceof NavigationEnd
				),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe((event) => this.syncExpandedForUrl(event.urlAfterRedirects));
	}

	isExpanded(id: string): boolean {
		return this._expandedIds().has(id);
	}

	toggle(id: string): void {
		const next = new Set(this._expandedIds());

		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}

		this._expandedIds.set(next);
	}

	expand(id: string): void {
		if (this._expandedIds().has(id)) {
			return;
		}

		const next = new Set(this._expandedIds());
		next.add(id);
		this._expandedIds.set(next);
	}

	expandPath(ids: ReadonlyArray<string>): void {
		if (ids.length === 0) {
			return;
		}

		const next = new Set(this._expandedIds());
		let changed = false;

		for (const id of ids) {
			if (!next.has(id)) {
				next.add(id);
				changed = true;
			}
		}

		if (changed) {
			this._expandedIds.set(next);
		}
	}

	private syncExpandedForUrl(url: string): void {
		const path = findActivePath(NAVIGATION_TREE, url);

		if (path) {
			this.expandPath(path);
		}
	}
}

function findActivePath(
	nodes: ReadonlyArray<NavigationNode>,
	url: string,
	ancestors: Array<string> = []
): Array<string> | null {
	const normalizedUrl = normalizeUrl(url);

	for (const node of nodes) {
		if (node.children?.length) {
			const childPath = findActivePath(node.children, url, [
				...ancestors,
				node.id
			]);

			if (childPath) {
				return childPath;
			}

			continue;
		}

		if (node.route && routeMatches(node.route, normalizedUrl)) {
			return ancestors;
		}
	}

	return null;
}

function normalizeUrl(url: string): string {
	if (!url) {
		return '/';
	}

	const path = url.split('?')[0]?.split('#')[0] ?? url;

	if (path.length > 1 && path.endsWith('/')) {
		return path.slice(0, -1);
	}

	return path;
}

function routeMatches(route: string, url: string): boolean {
	const normalizedRoute = normalizeUrl(route);

	if (normalizedRoute === '/') {
		return url === '/';
	}

	return url === normalizedRoute || url.startsWith(`${normalizedRoute}/`);
}
