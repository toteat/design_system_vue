import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    include: ['**/__tests__/**/*.{browser,node}.test.{ts,vue}'],
    deps: {
      inline: [/@vue/],
    },
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    setupFiles: ['./src/test/setup.ts'],
    environmentMatchGlobs: [
      ['**/__tests__/**/*.browser.{ts,vue}', 'jsdom'],
      ['**/__tests__/**/*.node.{ts,vue}', 'node'],
    ],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
