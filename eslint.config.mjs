import pluginJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginAngular from '@angular-eslint/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
			'unused-imports': unusedImports,
			'@typescript-eslint/tslint': tseslint,
			'@stylistic': stylistic
		}
	},
	{ ignores: ['node_modules/', 'dist/', '.angular/'] },
	{ files: ['src/*.{js,mjs,cjs,ts}'] },
	{
		languageOptions: {
			globals: globals.browser,
			parser: '@typescript-eslint/parser'
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.ts'],
		plugins: {
			'@angular-eslint': eslintPluginAngular
		},
		rules: {
			// ESLint core rules
			'constructor-super': 'off',
			'eqeqeq': ['error', 'always', { null: 'ignore' }],
			'no-var': 'error',

			// @angular-eslint rules
			'@angular-eslint/component-class-suffix': 'error',
			'@angular-eslint/consistent-component-styles': 'error',
			'@angular-eslint/contextual-decorator': 'error',
			'@angular-eslint/directive-class-suffix': 'error',
			'@angular-eslint/no-duplicates-in-metadata-arrays': 'error',
			'@angular-eslint/no-empty-lifecycle-method': 'error',
			'@angular-eslint/prefer-inject': 'error',
			'@angular-eslint/prefer-signals': ['error'],
			'@angular-eslint/relative-url-prefix': ['error'],
			'@angular-eslint/sort-keys-in-type-decorator': ['error'],
			'@angular-eslint/sort-lifecycle-methods': 'error',
			'@angular-eslint/use-lifecycle-interface': 'error',
			'@angular-eslint/use-pipe-transform-interface': 'error',

			// @stylistic rules
			'@stylistic/lines-between-class-members': [
				'error',
				{
					enforce: [
						{ blankLine: 'always', prev: 'method', next: 'method' },
						{ blankLine: 'always', prev: 'field', next: 'method' }
					]
				}
			],
			'@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],

			// @typescript-eslint rules
			'@typescript-eslint/adjacent-overload-signatures': 'error',
			'@typescript-eslint/array-type': ['error', { default: 'generic' }],
			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true
				}
			],
			'@typescript-eslint/member-ordering': [
				'error',
				{
					default: [
						'private-static-field',
						'protected-static-field',
						'public-static-field',

						'private-instance-field',
						'protected-instance-field',
						'public-instance-field',

						'constructor',

						'public-static-method',
						'protected-static-method',
						'private-static-method',

						'public-instance-method',
						'protected-instance-method',
						'private-instance-method'
					]
				}
			],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',

			// simple-import-sort rules
			'simple-import-sort/exports': 'error',
			'simple-import-sort/imports': 'error',

			// unused-imports rules
			'unused-imports/no-unused-imports': 'error'
		}
	},
	eslintPluginPrettier
];
