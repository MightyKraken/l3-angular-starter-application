import { AsyncPipe } from '@angular/common';
import {
	Component,
	DestroyRef,
	inject,
	OnInit,
	Renderer2
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LoadingDotsComponent } from '../loading-dots/loading-dots.component';
import { AppLoaderService } from './services/app-loader.service';
@Component({
	selector: 'app-loader',
	imports: [LoadingDotsComponent, AsyncPipe],
	templateUrl: './app-loader.component.html',
	styleUrl: './app-loader.component.scss'
})
export class AppLoaderComponent implements OnInit {
	protected appLoaderService = inject(AppLoaderService);
	private renderer = inject(Renderer2);
	private destroyRef = inject(DestroyRef);

	ngOnInit(): void {
		this.blockScrollOnLoading();
	}

	blockScrollOnLoading(): void {
		this.appLoaderService.isAppLoading$
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((isLoading) => {
				if (isLoading) {
					this.renderer.addClass(document.body, 'overflow-hidden');
				} else {
					this.renderer.removeClass(document.body, 'overflow-hidden');
				}
			});
	}
}
