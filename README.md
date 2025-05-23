# Toteat Design System for Vue 3

[![CI](https://github.com/mauriseo/design_system_vue/actions/workflows/ci.yml/badge.svg)](https://github.com/mauriseo/design_system_vue/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-passing-brightgreen)](https://github.com/mauriseo/design_system_vue/actions)

A TypeScript-based design system built specifically for Toteat's Vue 3 applications. This design system implements Toteat's design language and component patterns, ensuring consistency across all Toteat products. Ships with modern ECMAScript syntax (ESNext).

## Features

- 🎨 Toteat's design language implementation
- 📦 Tree-shakeable components
- 🔍 TypeScript support out of the box
- 🚀 ESNext syntax for optimal performance
- 📊 Comprehensive test suite
- 📚 Comprehensive documentation with Storybook

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

## Styles

Component styles are bundled into a single CSS file and are not applied automatically. You need to import it in your project:

```js
// main.ts or main.js
import 'toteat-design-system-vue/dist/design-system-vue.css';
// or using subpath export
import '@toteat/design-system-vue/style.css';
```

### Vite Configuration

Vite processes CSS imports from `node_modules` by default. If you excluded `node_modules` in your config, include this package:

```js
// vite.config.js
export default {
  optimizeDeps: {
    include: ['@toteat/design-system-vue']
  }
}
```

## Available Components

- `Button` - A versatile button component with various styles and states
- `Icon` - A flexible icon component that supports all icons in the design system
- `Spinner` - A loading spinner component with customizable dimensions
- `SkeletonPreload` - A shimmering placeholder component with customizable dimensions and border radius

For detailed component documentation and examples, check out our Storybook documentation.
