import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Spinner from '../Spinner.vue';

const sizeOptions = [
  'tiny',
  'small',
  'medium',
  'large',
  'very-large',
  'very-very-large',
  'ridiculously-large',
] as const;

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
      options: [...sizeOptions],
      description:
        'Predefined size (same scale as Button/Checkbox). Controls spinner dimensions.',
      table: {
        type: { summary: 'ComponentSize' },
        defaultValue: { summary: "'medium'" },
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
  args: {
    size: 'medium',
    color: 'neutral-300',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'medium',
    color: 'neutral-300',
  },
};

export const Primary: Story = {
  args: {
    size: 'medium',
    color: 'primary',
  },
};

export const AllSizes: Story = {
  render: () => ({
    components: { Spinner },
    setup() {
      return { sizeOptions };
    },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
        <div
          v-for="size in sizeOptions"
          :key="size"
          style="display: flex; flex-direction: column; align-items: center;"
        >
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
          <Spinner size="medium" color="neutral-300" />
          <span style="margin-top: 0.5rem; font-size: 0.875rem;">neutral-300</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <Spinner size="medium" color="primary" />
          <span style="margin-top: 0.5rem; font-size: 0.875rem;">primary</span>
        </div>
      </div>
    `,
  }),
};
