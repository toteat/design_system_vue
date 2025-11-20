import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, watch } from 'vue';
import GroupedButtons from '../GroupedButtons.vue';

const meta: Meta<typeof GroupedButtons> = {
  title: 'Components/GroupedButtons',
  component: GroupedButtons,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description:
        'Array of button options with value, label, optional disabled and icon',
    },
    selectedButton: {
      control: 'select',
      options: ['option1', 'option2', 'option3'],
      description: 'Currently selected button value (v-model:selected-button)',
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large'],
      description: 'Button size',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make buttons take full width of container',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all buttons',
    },
  },
  args: {
    options: [
      { value: 'option1', label: 'Option 1', icon: 'home-outline' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3', icon: 'pencil-outline' },
    ],
    selectedButton: 'option1',
    size: 'medium',
    fullWidth: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof GroupedButtons>;

export const Default: Story = {
  render: (args) => ({
    components: { GroupedButtons },
    setup() {
      const selected = ref(args.selectedButton);

      // Watch args.selectedButton changes from Storybook controls
      watch(
        () => args.selectedButton,
        (newValue) => {
          selected.value = newValue;
        },
      );

      return { args, selected };
    },
    template: `
      <div>
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600;">Grouped Buttons - Default</h3>
        <GroupedButtons
          :options="args.options"
          :size="args.size"
          :full-width="args.fullWidth"
          :disabled="args.disabled"
          v-model:selected-button="selected"
        />
        <p style="margin-top: 1rem; font-size: var(--text-sm); color: var(--color-neutral-400);">
          Selected: <strong>{{ selected }}</strong>
        </p>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  args: {
    options: [
      { value: 'document', label: 'Document', icon: 'document-list-outline' },
      { value: 'download', label: 'Download', icon: 'cloud-download-outline' },
      { value: 'upload', label: 'Upload', icon: 'cloud-upload-outline' },
    ],
    selectedButton: 'document',
  },
  render: (args) => ({
    components: { GroupedButtons },
    setup() {
      const selected = ref(args.selectedButton);

      watch(
        () => args.selectedButton,
        (newValue) => {
          selected.value = newValue;
        },
      );

      return { args, selected };
    },
    template: `
      <div>
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600;">Grouped Buttons - With Icons</h3>
        <GroupedButtons
          :options="args.options"
          :size="args.size"
          :full-width="args.fullWidth"
          :disabled="args.disabled"
          v-model:selected-button="selected"
        />
        <p style="margin-top: 1rem; font-size: var(--text-sm); color: var(--color-neutral-400);">
          Selected: <strong>{{ selected }}</strong>
        </p>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { GroupedButtons },
    setup() {
      const options = [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ];
      const selectedTiny = ref('left');
      const selectedSmall = ref('left');
      const selectedMedium = ref('left');
      const selectedLarge = ref('left');

      return {
        options,
        selectedTiny,
        selectedSmall,
        selectedMedium,
        selectedLarge,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: var(--text-base); font-weight: 600;">Tiny</h4>
          <GroupedButtons :options="options" v-model:selected-button="selectedTiny" size="tiny" />
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: var(--text-base); font-weight: 600;">Small</h4>
          <GroupedButtons :options="options" v-model:selected-button="selectedSmall" size="small" />
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: var(--text-base); font-weight: 600;">Medium</h4>
          <GroupedButtons :options="options" v-model:selected-button="selectedMedium" size="medium" />
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: var(--text-base); font-weight: 600;">Large</h4>
          <GroupedButtons :options="options" v-model:selected-button="selectedLarge" size="large" />
        </div>
      </div>
    `,
  }),
};

export const FullWidth: Story = {
  args: {
    options: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'yearly', label: 'Yearly' },
    ],
    selectedButton: 'monthly',
    fullWidth: true,
  },
  render: (args) => ({
    components: { GroupedButtons },
    setup() {
      const selected = ref(args.selectedButton);
      return { args, selected };
    },
    template: `
      <div>
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600;">Full Width</h3>
        <div style="width: 100%; max-width: 600px; padding: 1.5rem; background-color: var(--color-neutral-100); border-radius: var(--radius-base);">
          <p style="margin-bottom: 1rem; font-size: var(--text-sm); color: var(--color-neutral-500);">
            Container with 100% width (max-width: 600px for demo):
          </p>
          <GroupedButtons v-bind="args" v-model:selected-button="selected" />
        </div>
        <p style="margin-top: 1rem; font-size: var(--text-sm); color: var(--color-neutral-400);">
          Selected: <strong>{{ selected }}</strong>
        </p>
      </div>
    `,
  }),
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Enabled' },
      { value: 'option2', label: 'Disabled', disabled: true },
      { value: 'option3', label: 'Enabled' },
      { value: 'option4', label: 'Disabled', disabled: true },
    ],
    selectedButton: 'option1',
  },
  render: (args) => ({
    components: { GroupedButtons },
    setup() {
      const selected = ref(args.selectedButton);
      return { args, selected };
    },
    template: `
      <div>
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600;">With Disabled Options</h3>
        <GroupedButtons v-bind="args" v-model:selected-button="selected" />
        <p style="margin-top: 1rem; font-size: var(--text-sm); color: var(--color-neutral-400);">
          Selected: <strong>{{ selected }}</strong>
        </p>
      </div>
    `,
  }),
};

export const AllDisabled: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    selectedButton: 'option1',
    disabled: true,
  },
  render: (args) => ({
    components: { GroupedButtons },
    setup() {
      const selected = ref(args.selectedButton);
      return { args, selected };
    },
    template: `
      <div>
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600;">All Disabled</h3>
        <GroupedButtons v-bind="args" v-model:selected-button="selected" />
      </div>
    `,
  }),
};

export const ManyOptions: Story = {
  args: {
    options: [
      { value: 'jan', label: 'Jan' },
      { value: 'feb', label: 'Feb' },
      { value: 'mar', label: 'Mar' },
      { value: 'apr', label: 'Apr' },
      { value: 'may', label: 'May' },
      { value: 'jun', label: 'Jun' },
    ],
    selectedButton: 'jan',
  },
  render: (args) => ({
    components: { GroupedButtons },
    setup() {
      const selected = ref(args.selectedButton);
      return { args, selected };
    },
    template: `
      <div>
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600;">Many Options</h3>
        <GroupedButtons v-bind="args" v-model:selected-button="selected" />
        <p style="margin-top: 1rem; font-size: var(--text-sm); color: var(--color-neutral-400);">
          Selected: <strong>{{ selected }}</strong>
        </p>
      </div>
    `,
  }),
};
