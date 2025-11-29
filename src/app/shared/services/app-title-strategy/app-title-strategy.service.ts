import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { environment } from '@environment';

@Injectable({
	providedIn: 'root'
})
export class AppTitleStrategyService extends TitleStrategy {
	private readonly title = inject(Title);

	override updateTitle(routerState: RouterStateSnapshot): void {
		const title = this.buildTitle(routerState);
		this.title.setTitle(
			title !== undefined ? `${title}` : environment.PortalTitle
		);
	}
}
