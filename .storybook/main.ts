import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/__stories__/*.mdx",
    "../src/**/__stories__/*.stories.ts"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook"
  ],
  "framework": {
    "name": "@storybook/vue3-vite",
    "options": {}
  },
  async viteFinal(config) {
    if (config.plugins) {
      // Add Tailwind v4 plugin to Storybook configuration
      const tailwindPlugin = await import('@tailwindcss/vite');
      config.plugins.push(tailwindPlugin.default());
    }

    // Return the altered config
    return config;
  },
};
export default config;
