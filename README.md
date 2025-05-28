# Toteat Design System for Vue 3

[![Build](https://img.shields.io/github/actions/workflow/status/toteat/design_system_vue/ci.yml?branch=main&label=build)](https://github.com/toteat/design_system_vue/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/github/actions/workflow/status/toteat/design_system_vue/ci.yml?branch=main&label=tests)](https://github.com/toteat/design_system_vue/actions)
[![Security](https://img.shields.io/github/actions/workflow/status/toteat/design_system_vue/codeql.yml?branch=main&label=security)](https://github.com/toteat/design_system_vue/actions/workflows/codeql.yml)

A TypeScript-based design system for Vue 3, implementing Toteat's design language and component patterns.

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
npm install @toteat/design-system-vue
```

## Usage

### Global Registration

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { ToteatDesignSystem } from '@toteat/design-system-vue'

const app = createApp(App)
app.use(ToteatDesignSystem)
app.mount('#app')
```

### Individual Component Import

```vue
<script setup lang="ts">
import { Button, Icon, Spinner } from '@toteat/design-system-vue'
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
import '@toteat/design-system-vue/style.css'
```

## Available Components

- Button
- DropZone
- Icon
- ImagePreview
- SkeletonPreload
- Spinner

## Vite Configuration

```javascript
// vite.config.js
export default {
  optimizeDeps: {
    include: ['@toteat/design-system-vue']
  }
}
```

## Webpack Configuration

For projects using Webpack, add the following configuration to your `webpack.config.js`:

```javascript
const path = require('path');

module.exports = {
  // ... other webpack configurations
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!@toteat\/design-system-vue)/
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      '@toteat/design-system-vue': path.resolve(__dirname, 'node_modules/@toteat/design-system-vue')
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

### Babel Configuration

Ensure your `.babelrc` or `babel.config.js` includes:

```javascript
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@vue/babel-plugin-jsx'
  ]
}
```

### Webpack Plugin

Don't forget to import the Vue Loader Plugin:

```javascript
const { VueLoaderPlugin } = require('vue-loader')
```

## License

See the LICENSE file for details.
