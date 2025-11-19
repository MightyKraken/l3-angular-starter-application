import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';

import { LoadingDotsComponent } from '../components/loading-dots/loading-dots.component';

export const MATERIAL_UI_IMPORTS = [];

export const SHARED_COMPONENTS = [LoadingDotsComponent];

export const COMMON_IMPORTS = [CommonModule, A11yModule];
