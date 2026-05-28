/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard-scss'],
	rules: {
		'no-empty-source': null,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'source',
					'theme',
					'utility',
					'layer',
					'apply',
					'tailwind',
					'import',
					'plugin'
				]
			}
		],
		'no-invalid-position-at-import-rule': null,
		'keyframes-name-pattern': null,
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'source',
					'theme',
					'utility',
					'layer',
					'apply',
					'tailwind',
					'import',
					'plugin'
				]
			}
		]
	}
};
