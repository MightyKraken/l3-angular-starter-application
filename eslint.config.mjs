import pluginJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginAngular from '@angular-eslint/eslint-plugin';
/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
			'unused-imports': unusedImports,
			'@typescript-eslint/tslint': tseslint
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
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			'unused-imports/no-unused-imports': 2,
			'constructor-super': 'error',
			'no-multiple-empty-lines': ['error', { max: 1 }],
			'no-var': 'error',
			'@typescript-eslint/array-type': ['error', { default: 'generic' }],
			'@typescript-eslint/adjacent-overload-signatures': 'error',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true
				}
			],
			'@angular-eslint/component-class-suffix': 'error',
			'@angular-eslint/directive-class-suffix': 'error',
			'@angular-eslint/no-empty-lifecycle-method': 'error',
			'@angular-eslint/consistent-component-styles': 'error',
			'@angular-eslint/contextual-decorator': 'error',
			'@angular-eslint/no-duplicates-in-metadata-arrays': 'error',
			'@angular-eslint/prefer-inject': 'error',
			'@angular-eslint/sort-lifecycle-methods': 'error',
			'@angular-eslint/use-lifecycle-interface': 'error',
			'@angular-eslint/use-pipe-transform-interface': 'error',
			'@angular-eslint/relative-url-prefix': ['error'],
			'@angular-eslint/prefer-signals': ['error'],
			'@angular-eslint/sort-keys-in-type-decorator': ['error']
		}
	},
	eslintPluginPrettier
];
