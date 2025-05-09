import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystemVue',
      fileName: (format) => `design-system-vue.${format === 'es' ? 'js' : format}.js`,
    },
    rollupOptions: {
      // Externalize Vue to avoid bundling it
      external: ['vue'],
      output: {
        // Global variable used when the bundle is consumed via a script tag
        globals: {
          vue: 'Vue',
        },
      },
    },
    // Generate sourcemaps
    sourcemap: true,
    // Preserve modern features, no transpilation
    target: 'esnext',
    minify: 'esbuild',
    // Don't split CSS - let client projects handle CSS extraction
    cssCodeSplit: false,
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
