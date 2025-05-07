# Toteat Design System for Vue 3

A TypeScript-based design system for Vue 3 applications. Ships with modern ECMAScript syntax (ESNext).

## Installation

```bash
npm install @toteat/design-system-vue
```

## Usage

### Using the Vue Plugin (registers all components globally)

```js
import { createApp } from 'vue'
import App from './App.vue'
import ToteatDesignSystem from '@toteat/design-system-vue'
// Import the styles
import '@toteat/design-system-vue/style.css'

const app = createApp(App)
app.use(ToteatDesignSystem)
app.mount('#app')
```

### Using Individual Components

```vue
<script setup lang="ts">
import { Button } from '@toteat/design-system-vue'
// Import the styles
import '@toteat/design-system-vue/style.css'
</script>

<template>
  <Button color="primary" size="md">Click Me</Button>
</template>
```

## TypeScript Support

This library includes TypeScript definitions for all components and utilities.

```ts
import type { ButtonProps, ColorPalette } from '@toteat/design-system-vue'

// Define type-safe props
const buttonColor: ColorPalette = 'primary'
```

## Modern JavaScript (ESNext)

This library is distributed with modern JavaScript syntax (ESNext) and includes TypeScript type definitions. The library intentionally avoids transpiling to older JavaScript versions so that:

1. Consuming projects can determine their own target environments
2. Tree-shaking and other optimizations work more effectively
3. The library bundle remains smaller and more efficient

### Configuration in consuming projects

When using this library, ensure your build tool is configured to transpile node_modules, specifically for this package:

#### With Vite

```js
// vite.config.js
export default {
  optimizeDeps: {
    include: ['@toteat/design-system-vue']
  },
  build: {
    commonjsOptions: {
      include: [/@toteat\/design-system-vue/, /node_modules/]
    }
  }
}
```

#### With Webpack

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'node_modules/@toteat/design-system-vue')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
```

## Available Components

- `Button` - A versatile button component with various styles and states
