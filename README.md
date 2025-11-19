# Toteat Design System for Vue 3

[![Build](https://img.shields.io/github/actions/workflow/status/toteat/design_system_vue/ci.yml?branch=main&label=build)](https://github.com/toteat/design_system_vue/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/github/actions/workflow/status/toteat/design_system_vue/ci.yml?branch=main&label=tests)](https://github.com/toteat/design_system_vue/actions)
[![Security](https://img.shields.io/github/actions/workflow/status/toteat/design_system_vue/codeql.yml?branch=main&label=security)](https://github.com/toteat/design_system_vue/actions/workflows/codeql.yml)

A TypeScript-based design system for Vue 3, implementing [Toteat](https://toteat.com)'s design language and component patterns.

## Features

- 🎨 Toteat's design language
- 📦 Tree-shakeable components
- 🔍 Full TypeScript support
- 🚀 ESNext syntax
- 📊 Comprehensive testing

## Prerequisites

- Node.js >=16.0.0
- Vue 3.3.0+

## Installation

```bash
npm install @toteat-eng/design-system-vue
```

## Usage

### Global Registration

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { ToteatDesignSystem } from '@toteat-eng/design-system-vue'

const app = createApp(App)
app.use(ToteatDesignSystem)
app.mount('#app')
```

### Individual Component Import

```vue
<script setup lang="ts">
import { Button, Icon, Spinner } from '@toteat-eng/design-system-vue'
</script>

<template>
  <Button variant="primary" size="medium">Click Me</Button>
  <Icon name="home-outline" size="24" color="primary" />
  <Spinner dimension="24" />
</template>
```

## Styles

Import the CSS in your main entry file:

```javascript
import '@toteat-eng/design-system-vue/style.css'
```

## Available Components

- Button
- Checkbox
- DropZone
- Icon
- ImagePreview
- Multiselect
- SkeletonPreload
- Spinner
- Tooltip

## Vite Configuration

```javascript
// vite.config.js
export default {
  optimizeDeps: {
    include: ['@toteat-eng/design-system-vue']
  }
}
```

**Note:** This library is built with Vite and optimized for Vite-based projects. Other build tools (Webpack, Rollup, etc.) are not officially supported and may require additional configuration.

## License

See the LICENSE file for details.
