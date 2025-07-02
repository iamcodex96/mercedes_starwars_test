
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
    js.configs.recommended,
    ...vue.configs['flat/recommended'],
    {
        files: ['**/*.vue', '**/*.js'],
        languageOptions: {
            parser: vueParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                global: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                exports: 'writable',
                module: 'writable',
                require: 'readonly',
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                vi: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
                test: 'readonly'
            }
        },
        rules: {
            // Configuraciones personalizadas aquí
            'no-unused-vars': 'warn',
            'vue/html-indent': ['warn', 2],
            'vue/require-default-prop': 'warn',
            'vue/v-slot-style': ['warn', 'shorthand'],
            'vue/singleline-html-element-content-newline': 'off',
            'vue/attributes-order': 'warn'
        }
    },
    {
        ignores: [
            'dist/**/*',
            'node_modules/**/*',
            'coverage/**/*',
            '*.min.js',
            'playwright-report/**/*',
            'test-results/**/*',
            '*.cjs',
        ]
    }
];