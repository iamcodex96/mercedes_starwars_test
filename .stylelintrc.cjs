module.exports = {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-standard-vue'
    ],
    rules: {
        'at-rule-no-unknown': null,
        'scss/at-extend-no-missing-placeholder': null,
        'declaration-property-value-no-unknown': null,
        'declaration-empty-line-before': null,
        'scss/dollar-variable-empty-line-before': null,
        'import-notation': null,

        'color-hex-length': null,
        'value-keyword-case': null,

        'selector-class-pattern': null
    },
    overrides: [
        {
            files: ['*.vue', '**/*.vue'],
            customSyntax: 'postcss-html'
        },
        {
            files: ['*.scss', '**/*.scss'],
            customSyntax: 'postcss-scss'
        }
    ]
};
