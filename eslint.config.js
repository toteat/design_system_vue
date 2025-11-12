import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
import accessibilityPlugin from 'eslint-plugin-vuejs-accessibility';
import prettierConfig from 'eslint-config-prettier';
import storybookPlugin from 'eslint-plugin-storybook';
import vue from 'eslint-plugin-vue';

export default [
  // TypeScript and JS files (NO .vue here!)
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
      rules: {
        // Allow unused vars that start with underscore
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
          },
        ],
        // Turn off the base rule as it can report incorrect errors
        'no-unused-vars': 'off',
      },
    },
  ),

  // Vue SFCs - Strictly recommended rules
  ...vue.configs['flat/strongly-recommended'],

  // Disable multi-word component name rule for index.ts files (plugin registration)
  {
    files: ['**/index.ts', '**/main.ts'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
    },
  },

  // Vue SFCs - Custom configuration with strict standards
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        parser: tseslint.parser,
      },
      globals: {
        console: 'readonly',
        window: 'readonly'
      }
    },
    plugins: {
      vue,
      'vuejs-accessibility': accessibilityPlugin,
    },
    rules: {
      // Vue 3 Composition API & Script Setup - Strict enforcement
      'vue/no-export-in-script-setup': 'error',
      'vue/no-setup-props-reactivity-loss': 'error',
      'vue/require-explicit-emits': 'error',
      'vue/prefer-import-from-vue': 'error',
      'vue/component-api-style': ['error', ['script-setup']], // Enforce script setup only
      'vue/block-lang': ['error', { script: { lang: 'ts' } }], // Require TypeScript
      'vue/define-macros-order': ['error', {
        order: ['defineProps', 'defineEmits'],
      }],
      'vue/define-emits-declaration': ['error', 'type-based'], // Enforce type-based emits
      'vue/define-props-declaration': ['error', 'type-based'], // Enforce type-based props
      'vue/valid-define-props': 'error',
      'vue/valid-define-emits': 'error',
      'vue/valid-define-options': 'error',
      'vue/no-lifecycle-after-await': 'error',
      'vue/no-watch-after-await': 'error',
      'vue/no-ref-as-operand': 'error',
      'vue/require-macro-variable-name': ['error', {
        defineProps: 'props',
        defineEmits: 'emit',
        defineSlots: 'slots',
        useSlots: 'slots',
        useAttrs: 'attrs',
      }],
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],

      // Component structure - Strict
      'vue/one-component-per-file': 'error',
      'vue/require-prop-types': 'error',
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false,
      }],
      'vue/custom-event-name-casing': ['error', 'kebab-case'], // Allow kebab-case for events (Vue convention)

      // Template best practices - Strict
      'vue/html-self-closing': ['error', {
        html: { void: 'always', normal: 'never', component: 'always' },
        svg: 'always',
        math: 'always',
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1,
      }],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'ignore',
        multiline: 'below',
      }],
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],
      'vue/multi-word-component-names': 'off', // Design systems often have single-word names

      // Code quality - Strict
      'vue/no-unused-refs': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/no-useless-mustaches': 'error',
      'vue/no-useless-concat': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/no-static-inline-styles': 'error',
      'vue/padding-line-between-blocks': ['error', 'always'],

      // Accessibility - Strict
      'vue/require-default-prop': 'error',
      'vue/no-boolean-default': ['error', 'default-false'],

      // Standard rules
      'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
      // Prevent nested ternaries
      'no-nested-ternary': 'error',
      // Cognitive complexity rules using built-in ESLint rules
      'complexity': ['error', { max: 10 }],
      'no-return-await': 'error',
      'no-cond-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-multi-spaces': 'error',
      'no-unused-expressions': 'error',
      'no-useless-return': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': 'error',
      'prefer-template': 'error',
      // Allow unused vars that start with underscore in Vue files too
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': 'off',
    },
  },

  // Test files - relaxed rules
  {
    files: ['**/__tests__/**/*', '**/*.test.*', '**/*.spec.*'],
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
    rules: {
      // Disable strict complexity rules for tests
      'complexity': 'off',
      'prefer-destructuring': 'off',
      'no-unused-expressions': 'off',
      'prefer-arrow-callback': 'off',
      // Allow any types in tests
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      // Allow console in tests
      'no-console': 'off',
    },
  },

  // Storybook rules
  {
    files: ['**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    plugins: {
      'storybook': storybookPlugin,
    },
    rules: {
      'storybook/prefer-pascal-case': 'error',
      'storybook/no-uninstalled-addons': 'error',
      // Relax some rules for stories
      'complexity': 'off',
      'prefer-destructuring': 'off',
    }
  },

  // Prettier config should be last
  prettierConfig,

  // Ignore patterns
  {
    ignores: [
      '*.config.js',
      '*.config.ts',
      '*.config.cjs',
      '*.config.mjs',
      'dist/',
      'node_modules/',
      'coverage/'
    ]
  },
];
