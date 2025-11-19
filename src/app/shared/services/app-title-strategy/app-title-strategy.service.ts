import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { environment } from '@environment';

@Injectable({
	providedIn: 'root'
})
export class AppTitleStrategyService extends TitleStrategy {
	constructor(private readonly title: Title) {
		super();
	}

	override updateTitle(routerState: RouterStateSnapshot): void {
		const title = this.buildTitle(routerState);
		this.title.setTitle(
			title !== undefined ? `${title}` : environment.PortalTitle
		);
	}
}
