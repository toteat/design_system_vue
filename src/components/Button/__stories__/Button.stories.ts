import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from '../Button.vue';
import type { IconNames } from '@/components/Icon/icons';
import * as Icons from '@/components/Icon/icons';

// Dynamically derive available icon names from the icons module
const availableIconNames = Object.keys(Icons)
  .filter((key) => key.startsWith('ICON_'))
  .map((key) =>
    key
      .replace(/^ICON_/, '')
      .replace(/_/g, '-')
      .toLowerCase(),
  ) as IconNames[];

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'text'],
      description: 'The visual style of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['tiny', 'small', 'medium', 'large'],
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
    iconName: {
      control: { type: 'select' },
      options: availableIconNames,
      description: 'Name of the icon to display',
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
    onlyIcon: {
      control: 'boolean',
      description: 'Whether the button is only an icon',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The HTML button type attribute',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'The position of the icon relative to the text',
    },
  },
  args: {
    // Default values matching the component props
    variant: 'primary',
    size: 'medium',
    disabled: false,
    isFull: false,
    loading: false,
    text: 'Loading...',
    selected: false,
    type: 'button',
    iconPosition: 'right',
    onlyIcon: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { ...meta.args, iconName: 'home-outline' },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args" />`,
  }),
};

// Types
export const Primary: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Button variant="primary" text="Primary Button" />
        <Button variant="primary" text="Primary Button" iconName="home-outline" />
      </div>
    `,
  }),
};

export const Secondary: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Button variant="secondary" text="Secondary Button" />
        <Button variant="secondary" text="Secondary Button" iconName="home-outline" />
      </div>
    `,
  }),
};

export const Outline: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Button variant="outline" text="Outline Button" />
        <Button variant="outline" text="Outline Button" iconName="home-outline" />
      </div>
    `,
  }),
};

export const TextButton: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Button variant="text" text="Text Button" />
        <Button variant="text" text="Text Button" iconName="home-outline" />
      </div>
    `,
  }),
};

export const IconButton: Story = {
  args: {
    variant: 'primary',
    iconName: 'home-outline',
    onlyIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in icon-only mode using the onlyIcon prop.',
      },
    },
  },
};

// Sizes
export const SizeTiny: Story = {
  args: {
    variant: 'primary',
    size: 'tiny',
    text: 'Tiny Button',
  },
};

export const SizeSmall: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    text: 'Small Button',
  },
};

export const SizeMedium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    text: 'Medium Button',
  },
};

export const SizeLarge: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    text: 'Large Button',
  },
};

// States
export const Disabled: Story = {
  args: {
    variant: 'primary',
    text: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    text: 'Loading...',
    loading: true,
  },
};

export const Selected: Story = {
  args: {
    variant: 'primary',
    text: 'Selected Button',
    selected: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    text: 'Full Width Button',
    isFull: true,
  },
};

// All sizes with loading spinner and label
export const AllSizesWithSpinner: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1.5rem; align-items: flex-end; flex-wrap: wrap;">
        <div v-for="size in ['tiny', 'small', 'medium', 'large']" :key="size" style="display: flex; flex-direction: column; align-items: center;">
          <Button :size="size" loading :text="size.charAt(0).toUpperCase() + size.slice(1)" />
          <span style="margin-top: 0.5rem; font-size: 0.875rem; color: #888;">{{ size }}</span>
        </div>
      </div>
    `,
  }),
};

// All icon-only buttons for all icons and all variants
export const AllIconButtons: Story = {
  render: () => ({
    components: { Button },
    data() {
      return {
        icons: availableIconNames,
        variants: ['primary', 'secondary', 'outline', 'text'],
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div v-for="icon in icons" :key="icon">
          <div style="display: flex; gap: 1rem; align-items: center;">
            <Button
              v-for="variant in variants"
              :key="variant + '-' + icon"
              :variant="variant"
              :iconName="icon"
              :onlyIcon="true"
              :aria-label="icon + ' ' + variant"
            />
            <span style="font-size: 0.875rem; color: #888; min-width: 120px;">{{ icon }}</span>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'All possible icon-only buttons for every icon and every button variant.',
      },
    },
  },
};

// Buttons with text and icon for all variants
export const AllVariantsWithTextAndIcon: Story = {
  render: () => ({
    components: { Button },
    data() {
      return {
        variants: ['primary', 'secondary', 'outline', 'text'],
        icon: 'home-outline',
      };
    },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <Button
          v-for="variant in variants"
          :key="variant"
          :variant="variant"
          :iconName="icon"
          :text="variant.charAt(0).toUpperCase() + variant.slice(1) + ' Button'"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All button variants with both text and an icon.',
      },
    },
  },
};

// Button with click event handler
export const WithClickEventHandler: Story = {
  render: () => ({
    components: { Button },
    data() {
      return {
        clickCount: 0,
        lastClickedButton: '',
        clickHistory: [] as string[],
      };
    },
    methods: {
      handleButtonClick(buttonType: string) {
        this.clickCount++;
        this.lastClickedButton = buttonType;
        this.clickHistory.push(
          `${buttonType} clicked at ${new Date().toLocaleTimeString()}`,
        );

        // Keep only last 5 clicks for display
        if (this.clickHistory.length > 5) {
          this.clickHistory.shift();
        }

        // You can add any custom logic here
        console.log(`${buttonType} button clicked!`, {
          clickCount: this.clickCount,
          timestamp: new Date().toISOString(),
        });
      },
    },
    template: `
      <div style="max-width: 600px;">
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 2rem;">
          <Button
            variant="primary"
            text="Primary Action"
            iconName="home-outline"
            @click="handleButtonClick('Primary')"
          />
          <Button
            variant="secondary"
            text="Secondary Action"
            iconName="eye-open-filled"
            @click="handleButtonClick('Secondary')"
          />
          <Button
            variant="outline"
            text="Outline Action"
            iconName="info-outline"
            @click="handleButtonClick('Outline')"
          />
          <Button
            variant="text"
            text="Text Action"
            iconName="warning-outline"
            @click="handleButtonClick('Text')"
          />
        </div>

        <!-- Event Information Display -->
        <div style="
          padding: 1rem;
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          font-family: monospace;
        ">
          <h3 style="margin: 0 0 1rem 0; font-family: sans-serif;">Click Event Information:</h3>

          <div style="margin-bottom: 0.5rem;">
            <strong>Total Clicks:</strong> {{ clickCount }}
          </div>

          <div style="margin-bottom: 0.5rem;">
            <strong>Last Clicked:</strong> {{ lastClickedButton || 'None' }}
          </div>

          <div v-if="clickHistory.length > 0">
            <strong>Recent Activity:</strong>
            <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
              <li v-for="(event, index) in clickHistory" :key="index" style="margin-bottom: 0.25rem;">
                {{ event }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `This story demonstrates how to handle click events from a parent project using the Button component.

## Features:
- Click event handlers that receive button type information
- Click counter to track interactions
- Event history tracking
- Console logging for debugging

## How to Use in Your Vue 3 Project:

### 1. Using Composition API
\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@toteat-eng/design-system-vue'

// Reactive state for tracking clicks
const clickCount = ref(0)
const lastClickedButton = ref('')

// Click handler function
const handleButtonClick = (buttonType: string) => {
  clickCount.value++
  lastClickedButton.value = buttonType

  // Add your custom logic here
  console.log(\`\${buttonType} button clicked!\`, {
    clickCount: clickCount.value,
    timestamp: new Date().toISOString()
  })

  // Example: Call an API, update state, navigate, etc.
  // await saveData()
  // router.push('/next-page')
  // showNotification('Action completed!')
}
</script>

<template>
  <div>
    <!-- Your buttons with click handlers -->
    <Button
      variant="primary"
      text="Save Changes"
      icon-name="check-outline"
      @click="handleButtonClick('Save')"
    />

    <Button
      variant="secondary"
      text="Cancel"
      @click="handleButtonClick('Cancel')"
    />

    <Button
      variant="outline"
      text="Delete"
      icon-name="delete-outline"
      @click="handleButtonClick('Delete')"
    />
  </div>
</template>
\`\`\`

### 2. Using Options API
\`\`\`vue
<script>
import { Button } from '@toteat-eng/design-system-vue'

export default {
  name: 'MyComponent',
  components: {
    Button
  },
  data() {
    return {
      clickCount: 0,
      lastClickedButton: ''
    }
  },
  methods: {
    handleButtonClick(buttonType) {
      this.clickCount++
      this.lastClickedButton = buttonType

      // Add your custom logic here
      console.log(\`\${buttonType} button clicked!\`)
    }
  }
}
</script>
\`\`\`

## Key Implementation Points:

1. **Always use \`@click\`** to handle button clicks in Vue
2. **Use \`ref()\`** for reactive data in Composition API
3. **Handle loading states** with the \`loading\` prop when doing async operations
4. **Always provide \`aria-label\`** for icon-only buttons for accessibility
5. **Use try-catch blocks** when handling async operations like API calls

This pattern can be used for:
- Form submissions
- Navigation actions
- API calls
- State updates
- Any custom business logic that needs user interaction`,
      },
    },
  },
};
