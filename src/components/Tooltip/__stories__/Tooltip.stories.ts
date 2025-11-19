import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Tooltip from '../Tooltip.vue';
import Button from '../../Button/Button.vue';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'The text content displayed in the tooltip',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the trigger element',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled',
    },
    delay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay in milliseconds before showing the tooltip',
    },
    maxWidth: {
      control: { type: 'number', min: 100, max: 500, step: 50 },
      description: 'Maximum width of the tooltip in pixels',
    },
  },
  args: {
    content: 'This is a helpful tooltip',
    position: 'top',
    disabled: false,
    delay: 200,
    maxWidth: 250,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Tooltip v-bind="args">
          <Button text="Hover over me" variant="primary" />
        </Tooltip>
      </div>
    `,
  }),
};

export const TopPosition: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Tooltip v-bind="args" position="top">
          <Button text="Top tooltip" variant="primary" />
        </Tooltip>
      </div>
    `,
  }),
  args: {
    content: 'Tooltip appears on top',
  },
};

export const BottomPosition: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Tooltip v-bind="args" position="bottom">
          <Button text="Bottom tooltip" variant="secondary" />
        </Tooltip>
      </div>
    `,
  }),
  args: {
    content: 'Tooltip appears on bottom',
  },
};

export const LeftPosition: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Tooltip v-bind="args" position="left">
          <Button text="Left tooltip" variant="outline" />
        </Tooltip>
      </div>
    `,
  }),
  args: {
    content: 'Tooltip appears on left',
  },
};

export const RightPosition: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Tooltip v-bind="args" position="right">
          <Button text="Right tooltip" variant="text" />
        </Tooltip>
      </div>
    `,
  }),
  args: {
    content: 'Tooltip appears on right',
  },
};

export const LongContent: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Tooltip v-bind="args">
          <Button text="Long tooltip content" variant="primary" />
        </Tooltip>
      </div>
    `,
  }),
  args: {
    content:
      'This is a much longer tooltip message that demonstrates text wrapping within the maximum width constraint.',
    maxWidth: 200,
  },
};

export const CustomMaxWidth: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Tooltip v-bind="args">
          <Button text="Custom width" variant="secondary" />
        </Tooltip>
      </div>
    `,
  }),
  args: {
    content: 'This tooltip has a wider maximum width to display more content',
    maxWidth: 400,
  },
};

export const CustomDelay: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Tooltip v-bind="args">
          <Button text="Slow to appear" variant="outline" />
        </Tooltip>
      </div>
    `,
  }),
  args: {
    content: 'This tooltip takes 1 second to appear',
    delay: 1000,
  },
};

export const InstantAppearance: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Tooltip v-bind="args">
          <Button text="Instant tooltip" variant="primary" />
        </Tooltip>
      </div>
    `,
  }),
  args: {
    content: 'This tooltip appears instantly',
    delay: 0,
  },
};

export const DisabledTooltip: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Tooltip v-bind="args" :disabled="true">
          <Button text="Tooltip disabled" variant="secondary" />
        </Tooltip>
      </div>
    `,
  }),
  args: {
    content: 'This tooltip will not appear because it is disabled',
    disabled: true,
  },
};

export const OnTextElement: Story = {
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <p>
          This is a paragraph with
          <Tooltip v-bind="args">
            <span style="text-decoration: underline; cursor: help;">helpful text</span>
          </Tooltip>
          that has a tooltip.
        </p>
      </div>
    `,
  }),
  args: {
    content: 'Additional information about this text',
  },
};

export const MultipleTooltips: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 20px; justify-content: center; align-items: center; min-height: 300px; flex-wrap: wrap;">
        <Tooltip content="Save your work" position="top">
          <Button text="Save" variant="primary" />
        </Tooltip>
        <Tooltip content="Delete this item" position="top">
          <Button text="Delete" variant="secondary" />
        </Tooltip>
        <Tooltip content="Cancel operation" position="top">
          <Button text="Cancel" variant="outline" />
        </Tooltip>
        <Tooltip content="View more options" position="top">
          <Button text="Options" variant="text" />
        </Tooltip>
      </div>
    `,
  }),
};

export const AllPositions: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 100px; padding: 150px; justify-items: center; align-items: center;">
        <div></div>
        <Tooltip :content="args.content" position="top">
          <Button text="Top" variant="primary" />
        </Tooltip>
        <div></div>

        <Tooltip :content="args.content" position="left">
          <Button text="Left" variant="secondary" />
        </Tooltip>
        <div></div>
        <Tooltip :content="args.content" position="right">
          <Button text="Right" variant="outline" />
        </Tooltip>

        <div></div>
        <Tooltip :content="args.content" position="bottom">
          <Button text="Bottom" variant="text" />
        </Tooltip>
        <div></div>
      </div>
    `,
  }),
};
