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
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      },
    },
    include: ['**/__tests__/**/*.{browser,node}.test.{ts,vue}'],
    deps: {
      optimizer: {
        web: {
          include: ['vue']
        }
      }
    },
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    setupFiles: ['./src/test/setup.ts'],
    workspace: [
      {
        test: {
          include: ['**/__tests__/**/*.browser.{ts,vue}'],
          environment: 'jsdom'
        }
      },
      {
        test: {
          include: ['**/__tests__/**/*.node.{ts,vue}'],
          environment: 'node'
        }
      }
    ],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
