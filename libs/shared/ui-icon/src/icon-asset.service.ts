import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';

const SAFE_ASSET_NAME_PATTERN = /^[a-z0-9][a-z0-9/-]*$/;

@Injectable({ providedIn: 'root' })
export class IconAssetService {
	private readonly http = inject(HttpClient);
	private readonly sanitizer = inject(DomSanitizer);
	private readonly cache = new Map<string, Observable<SafeHtml | null>>();

	load(name: string): Observable<SafeHtml | null> {
		if (!SAFE_ASSET_NAME_PATTERN.test(name)) {
			return of(null);
		}

		const cached = this.cache.get(name);
		if (cached) {
			return cached;
		}

		const request$ = this.http
			.get(`/icons/${name}.svg`, { responseType: 'text' })
			.pipe(
				map((svg) => this.toSafeHtml(svg)),
				catchError(() => of(null)),
				shareReplay({ bufferSize: 1, refCount: true }),
				tap((safeHtml) => {
					if (!safeHtml) {
						this.cache.delete(name);
					}
				})
			);

		this.cache.set(name, request$);
		return request$;
	}

	private toSafeHtml(svg: string): SafeHtml {
		const normalized = svg.replace(
			/<svg\b([^>]*)>/i,
			'<svg$1 class="icon-svg" width="100%" height="100%" style="display:block" focusable="false" aria-hidden="true">'
		);

		return this.sanitizer.bypassSecurityTrustHtml(normalized);
	}
}
