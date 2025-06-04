import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SkeletonPreload from '../SkeletonPreload.vue';

const meta = {
  title: 'Components/SkeletonPreload',
  component: SkeletonPreload,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'number',
      description: 'Width of the skeleton in pixels',
      defaultValue: 40,
    },
    height: {
      control: 'number',
      description: 'Height of the skeleton in pixels',
      defaultValue: 40,
    },
    borderRadius: {
      control: 'number',
      description:
        'Border radius of the skeleton in pixels (ignored when isRounded is true)',
      defaultValue: 8,
    },
    isRounded: {
      control: 'boolean',
      description:
        'Whether the skeleton should be circular (overrides height and borderRadius)',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof SkeletonPreload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
    height: 100,
    borderRadius: 8,
    isRounded: false,
  },
};

export const Square: Story = {
  args: {
    width: 100,
    height: 100,
    borderRadius: 0,
    isRounded: false,
  },
};

export const Rounded: Story = {
  args: {
    width: 100,
    height: 100,
    borderRadius: 16,
    isRounded: false,
  },
};

export const Circular: Story = {
  args: {
    width: 100,
    height: 100,
    borderRadius: 8,
    isRounded: true,
  },
};

export const Small: Story = {
  args: {
    width: 40,
    height: 40,
    borderRadius: 8,
    isRounded: false,
  },
};

export const Large: Story = {
  args: {
    width: 400,
    height: 200,
    borderRadius: 8,
    isRounded: false,
  },
};

export const TextLine: Story = {
  args: {
    width: 300,
    height: 24,
    borderRadius: 4,
    isRounded: false,
  },
};

export const Avatar: Story = {
  args: {
    width: 64,
    height: 64,
    borderRadius: 8,
    isRounded: true,
  },
};
