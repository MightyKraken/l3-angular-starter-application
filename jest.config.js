// eslint-disable-next-line no-undef
module.exports = {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	moduleNameMapper: {
		'^@environment$': '<rootDir>/src/environments/environment.ts',
		'^@shared$': '<rootDir>/src/app/app-shared/index.ts'
	}
};
