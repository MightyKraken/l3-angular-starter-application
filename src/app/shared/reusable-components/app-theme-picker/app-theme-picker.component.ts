import { DOCUMENT } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	inject,
	signal
} from '@angular/core';
import { DAISY_THEME_OPTIONS, type DaisyThemeId, ThemeService } from '@core';

import { AppIconComponent } from '../app-icon/app-icon.component';
import { AppThemePreviewComponent } from '../app-theme-preview/app-theme-preview.component';

@Component({
	selector: 'app-theme-picker',
	imports: [AppIconComponent, AppThemePreviewComponent],
	templateUrl: './app-theme-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'(focusin)': 'onFocusIn()',
		'(focusout)': 'onFocusOut($event)',
		'(keydown)': 'onKeydown($event)'
	}
})
export class AppThemePickerComponent {
	private readonly theme = inject(ThemeService);
	private readonly document = inject(DOCUMENT);
	private readonly host = inject(ElementRef<HTMLElement>);
	private readonly hasFocus = signal(false);
	protected readonly menuDismissed = signal(false);

	readonly themes = DAISY_THEME_OPTIONS;
	readonly activeThemeId = this.theme.themeId;
	readonly isExpanded = computed(
		() => this.hasFocus() && !this.menuDismissed()
	);

	onSelect(themeId: DaisyThemeId): void {
		this.theme.setTheme(themeId);
		this.closeMenu();
	}

	isActive(themeId: DaisyThemeId): boolean {
		return this.activeThemeId() === themeId;
	}

	onFocusIn(): void {
		this.hasFocus.set(true);
		this.menuDismissed.set(false);
	}

	onFocusOut(event: FocusEvent): void {
		const related = event.relatedTarget;
		if (related instanceof Node && this.host.nativeElement.contains(related)) {
			return;
		}

		this.hasFocus.set(false);
	}

	onKeydown(event: KeyboardEvent): void {
		const options = this.getOptionButtons();

		if (!this.isExpanded()) {
			if (
				event.key === 'ArrowDown' ||
				event.key === 'ArrowUp' ||
				event.key === 'Enter' ||
				event.key === ' '
			) {
				event.preventDefault();
				this.menuDismissed.set(false);
				this.hasFocus.set(true);
				this.focusOption(event.key === 'ArrowUp' ? options.length - 1 : 0);
			}

			return;
		}

		const activeIndex = options.findIndex(
			(option) => option === this.document.activeElement
		);

		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				this.closeMenu();
				break;
			case 'ArrowDown':
				event.preventDefault();
				this.focusOption(
					activeIndex < 0 ? 0 : Math.min(activeIndex + 1, options.length - 1)
				);
				break;
			case 'ArrowUp':
				event.preventDefault();
				this.focusOption(
					activeIndex < 0 ? options.length - 1 : Math.max(activeIndex - 1, 0)
				);
				break;
			case 'Home':
				event.preventDefault();
				this.focusOption(0);
				break;
			case 'End':
				event.preventDefault();
				this.focusOption(options.length - 1);
				break;
			case 'Enter':
			case ' ':
				if (activeIndex >= 0) {
					event.preventDefault();
					options[activeIndex].click();
				}

				break;
		}
	}

	private getOptionButtons(): Array<HTMLButtonElement> {
		return Array.from(
			this.host.nativeElement.querySelectorAll('[role="option"]')
		) as Array<HTMLButtonElement>;
	}

	private focusOption(index: number): void {
		const option = this.getOptionButtons()[index];
		option?.focus();
	}

	private closeMenu(): void {
		this.menuDismissed.set(true);
		this.hasFocus.set(false);
		(this.document.activeElement as HTMLElement | null)?.blur();
	}
}
