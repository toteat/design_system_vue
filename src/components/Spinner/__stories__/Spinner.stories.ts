import type { Meta, StoryObj } from '@storybook/vue3';
import Spinner from '../Spinner.vue';

const sizeOptions = [
  4,
  6,
  8,
  10,
  12,
  16,
  20,
  24,
  32,
];

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      autodocs: true,
    },
  },
  argTypes: {
    dimension: {
      control: { type: 'select' },
      options: sizeOptions,
      description: 'Tailwind size number (4 = 1rem, 8 = 2rem, etc.) that determines the spinner dimensions',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    dimension: 4,
  },
};

export const AllSizes: Story = {
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
        <div v-for="dim in [
          4,
          6,
          8,
          10,
          12,
          16,
          20,
          24,
          32,
        ]" :key="dim" style="display: flex; flex-direction: column; align-items: center;">
          <Spinner :dimension="dim" />
          <span style="margin-top: 0.5rem; font-size: 0.875rem;">{{ dim }}</span>
        </div>
      </div>
    `,
  }),
};
