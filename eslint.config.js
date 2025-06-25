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

  // Vue SFCs
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
      // Vue and accessibility rules here
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
