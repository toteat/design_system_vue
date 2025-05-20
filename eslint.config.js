import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import vuePlugin from 'eslint-plugin-vue';
import accessibilityPlugin from 'eslint-plugin-vuejs-accessibility';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import prettierConfig from 'eslint-config-prettier';
import storybookPlugin from 'eslint-plugin-storybook';

export default [
  // Files to ignore (replacing .eslintignore)
  {
    ignores: [
      // Config files
      '*.config.js',
      '*.config.ts',
      '*.config.cjs',
      '*.config.mjs',

      // Build artifacts
      'dist/',
      'node_modules/',

      // Test coverage results
      'coverage/'
    ]
  },

  // ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Base ESLint rules that override defaults
  {
    files: ['**/*.vue', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
    rules: {
      // Overrides for base ESLint rules
      // Only including rules that need custom configuration,
      // others are handled by eslint.configs.recommended
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-nested-ternary': 'warn',
      'spaced-comment': ['warn', 'always'],
      'eqeqeq': ['warn', 'always']
    }
  },

  // Vue 3 base rules (not using recommended which has extends)
  // (Removed all vue plugin rules)

  // Vue TypeScript config
  // (Removed all vue plugin rules)

  // Accessibility plugin rules
  {
    files: ['**/*.vue'],
    plugins: {
      'vuejs-accessibility': accessibilityPlugin,
    },
    rules: {
      // Accessibility rules (essential ones only)
      'vuejs-accessibility/alt-text': 'error',
      'vuejs-accessibility/anchor-has-content': 'error',
      'vuejs-accessibility/aria-props': 'error',
      'vuejs-accessibility/aria-role': 'error',
      'vuejs-accessibility/aria-unsupported-elements': 'error',
      'vuejs-accessibility/click-events-have-key-events': 'error',
      'vuejs-accessibility/form-control-has-label': 'error',
      'vuejs-accessibility/heading-has-content': 'error',
      'vuejs-accessibility/iframe-has-title': 'error',
      'vuejs-accessibility/interactive-supports-focus': 'error',
      'vuejs-accessibility/label-has-for': 'error',
      'vuejs-accessibility/media-has-caption': 'error',
      'vuejs-accessibility/mouse-events-have-key-events': 'error',
      'vuejs-accessibility/no-access-key': 'error',
      'vuejs-accessibility/no-autofocus': 'error',
      'vuejs-accessibility/no-distracting-elements': 'error',
      'vuejs-accessibility/no-redundant-roles': 'error',
      'vuejs-accessibility/role-has-required-aria-props': 'error',
      'vuejs-accessibility/tabindex-no-positive': 'error'
    }
  },

  // Storybook rules
  {
    files: ['**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    plugins: {
      'storybook': storybookPlugin,
    },
    rules: {
      // Only include rules that differ from the recommended config
      'storybook/prefer-pascal-case': 'error',
      'storybook/no-uninstalled-addons': 'error',
    }
  },

  // Custom rules that extend beyond the recommended configs
  // (Removed all vue plugin rules)

  // Language options and parser configuration
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.esnext,
        ...globals.node
      },
      parser: vuePlugin.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        parser: tseslint.parser,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    files: ['**/*.vue', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
    rules: {
      // ESNext specific rules
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false
        }
      ]
    }
  },

  // Prettier config should be last to override formatting rules
  prettierConfig
];
