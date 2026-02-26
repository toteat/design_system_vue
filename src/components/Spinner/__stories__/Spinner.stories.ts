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
      options: ['neutral-300', 'primary'],
      description: 'DS color token for the spinner arc.',
      table: {
        type: { summary: "'neutral-300' | 'primary'" },
        defaultValue: { summary: "'neutral-300'" },
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
    color: 'neutral-300',
  },
};

export const Primary: Story = {
  args: {
    size: 2,
    color: 'primary',
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
          <Spinner :size="size" color="neutral-300" />
          <span style="margin-top: 0.5rem; font-size: 0.875rem;">{{ size }}</span>
        </div>
      </div>
    `,
  }),
};

export const NeutralAndPrimary: Story = {
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display: flex; gap: 3rem; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <Spinner :size="3" color="neutral-300" />
          <span style="margin-top: 0.5rem; font-size: 0.875rem;">neutral-300</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <Spinner :size="3" color="primary" />
          <span style="margin-top: 0.5rem; font-size: 0.875rem;">primary</span>
        </div>
      </div>
    `,
  }),
};
