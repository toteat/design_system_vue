import type { Meta, StoryObj } from '@storybook/vue3';
import Spinner from '../Spinner.vue';

const sizeOptions = [
  1,
  1.5,
  2,
  2.5,
  3,
  4,
  5,
  6,
  8,
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
    size: {
      control: { type: 'select' },
      options: sizeOptions,
      description: 'Size is defined by the size number * 16px, so 1 = 16px, 1.5 = 24px, 2 = 32px, etc.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 1,
  },
};

export const AllSizes: Story = {
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
        <div v-for="size in [
          1,
          2,
          3,
          4,
          5,
          6,
          8,
        ]" :key="size" style="display: flex; flex-direction: column; align-items: center;">
          <Spinner :size="size" />
          <span style="margin-top: 0.5rem; font-size: 0.875rem;">{{ size }}</span>
        </div>
      </div>
    `,
  }),
};
