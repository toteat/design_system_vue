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

  // Vue 3 base rules (not using recommended which has extends)
  {
    files: ['**/*.vue'],
    plugins: {
      'vue': vuePlugin,
    },
    rules: {
      // Vue 3 strongly recommended rules
      'vue/attributes-order': 'warn',
      'vue/block-order': 'warn',
      'vue/no-lone-template': 'warn',
      'vue/no-multiple-slot-args': 'warn',
      'vue/no-required-prop-with-default': 'warn',
      'vue/no-v-html': 'warn',
      'vue/order-in-components': 'warn',
      'vue/this-in-template': 'warn',

      // Vue 3 essential rules
      'vue/multi-word-component-names': 'error',
      'vue/no-arrow-functions-in-watch': 'error',
      'vue/no-async-in-computed-properties': 'error',
      'vue/no-child-content': 'error',
      'vue/no-computed-properties-in-data': 'error',
      'vue/no-custom-modifiers-on-v-model': 'error',
      'vue/no-dupe-keys': 'error',
      'vue/no-dupe-v-else-if': 'error',
      'vue/no-duplicate-attributes': 'error',
      'vue/no-export-in-script-setup': 'error',
      'vue/no-mutating-props': 'error',
      'vue/no-parsing-error': 'error',
      'vue/no-ref-as-operand': 'error',
      'vue/no-reserved-component-names': 'error',
      'vue/no-reserved-keys': 'error',
      'vue/no-shared-component-data': 'error',
      'vue/no-side-effects-in-computed-properties': 'error',
      'vue/no-template-key': 'error',
      'vue/no-textarea-mustache': 'error',
      'vue/no-unused-components': 'error',
      'vue/no-unused-vars': 'error',
      'vue/no-use-v-if-with-v-for': 'error',
      'vue/no-useless-template-attributes': 'error',
      'vue/no-v-for-template-key': 'error',
      'vue/no-v-model-argument': 'error',
      'vue/no-v-text-v-html-on-component': 'error',
      'vue/require-component-is': 'error',
      'vue/require-render-return': 'error',
      'vue/require-v-for-key': 'error',
      'vue/require-valid-default-prop': 'error',
      'vue/return-in-computed-property': 'error',
      'vue/use-v-on-exact': 'error',
      'vue/valid-template-root': 'error',
      'vue/valid-v-bind': 'error',
      'vue/valid-v-cloak': 'error',
      'vue/valid-v-else-if': 'error',
      'vue/valid-v-else': 'error',
      'vue/valid-v-for': 'error',
      'vue/valid-v-html': 'error',
      'vue/valid-v-if': 'error',
      'vue/valid-v-is': 'error',
      'vue/valid-v-memo': 'error',
      'vue/valid-v-model': 'error',
      'vue/valid-v-on': 'error',
      'vue/valid-v-once': 'error',
      'vue/valid-v-pre': 'error',
      'vue/valid-v-show': 'error',
      'vue/valid-v-slot': 'error',
      'vue/valid-v-text': 'error'
    }
  },

  // Vue TypeScript config
  {
    files: ['**/*.vue', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: vuePlugin.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      // TypeScript rules from @vue/eslint-config-typescript
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I']
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase']
        }
      ],
      // Additional TypeScript rules from @vue/eslint-config-typescript
      '@typescript-eslint/ban-types': ['error', {
        types: {
          '{}': false,
          'Function': false,
          'Object': false,
          'Boolean': false,
          'String': false,
          'Number': false,
          'Array': false,
          'Symbol': false,
          'ReadonlyArray': false,
          'ReadonlyMap': false,
          'ReadonlySet': false,
          'Promise': false,
          'PromiseLike': false,
          'Record': false
        }
      }],
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/triple-slash-reference': 'error',
      '@typescript-eslint/type-annotation-spacing': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      // Vue-specific TypeScript rules
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-options-name-casing': ['error', 'PascalCase'],
      'vue/component-tags-order': ['error', {
        order: ['script', 'template', 'style']
      }],
      'vue/define-macros-order': ['error', {
        order: ['defineProps', 'defineEmits']
      }],
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }],
      'vue/match-component-file-name': ['error', {
        extensions: ['vue'],
        shouldMatchCase: true
      }],
      'vue/no-duplicate-attributes': ['error', {
        allowCoexistClass: true,
        allowCoexistStyle: true
      }],
      'vue/no-reserved-props': ['error', {
        vueVersion: 3
      }],
      'vue/no-template-shadow': 'error',
      'vue/no-undef-components': 'error',
      'vue/no-undef-properties': 'error',
      'vue/no-unsupported-features': ['error', {
        version: '^3.0.0',
        ignores: []
      }],
      'vue/no-unused-properties': ['error', {
        groups: ['props', 'data', 'computed', 'methods', 'setup']
      }],
      'vue/no-use-v-if-with-v-for': ['error', {
        allowUsingIterationVar: false
      }],
      'vue/require-default-prop': 'error',
      'vue/require-direct-export': 'error',
      'vue/require-explicit-emits': ['error', {
        allowProps: false
      }],
      'vue/require-expose': 'error',
      'vue/require-name-property': 'error',
      'vue/require-prop-types': 'error',
      'vue/require-toggle-inside-transition': 'error',
      'vue/require-valid-default-prop': 'error',
      'vue/return-in-emits-validator': 'error',
      'vue/static-class-names-order': 'error',
      'vue/v-for-delimiter-style': ['error', 'in'],
      'vue/v-on-event-hyphenation': ['error', 'always', {
        autofix: true
      }],
      'vue/v-on-function-call': ['error', 'never'],
      'vue/v-slot-style': ['error', {
        default: 'v-slot',
        named: 'longform',
        destructured: 'longform'
      }]
    }
  },

  // Accessibility plugin recommended rules
  {
    files: ['**/*.vue'],
    plugins: {
      'vuejs-accessibility': accessibilityPlugin,
    },
    rules: {
      // Only include rules that differ from the recommended config
      'vuejs-accessibility/alt-text': 'error',
      'vuejs-accessibility/form-control-has-label': 'error',
      'vuejs-accessibility/label-has-for': 'error',
      'vuejs-accessibility/no-autofocus': 'error',
      'vuejs-accessibility/click-events-have-key-events': 'error',
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
  {
    files: ['**/*.vue', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
    plugins: {
      'vue': vuePlugin,
      'jsdoc': jsdocPlugin,
    },
    rules: {
      // Only include Vue rules that aren't in the recommended config or have different values
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/require-name-property': 'error',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/valid-define-options': 'error',
      'vue/no-unused-refs': 'error',
      'vue/prefer-import-from-vue': 'error',
      'vue/order-in-components': 'error',
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/v-on-event-hyphenation': ['error', 'always'],

      // JSDoc rules
      'jsdoc/require-jsdoc': ['error', {
        publicOnly: true,
        require: {
          FunctionDeclaration: true,
          MethodDefinition: false,
          ClassDeclaration: true,
          ArrowFunctionExpression: false,
          FunctionExpression: false
        }
      }],
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns-type': 'error',
      'jsdoc/require-description': 'error',
    }
  },

  // Language options and parser configuration
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
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
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportDeclaration[importKind!="type"]',
          message: 'Use type imports for type-only imports'
        }
      ]
    }
  },

  // Prettier config should be last to override formatting rules
  prettierConfig
];
