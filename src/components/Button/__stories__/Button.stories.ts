import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '../Button.vue';
import type { ButtonProps, ButtonType, ButtonSize } from '@/types';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'text', 'icon'],
      description: 'The visual style of the button',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['auto', 'smaller', 'small', 'medium', 'large'],
      description: 'The size of the button',
      defaultValue: 'medium',
    },
    text: {
      control: 'text',
      description: 'Button text content',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
      defaultValue: false,
    },
    isFull: {
      control: 'boolean',
      description: 'Whether the button takes full width',
      defaultValue: false,
    },
    selected: {
      control: 'boolean',
      description: 'Whether the button is in selected state',
      defaultValue: false,
    },
    typeButton: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The HTML button type attribute',
      defaultValue: 'button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Basic button example
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

export const Text: Story = {
  args: {
    type: 'text',
    text: 'Text Button',
  },
};

// Different sizes
export const Sizes: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      const sizes: ButtonSize[] = ['smaller', 'small', 'medium', 'large'];
      return { args, sizes };
    },
    template: `
      <div class="flex flex-col gap-4">
        <div v-for="size in sizes" :key="size" class="flex items-center gap-2">
          <span class="w-16">{{ size }}:</span>
          <Button v-bind="args" :size="size" :text="'Button ' + size" />
        </div>
      </div>
    `,
  }),
  args: {
    type: 'primary',
  },
};

// States
export const States: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <Button v-bind="args" text="Normal" />
          <Button v-bind="args" text="Disabled" disabled />
          <Button v-bind="args" text="Loading" loading />
          <Button v-bind="args" text="Selected" selected />
        </div>
      </div>
    `,
  }),
  args: {
    type: 'primary',
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    type: 'primary',
    text: 'Full Width Button',
    isFull: true,
  },
};

// All types
export const AllTypes: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      const types: ButtonType[] = ['primary', 'secondary', 'outline', 'text', 'icon'];
      return { args, types };
    },
    template: `
      <div class="flex flex-col gap-4">
        <div v-for="type in types" :key="type" class="flex items-center gap-2">
          <span class="w-20">{{ type }}:</span>
          <Button v-bind="args" :type="type" :text="type" />
        </div>
      </div>
    `,
  }),
};
