import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import DropdownButton from '../DropdownButton.vue';
import type { DropdownButtonMenuItem } from '@/types';

// Sample menu items
const downloadMenuItems: DropdownButtonMenuItem[] = [
  {
    value: 'file-format',
    label: 'File format',
    icon: 'document-generic-outline',
  },
  {
    value: 'table-info',
    label: 'Table information',
    icon: 'printer-outline',
  },
];

const actionsMenuItems: DropdownButtonMenuItem[] = [
  { value: 'edit', label: 'Edit', icon: 'pencil-outline' },
  { value: 'duplicate', label: 'Duplicate', icon: 'copy-outline' },
  { value: 'share', label: 'Share', icon: 'share-outline' },
  { value: 'delete', label: 'Delete', icon: 'delete-outline', disabled: true },
];

const exportMenuItems: DropdownButtonMenuItem[] = [
  { value: 'pdf', label: 'Export as PDF' },
  { value: 'excel', label: 'Export as Excel' },
  { value: 'csv', label: 'Export as CSV' },
];

const meta: Meta<typeof DropdownButton> = {
  title: 'Components/DropdownButton',
  component: DropdownButton,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Button text displayed',
      table: { category: 'Content' },
    },
    menuItems: {
      control: 'object',
      description:
        'Array of menu items with value, label, optional icon and disabled',
      table: { category: 'Content' },
    },
    size: {
      control: { type: 'select' },
      options: ['tiny', 'small', 'medium', 'large'],
      description: 'Button size',
      table: { category: 'Display' },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: { category: 'State' },
    },
  },
  args: {
    text: 'Download',
    menuItems: downloadMenuItems,
    size: 'medium',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof DropdownButton>;

// Default story matching the design mockup
export const Default: Story = {
  render: (args) => ({
    components: { DropdownButton },
    setup() {
      const selectedItem = ref<DropdownButtonMenuItem | null>(null);
      const handleSelect = (item: DropdownButtonMenuItem) => {
        selectedItem.value = item;
      };
      return { args, selectedItem, handleSelect };
    },
    template: `
      <div style="padding: 2rem;">
        <DropdownButton v-bind="args" @select="handleSelect" />
        <div v-if="selectedItem" style="margin-top: 1rem; color: var(--color-neutral-500);">
          Selected: {{ selectedItem.label }}
        </div>
      </div>
    `,
  }),
};

// All sizes
export const AllSizes: Story = {
  render: () => ({
    components: { DropdownButton },
    setup() {
      return { downloadMenuItems };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span style="width: 80px; color: var(--color-neutral-400);">Tiny:</span>
          <DropdownButton text="Download" :menu-items="downloadMenuItems" size="tiny" />
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span style="width: 80px; color: var(--color-neutral-400);">Small:</span>
          <DropdownButton text="Download" :menu-items="downloadMenuItems" size="small" />
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span style="width: 80px; color: var(--color-neutral-400);">Medium:</span>
          <DropdownButton text="Download" :menu-items="downloadMenuItems" size="medium" />
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span style="width: 80px; color: var(--color-neutral-400);">Large:</span>
          <DropdownButton text="Download" :menu-items="downloadMenuItems" size="large" />
        </div>
      </div>
    `,
  }),
};

// With icons
export const WithIcons: Story = {
  render: () => ({
    components: { DropdownButton },
    setup() {
      const handleSelect = (item: DropdownButtonMenuItem) => {
        console.log('Selected:', item);
      };
      return { actionsMenuItems, handleSelect };
    },
    template: `
      <div style="padding: 2rem;">
        <DropdownButton
          text="Actions"
          :menu-items="actionsMenuItems"
          @select="handleSelect"
        />
      </div>
    `,
  }),
};

// Without icons
export const WithoutIcons: Story = {
  render: () => ({
    components: { DropdownButton },
    setup() {
      return { exportMenuItems };
    },
    template: `
      <div style="padding: 2rem;">
        <DropdownButton text="Export" :menu-items="exportMenuItems" />
      </div>
    `,
  }),
};

// Disabled state
export const Disabled: Story = {
  render: () => ({
    components: { DropdownButton },
    setup() {
      return { downloadMenuItems };
    },
    template: `
      <div style="padding: 2rem;">
        <DropdownButton
          text="Download"
          :menu-items="downloadMenuItems"
          :disabled="true"
        />
      </div>
    `,
  }),
};

// With disabled menu items
export const WithDisabledItems: Story = {
  render: () => ({
    components: { DropdownButton },
    setup() {
      return { actionsMenuItems };
    },
    template: `
      <div style="padding: 2rem;">
        <p style="margin-bottom: 1rem; color: var(--color-neutral-400);">
          The "Delete" item is disabled
        </p>
        <DropdownButton text="Actions" :menu-items="actionsMenuItems" />
      </div>
    `,
  }),
};

// Event handling demonstration
export const EventHandling: Story = {
  render: () => ({
    components: { DropdownButton },
    setup() {
      const events = ref<string[]>([]);
      const logEvent = (name: string, data?: unknown) => {
        const timestamp = new Date().toLocaleTimeString();
        const message = data
          ? `[${timestamp}] ${name}: ${JSON.stringify(data)}`
          : `[${timestamp}] ${name}`;
        events.value.unshift(message);
        if (events.value.length > 5) events.value.pop();
      };
      return { downloadMenuItems, events, logEvent };
    },
    template: `
      <div style="padding: 2rem;">
        <DropdownButton
          text="Download"
          :menu-items="downloadMenuItems"
          @select="(item) => logEvent('select', item)"
          @open="() => logEvent('open')"
          @close="() => logEvent('close')"
        />
        <div style="margin-top: 1.5rem;">
          <p style="font-weight: 600; margin-bottom: 0.5rem;">Event Log:</p>
          <div
            style="
              background: var(--color-neutral-100);
              padding: 1rem;
              border-radius: 8px;
              font-family: monospace;
              font-size: 12px;
              min-height: 100px;
            "
          >
            <div v-for="(event, index) in events" :key="index" style="margin-bottom: 0.25rem;">
              {{ event }}
            </div>
            <div v-if="events.length === 0" style="color: var(--color-neutral-400);">
              Interact with the button to see events...
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

// Keyboard navigation demo
export const KeyboardNavigation: Story = {
  render: () => ({
    components: { DropdownButton },
    setup() {
      return { downloadMenuItems };
    },
    template: `
      <div style="padding: 2rem;">
        <div style="margin-bottom: 1.5rem; color: var(--color-neutral-500);">
          <p style="font-weight: 600; margin-bottom: 0.5rem;">Keyboard navigation:</p>
          <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8;">
            <li><kbd style="background: var(--color-neutral-200); padding: 2px 6px; border-radius: 4px;">Enter</kbd> / <kbd style="background: var(--color-neutral-200); padding: 2px 6px; border-radius: 4px;">Space</kbd> - Open/close dropdown</li>
            <li><kbd style="background: var(--color-neutral-200); padding: 2px 6px; border-radius: 4px;">↑</kbd> / <kbd style="background: var(--color-neutral-200); padding: 2px 6px; border-radius: 4px;">↓</kbd> - Navigate items</li>
            <li><kbd style="background: var(--color-neutral-200); padding: 2px 6px; border-radius: 4px;">Enter</kbd> - Select item</li>
            <li><kbd style="background: var(--color-neutral-200); padding: 2px 6px; border-radius: 4px;">Escape</kbd> - Close dropdown</li>
          </ul>
        </div>
        <DropdownButton text="Download" :menu-items="downloadMenuItems" />
      </div>
    `,
  }),
};
