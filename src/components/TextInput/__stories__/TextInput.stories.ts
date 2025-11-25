import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed, ref } from 'vue';
import TextInput from '../TextInput.vue';
import * as Icons from '@/components/Icon/icons';
import type { IconNames } from '@/components/Icon/icons';

const iconOptions: IconNames[] = Object.keys(Icons)
  .filter((key) => key.startsWith('ICON_'))
  .map((key) =>
    key
      .replace(/^ICON_/, '')
      .toLowerCase()
      .replaceAll('_', '-'),
  ) as IconNames[];

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    validationState: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error'],
    },
    type: {
      control: { type: 'select' },
      options: [
        'text',
        'password',
        'email',
        'search',
        'tel',
        'url',
        'number',
        'date',
      ],
    },
    prefixIcon: {
      control: { type: 'select' },
      options: [undefined, ...iconOptions],
    },
    suffixIcon: {
      control: { type: 'select' },
      options: [undefined, ...iconOptions],
    },
  },
  args: {
    label: 'Full name',
    placeholder: 'Jane Doe',
    helperText: 'Helper text keeps inputs contextual.',
    validationState: 'default',
    size: 'medium',
    clearable: true,
    width: 404,
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `<TextInput v-bind="args" v-model="value" />`,
  }),
};

export const PrefixAndSuffix: Story = {
  args: {
    label: 'Search',
    placeholder: 'Find anything',
    prefixIcon: 'search-outline',
    suffixIcon: 'arrow-right-outline',
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `<TextInput v-bind="args" v-model="value" />`,
  }),
};

export const ValidationStates: Story = {
  render: () => ({
    components: { TextInput },
    setup() {
      const success = ref('Looks good');
      const error = ref('I need attention');
      return { success, error };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 420px;">
        <TextInput
          label="Success"
          v-model="success"
          helper-text="Everything is valid"
          validation-state="success"
        />
        <TextInput
          label="Error"
          v-model="error"
          error-message="Something went wrong"
          validation-state="error"
        />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { TextInput },
    setup() {
      const small = ref('S');
      const medium = ref('Medium size');
      const large = ref('Large display value');
      return { small, medium, large };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
        <TextInput label="Small" size="small" v-model="small" />
        <TextInput label="Medium" size="medium" v-model="medium" />
        <TextInput label="Large" size="large" v-model="large" />
      </div>
    `,
  }),
};

export const PasswordField: Story = {
  args: {
    label: 'Password',
    placeholder: 'Create a secure password',
    type: 'password',
    suffixIcon: 'eye-closed-outline',
    helperText: 'Use at least 8 characters.',
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `<TextInput v-bind="args" v-model="value" />`,
  }),
};

export const PasswordConfirmation: Story = {
  render: () => ({
    components: { TextInput },
    setup() {
      const newPassword = ref('');
      const confirmPassword = ref('');

      const confirmState = computed(() => {
        if (!confirmPassword.value) return 'default';
        return newPassword.value === confirmPassword.value
          ? 'success'
          : 'error';
      });

      const confirmHelper = computed(() => {
        if (!confirmPassword.value) {
          return 'Both entries must match before continuing.';
        }

        return newPassword.value === confirmPassword.value
          ? 'Passwords match'
          : undefined;
      });

      const confirmError = computed(() => {
        if (!confirmPassword.value) return undefined;
        return newPassword.value === confirmPassword.value
          ? undefined
          : 'Passwords must match';
      });

      return {
        newPassword,
        confirmPassword,
        confirmState,
        confirmHelper,
        confirmError,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
        <TextInput
          label="New password"
          type="password"
          placeholder="Create a secure password"
          helper-text="Use at least 8 characters."
          v-model="newPassword"
          clearable
          suffix-icon="eye-closed-outline"
        />
        <TextInput
          label="Confirm password"
          type="password"
          placeholder="Repeat your password"
          :validation-state="confirmState"
          :helper-text="confirmHelper"
          :error-message="confirmError"
          v-model="confirmPassword"
          suffix-icon="eye-closed-outline"
        />
      </div>
    `,
  }),
};

export const TextKinds: Story = {
  name: 'Input Types',
  render: () => ({
    components: { TextInput },
    setup() {
      const email = ref('hello@toteat.com');
      const url = ref('https://toteat.com');
      const number = ref('42');
      const date = ref('2025-01-01');
      return { email, url, number, date };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
        <TextInput label="Email" type="email" v-model="email" clearable />
        <TextInput label="URL" type="url" v-model="url" />
        <TextInput label="Quantity" type="number" v-model="number" show-counter max-length="4" />
        <TextInput
          label="Reservation date"
          type="date"
          v-model="date"
          helper-text="Select any date in 2025"
          min="2025-01-01"
          max="2025-12-31"
        />
      </div>
    `,
  }),
};

export const DateOnly: Story = {
  args: {
    label: 'Event date',
    helperText: 'Pick the day guests will arrive',
    type: 'date',
    min: '2025-04-01',
    max: '2025-12-31',
    clearable: false,
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('2025-06-15');
      return { args, value };
    },
    template: `<TextInput v-bind="args" v-model="value" />`,
  }),
};

export const ReadonlyAndDisabled: Story = {
  render: () => ({
    components: { TextInput },
    setup() {
      const readonlyValue = ref('Fixed reference code');
      const disabledValue = ref('Cannot edit right now');
      return { readonlyValue, disabledValue };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
        <TextInput label="Readonly" :readonly="true" v-model="readonlyValue" helper-text="Use this to display immutable data." />
        <TextInput label="Disabled" :disabled="true" v-model="disabledValue" helper-text="Disabled inputs keep their value but are non-interactive." />
      </div>
    `,
  }),
};

export const CounterAndLimit: Story = {
  args: {
    label: 'Short bio',
    helperText: 'Max 140 characters',
    placeholder: 'Tell us about yourself',
    showCounter: true,
    maxLength: 140,
  },
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('Chef and food lover');
      return { args, value };
    },
    template: `<TextInput v-bind="args" v-model="value" />`,
  }),
};
