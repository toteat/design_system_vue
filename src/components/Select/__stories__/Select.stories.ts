import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Select from '../Select.vue';
import ImagePreview from '../../ImagePreview/ImagePreview.vue';
import type { MultiselectOption } from '@/types';

// Sample options
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

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    // Data props
    options: {
      control: 'object',
      description:
        'Array of options with value, label, and optional disabled property',
      table: { category: 'Data' },
    },
    modelValue: {
      control: 'text',
      description:
        'Selected value (v-model) - single value (string | number | null)',
      table: { category: 'Data' },
    },
    searchQuery: {
      control: false,
      description:
        'Search query text (v-model:searchQuery) - use ControlledSearchQuery story for demo',
      table: { category: 'Data' },
    },
    // Display props
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no selection (non-searchable mode)',
      table: { category: 'Display' },
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for search input (searchable mode)',
      table: { category: 'Display' },
    },
    size: {
      control: { type: 'select' },
      options: ['tiny', 'small', 'medium', 'large'],
      description: 'Size of the selector',
      table: { category: 'Display' },
    },
    // Behavior props
    disabled: {
      control: 'boolean',
      description: 'Whether the selector is disabled',
      table: { category: 'Behavior' },
    },
    searchable: {
      control: 'boolean',
      description: 'Whether search input is enabled (default: true)',
      table: { category: 'Behavior' },
    },
    // Form props
    id: {
      control: 'text',
      description: 'HTML id attribute for the input element',
      table: { category: 'Form' },
    },
    name: {
      control: 'text',
      description: 'HTML name attribute for form submission',
      table: { category: 'Form' },
    },
  },
  args: {
    options: fruitOptions,
    modelValue: null,
    placeholder: 'Select an option...',
    searchPlaceholder: 'Search...',
    disabled: false,
    searchable: true,
    size: 'medium',
    id: '',
    name: '',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Default interactive story
export const Default: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref<string | number | null>(null);
      return { args, selectedValue };
    },
    template: `
      <div style="max-width: 400px;">
        <Select
          v-bind="args"
          v-model="selectedValue"
        />
        <div style="margin-top: 1rem; padding: 1rem; background-color: #f8f9fa; border-radius: 0.5rem;">
          <strong>Selected Value:</strong>
          <pre style="margin-top: 0.5rem;">{{ selectedValue ?? 'null' }}</pre>
        </div>
      </div>
    `,
  }),
};

// With preselected value
export const WithPreselectedValue: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selectedValue = ref<string | number | null>('apple');
      return { selectedValue, options: fruitOptions };
    },
    template: `
      <div style="max-width: 400px;">
        <Select
          v-model="selectedValue"
          :options="options"
          placeholder="Select a fruit..."
          search-placeholder="Search fruits..."
        />
        <div style="margin-top: 1rem; padding: 0.75rem; background-color: #f8f9fa; border-radius: 0.5rem; font-size: 0.875rem;">
          <strong>Selected:</strong> {{ selectedValue ?? 'None' }}
        </div>
      </div>
    `,
  }),
};

// Size variants
export const AllSizes: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const tinyValue = ref<string | number | null>('apple');
      const smallValue = ref<string | number | null>('banana');
      const mediumValue = ref<string | number | null>('orange');
      const largeValue = ref<string | number | null>('grape');
      return {
        tinyValue,
        smallValue,
        mediumValue,
        largeValue,
        options: fruitOptions,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #666; font-size: 0.875rem;">Tiny</h3>
          <Select
            v-model="tinyValue"
            :options="options"
            size="tiny"
            placeholder="Select..."
          />
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #666; font-size: 0.875rem;">Small</h3>
          <Select
            v-model="smallValue"
            :options="options"
            size="small"
            placeholder="Select..."
          />
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #666; font-size: 0.875rem;">Medium (Default)</h3>
          <Select
            v-model="mediumValue"
            :options="options"
            size="medium"
            placeholder="Select..."
          />
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #666; font-size: 0.875rem;">Large</h3>
          <Select
            v-model="largeValue"
            :options="options"
            size="large"
            placeholder="Select..."
          />
        </div>
      </div>
    `,
  }),
};

// Disabled state
export const Disabled: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selectedValue = ref<string | number | null>('apple');
      return { selectedValue, options: fruitOptions };
    },
    template: `
      <div style="max-width: 400px;">
        <Select
          v-model="selectedValue"
          :options="options"
          :disabled="true"
          placeholder="Select a fruit..."
        />
      </div>
    `,
  }),
};

// With disabled options
export const WithDisabledOptions: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selectedValue = ref<string | number | null>(null);
      return { selectedValue, options: skillOptions };
    },
    template: `
      <div style="max-width: 400px;">
        <h3 style="margin-bottom: 1rem;">Skills Selection (Some Disabled)</h3>
        <Select
          v-model="selectedValue"
          :options="options"
          placeholder="Select your primary skill..."
        />
        <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
          Java and C# options are disabled in this example.
        </p>
      </div>
    `,
  }),
};

// Non-searchable mode
export const NonSearchable: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selectedValue = ref<string | number | null>(null);
      return { selectedValue, options: fruitOptions };
    },
    template: `
      <div style="max-width: 400px;">
        <h3 style="margin-bottom: 1rem;">Non-Searchable (Like Native Select)</h3>
        <Select
          v-model="selectedValue"
          :options="options"
          :searchable="false"
          placeholder="Select a fruit..."
        />
        <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
          Set <code>:searchable="false"</code> to disable the search input.
        </p>
      </div>
    `,
  }),
};

// Controlled search query
export const ControlledSearchQuery: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selectedValue = ref<string | number | null>(null);
      const searchText = ref('');

      const setSearch = (text: string) => {
        searchText.value = text;
      };

      return { selectedValue, searchText, options: fruitOptions, setSearch };
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-bottom: 1rem;">Controlled Search Query</h3>

        <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem;">
          <button
            @click="setSearch('apple')"
            style="padding: 0.5rem 1rem; background-color: #3b82f6; color: white; border: none; border-radius: 0.375rem; cursor: pointer;"
          >
            Search "apple"
          </button>
          <button
            @click="setSearch('berry')"
            style="padding: 0.5rem 1rem; background-color: #3b82f6; color: white; border: none; border-radius: 0.375rem; cursor: pointer;"
          >
            Search "berry"
          </button>
          <button
            @click="setSearch('')"
            style="padding: 0.5rem 1rem; background-color: #6b7280; color: white; border: none; border-radius: 0.375rem; cursor: pointer;"
          >
            Clear search
          </button>
        </div>

        <Select
          v-model="selectedValue"
          v-model:searchQuery="searchText"
          :options="options"
          placeholder="Select a fruit..."
        />

        <div style="margin-top: 1rem; padding: 1rem; background-color: #f8f9fa; border-radius: 0.5rem;">
          <strong>Search Text:</strong> {{ searchText || '(empty)' }}<br>
          <strong>Selected Value:</strong> {{ selectedValue ?? 'null' }}
        </div>
      </div>
    `,
  }),
};

// With event handlers
export const WithEventHandlers: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selectedValue = ref<string | number | null>(null);
      const eventLog = ref<string[]>([]);

      const addEvent = (eventName: string, data?: unknown) => {
        const timestamp = new Date().toLocaleTimeString();
        const message = data
          ? `${timestamp}: ${eventName} - ${JSON.stringify(data)}`
          : `${timestamp}: ${eventName}`;

        eventLog.value.unshift(message);
        if (eventLog.value.length > 10) {
          eventLog.value.pop();
        }
      };

      const handleChange = (value: string | number | null) => {
        addEvent('change', value);
      };

      const handleOpen = () => {
        addEvent('open');
      };

      const handleClose = () => {
        addEvent('close');
      };

      const handleSelect = (option: MultiselectOption) => {
        addEvent('select', { value: option.value, label: option.label });
      };

      return {
        selectedValue,
        eventLog,
        options: fruitOptions,
        handleChange,
        handleOpen,
        handleClose,
        handleSelect,
      };
    },
    template: `
      <div style="max-width: 600px;">
        <h3 style="margin-bottom: 1rem;">Select with Event Handlers</h3>

        <Select
          v-model="selectedValue"
          :options="options"
          placeholder="Select a fruit..."
          @change="handleChange"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
        />

        <div style="margin-top: 1.5rem; padding: 1rem; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0;">Available Events:</h4>
          <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.875rem; color: #666;">
            <li><code>@change</code> - Emitted when selection changes</li>
            <li><code>@open</code> - Emitted when dropdown opens</li>
            <li><code>@close</code> - Emitted when dropdown closes</li>
            <li><code>@select</code> - Emitted when an option is selected</li>
            <li><code>v-model</code> - Two-way binding for selected value</li>
            <li><code>v-model:searchQuery</code> - Two-way binding for search text</li>
          </ul>
        </div>

        <div style="margin-top: 1rem; padding: 1rem; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; font-family: monospace; font-size: 0.875rem;">
          <h4 style="margin: 0 0 1rem 0; font-family: sans-serif;">Event Log:</h4>
          <div v-if="eventLog.length > 0">
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li v-for="(event, index) in eventLog" :key="index">{{ event }}</li>
            </ul>
          </div>
          <div v-else style="color: #999; font-style: italic;">
            No events yet. Interact with the selector above.
          </div>
        </div>
      </div>
    `,
  }),
};

// Form integration
export const FormIntegration: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const formData = ref({
        country: null as string | number | null,
        primarySkill: null as string | number | null,
      });
      const submitted = ref(false);

      const handleSubmit = () => {
        submitted.value = true;
        setTimeout(() => {
          submitted.value = false;
        }, 3000);
      };

      return {
        formData,
        submitted,
        handleSubmit,
        countryOptions,
        skillOptions,
      };
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-bottom: 1.5rem;">Form with Select</h3>

        <form @submit.prevent="handleSubmit" style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Country</label>
            <Select
              v-model="formData.country"
              :options="countryOptions"
              placeholder="Select your country..."
            />
          </div>

          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Primary Skill</label>
            <Select
              v-model="formData.primarySkill"
              :options="skillOptions"
              placeholder="Select your primary skill..."
            />
          </div>

          <button
            type="submit"
            style="padding: 0.75rem 1.5rem; background-color: #3b82f6; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600;"
          >
            Submit
          </button>
        </form>

        <div
          v-if="submitted"
          style="margin-top: 1.5rem; padding: 1rem; background-color: #d1fae5; border: 1px solid #10b981; border-radius: 0.5rem; color: #065f46;"
        >
          <strong>Form submitted!</strong>
          <pre style="margin-top: 0.5rem;">{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
};

// When to use Select vs Multiselect
export const WhenToUse: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selectorValue = ref<string | number | null>(null);
      return { selectorValue, options: fruitOptions };
    },
    template: `
      <div style="max-width: 600px;">
        <h3 style="margin-bottom: 1rem;">When to Use Select</h3>

        <div style="margin-bottom: 2rem;">
          <Select
            v-model="selectorValue"
            :options="options"
            placeholder="Select a fruit..."
          />
        </div>

        <div style="padding: 1rem; background-color: #dbeafe; border: 1px solid #3b82f6; border-radius: 0.5rem;">
          <strong>Use Select when:</strong>
          <ul style="margin: 0.5rem 0 0 1.5rem; font-size: 0.875rem;">
            <li>You need <strong>single selection only</strong> (like a native &lt;select&gt;)</li>
            <li>You want a <strong>searchable dropdown</strong> for better UX</li>
            <li>You don't need to show selected items as tags</li>
            <li>You want a <strong>lightweight component</strong> without checkbox dependencies</li>
          </ul>
        </div>

        <div style="margin-top: 1rem; padding: 1rem; background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 0.5rem;">
          <strong>Use Multiselect when:</strong>
          <ul style="margin: 0.5rem 0 0 1.5rem; font-size: 0.875rem;">
            <li>You need <strong>multiple selections</strong></li>
            <li>You want <strong>checkboxes</strong> in options</li>
            <li>You need to <strong>display selected items as tags</strong></li>
            <li>You need <strong>max selections limit</strong></li>
          </ul>
        </div>

        <div style="margin-top: 1rem; padding: 1rem; background-color: #f8f9fa; border-radius: 0.5rem;">
          <strong>Shared Features:</strong>
          <ul style="margin: 0.5rem 0 0 1.5rem; font-size: 0.875rem;">
            <li>Same <code>useSelector</code> composable for consistent behavior</li>
            <li>Absolute-positioned dropdowns (doesn't push other DOM elements)</li>
            <li>Search functionality with <code>v-model:searchQuery</code></li>
            <li>Same size variants (tiny, small, medium, large)</li>
            <li>Same keyboard navigation and accessibility</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

// Empty state
export const EmptyState: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selectedValue = ref<string | number | null>(null);
      return { selectedValue };
    },
    template: `
      <div style="max-width: 400px;">
        <Select
          v-model="selectedValue"
          :options="[]"
          placeholder="No options available..."
        />
      </div>
    `,
  }),
};

// User options with images for the WithRoundedImages story
interface UserOption extends MultiselectOption {
  avatar: string;
  sublabel?: string;
}

const userOptions: UserOption[] = [
  {
    value: 'user1',
    label: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=john',
    sublabel: 'Admin',
  },
  {
    value: 'user2',
    label: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?u=jane',
    sublabel: 'Developer',
  },
  {
    value: 'user3',
    label: 'Bob Johnson',
    avatar: 'https://i.pravatar.cc/150?u=bob',
    sublabel: 'Designer',
  },
  {
    value: 'user4',
    label: 'Alice Brown',
    avatar: 'https://i.pravatar.cc/150?u=alice',
    sublabel: 'Manager',
  },
  {
    value: 'user5',
    label: 'Charlie Wilson',
    avatar: 'https://i.pravatar.cc/150?u=charlie',
    sublabel: 'Developer',
  },
  {
    value: 'user6',
    label: 'Diana Miller',
    avatar: 'https://i.pravatar.cc/150?u=diana',
    sublabel: 'QA Engineer',
  },
];

const userOptionsSimple: UserOption[] = [
  {
    value: 'user1',
    label: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=john',
  },
  {
    value: 'user2',
    label: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?u=jane',
  },
  {
    value: 'user3',
    label: 'Bob Johnson',
    avatar: 'https://i.pravatar.cc/150?u=bob',
  },
  {
    value: 'user4',
    label: 'Alice Brown',
    avatar: 'https://i.pravatar.cc/150?u=alice',
  },
  {
    value: 'user5',
    label: 'Charlie Wilson',
    avatar: 'https://i.pravatar.cc/150?u=charlie',
  },
  {
    value: 'user6',
    label: 'Diana Miller',
    avatar: 'https://i.pravatar.cc/150?u=diana',
  },
];

// With rounded images in options (simple - no sublabel)
export const WithRoundedImages: Story = {
  args: {
    options: userOptionsSimple,
    placeholder: 'Search for a user...',
    searchPlaceholder: 'Type a name...',
  },
  render: (args) => ({
    components: { Select, ImagePreview },
    setup() {
      const selectedValue = ref<string | number | null>(null);
      return { args, selectedValue };
    },
    template: `
      <div style="max-width: 400px;">
        <h3 style="margin-bottom: 1rem;">User Selection with Avatars</h3>
        <Select
          v-bind="args"
          v-model="selectedValue"
        >
          <template #option="{ option }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <ImagePreview
                :image-src="option.avatar"
                :width="32"
                :height="32"
                :border-radius="16"
                :alt="option.label"
              />
              <span style="font-weight: 500;">{{ option.label }}</span>
            </div>
          </template>
        </Select>
        <div style="margin-top: 1rem; padding: 0.75rem; background-color: #f8f9fa; border-radius: 0.5rem; font-size: 0.875rem;">
          <strong>Selected:</strong> {{ selectedValue ?? 'None' }}
        </div>
      </div>
    `,
  }),
};

// With rounded images and sublabel
export const WithRoundedImagesAndSublabel: Story = {
  args: {
    options: userOptions,
    placeholder: 'Search for a user...',
    searchPlaceholder: 'Type a name...',
  },
  render: (args) => ({
    components: { Select, ImagePreview },
    setup() {
      const selectedValue = ref<string | number | null>(null);
      return { args, selectedValue };
    },
    template: `
      <div style="max-width: 400px;">
        <h3 style="margin-bottom: 1rem;">User Selection with Avatars and Roles</h3>
        <Select
          v-bind="args"
          v-model="selectedValue"
        >
          <template #option="{ option }">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <ImagePreview
                :image-src="option.avatar"
                :width="32"
                :height="32"
                :border-radius="16"
                :alt="option.label"
              />
              <div style="display: flex; flex-direction: column;">
                <span style="font-weight: 500;">{{ option.label }}</span>
                <span style="font-size: 0.75rem; color: #6b7280;">{{ option.sublabel }}</span>
              </div>
            </div>
          </template>
        </Select>
        <div style="margin-top: 1rem; padding: 0.75rem; background-color: #f8f9fa; border-radius: 0.5rem; font-size: 0.875rem;">
          <strong>Selected:</strong> {{ selectedValue ?? 'None' }}
        </div>
      </div>
    `,
  }),
};
