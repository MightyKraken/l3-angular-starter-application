import eslintPluginAngular from '@angular-eslint/eslint-plugin';
import eslintPluginAngularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';
/** @type {import('eslint').Linter.Config[]} */
export default [
	{ ignores: ['node_modules/', 'dist/', '.angular/'] },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended.map((config) => ({
		...config,
		files: ['**/*.ts']
	})),
	{
		files: ['**/*.ts'],
		plugins: {
			'simple-import-sort': simpleImportSort,
			'unused-imports': unusedImports,
			'@stylistic': stylistic,
			'@angular-eslint': eslintPluginAngular
		},
		languageOptions: {
			globals: globals.browser
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
	{
		files: ['**/*.html'],
		plugins: {
			'@angular-eslint/template': eslintPluginAngularTemplate
		},
		languageOptions: {
			parser: angularTemplateParser
		},
		rules: {
			// @angular-eslint/template rules
			'@angular-eslint/template/attributes-order': [
				'error',
				{
					alphabetical: true,
					order: [
						'STRUCTURAL_DIRECTIVE',
						'TEMPLATE_REFERENCE',
						'INPUT_BINDING',
						'TWO_WAY_BINDING',
						'OUTPUT_BINDING',
						'ATTRIBUTE_BINDING'
					]
				}
			],
			'@angular-eslint/template/banana-in-box': 'error',
			'@angular-eslint/template/button-has-type': 'error',
			'@angular-eslint/template/eqeqeq': [
				'error',
				{ allowNullOrUndefined: true }
			],
			'@angular-eslint/template/no-duplicate-attributes': 'error',
			'@angular-eslint/template/no-negated-async': 'error',
			'@angular-eslint/template/prefer-control-flow': 'error',
			'@angular-eslint/template/prefer-ngsrc': 'error',
			'@angular-eslint/template/prefer-self-closing-tags': 'error',
			'@angular-eslint/template/use-track-by-function': 'error'
		}
	},
	{
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto'
			}
		]
	},
	eslintPluginPrettier
];
