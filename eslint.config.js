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
    },
    plugins: {
      vue,
      'vuejs-accessibility': accessibilityPlugin,
    },
    rules: {
      // Vue and accessibility rules here
      // (add your rules as needed)
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
