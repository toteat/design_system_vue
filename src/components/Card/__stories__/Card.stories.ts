import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Card from '../Card.vue';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Padding size inside the card',
    },
    elevation: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Shadow elevation level',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether card shows shadow on hover',
    },
    href: {
      control: 'text',
      description: 'URL to navigate to when card is clicked',
    },
    target: {
      control: 'text',
      description: 'Link target attribute',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    padding: 'medium',
    elevation: 'none',
    hoverable: false,
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600;">Card Title</h3>
        <p style="margin: 0; color: #6b7280;">This is a basic card component that can contain any content.</p>
      </Card>
    `,
  }),
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    elevation: 'small',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <img src="https://picsum.photos/400/200" alt="Sample" style="width: 100%; display: block; border-radius: 0.5rem 0.5rem 0 0;" />
        <div style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600;">Image Card</h3>
          <p style="margin: 0; color: #6b7280;">Card with no padding for full-width images.</p>
        </div>
      </Card>
    `,
  }),
};

export const WithElevation: Story = {
  args: {
    padding: 'large',
    elevation: 'medium',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600;">Elevated Card</h3>
        <p style="margin: 0; color: #6b7280;">This card has medium elevation (shadow).</p>
      </Card>
    `,
  }),
};

export const Hoverable: Story = {
  args: {
    padding: 'medium',
    elevation: 'none',
    hoverable: true,
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args" style="cursor: pointer;">
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600;">Hoverable Card</h3>
        <p style="margin: 0; color: #6b7280;">Hover over this card to see the shadow effect.</p>
      </Card>
    `,
  }),
};

export const InvitationExample: Story = {
  args: {
    padding: 'medium',
    elevation: 'none',
    hoverable: true,
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args" style="display: flex; align-items: center; gap: 1rem;">
        <div style="flex: 1; min-width: 0;">
          <h4 style="margin: 0 0 0.25rem 0; font-size: 1rem; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            Restaurant Name
          </h4>
          <p style="margin: 0; font-size: 0.875rem; color: #6b7280; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            Invited by John Doe on 12/05/2025
          </p>
        </div>
        <div style="display: flex; gap: 0.75rem; flex-shrink: 0;">
          <button style="padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 0.375rem; background: white; cursor: pointer;">
            Reject
          </button>
          <button style="padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; background: #f97316; color: white; cursor: pointer;">
            Accept
          </button>
        </div>
      </Card>
    `,
  }),
};

export const ClickableWithHandler: Story = {
  args: {
    padding: 'medium',
    elevation: 'small',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      const clickCount = ref(0);
      const handleCardClick = () => {
        clickCount.value++;
      };
      return { args, clickCount, handleCardClick };
    },
    template: `
      <div>
        <Card v-bind="args" @click="handleCardClick">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600;">Clickable Card</h3>
          <p style="margin: 0; color: #6b7280;">Click this card to increment the counter.</p>
        </Card>
        <p style="margin-top: 1rem; color: #6b7280;">
          Clicked <strong>{{ clickCount }}</strong> times
        </p>
      </div>
    `,
  }),
};

export const CardAsLink: Story = {
  args: {
    padding: 'medium',
    elevation: 'small',
    href: 'https://toteat.com',
    target: '_blank',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600;">External Link Card</h3>
        <p style="margin: 0; color: #6b7280;">This card navigates to toteat.com in a new tab when clicked.</p>
      </Card>
    `,
  }),
};

export const CardAsInternalLink: Story = {
  args: {
    padding: 'medium',
    elevation: 'none',
    hoverable: true,
    href: '/profile',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600;">Internal Link Card</h3>
        <p style="margin: 0; color: #6b7280;">This card navigates to /profile when clicked.</p>
      </Card>
    `,
  }),
};

export const WithStateTracking: Story = {
  args: {
    padding: 'medium',
    elevation: 'small',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      const hovered = ref(false);
      const focused = ref(false);
      const pressed = ref(false);
      const clickCount = ref(0);

      const handleCardClick = () => {
        clickCount.value++;
      };

      return { args, hovered, focused, pressed, clickCount, handleCardClick };
    },
    template: `
      <div>
        <Card
          v-bind="args"
          v-model:hovered="hovered"
          v-model:focused="focused"
          v-model:pressed="pressed"
          @click="handleCardClick"
        >
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600;">Interactive State Card</h3>
          <p style="margin: 0; color: #6b7280;">
            Interact with this card to see state changes tracked via v-model.
          </p>
        </Card>

        <div style="margin-top: 1.5rem; padding: 1rem; background: #f3f4f6; border-radius: 0.5rem;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Card State:</h4>
          <ul style="margin: 0; padding-left: 1.5rem; list-style: disc;">
            <li>Hovered: <strong :style="{ color: hovered ? '#10b981' : '#6b7280' }">{{ hovered }}</strong></li>
            <li>Focused: <strong :style="{ color: focused ? '#10b981' : '#6b7280' }">{{ focused }}</strong></li>
            <li>Pressed: <strong :style="{ color: pressed ? '#10b981' : '#6b7280' }">{{ pressed }}</strong></li>
            <li>Click Count: <strong>{{ clickCount }}</strong></li>
          </ul>
        </div>
      </div>
    `,
  }),
};
