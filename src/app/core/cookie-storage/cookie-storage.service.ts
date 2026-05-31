import { Injectable } from '@angular/core';

export interface CookieSetOptions {
	maxAgeDays?: number;
	path?: string;
	sameSite?: 'Lax' | 'Strict' | 'None';
}

@Injectable({ providedIn: 'root' })
export class CookieStorageService {
	get(name: string): string | null {
		if (typeof document === 'undefined') {
			return null;
		}

		const encodedName = `${encodeURIComponent(name)}=`;
		const cookies = document.cookie.split('; ');

		for (const cookie of cookies) {
			if (cookie.startsWith(encodedName)) {
				return decodeURIComponent(cookie.slice(encodedName.length));
			}
		}

		return null;
	}

	set(name: string, value: string, options: CookieSetOptions = {}): void {
		if (typeof document === 'undefined') {
			return;
		}

		const { maxAgeDays = 365, path = '/', sameSite = 'Lax' } = options;

		const maxAgeSeconds = Math.floor(maxAgeDays * 24 * 60 * 60);
		const encodedName = encodeURIComponent(name);
		const encodedValue = encodeURIComponent(value);

		document.cookie = `${encodedName}=${encodedValue}; Max-Age=${maxAgeSeconds}; Path=${path}; SameSite=${sameSite}`;
	}

	remove(name: string, path = '/'): void {
		if (typeof document === 'undefined') {
			return;
		}

		const encodedName = encodeURIComponent(name);
		document.cookie = `${encodedName}=; Max-Age=0; Path=${path}`;
	}
}
