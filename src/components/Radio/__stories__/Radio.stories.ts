import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, watch } from 'vue';
import Radio from '../Radio.vue';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title text of the radio',
    },
    description: {
      control: 'text',
      description: 'Optional description text below the title',
    },
    checked: {
      control: 'boolean',
      description: 'The checked state (v-model:checked)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the radio',
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large'],
      description: 'Size variant of the radio',
    },
    card: {
      control: 'boolean',
      description: 'Enable card styling with border and background',
    },
  },
  args: {
    title: 'Título de la opción',
    description: 'Descripción de la opción (opcional)',
    checked: false,
    disabled: false,
    size: 'medium',
    card: false,
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => ({
    components: { Radio },
    setup() {
      const checked = ref(args.checked);

      watch(
        () => args.checked,
        (newValue) => {
          checked.value = newValue;
        },
      );

      return { args, checked };
    },
    template: `
      <div style="max-width: 300px;">
        <Radio
          :title="args.title"
          :description="args.description"
          :size="args.size"
          :disabled="args.disabled"
          :card="args.card"
          v-model:checked="checked"
        />
        <p style="margin-top: 1rem; font-size: var(--text-sm); color: var(--color-neutral-400);">
          Selected: <strong>{{ checked }}</strong>
        </p>
      </div>
    `,
  }),
};

export const CardVariant: Story = {
  args: {
    title: 'Opción con estilo card',
    description: 'Con borde y fondo',
    checked: false,
    card: true,
  },
  render: (args) => ({
    components: { Radio },
    setup() {
      const checked = ref(args.checked);
      return { args, checked };
    },
    template: `
      <div style="max-width: 300px;">
        <Radio
          :title="args.title"
          :description="args.description"
          :card="true"
          v-model:checked="checked"
        />
      </div>
    `,
  }),
};

export const Selected: Story = {
  args: {
    title: 'Opción seleccionada',
    description: 'Esta opción está marcada',
    checked: true,
  },
  render: (args) => ({
    components: { Radio },
    setup() {
      const checked = ref(args.checked);
      return { args, checked };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
        <Radio
          :title="args.title"
          :description="args.description"
          v-model:checked="checked"
        />
        <Radio
          title="Card variant selected"
          description="With card styling"
          :card="true"
          :checked="true"
        />
      </div>
    `,
  }),
};

export const WithoutDescription: Story = {
  args: {
    title: 'Opción sin descripción',
    description: undefined,
    checked: false,
  },
  render: (args) => ({
    components: { Radio },
    setup() {
      const checked = ref(args.checked);
      return { args, checked };
    },
    template: `
      <div style="max-width: 300px;">
        <Radio
          :title="args.title"
          v-model:checked="checked"
        />
        <p style="margin-top: 1rem; font-size: var(--text-sm); color: var(--color-neutral-400);">
          Selected: <strong>{{ checked }}</strong>
        </p>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const checkedTiny = ref(false);
      const checkedSmall = ref(false);
      const checkedMedium = ref(true);
      const checkedLarge = ref(false);

      return { checkedTiny, checkedSmall, checkedMedium, checkedLarge };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 350px;">
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: var(--text-base); font-weight: 600;">Tiny</h4>
          <Radio
            title="Tiny option"
            description="Minimal size (description hidden)"
            size="tiny"
            v-model:checked="checkedTiny"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: var(--text-base); font-weight: 600;">Small</h4>
          <Radio
            title="Small option"
            description="Compact size for tight spaces"
            size="small"
            v-model:checked="checkedSmall"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: var(--text-base); font-weight: 600;">Medium (default)</h4>
          <Radio
            title="Medium option"
            description="Standard size for most use cases"
            size="medium"
            v-model:checked="checkedMedium"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: var(--text-base); font-weight: 600;">Large</h4>
          <Radio
            title="Large option"
            description="Prominent size for emphasis"
            size="large"
            v-model:checked="checkedLarge"
          />
        </div>
      </div>
    `,
  }),
};

export const CardSizes: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const checkedTiny = ref(false);
      const checkedSmall = ref(false);
      const checkedMedium = ref(true);
      const checkedLarge = ref(false);

      return { checkedTiny, checkedSmall, checkedMedium, checkedLarge };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 350px;">
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: var(--text-base); font-weight: 600;">Tiny Card</h4>
          <Radio
            title="Tiny option"
            description="Minimal size (description hidden)"
            size="tiny"
            :card="true"
            v-model:checked="checkedTiny"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: var(--text-base); font-weight: 600;">Small Card</h4>
          <Radio
            title="Small option"
            description="Compact size for tight spaces"
            size="small"
            :card="true"
            v-model:checked="checkedSmall"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: var(--text-base); font-weight: 600;">Medium Card (default)</h4>
          <Radio
            title="Medium option"
            description="Standard size for most use cases"
            size="medium"
            :card="true"
            v-model:checked="checkedMedium"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: var(--text-base); font-weight: 600;">Large Card</h4>
          <Radio
            title="Large option"
            description="Prominent size for emphasis"
            size="large"
            :card="true"
            v-model:checked="checkedLarge"
          />
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const unchecked = ref(false);
      const checked = ref(true);
      return { unchecked, checked };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
        <h4 style="font-size: var(--text-base); font-weight: 600;">Default style</h4>
        <Radio
          title="Disabled unselected"
          description="Cannot be interacted with"
          :disabled="true"
          v-model:checked="unchecked"
        />
        <Radio
          title="Disabled selected"
          description="Cannot be interacted with"
          :disabled="true"
          :checked="true"
        />
        <h4 style="margin-top: 1rem; font-size: var(--text-base); font-weight: 600;">Card style</h4>
        <Radio
          title="Disabled card unselected"
          description="Cannot be interacted with"
          :disabled="true"
          :card="true"
          v-model:checked="unchecked"
        />
        <Radio
          title="Disabled card selected"
          description="Cannot be interacted with"
          :disabled="true"
          :card="true"
          :checked="true"
        />
      </div>
    `,
  }),
};

export const RadioGroup: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selectedOption = ref<number | null>(1);

      const selectOption = (id: number) => {
        selectedOption.value = id;
      };

      const options = [
        {
          id: 1,
          title: 'Mi perfil',
          description: 'Editar información personal',
        },
        {
          id: 2,
          title: 'Configurar claves',
          description: 'Cambiar contraseña y seguridad',
        },
        {
          id: 3,
          title: 'Invitaciones',
          description: 'Gestionar invitaciones pendientes',
        },
        {
          id: 4,
          title: 'Notificaciones',
          description: 'Configurar alertas y avisos',
        },
      ];

      return { selectedOption, selectOption, options };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 350px;">
        <h3 style="margin-bottom: 0.5rem; font-size: var(--text-lg); font-weight: 600;">Select an option</h3>
        <Radio
          v-for="option in options"
          :key="option.id"
          :title="option.title"
          :description="option.description"
          :checked="selectedOption === option.id"
          @change="selectOption(option.id)"
        />
        <p style="margin-top: 1rem; font-size: var(--text-sm); color: var(--color-neutral-400);">
          Selected: <strong>{{ options.find(o => o.id === selectedOption)?.title || 'None' }}</strong>
        </p>
      </div>
    `,
  }),
};

export const CardRadioGroup: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selectedOption = ref<number | null>(1);

      const selectOption = (id: number) => {
        selectedOption.value = id;
      };

      const options = [
        {
          id: 1,
          title: 'Mi perfil',
          description: 'Editar información personal',
        },
        {
          id: 2,
          title: 'Configurar claves',
          description: 'Cambiar contraseña y seguridad',
        },
        {
          id: 3,
          title: 'Invitaciones',
          description: 'Gestionar invitaciones pendientes',
        },
        {
          id: 4,
          title: 'Notificaciones',
          description: 'Configurar alertas y avisos',
        },
      ];

      return { selectedOption, selectOption, options };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 350px;">
        <h3 style="margin-bottom: 0.5rem; font-size: var(--text-lg); font-weight: 600;">Select an option (Card style)</h3>
        <Radio
          v-for="option in options"
          :key="option.id"
          :title="option.title"
          :description="option.description"
          :card="true"
          :checked="selectedOption === option.id"
          @change="selectOption(option.id)"
        />
        <p style="margin-top: 1rem; font-size: var(--text-sm); color: var(--color-neutral-400);">
          Selected: <strong>{{ options.find(o => o.id === selectedOption)?.title || 'None' }}</strong>
        </p>
      </div>
    `,
  }),
};

export const InGrid: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selectedOption = ref<string>('dark-mode');

      const selectOption = (value: string) => {
        selectedOption.value = value;
      };

      return { selectedOption, selectOption };
    },
    template: `
      <div>
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600;">Select a theme (Card style)</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; max-width: 600px;">
          <Radio
            title="Dark mode"
            description="Enable dark theme"
            :card="true"
            :checked="selectedOption === 'dark-mode'"
            @change="selectOption('dark-mode')"
          />
          <Radio
            title="Light mode"
            description="Enable light theme"
            :card="true"
            :checked="selectedOption === 'light-mode'"
            @change="selectOption('light-mode')"
          />
          <Radio
            title="System default"
            description="Follow system preference"
            :card="true"
            :checked="selectedOption === 'system'"
            @change="selectOption('system')"
          />
          <Radio
            title="High contrast"
            description="Accessibility focused"
            :card="true"
            :checked="selectedOption === 'high-contrast'"
            @change="selectOption('high-contrast')"
          />
        </div>
      </div>
    `,
  }),
};
