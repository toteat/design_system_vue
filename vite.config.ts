import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
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
    // Ensure CSS is extracted to separate files
    cssCodeSplit: true,
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
})
