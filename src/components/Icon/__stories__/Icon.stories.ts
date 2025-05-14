import type { Meta, StoryObj } from '@storybook/vue3';
import Icon from '../Icon.vue';
import type { IconNames } from '../icons'; // Changed to type-only import
import * as Icons from '../icons'; // To access all icon names for the AllIcons story

// Extracting the actual icon names from the generated IconNames type for story controls
// The IconNames type is a union like 'a' | 'b' | 'c'. We need an array ['a', 'b', 'c']
// This is a bit of a workaround because Storybook controls for select work best with an array.
// We'll derive it from the keys of the ICON_* constants, matching how IconNames is generated.
const availableIconNames = Object.keys(Icons)
  .filter(key => key.startsWith('ICON_'))
  .map(key =>
    key
      .replace(/^ICON_/, '')
      .replace(/_/g, '-')
      .toLowerCase()
  ) as IconNames[];

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: availableIconNames,
      description: 'Name of the icon to display',
    },
    size: {
      control: { type: 'number', min: 8, max: 128, step: 1 },
      description: 'Size of the icon in pixels',
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
        'gray-100',
        'gray-200',
        'gray-300',
        'gray-400',
        'gray-500',
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
      description: 'Color of the icon',
    },
  },
  args: {
    name: availableIconNames[0] || 'home-outline',
    size: 24,
    color: 'black',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
  args: {},
};

export const AllIcons: Story = {
  render: (args, { argTypes }) => ({
    components: { Icon },
    props: Object.keys(argTypes),
    setup() {
      const iconsToDisplay = availableIconNames;
      return { iconsToDisplay, args };
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px;">
        <div
          v-for="iconName in iconsToDisplay"
          :key="iconName"
          style="display: flex; flex-direction: column; align-items: center; width: 100px;"
        >
          <Icon :name="iconName" :size="args.size || 32" :color="args.color || 'black'" />
          <span style="font-size: 12px; margin-top: 8px; text-align: center;">{{ iconName }}</span>
        </div>
      </div>
    `,
  }),
  args: {
    size: 32,
    color: 'black',
  },
  parameters: {
    controls: { include: ['size', 'color'] },
  },
};
