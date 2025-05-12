import type { Preview } from '@storybook/vue3'
import '../src/style.css'; // Import global styles

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#1B1B1B' },
        { name: 'neutral', value: '#F2F2F2' },
      ],
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="p-6 font-manrope"><story /></div>',
    }),
  ],
};

export default preview;
