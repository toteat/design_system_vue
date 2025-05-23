import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: ['**/node_modules/**', '**/dist/**'],
      include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}', '**/__tests__/**/*.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: [
          'src/components/**/*.vue',
          'src/components/**/*.ts',
          'src/**/*.{js,ts,vue}',
          '!**/*.d.ts',
          '!**/node_modules/**',
          '!**/__tests__/**',
          '!**/__stories__/**'
        ],
        thresholds: process.env.STAGED_FILES ? {
          lines: 0,
          functions: 0,
          branches: 0,
          statements: 0
        } : {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80
        },
        all: false
      },
      deps: {
        optimizer: {
          web: {
            include: ['vue']
          }
        }
      },
      environmentOptions: {
        jsdom: {
          resources: 'usable',
        },
      },
      setupFiles: ['./src/test/setup.ts'],
    }
  })
)
