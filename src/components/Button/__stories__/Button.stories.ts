import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '../Button.vue';
import type { IconNames } from '@/components/Icon/icons';

// Use IconNames union type for available icon names
const availableIconNames: IconNames[] = [
  'apple-filled',
  'arrow-down-outline',
  'arrow-left-outline',
  'arrow-list-outline',
  'arrow-right-outline',
  'arrow-up-outline',
  'barcode-outline',
  'checkbox-checked',
  'checkbox-unchecked',
  'chevron-left-bicolor',
  'chevron-right-bicolor',
  'close-outline',
  'copy-generic-outline',
  'copy-square-outline',
  'delete-outline',
  'discount-outline',
  'document-generic-outline',
  'document-history-outline',
  'document-list-outline',
  'error-filled-red',
  'error-outline',
  'exclamation-outline',
  'eye-closed-outline',
  'eye-open-filled',
  'facebook-filled',
  'google-filled',
  'home-outline',
  'info-filled-blue',
  'info-outline',
  'instagram-filled',
  'linkedin-filled',
  'pencil-outline',
  'radio-button-checked-outline',
  'radio-button-unchecked-outline',
  'refresh-double-outline',
  'refresh-single-outline',
  'rocket-outline',
  'search-outline',
  'shopping-bag-outline',
  'shopping-basket-outline',
  'shopping-cart-outline',
  'success-filled-green',
  'success-outline',
  'tag-outline',
  'ticket-outline',
  'twitter-filled',
  'user-outline',
  'warning-filled-yellow',
  'warning-outline',
  'whatsapp-outline',
];

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
      options: ['smaller', 'small', 'medium', 'large'],
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
    typeButton: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The HTML button type attribute',
    },
    clickEventName: {
      control: 'text',
      description: 'Custom name for the click event emitted by the button',
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
    clickEventName: 'button-click-default-name',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Types
export const Primary: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Button type="primary" text="Primary Button" />
        <Button type="primary" text="Primary Button" iconName="home-outline" />
      </div>
    `,
  }),
};

export const Secondary: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Button type="secondary" text="Secondary Button" />
        <Button type="secondary" text="Secondary Button" iconName="home-outline" />
      </div>
    `,
  }),
};

export const Outline: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Button type="outline" text="Outline Button" />
        <Button type="outline" text="Outline Button" iconName="home-outline" />
      </div>
    `,
  }),
};

export const TextButton: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Button type="text" text="Text Button" />
        <Button type="text" text="Text Button" iconName="home-outline" />
      </div>
    `,
  }),
};

export const IconButton: Story = {
  args: {
    type: 'primary',
    iconName: 'home-outline',
    onlyIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in icon-only mode using the onlyIcon prop.'
      }
    }
  }
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

// All sizes with loading spinner and label
export const AllSizesWithSpinner: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1.5rem; align-items: flex-end; flex-wrap: wrap;">
        <div v-for="size in ['smaller', 'small', 'medium', 'large']" :key="size" style="display: flex; flex-direction: column; align-items: center;">
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
              :type="variant"
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
        story: 'All possible icon-only buttons for every icon and every button variant.'
      }
    }
  }
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
          :type="variant"
          :iconName="icon"
          :text="variant.charAt(0).toUpperCase() + variant.slice(1) + ' Button'"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All button variants with both text and an icon.'
      }
    }
  }
};

// Add new story for custom event names
export const CustomEventName: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Button
          type="primary"
          text="Custom Event Button"
          clickEventName="custom-click"
          @custom-click="() => console.log('Custom event clicked!')"
        />
        <Button
          type="secondary"
          text="Another Custom Event"
          clickEventName="another-event"
          @another-event="() => console.log('Another event clicked!')"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with custom event names. Check the console to see the event logs.'
      }
    }
  }
};
