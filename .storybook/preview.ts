import type { Preview } from '@storybook/vue3';
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
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '412px',
            height: '823px',
          },
        },
        tablet: {
          name: 'Tablet Vertical',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        tabletHorizontal: {
          name: 'Tablet Horizontal',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1366px',
            height: '768px',
          },
        },
        desktopLarge: {
          name: 'Desktop Large',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
      defaultViewport: 'reset',
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="padding: 1.5rem;"><story /></div>',
    }),
  ],
};

export default preview;
