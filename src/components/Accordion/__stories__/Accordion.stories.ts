import type { Meta, StoryObj } from '@storybook/vue3';
import Accordion from '../Accordion.vue';

type Story = StoryObj<typeof Accordion>;

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'Whether the accordion is expanded',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
    bordered: {
      control: 'boolean',
      description: 'Show border around the accordion',
    },
    label: {
      control: 'text',
      description: 'Label text for the accordion trigger',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Accordion Item',
    expanded: false,
    disabled: false,
    bordered: false,
  },
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <Accordion v-bind="args">
        <p>This is the accordion content. It will be hidden or shown based on the expanded state.</p>
      </Accordion>
    `,
  }),
};

export const Expanded: Story = {
  args: {
    label: 'Expanded Accordion',
    expanded: true,
    disabled: false,
    bordered: false,
  },
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <Accordion v-bind="args">
        <p>This accordion item is expanded by default.</p>
      </Accordion>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Accordion',
    expanded: false,
    disabled: true,
    bordered: false,
  },
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <Accordion v-bind="args">
        <p>This accordion is disabled and cannot be expanded.</p>
      </Accordion>
    `,
  }),
};

export const Bordered: Story = {
  args: {
    label: 'Bordered Accordion',
    expanded: false,
    disabled: false,
    bordered: true,
  },
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <Accordion v-bind="args">
        <p>This accordion has a border around it.</p>
      </Accordion>
    `,
  }),
};

export const Multiple: Story = {
  render: () => ({
    components: { Accordion },
    data() {
      return {
        items: [
          { id: 1, label: 'First Item', expanded: false },
          { id: 2, label: 'Second Item', expanded: false },
          { id: 3, label: 'Third Item', expanded: false },
        ],
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <Accordion
          v-for="item in items"
          :key="item.id"
          :label="item.label"
          :expanded="item.expanded"
          @toggle-expand="item.expanded = !item.expanded"
        >
          <p>Content for {{ item.label }}</p>
        </Accordion>
      </div>
    `,
  }),
};

export const CustomLabel: Story = {
  render: () => ({
    components: { Accordion },
    template: `
      <Accordion expanded>
        <template #label="{ expanded }">
          <span style="font-weight: bold; color: var(--color-primary);">
            Custom Label ({{ expanded ? 'Expanded' : 'Collapsed' }})
          </span>
        </template>
        <p>This accordion has a custom label slot.</p>
      </Accordion>
    `,
  }),
};
