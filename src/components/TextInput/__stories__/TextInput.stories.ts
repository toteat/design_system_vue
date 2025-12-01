import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed, ref } from 'vue';
import TextInput from '../TextInput.vue';
import Button from '@/components/Button/Button.vue';
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
    helperTextAlign: {
      control: { type: 'select' },
      options: ['left', 'right'],
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
    helperTextAlign: 'right',
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
      const warning = ref('Check this');
      return { success, error, warning };
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
          label="Warning"
          v-model="warning"
          helper-text="Please review this field"
          error-message="This might cause issues"
          validation-state="warning"
        />
        <TextInput
          label="Error"
          v-model="error"
          helper-text="This field is required for your account"
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

export const PlaceholderEllipsis: Story = {
  name: 'Placeholder Ellipsis',
  render: () => ({
    components: { TextInput },
    setup() {
      const short = ref('');
      const medium = ref('');
      const long = ref('');
      const withIcons = ref('');
      const veryConstrained = ref('');
      return { short, medium, long, withIcons, veryConstrained };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px;">
        <h3 style="font-size: 1rem; font-weight: 600; color: var(--color-neutral-500); margin: 0;">
          Placeholder Ellipsis Behavior
        </h3>
        <p style="font-size: 0.875rem; color: var(--color-neutral-400); margin: 0;">
          Long placeholders automatically truncate with ellipsis when space is limited.
        </p>

        <TextInput
          label="Short placeholder"
          placeholder="Enter name"
          v-model="short"
          width="200"
        />

        <TextInput
          label="Medium placeholder (fits)"
          placeholder="Enter your full legal name"
          v-model="medium"
          width="300"
        />

        <TextInput
          label="Long placeholder (truncates)"
          placeholder="Please enter your complete full legal name as it appears on official documents"
          v-model="long"
          width="300"
        />

        <TextInput
          label="With icons (constrained space)"
          placeholder="Search for restaurants, dishes, or ingredients you love"
          prefix-icon="search-outline"
          suffix-icon="arrow-right-outline"
          v-model="withIcons"
          width="250"
          clearable
        />

        <TextInput
          label="Very constrained width"
          placeholder="This is an extremely long placeholder text that will definitely be truncated"
          v-model="veryConstrained"
          width="150"
        />

        <TextInput
          label="Full width with long placeholder"
          placeholder="This placeholder can expand to fill the available space without truncation when the container is wide enough"
          v-model="long"
          full-width
        />
      </div>
    `,
  }),
};

export const PlaceholderWithConstraints: Story = {
  name: 'Placeholder Constraints',
  render: () => ({
    components: { TextInput },
    setup() {
      const constrained1 = ref('');
      const constrained2 = ref('');
      const constrained3 = ref('');
      return { constrained1, constrained2, constrained3 };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px;">
        <h3 style="font-size: 1rem; font-weight: 600; color: var(--color-neutral-500); margin: 0;">
          Real-world Constraint Scenarios
        </h3>

        <div style="max-width: 200px; padding: 1rem; border: 2px dashed var(--color-neutral-300); border-radius: 8px;">
          <p style="font-size: 0.75rem; color: var(--color-neutral-500); margin: 0 0 1rem 0;">
            Container: 200px width
          </p>
          <TextInput
            label="Email"
            placeholder="youremail@company-domain.com"
            type="email"
            v-model="constrained1"
            full-width
            prefix-icon="mail-outline"
          />
        </div>

        <div style="max-width: 180px; padding: 1rem; border: 2px dashed var(--color-neutral-300); border-radius: 8px;">
          <p style="font-size: 0.75rem; color: var(--color-neutral-500); margin: 0 0 1rem 0;">
            Container: 180px width with validation icon
          </p>
          <TextInput
            label="Phone"
            placeholder="+1 (555) 123-4567"
            type="tel"
            v-model="constrained2"
            full-width
            prefix-icon="phone-outline"
            validation-state="success"
          />
        </div>

        <div style="max-width: 250px; padding: 1rem; border: 2px dashed var(--color-neutral-300); border-radius: 8px;">
          <p style="font-size: 0.75rem; color: var(--color-neutral-500); margin: 0 0 1rem 0;">
            Container: 250px width with multiple icons
          </p>
          <TextInput
            label="Search"
            placeholder="Search for products, categories, or brands worldwide"
            v-model="constrained3"
            full-width
            prefix-icon="search-outline"
            clearable
            helper-text="Type at least 3 characters"
          />
        </div>
      </div>
    `,
  }),
};

export const HelperTextAlignment: Story = {
  name: 'Helper Text Alignment',
  render: () => ({
    components: { TextInput },
    setup() {
      const leftAlign = ref('');
      const rightAlign = ref('');
      const leftWithCounter = ref('Hello');
      const rightWithCounter = ref('World');
      return { leftAlign, rightAlign, leftWithCounter, rightWithCounter };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
        <h3 style="font-size: 1rem; font-weight: 600; color: var(--color-neutral-500); margin: 0;">
          Helper Text Alignment Options
        </h3>
        <p style="font-size: 0.875rem; color: var(--color-neutral-400); margin: 0;">
          Control whether helper text appears on the left or right side.
        </p>

        <TextInput
          label="Left-aligned helper text"
          placeholder="Type something..."
          v-model="leftAlign"
          helper-text="This helper text is on the left"
          helper-text-align="left"
        />

        <TextInput
          label="Right-aligned helper text (default)"
          placeholder="Type something..."
          v-model="rightAlign"
          helper-text="This helper text is on the right"
          helper-text-align="right"
        />

        <TextInput
          label="Left with counter"
          placeholder="Type something..."
          v-model="leftWithCounter"
          helper-text="Helper on left, counter on right"
          helper-text-align="left"
          show-counter
          max-length="50"
        />

        <TextInput
          label="Right with counter"
          placeholder="Type something..."
          v-model="rightWithCounter"
          helper-text="Counter on left, helper on right"
          helper-text-align="right"
          show-counter
          max-length="50"
        />

        <TextInput
          label="Error message (always follows alignment)"
          placeholder="Type something..."
          v-model="leftAlign"
          error-message="This error is left-aligned"
          validation-state="error"
          helper-text-align="left"
          show-counter
          max-length="30"
        />
      </div>
    `,
  }),
};

export const HelperTextWithErrors: Story = {
  name: 'Helper Text Always Visible',
  render: () => ({
    components: { TextInput },
    setup() {
      const noError = ref('Valid input');
      const withError = ref('Invalid');
      const withErrorAndCounter = ref('Bad');
      return { noError, withError, withErrorAndCounter };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
        <h3 style="font-size: 1rem; font-weight: 600; color: var(--color-neutral-500); margin: 0;">
          Helper Text Persistence
        </h3>
        <p style="font-size: 0.875rem; color: var(--color-neutral-400); margin: 0;">
          Helper text remains visible even when validation errors occur, providing context alongside error messages.
        </p>

        <TextInput
          label="Valid input (helper text only)"
          placeholder="Type something..."
          v-model="noError"
          helper-text="This is helpful context about the field"
          validation-state="default"
        />

        <TextInput
          label="Error state (both helper and error shown)"
          placeholder="Type something..."
          v-model="withError"
          helper-text="This helper text stays visible even with an error"
          error-message="This field has a validation error"
          validation-state="error"
        />

        <TextInput
          label="Error with counter (all three visible)"
          placeholder="Type something..."
          v-model="withErrorAndCounter"
          helper-text="Helper text provides context"
          error-message="Value is too short"
          validation-state="error"
          show-counter
          max-length="50"
        />

        <TextInput
          label="Left-aligned with error"
          placeholder="Type something..."
          v-model="withError"
          helper-text="Helper on left, counter on right"
          error-message="Error appears below helper"
          validation-state="error"
          helper-text-align="left"
          show-counter
          max-length="50"
        />

        <TextInput
          label="Right-aligned with error"
          placeholder="Type something..."
          v-model="withError"
          helper-text="Helper on right, counter on left"
          error-message="Error appears below helper"
          validation-state="error"
          helper-text-align="right"
          show-counter
          max-length="50"
        />
      </div>
    `,
  }),
};

export const InlineWithButton: Story = {
  name: 'Inline Layout with Button',
  render: () => ({
    components: { TextInput, Button },
    setup() {
      const firstName = ref('');
      const lastName = ref('');
      const email = ref('');

      const handleSubmit = () => {
        console.log('Form submitted:', {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
        });
      };

      return { firstName, lastName, email, handleSubmit };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 900px;">
        <h3 style="font-size: 1rem; font-weight: 600; color: var(--color-neutral-500); margin: 0;">
          Real-World Inline Layout Scenarios
        </h3>
        <p style="font-size: 0.875rem; color: var(--color-neutral-400); margin: 0;">
          Text inputs vertically centered in a row with buttons - common in forms and toolbars.
        </p>

        <div>
          <p style="font-size: 0.875rem; font-weight: 600; color: var(--color-neutral-500); margin: 0 0 0.75rem 0;">
            Basic inline form with button
          </p>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <TextInput
              placeholder="First name"
              v-model="firstName"
              width="200"
            />
            <TextInput
              placeholder="Last name"
              v-model="lastName"
              width="200"
            />
            <Button
              size="tiny"
              variant="primary"
              text="Submit"
              @click="handleSubmit"
            />
          </div>
        </div>

        <div>
          <p style="font-size: 0.875rem; font-weight: 600; color: var(--color-neutral-500); margin: 0 0 0.75rem 0;">
            Search bar with action button
          </p>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <TextInput
              placeholder="Search for products, categories, or items..."
              v-model="email"
              prefix-icon="search-outline"
              clearable
              width="400"
            />
            <Button
              size="tiny"
              variant="primary"
              text="Search"
              icon-name="search-outline"
            />
          </div>
        </div>

        <div>
          <p style="font-size: 0.875rem; font-weight: 600; color: var(--color-neutral-500); margin: 0 0 0.75rem 0;">
            Newsletter signup (centered alignment)
          </p>
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 2rem; background: var(--color-neutral-100); border-radius: 8px;">
            <TextInput
              placeholder="Enter your email address"
              type="email"
              v-model="email"
              width="300"
            />
            <Button
              size="tiny"
              variant="primary"
              text="Subscribe"
              icon-name="arrow-right-outline"
              icon-position="right"
            />
          </div>
        </div>

        <div>
          <p style="font-size: 0.875rem; font-weight: 600; color: var(--color-neutral-500); margin: 0 0 0.75rem 0;">
            Multi-input with validation and button
          </p>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <TextInput
              placeholder="Username"
              v-model="firstName"
              validation-state="success"
              width="180"
            />
            <TextInput
              placeholder="Password"
              type="password"
              v-model="lastName"
              validation-state="error"
              width="180"
            />
            <Button
              size="tiny"
              variant="primary"
              text="Login"
            />
          </div>
        </div>

        <div>
          <p style="font-size: 0.875rem; font-weight: 600; color: var(--color-neutral-500); margin: 0 0 0.75rem 0;">
            Different sizes - all centered
          </p>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <TextInput
              placeholder="Small input"
              size="small"
              v-model="firstName"
              width="150"
            />
            <Button
              size="tiny"
              variant="outline"
              text="Small"
            />
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <TextInput
              placeholder="Medium input"
              size="medium"
              v-model="lastName"
              width="200"
            />
            <Button
              size="tiny"
              variant="outline"
              text="Medium"
            />
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <TextInput
              placeholder="Large input"
              size="large"
              v-model="email"
              width="250"
            />
            <Button
              size="tiny"
              variant="outline"
              text="Large"
            />
          </div>
        </div>

        <div>
          <p style="font-size: 0.875rem; font-weight: 600; color: var(--color-neutral-500); margin: 0 0 0.75rem 0;">
            Toolbar-style layout with multiple actions
          </p>
          <div style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; background: var(--color-white); border: 1px solid var(--color-neutral-200); border-radius: 8px;">
            <TextInput
              placeholder="Filter items..."
              prefix-icon="filter-outline"
              v-model="firstName"
              width="200"
            />
            <Button
              size="tiny"
              variant="outline"
              text="Apply"
            />
            <Button
              size="tiny"
              variant="text"
              text="Reset"
            />
            <div style="flex: 1;"></div>
            <Button
              size="tiny"
              variant="primary"
              text="Export"
              icon-name="download-outline"
            />
          </div>
        </div>
      </div>
    `,
  }),
};
