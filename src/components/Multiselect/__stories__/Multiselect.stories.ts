import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Multiselect from '../Multiselect.vue';
import type { MultiselectOption } from '@/types';

// Sample options for different scenarios
const fruitOptions: MultiselectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'watermelon', label: 'Watermelon' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'kiwi', label: 'Kiwi' },
];

const countryOptions: MultiselectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
];

const skillOptions: MultiselectOption[] = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java', disabled: true },
  { value: 'csharp', label: 'C#', disabled: true },
  { value: 'go', label: 'Go' },
];

const meta: Meta<typeof Multiselect> = {
  title: 'Components/Multiselect',
  component: Multiselect,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description:
        'Array of options with value, label, and optional disabled property',
    },
    modelValue: {
      control: 'object',
      description: 'Array of selected values (v-model)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no items are selected',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the multiselect is disabled',
    },
    maxSelections: {
      control: 'number',
      description: 'Maximum number of selections allowed (optional)',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether the multiselect has a search input',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show the clear all button',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Whether to close dropdown after each selection',
    },
    size: {
      control: { type: 'select' },
      options: ['tiny', 'small', 'medium', 'large'],
      description: 'Size of the multiselect component',
    },
  },
  args: {
    options: fruitOptions,
    placeholder: 'Select options...',
    disabled: false,
    searchable: false,
    clearable: true,
    closeOnSelect: false,
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof Multiselect>;

// Default interactive story
export const Default: Story = {
  render: (args) => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>([]);
      return { args, selectedValues };
    },
    template: `
      <div style="max-width: 500px;">
        <Multiselect
          v-bind="args"
          v-model="selectedValues"
        />
        <div style="margin-top: 1rem; padding: 1rem; background-color: #f8f9fa; border-radius: 0.5rem;">
          <strong>Selected Values:</strong>
          <pre style="margin-top: 0.5rem;">{{ selectedValues.length > 0 ? JSON.stringify(selectedValues, null, 2) : 'None' }}</pre>
        </div>
      </div>
    `,
  }),
};

// Size variants
export const SizeTiny: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>(['apple', 'banana']);
      return { selectedValues, options: fruitOptions };
    },
    template: `
      <div style="max-width: 500px;">
        <Multiselect
          :options="options"
          v-model="selectedValues"
          size="tiny"
          placeholder="Select fruits..."
        />
      </div>
    `,
  }),
};

export const SizeSmall: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>(['apple', 'banana']);
      return { selectedValues, options: fruitOptions };
    },
    template: `
      <div style="max-width: 500px;">
        <Multiselect
          :options="options"
          v-model="selectedValues"
          size="small"
          placeholder="Select fruits..."
        />
      </div>
    `,
  }),
};

export const SizeMedium: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>(['apple', 'banana']);
      return { selectedValues, options: fruitOptions };
    },
    template: `
      <div style="max-width: 500px;">
        <Multiselect
          :options="options"
          v-model="selectedValues"
          size="medium"
          placeholder="Select fruits..."
        />
      </div>
    `,
  }),
};

export const SizeLarge: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>(['apple', 'banana']);
      return { selectedValues, options: fruitOptions };
    },
    template: `
      <div style="max-width: 500px;">
        <Multiselect
          :options="options"
          v-model="selectedValues"
          size="large"
          placeholder="Select fruits..."
        />
      </div>
    `,
  }),
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const tinyValues = ref<(string | number)[]>(['apple']);
      const smallValues = ref<(string | number)[]>(['apple']);
      const mediumValues = ref<(string | number)[]>(['apple']);
      const largeValues = ref<(string | number)[]>(['apple']);
      return {
        tinyValues,
        smallValues,
        mediumValues,
        largeValues,
        options: fruitOptions,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #666; font-size: 0.875rem;">Tiny</h3>
          <Multiselect
            :options="options"
            v-model="tinyValues"
            size="tiny"
            placeholder="Select fruits..."
          />
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #666; font-size: 0.875rem;">Small</h3>
          <Multiselect
            :options="options"
            v-model="smallValues"
            size="small"
            placeholder="Select fruits..."
          />
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #666; font-size: 0.875rem;">Medium</h3>
          <Multiselect
            :options="options"
            v-model="mediumValues"
            size="medium"
            placeholder="Select fruits..."
          />
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #666; font-size: 0.875rem;">Large</h3>
          <Multiselect
            :options="options"
            v-model="largeValues"
            size="large"
            placeholder="Select fruits..."
          />
        </div>
      </div>
    `,
  }),
};

// With max selections limit
export const WithMaxSelections: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>(['apple', 'banana']);
      return { selectedValues, options: fruitOptions };
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-bottom: 1rem;">Max 3 Selections</h3>
        <Multiselect
          :options="options"
          v-model="selectedValues"
          :maxSelections="3"
          placeholder="Select up to 3 fruits..."
        />
        <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
          Try selecting more than 3 items - the options will become disabled when the limit is reached.
        </p>
      </div>
    `,
  }),
};

// Disabled options
export const WithDisabledOptions: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>(['js', 'vue']);
      return { selectedValues, options: skillOptions };
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-bottom: 1rem;">Skills Selection (Some Disabled)</h3>
        <Multiselect
          :options="options"
          v-model="selectedValues"
          placeholder="Select your skills..."
        />
        <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
          Java and C# options are disabled in this example.
        </p>
      </div>
    `,
  }),
};

// Disabled state
export const Disabled: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>([
        'apple',
        'banana',
        'orange',
      ]);
      return { selectedValues, options: fruitOptions };
    },
    template: `
      <div style="max-width: 500px;">
        <Multiselect
          :options="options"
          v-model="selectedValues"
          :disabled="true"
          placeholder="Select fruits..."
        />
      </div>
    `,
  }),
};

// With search enabled
export const WithSearch: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>([]);
      return { selectedValues, options: fruitOptions };
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-bottom: 1rem;">With Search Enabled</h3>
        <Multiselect
          :options="options"
          v-model="selectedValues"
          :searchable="true"
          placeholder="Select fruits..."
          searchPlaceholder="Type to search..."
        />
        <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
          Search is disabled by default. Set <code>:searchable="true"</code> to enable it.
        </p>
      </div>
    `,
  }),
};

// Without clear button
export const WithoutClearButton: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>(['apple', 'banana']);
      return { selectedValues, options: fruitOptions };
    },
    template: `
      <div style="max-width: 500px;">
        <Multiselect
          :options="options"
          v-model="selectedValues"
          :clearable="false"
          placeholder="Select fruits..."
        />
      </div>
    `,
  }),
};

// Close on select
export const CloseOnSelect: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>([]);
      return { selectedValues, options: fruitOptions };
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-bottom: 1rem;">Closes After Each Selection</h3>
        <Multiselect
          :options="options"
          v-model="selectedValues"
          :closeOnSelect="true"
          placeholder="Select fruits..."
        />
        <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
          The dropdown will close automatically after selecting an item.
        </p>
      </div>
    `,
  }),
};

// Pre-selected values
export const WithPreselectedValues: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>([
        'apple',
        'banana',
        'orange',
        'grape',
      ]);
      return { selectedValues, options: fruitOptions };
    },
    template: `
      <div style="max-width: 500px;">
        <Multiselect
          :options="options"
          v-model="selectedValues"
          placeholder="Select fruits..."
        />
      </div>
    `,
  }),
};

// Custom placeholders
export const CustomPlaceholders: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>([]);
      return { selectedValues, options: countryOptions };
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-bottom: 1rem;">Custom Placeholder Texts</h3>
        <Multiselect
          :options="options"
          v-model="selectedValues"
          placeholder="Choose your destinations..."
          searchPlaceholder="Type to filter countries..."
        />
        <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
          Both the main placeholder and search placeholder can be customized.
        </p>
      </div>
    `,
  }),
};

// Empty state
export const EmptyState: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>([]);
      return { selectedValues, options: [] };
    },
    template: `
      <div style="max-width: 500px;">
        <Multiselect
          :options="options"
          v-model="selectedValues"
          placeholder="No options available..."
        />
      </div>
    `,
  }),
};

// With event handlers
export const WithEventHandlers: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const selectedValues = ref<(string | number)[]>(['apple']);
      const eventLog = ref<string[]>([]);

      const addEvent = (eventName: string, data?: unknown) => {
        const timestamp = new Date().toLocaleTimeString();
        const message = data
          ? `${timestamp}: ${eventName} - ${JSON.stringify(data)}`
          : `${timestamp}: ${eventName}`;

        eventLog.value.unshift(message);

        // Keep only last 10 events
        if (eventLog.value.length > 10) {
          eventLog.value.pop();
        }

        console.log(eventName, data);
      };

      const handleChange = (values: (string | number)[]) => {
        addEvent('change', values);
      };

      const handleOpen = () => {
        addEvent('open');
      };

      const handleClose = () => {
        addEvent('close');
      };

      const handleClear = () => {
        addEvent('clear');
      };

      const handleOptionSelect = (option: MultiselectOption) => {
        addEvent('option-select', { value: option.value, label: option.label });
      };

      const handleOptionDeselect = (option: MultiselectOption) => {
        addEvent('option-deselect', {
          value: option.value,
          label: option.label,
        });
      };

      const handleRemoveTag = (value: string | number) => {
        addEvent('remove-tag', value);
      };

      return {
        selectedValues,
        eventLog,
        options: fruitOptions,
        handleChange,
        handleOpen,
        handleClose,
        handleClear,
        handleOptionSelect,
        handleOptionDeselect,
        handleRemoveTag,
      };
    },
    template: `
      <div style="max-width: 700px;">
        <h3 style="margin-bottom: 1rem;">Multiselect with All Event Handlers</h3>
        <p style="margin-bottom: 1rem; color: #666; font-size: 0.875rem;">
          This example demonstrates all available events that parent components can listen to.
        </p>

        <Multiselect
          :options="options"
          v-model="selectedValues"
          placeholder="Select fruits..."
          @change="handleChange"
          @open="handleOpen"
          @close="handleClose"
          @clear="handleClear"
          @option-select="handleOptionSelect"
          @option-deselect="handleOptionDeselect"
          @remove-tag="handleRemoveTag"
        />

        <div style="margin-top: 2rem; padding: 1rem; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0;">Available Events:</h4>
          <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.875rem; color: #666;">
            <li><code style="background: #e9ecef; padding: 0.125rem 0.25rem; border-radius: 3px;">@change</code> - Emitted when selection changes (passes array of values)</li>
            <li><code style="background: #e9ecef; padding: 0.125rem 0.25rem; border-radius: 3px;">@open</code> - Emitted when dropdown opens</li>
            <li><code style="background: #e9ecef; padding: 0.125rem 0.25rem; border-radius: 3px;">@close</code> - Emitted when dropdown closes</li>
            <li><code style="background: #e9ecef; padding: 0.125rem 0.25rem; border-radius: 3px;">@clear</code> - Emitted when clear all button is clicked</li>
            <li><code style="background: #e9ecef; padding: 0.125rem 0.25rem; border-radius: 3px;">@option-select</code> - Emitted when an option is selected (passes option object)</li>
            <li><code style="background: #e9ecef; padding: 0.125rem 0.25rem; border-radius: 3px;">@option-deselect</code> - Emitted when an option is deselected (passes option object)</li>
            <li><code style="background: #e9ecef; padding: 0.125rem 0.25rem; border-radius: 3px;">@remove-tag</code> - Emitted when a tag is removed (passes value)</li>
            <li><code style="background: #e9ecef; padding: 0.125rem 0.25rem; border-radius: 3px;">v-model</code> - Two-way binding for selected values</li>
          </ul>
        </div>

        <div style="margin-top: 1.5rem; padding: 1rem; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; font-family: monospace; font-size: 0.875rem;">
          <h4 style="margin: 0 0 1rem 0; font-family: sans-serif;">Event Log (Real-time):</h4>

          <div style="margin-bottom: 0.5rem;">
            <strong>Current Selection:</strong> {{ selectedValues.length > 0 ? selectedValues.join(', ') : 'None' }}
          </div>

          <div v-if="eventLog.length > 0">
            <strong>Recent Events:</strong>
            <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem; max-height: 200px; overflow-y: auto;">
              <li v-for="(event, index) in eventLog" :key="index" style="margin-bottom: 0.25rem;">
                {{ event }}
              </li>
            </ul>
          </div>
          <div v-else style="color: #999; font-style: italic;">
            No events yet. Try interacting with the multiselect above.
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `## How to Use in Your Vue 3 Project

This example shows all available events for tracking user interactions with the Multiselect component.

\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'
import { Multiselect } from '@toteat-eng/design-system-vue'
import type { MultiselectOption } from '@toteat-eng/design-system-vue'

const selectedValues = ref<(string | number)[]>([])

// Event handlers
const handleChange = (values: (string | number)[]) => {
  console.log('Selection changed to:', values)
  // Update your app state, call API, etc.
}

const handleOpen = () => {
  console.log('Dropdown opened')
  // Track analytics, load remote data, etc.
}

const handleClose = () => {
  console.log('Dropdown closed')
  // Save state, trigger validation, etc.
}

const handleClear = () => {
  console.log('All selections cleared')
  // Reset form, show confirmation, etc.
}

const handleOptionSelect = (option: MultiselectOption) => {
  console.log('Option selected:', option)
  // Track individual selection, show tooltip, etc.
}

const handleOptionDeselect = (option: MultiselectOption) => {
  console.log('Option deselected:', option)
  // Track individual deselection, update UI, etc.
}

const handleRemoveTag = (value: string | number) => {
  console.log('Tag removed:', value)
  // Track tag removal, show animation, etc.
}
</script>

<template>
  <Multiselect
    :options="options"
    v-model="selectedValues"
    placeholder="Select your options..."
    :maxSelections="5"
    @change="handleChange"
    @open="handleOpen"
    @close="handleClose"
    @clear="handleClear"
    @option-select="handleOptionSelect"
    @option-deselect="handleOptionDeselect"
    @remove-tag="handleRemoveTag"
  />
</template>
\`\`\`

## Available Events

| Event | Payload | Description |
|-------|---------|-------------|
| \`@change\` | \`(string \\| number)[]\` | Emitted when selection changes |
| \`v-model / @update:modelValue\` | \`(string \\| number)[]\` | Two-way binding for selected values |
| \`@open\` | None | Emitted when dropdown opens |
| \`@close\` | None | Emitted when dropdown closes |
| \`@clear\` | None | Emitted when clear all button is clicked |
| \`@option-select\` | \`MultiselectOption\` | Emitted when an option is selected |
| \`@option-deselect\` | \`MultiselectOption\` | Emitted when an option is deselected |
| \`@remove-tag\` | \`string \\| number\` | Emitted when a tag is removed by clicking X |

## Key Features for Library Consumers

1. **Event Granularity**: All user interactions emit specific events for precise tracking
2. **Click Outside**: Automatically closes dropdown when clicking outside
3. **Keyboard Support**: Enter, Space, and Escape keys work as expected
4. **Accessibility**: Proper ARIA labels and tabindex for screen readers
5. **Event Bubbling**: All events can be caught by parent components
6. **Type Safety**: Full TypeScript support with proper types exported`,
      },
    },
  },
};

// Multiple instances
export const MultipleInstances: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const fruits = ref<(string | number)[]>(['apple', 'banana']);
      const countries = ref<(string | number)[]>(['us', 'uk']);
      const skills = ref<(string | number)[]>(['js', 'vue']);

      return {
        fruits,
        countries,
        skills,
        fruitOptions,
        countryOptions,
        skillOptions,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
        <div>
          <h3 style="margin-bottom: 0.5rem;">Favorite Fruits</h3>
          <Multiselect
            :options="fruitOptions"
            v-model="fruits"
            placeholder="Select your favorite fruits..."
            :maxSelections="3"
          />
        </div>

        <div>
          <h3 style="margin-bottom: 0.5rem;">Countries Visited</h3>
          <Multiselect
            :options="countryOptions"
            v-model="countries"
            placeholder="Select countries you've visited..."
          />
        </div>

        <div>
          <h3 style="margin-bottom: 0.5rem;">Programming Skills</h3>
          <Multiselect
            :options="skillOptions"
            v-model="skills"
            placeholder="Select your skills..."
          />
        </div>

        <div style="padding: 1rem; background-color: #f8f9fa; border-radius: 0.5rem;">
          <h4 style="margin-top: 0;">Selected Values:</h4>
          <div><strong>Fruits:</strong> {{ fruits.join(', ') || 'None' }}</div>
          <div><strong>Countries:</strong> {{ countries.join(', ') || 'None' }}</div>
          <div><strong>Skills:</strong> {{ skills.join(', ') || 'None' }}</div>
        </div>
      </div>
    `,
  }),
};

// Form integration example
export const FormIntegration: Story = {
  render: () => ({
    components: { Multiselect },
    setup() {
      const formData = ref({
        name: '',
        fruits: [] as (string | number)[],
        countries: [] as (string | number)[],
        skills: [] as (string | number)[],
      });

      const submitted = ref(false);
      const submittedData = ref<typeof formData.value | null>(null);

      const handleSubmit = () => {
        submittedData.value = { ...formData.value };
        submitted.value = true;

        setTimeout(() => {
          submitted.value = false;
        }, 3000);
      };

      const resetForm = () => {
        formData.value = {
          name: '',
          fruits: [],
          countries: [],
          skills: [],
        };
        submittedData.value = null;
      };

      return {
        formData,
        submitted,
        submittedData,
        fruitOptions,
        countryOptions,
        skillOptions,
        handleSubmit,
        resetForm,
      };
    },
    template: `
      <div style="max-width: 600px;">
        <h3 style="margin-bottom: 1.5rem;">User Profile Form</h3>

        <form @submit.prevent="handleSubmit" style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Name</label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="Enter your name..."
              style="width: 100%; padding: 0.5rem; border: 1.5px solid #d1d5db; border-radius: 0.5rem; font-size: 1rem;"
              required
            />
          </div>

          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Favorite Fruits (Max 5)</label>
            <Multiselect
              :options="fruitOptions"
              v-model="formData.fruits"
              placeholder="Select your favorite fruits..."
              :maxSelections="5"
            />
          </div>

          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Countries Visited</label>
            <Multiselect
              :options="countryOptions"
              v-model="formData.countries"
              placeholder="Select countries..."
            />
          </div>

          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Programming Skills</label>
            <Multiselect
              :options="skillOptions"
              v-model="formData.skills"
              placeholder="Select your skills..."
            />
          </div>

          <div style="display: flex; gap: 1rem;">
            <button
              type="submit"
              style="padding: 0.75rem 1.5rem; background-color: #3b82f6; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600;"
            >
              Submit Form
            </button>
            <button
              type="button"
              @click="resetForm"
              style="padding: 0.75rem 1.5rem; background-color: #6b7280; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600;"
            >
              Reset
            </button>
          </div>
        </form>

        <div
          v-if="submitted"
          style="margin-top: 1.5rem; padding: 1rem; background-color: #d1fae5; border: 1px solid #10b981; border-radius: 0.5rem; color: #065f46;"
        >
          <strong>Form submitted successfully!</strong>
        </div>

        <div
          v-if="submittedData"
          style="margin-top: 1.5rem; padding: 1rem; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 0.5rem;"
        >
          <h4 style="margin-top: 0;">Submitted Data:</h4>
          <pre style="margin: 0; white-space: pre-wrap; word-wrap: break-word;">{{ JSON.stringify(submittedData, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
};
