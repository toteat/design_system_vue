import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import dts from 'vite-plugin-dts'
import fs from 'fs/promises'
import path from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Ensure directory exists before writing
async function ensureDir(dirPath: string) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    // Directory already exists, ignore
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin(),
    vue(),
    tailwindcss(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.vue'],
      outDir: 'dist',
      staticImport: true,
      insertTypesEntry: true,
    }),
    {
      name: 'custom-declaration',
      closeBundle: async () => {
        const typeDef = `
import type { App } from 'vue';
import type { DefineComponent } from 'vue';

// Component types
export type ButtonType = 'outline' | 'primary' | 'secondary' | 'text';
export type ButtonSize = 'medium' | 'large' | 'smaller' | 'small';
export type ButtonProps = {
  type?: ButtonType;
  disabled?: boolean;
  isFull?: boolean;
  size?: ButtonSize;
  typeButton?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  text?: string;
  selected?: boolean;
  iconName?: string;
  onlyIcon?: boolean;
};

export type SpinnerProps = {
  dimension?: number;
};

export type IconContent = {
  path: string;
  viewBox: string;
};

export type IconProps = {
  name: string;
  size?: number;
  color?: ThemeColor;
};

export type ThemeColor =
  | 'primary'
  | 'primary-light'
  | 'secondary'
  | 'secondary-light'
  | 'tertiary'
  | 'tertiary-light'
  | 'white'
  | 'black'
  | 'neutral'
  | 'neutral-100'
  | 'neutral-200'
  | 'neutral-300'
  | 'neutral-400'
  | 'neutral-500'
  | 'gray-100'
  | 'gray-200'
  | 'gray-300'
  | 'gray-400'
  | 'gray-500'
  | 'blue'
  | 'blue-light'
  | 'green'
  | 'green-light'
  | 'yellow'
  | 'yellow-light'
  | 'red'
  | 'red-light'
  | 'unset';

// Component exports
export declare const Button: DefineComponent<ButtonProps>;
export declare const Icon: DefineComponent<IconProps>;
export declare const Spinner: DefineComponent<SpinnerProps>;

// Plugin exports
export declare const install: (app: App) => void;
export declare const ToteatDesignSystem: {
  install: (app: App) => void;
};

// Default export
declare const _default: {
  install: (app: App) => void;
};
export default _default;
`;
        await fs.writeFile('dist/index.d.ts', typeDef);

        // Create individual component entry points
        const components = ['Button', 'Icon', 'Spinner'];

        for (const component of components) {
          // Ensure directory exists
          await ensureDir(`dist/${component}`);

          // Create JS entry
          await fs.writeFile(`dist/${component}/index.js`,
            `import '../design-system-vue.es.js';
export { ${component} } from '../design-system-vue.es.js';`);

          // Create TS declaration
          await fs.writeFile(`dist/${component}/index.d.ts`,
            `import { DefineComponent } from 'vue';
import { ${component}Props } from '../index';
declare const ${component}: DefineComponent<${component}Props>;
export default ${component};`);
        }
      }
    }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystemVue',
      fileName: (format) => `design-system-vue.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Only externalize Vue to avoid bundling it
      external: ['vue'],
      output: {
        // Global variable used when the bundle is consumed via a script tag
        globals: {
          vue: 'Vue'
        },
        // Ensure TypeScript declarations and CSS are handled correctly
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'design-system-vue.css'
          return '[name][extname]'
        },
        // Ensure proper exports
        exports: 'named',
        // Preserve modules to enable tree-shaking
        preserveModules: false
      },
      // Exclude unnecessary files from the build
      input: {
        main: resolve(__dirname, 'src/index.ts')
      }
    },
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Preserve modern features, no transpilation
    target: 'esnext',
    minify: 'esbuild',
    // Inject CSS into JS to auto-apply component styles
    cssCodeSplit: false,
    // Ensure proper tree-shaking
    emptyOutDir: true,
    // Ensure proper module resolution
    modulePreload: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  esbuild: {
    // Keep pure modern syntax without transpilation
    target: 'esnext',
  },
  test: {
    // Vitest configuration
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}', 'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/'],
    },
    deps: {
      optimizer: {
        web: {
          include: ['vue']
        }
      }
    },
  },
})
