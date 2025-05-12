import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '../Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'text', 'icon'],
      description: 'The visual style of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['medium', 'large','smaller', 'small'],
      description: 'The size of the button',
    },
    text: {
      control: 'text',
      description: 'Button text content',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    isFull: {
      control: 'boolean',
      description: 'Whether the button takes full width',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the button is in selected state',
    },
    typeButton: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The HTML button type attribute',
    },
  },
  args: {
    // Default values matching the component props
    type: 'primary',
    size: 'medium',
    disabled: false,
    isFull: false,
    loading: false,
    text: 'Loading...',
    selected: false,
    typeButton: 'button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Types
export const Primary: Story = {
  args: {
    type: 'primary',
    text: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    text: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    type: 'outline',
    text: 'Outline Button',
  },
};

export const TextButton: Story = {
  args: {
    type: 'text',
    text: 'Text Button',
  },
};

export const IconButton: Story = {
  args: {
    type: 'icon',
    text: 'Icon',
  },
};

// Sizes
export const SizeSmaller: Story = {
  args: {
    type: 'primary',
    size: 'smaller',
    text: 'Smaller Button',
  },
};

export const SizeSmall: Story = {
  args: {
    type: 'primary',
    size: 'small',
    text: 'Small Button',
  },
};

export const SizeMedium: Story = {
  args: {
    type: 'primary',
    size: 'medium',
    text: 'Medium Button',
  },
};

export const SizeLarge: Story = {
  args: {
    type: 'primary',
    size: 'large',
    text: 'Large Button',
  },
};

// States
export const Disabled: Story = {
  args: {
    type: 'primary',
    text: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    type: 'primary',
    text: 'Loading...',
    loading: true,
  },
};

export const Selected: Story = {
  args: {
    type: 'primary',
    text: 'Selected Button',
    selected: true,
  },
};

export const FullWidth: Story = {
  args: {
    type: 'primary',
    text: 'Full Width Button',
    isFull: true,
  },
};
