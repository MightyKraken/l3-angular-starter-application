import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseButtonComponent, IconButtonComponent } from '@kraken-ui';

import { LoadingDotsComponent } from '../components/loading-dots/loading-dots.component';

export const MATERIAL_UI_IMPORTS = [];

export const SHARED_COMPONENTS = [LoadingDotsComponent];

export const COMMON_IMPORTS = [CommonModule, A11yModule, RouterLink, JsonPipe];

export const KRAKEN_UI = [BaseButtonComponent, IconButtonComponent];
