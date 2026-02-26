import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Spinner from '../Spinner.vue';

const sizeOptions = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8];

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
      description:
        'Size is defined by the size number * 16px, so 1 = 16px, 1.5 = 24px, 2 = 32px, etc.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['gray', 'red'],
      description: 'Arc color variant (gradient from color to transparent).',
      table: {
        type: { summary: "'gray' | 'red'" },
        defaultValue: { summary: "'gray'" },
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
    color: 'gray',
  },
};

export const Red: Story = {
  args: {
    size: 2,
    color: 'red',
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
          <Spinner :size="size" color="gray" />
          <span style="margin-top: 0.5rem; font-size: 0.875rem;">{{ size }}</span>
        </div>
      </div>
    `,
  }),
};

export const GrayAndRed: Story = {
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display: flex; gap: 3rem; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <Spinner :size="3" color="gray" />
          <span style="margin-top: 0.5rem; font-size: 0.875rem;">Gray</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <Spinner :size="3" color="red" />
          <span style="margin-top: 0.5rem; font-size: 0.875rem;">Red</span>
        </div>
      </div>
    `,
  }),
};
