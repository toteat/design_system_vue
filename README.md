# Toteat Design System for Vue 3

A TypeScript-based design system for Vue 3 applications. Ships with modern ECMAScript syntax (ESNext).
This design system is primarily developed for Toteat's needs, and its development roadmap will be guided by Toteat's requirements.

## Installation

```bash
npm install @toteat/design-system-vue
```

## Usage

### Using the Vue Plugin (registers all components globally)

```js
import { createApp } from 'vue'
import App from './App.vue'
import { ToteatDesignSystem } from '@toteat/design-system-vue'

const app = createApp(App)
app.use(ToteatDesignSystem)
app.mount('#app')
```

### Using Individual Components

```vue
<script setup lang="ts">
import { Button, Icon, Spinner } from '@toteat/design-system-vue'
</script>

<template>
  <Button type="primary" size="medium">Click Me</Button>
  <Icon name="home-outline" size="24" color="primary" />
  <Spinner dimension="24" />
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

### CSS Handling

Component styles are bundled directly with the components. Your client project is responsible for handling CSS extraction and optimization according to your needs.

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
- `Icon` - A flexible icon component that supports all icons in the design system
- `Spinner` - A loading spinner component with customizable dimensions

### Component Examples

#### Button
```vue
<template>
  <Button type="primary" size="medium">Click Me</Button>
</template>
```

#### Icon
```vue
<template>
  <Icon name="home-outline" size="24" color="primary" />
</template>
```

#### Spinner
```vue
<template>
  <Spinner dimension="24" />
</template>
```

For detailed component documentation and examples, check out our Storybook documentation.
