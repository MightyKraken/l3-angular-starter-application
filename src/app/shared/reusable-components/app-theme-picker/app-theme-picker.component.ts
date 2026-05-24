import {
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	inject,
	signal
} from '@angular/core';
import { APP_PALETTE_OPTIONS, type AppPaletteId, ThemeService } from '@core';

import { AppIconComponent } from '../app-icon/app-icon.component';

@Component({
	selector: 'app-theme-picker',
	imports: [AppIconComponent],
	templateUrl: './app-theme-picker.component.html',
	styleUrl: './app-theme-picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'(document:click)': 'onDocumentClick($event)',
		'(document:keydown)': 'onDocumentKeydown($event)'
	}
})
export class AppThemePickerComponent {
	private readonly theme = inject(ThemeService);
	private readonly host = inject(ElementRef<HTMLElement>);

	readonly palettes = APP_PALETTE_OPTIONS;
	readonly open = signal(false);

	readonly activePaletteId = this.theme.paletteId;

	readonly activePreviewColor = computed(() => {
		return (
			this.palettes.find((palette) => palette.id === this.activePaletteId())
				?.previewColor ?? '#1976d2'
		);
	});

	readonly panelId = 'app-theme-picker-panel';

	togglePanel(event: MouseEvent): void {
		event.stopPropagation();
		this.open.update((isOpen) => !isOpen);
	}

	onSelect(paletteId: AppPaletteId): void {
		this.theme.setPalette(paletteId);
		this.open.set(false);
	}

	isActive(paletteId: AppPaletteId): boolean {
		return this.activePaletteId() === paletteId;
	}

	onDocumentClick(event: MouseEvent): void {
		if (!this.open()) {
			return;
		}

		if (!this.host.nativeElement.contains(event.target as Node)) {
			this.open.set(false);
		}
	}

	onDocumentKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape' && this.open()) {
			this.open.set(false);
		}
	}
}
