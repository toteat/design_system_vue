import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Checkbox from '../Checkbox.vue';
import type { ThemeColor } from '@/types';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    size: {
      control: 'number',
      description: 'Size of the checkbox icon',
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary',
        'primary-light',
        'secondary',
        'secondary-light',
        'tertiary',
        'tertiary-light',
        'white',
        'black',
        'neutral',
        'neutral-100',
        'neutral-200',
        'neutral-300',
        'neutral-400',
        'neutral-500',
        'blue',
        'blue-light',
        'green',
        'green-light',
        'yellow',
        'yellow-light',
        'red',
        'red-light',
        'unset',
      ],
      description: 'Color of the checked checkbox',
    },
  },
  args: {
    checked: false,
    disabled: false,
    size: 1.25,
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Default interactive checkbox
export const Default: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false);
      return { args, checked };
    },
    template: `
      <div>
        <Checkbox
          v-bind="args"
          v-model:checked="checked"
        >
          {{ checked ? 'Checked' : 'Unchecked' }}
        </Checkbox>
      </div>
    `,
  }),
};

// Checked state
export const Checked: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true);
      return { checked };
    },
    template: `
      <Checkbox v-model:checked="checked">
        I agree to the terms and conditions
      </Checkbox>
    `,
  }),
};

// Unchecked state
export const Unchecked: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `
      <Checkbox v-model:checked="checked">
        Subscribe to newsletter
      </Checkbox>
    `,
  }),
};

// Disabled unchecked
export const DisabledUnchecked: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <Checkbox :checked="false" :disabled="true">
        Disabled option
      </Checkbox>
    `,
  }),
};

// Disabled checked
export const DisabledChecked: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <Checkbox :checked="true" :disabled="true">
        Already selected (cannot change)
      </Checkbox>
    `,
  }),
};

// Different sizes
export const Sizes: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const sizes = [0.75, 1, 1.25, 1.5, 2, 2.5];
      const checkedStates = ref(sizes.map(() => true));
      return { sizes, checkedStates };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Checkbox
          v-for="(size, index) in sizes"
          :key="size"
          v-model:checked="checkedStates[index]"
          :size="size"
        >
          Size: {{ size }}
        </Checkbox>
      </div>
    `,
  }),
};

// Different colors
export const Colors: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const colors: ThemeColor[] = [
        'primary',
        'secondary',
        'tertiary',
        'blue',
        'green',
        'yellow',
        'red',
      ];
      const checkedStates = ref(colors.map(() => true));
      return { colors, checkedStates };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Checkbox
          v-for="(color, index) in colors"
          :key="color"
          v-model:checked="checkedStates[index]"
          :color="color"
        >
          <span style="text-transform: capitalize;">{{ color }}</span>
        </Checkbox>
      </div>
    `,
  }),
};

// Multiple checkboxes with labels
export const MultipleOptions: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const options = ref({
        notifications: true,
        newsletter: false,
        updates: true,
        marketing: false,
      });

      return { options };
    },
    template: `
      <div style="max-width: 400px;">
        <h3 style="margin-bottom: 1rem;">Preferences</h3>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <Checkbox v-model:checked="options.notifications">
            Email notifications
          </Checkbox>
          <Checkbox v-model:checked="options.newsletter">
            Weekly newsletter
          </Checkbox>
          <Checkbox v-model:checked="options.updates">
            Product updates
          </Checkbox>
          <Checkbox v-model:checked="options.marketing">
            Marketing emails
          </Checkbox>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background-color: #f8f9fa; border-radius: 0.5rem;">
          <strong>Selected:</strong>
          <pre style="margin-top: 0.5rem; font-size: 0.875rem;">{{ JSON.stringify(options, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
};

// Checkbox list (like a form)
export const FormExample: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const selectedLanguages = ref<string[]>(['javascript', 'typescript']);

      const languages = [
        { id: 'javascript', label: 'JavaScript' },
        { id: 'typescript', label: 'TypeScript' },
        { id: 'python', label: 'Python' },
        { id: 'java', label: 'Java' },
        { id: 'csharp', label: 'C#' },
        { id: 'go', label: 'Go' },
      ];

      const isChecked = (id: string) => selectedLanguages.value.includes(id);

      const toggleLanguage = (id: string) => {
        const index = selectedLanguages.value.indexOf(id);
        if (index > -1) {
          selectedLanguages.value.splice(index, 1);
        } else {
          selectedLanguages.value.push(id);
        }
      };

      return { languages, selectedLanguages, isChecked, toggleLanguage };
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-bottom: 1rem;">Select Your Programming Languages</h3>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div
            v-for="lang in languages"
            :key="lang.id"
            style="padding: 0.5rem; border-radius: 0.25rem; transition: background-color 0.2s;"
            :style="{ backgroundColor: isChecked(lang.id) ? '#f0f9ff' : 'transparent' }"
          >
            <Checkbox
              :checked="isChecked(lang.id)"
              @change="toggleLanguage(lang.id)"
            >
              {{ lang.label }}
            </Checkbox>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background-color: #f8f9fa; border-radius: 0.5rem;">
          <strong>Selected ({{ selectedLanguages.length }}):</strong>
          <div style="margin-top: 0.5rem; font-size: 0.875rem;">
            {{ selectedLanguages.length > 0 ? selectedLanguages.join(', ') : 'None' }}
          </div>
        </div>
      </div>
    `,
  }),
};

// With event handlers
export const WithEventHandlers: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false);
      const eventLog = ref<string[]>([]);

      const handleChange = (newValue: boolean) => {
        const timestamp = new Date().toLocaleTimeString();
        eventLog.value.unshift(
          `${timestamp}: Changed to ${newValue ? 'checked' : 'unchecked'}`,
        );

        // Keep only last 5 events
        if (eventLog.value.length > 5) {
          eventLog.value.pop();
        }

        console.log('Checkbox changed:', newValue);
      };

      return { checked, eventLog, handleChange };
    },
    template: `
      <div style="max-width: 600px;">
        <h3 style="margin-bottom: 1rem;">Checkbox with Event Handlers</h3>

        <div style="padding: 1rem; background-color: #f8f9fa; border-radius: 0.5rem;">
          <Checkbox v-model:checked="checked" @change="handleChange">
            <span style="font-weight: 500;">{{ checked ? 'I agree' : 'I do not agree' }}</span>
          </Checkbox>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; font-family: monospace; font-size: 0.875rem;">
          <h4 style="margin: 0 0 1rem 0; font-family: sans-serif;">Event Log:</h4>

          <div style="margin-bottom: 0.5rem;">
            <strong>Current State:</strong> {{ checked ? 'Checked ✓' : 'Unchecked ○' }}
          </div>

          <div v-if="eventLog.length > 0">
            <strong>Recent Changes:</strong>
            <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
              <li v-for="(event, index) in eventLog" :key="index" style="margin-bottom: 0.25rem;">
                {{ event }}
              </li>
            </ul>
          </div>
          <div v-else style="color: #999; font-style: italic;">
            No events yet. Click the checkbox above.
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `## How to Use in Your Vue 3 Project

This example shows how to handle checkbox events in your application.

\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@toteat-eng/design-system-vue'

const isAgreed = ref(false)

const handleChange = (newValue: boolean) => {
  console.log('Checkbox changed to:', newValue)
  // Update your app state, validate form, etc.
  if (newValue) {
    // User agreed
  } else {
    // User disagreed
  }
}
</script>

<template>
  <div>
    <Checkbox
      v-model:checked="isAgreed"
      @change="handleChange"
    />
    <span>I agree to the terms</span>
  </div>
</template>
\`\`\`

## Available Events

| Event | Payload | Description |
|-------|---------|-------------|
| \`@change\` | \`boolean\` | Emitted when checkbox state changes |
| \`v-model:checked / @update:checked\` | \`boolean\` | Two-way binding for checked state |

## Key Features

1. **Standalone Component**: Pure checkbox without built-in label
2. **Flexible Positioning**: Parent controls whether checkbox is on left or right of text
3. **Keyboard Support**: Enter and Space keys toggle the checkbox
4. **Accessible**: Proper ARIA attributes and focus states
5. **Customizable**: Size and color props for different use cases`,
      },
    },
  },
};

// Keyboard navigation demo
export const KeyboardNavigation: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const options = ref([
        { id: 1, label: 'Option 1', checked: false },
        { id: 2, label: 'Option 2', checked: false },
        { id: 3, label: 'Option 3', checked: false },
        { id: 4, label: 'Option 4', checked: false },
      ]);

      return { options };
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-bottom: 0.5rem;">Keyboard Navigation</h3>
        <p style="margin-bottom: 1rem; font-size: 0.875rem; color: #666;">
          Use <kbd style="padding: 0.125rem 0.375rem; background: #f0f0f0; border: 1px solid #ccc; border-radius: 3px;">Tab</kbd> to navigate between checkboxes,
          <kbd style="padding: 0.125rem 0.375rem; background: #f0f0f0; border: 1px solid #ccc; border-radius: 3px;">Space</kbd> or
          <kbd style="padding: 0.125rem 0.375rem; background: #f0f0f0; border: 1px solid #ccc; border-radius: 3px;">Enter</kbd> to toggle.
        </p>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div
            v-for="option in options"
            :key="option.id"
            style="padding: 0.75rem; border: 1px solid #e0e0e0; border-radius: 0.5rem;"
          >
            <Checkbox v-model:checked="option.checked">
              {{ option.label }}
            </Checkbox>
          </div>
        </div>
      </div>
    `,
  }),
};
