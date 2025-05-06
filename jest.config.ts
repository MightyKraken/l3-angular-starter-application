import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';
export default {
	...createCjsPreset(),
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	moduleNameMapper: {
		'^@environment$': '<rootDir>/src/environments/environment.ts',
		'^@shared$': '<rootDir>/src/app/app-shared/index.ts'
	}
} satisfies Config;
