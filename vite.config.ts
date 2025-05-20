import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
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
    console.info(`Directory already exists: ${dirPath}`, err)
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin(),
    vue(),
    dts({
      include: ['src'],
      outDir: 'dist',
      tsconfigPath: './tsconfig.app.json',
      entryRoot: 'src',
      copyDtsFiles: true,
      cleanVueFileName: true,
    }),
    {
      name: 'custom-declaration',
      closeBundle: async () => {
        // Create individual component entry points dynamically
        const componentsDir = path.resolve(__dirname, 'src/components');
        const entries = await fs.readdir(componentsDir, { withFileTypes: true });
        const components = entries
          .filter(entry => entry.isDirectory())
          .map(entry => entry.name);

        for (const component of components) {
          // Ensure directory exists
          await ensureDir(`dist/${component}`);

          // Create JS entry
          await fs.writeFile(`dist/${component}/index.js`,
            `import '../design-system-vue.es.js';\nexport { ${component} } from '../design-system-vue.es.js';`);

          // Create TS declaration with named export for robust named import support
          await fs.writeFile(`dist/${component}/index.d.ts`,
            `export { ${component} } from '../index';\n`);
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
          // @ts-ignore
          if (assetInfo.name === 'style.css') return 'design-system-vue.css' // NOSONAR
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
