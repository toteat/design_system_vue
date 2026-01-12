import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TextInput from '../TextInput.vue';
import { sanitizeTextInput } from '../../../utils/string';

describe('TextInput', () => {
  it('renders label and syncs v-model', async () => {
    const wrapper = mount(TextInput, {
      props: {
        label: 'Full name',
        modelValue: 'Jane',
      },
    });

    const input = wrapper.find('input');
    expect(wrapper.find('label').text()).toContain('Full name');
    expect(input.element.value).toBe('Jane');

    await input.setValue('John');
    const updateEvents = wrapper.emitted('update:modelValue');
    expect(updateEvents?.[0]).toEqual(['John']);
  });

  it('shows both helper text and error message when in error state', () => {
    const wrapper = mount(TextInput, {
      props: {
        helperText: 'Helper info',
        errorMessage: 'This field is required',
        validationState: 'error',
      },
    });

    expect(wrapper.find('.text-input__error').text()).toBe(
      'This field is required',
    );
    expect(wrapper.find('.text-input__helper').exists()).toBe(true);
    expect(wrapper.find('.text-input__helper').text()).toBe('Helper info');
  });

  it('shows clear button and emits clear event', async () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: 'Search term',
        clearable: true,
      },
    });

    const clearButton = wrapper.find('.text-input__clear');
    expect(clearButton.exists()).toBe(true);

    await clearButton.trigger('click');
    const updates = wrapper.emitted('update:modelValue');
    const lastUpdate = updates?.at(-1);
    expect(lastUpdate).toEqual(['']);
    expect(wrapper.emitted('clear')).toBeTruthy();
  });

  it('falls back to aria-label when label is missing', () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: '',
        ariaLabel: 'Custom field',
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('aria-label')).toBe('Custom field');
  });

  it('shows status icon for success state', () => {
    const wrapper = mount(TextInput, {
      props: {
        validationState: 'success',
        modelValue: 'Ready',
      },
    });

    const statusIcon = wrapper.find('.text-input__status-icon');
    expect(statusIcon.exists()).toBe(true);
    expect(statusIcon.attributes('test-id')).toBe(
      'tds-icon-success-filled-green',
    );
  });

  it('shows warning icon when validationState is warning', () => {
    const wrapper = mount(TextInput, {
      props: {
        validationState: 'warning',
        modelValue: 'Caution',
      },
    });

    const statusIcon = wrapper.find('.text-input__status-icon');
    expect(statusIcon.exists()).toBe(true);
    expect(statusIcon.attributes('test-id')).toBe('tds-icon-warning-outline');
  });

  it('uses filled cross icon for error state', () => {
    const wrapper = mount(TextInput, {
      props: {
        validationState: 'error',
        errorMessage: 'Fix this field',
        modelValue: 'bad input',
      },
    });

    const statusIcon = wrapper.find('.text-input__status-icon');
    expect(statusIcon.exists()).toBe(true);
    expect(statusIcon.attributes('test-id')).toBe('tds-icon-error-filled-red');
  });

  it('links helper text through aria-describedby', () => {
    const wrapper = mount(TextInput, {
      props: {
        id: 'user-email',
        helperText: 'We never share your email',
      },
    });

    const helper = wrapper.find('.text-input__helper');
    expect(helper.exists()).toBe(true);
    expect(helper.attributes('id')).toBe('user-email-helper');

    const input = wrapper.find('input');
    expect(input.attributes('aria-describedby')).toBe('user-email-helper');
  });

  it('hides the clear button when input is disabled', () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: 'Cannot clear',
        clearable: true,
        disabled: true,
      },
    });

    expect(wrapper.find('.text-input__clear').exists()).toBe(false);
  });

  it('emits enter event with the latest value', async () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: 'submit me',
      },
    });

    const input = wrapper.find('input');
    await input.trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('enter')).toBeTruthy();
    expect(wrapper.emitted('enter')?.[0]).toEqual(['submit me']);
  });

  it('shows character counter with current length and max when enabled', () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: 'hey',
        showCounter: true,
        maxLength: 10,
      },
    });

    const counter = wrapper.find('.text-input__counter');
    expect(counter.exists()).toBe(true);
    expect(counter.text()).toBe('3/10');
  });

  it('adds aria-describedby reference to error message when invalid', () => {
    const wrapper = mount(TextInput, {
      props: {
        id: 'email-field',
        validationState: 'error',
        errorMessage: 'Email is invalid',
      },
    });

    const error = wrapper.find('.text-input__error');
    expect(error.exists()).toBe(true);
    expect(error.attributes('id')).toBe('email-field-error');

    const input = wrapper.find('input');
    expect(input.attributes('aria-describedby')).toBe('email-field-error');
  });

  it('does not render clear button when readonly', () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: 'static',
        clearable: true,
        readonly: true,
      },
    });

    expect(wrapper.find('.text-input__clear').exists()).toBe(false);
  });

  it('emits change event with the current value', async () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: 'old',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('new value');
    await input.trigger('change');

    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('change')?.[0]).toEqual(['new value']);
  });

  it('renders prefix icon when provided', () => {
    const wrapper = mount(TextInput, {
      props: {
        prefixIcon: 'search-outline',
      },
    });

    const prefixIcon = wrapper.find('.text-input__icon--prefix');
    expect(prefixIcon.exists()).toBe(true);
    expect(prefixIcon.attributes('test-id')).toBe('tds-icon-search-outline');
  });

  it('sanitizes initial modelValue before rendering to the input', () => {
    const payload = "<script>alert('x')</script><b>Hi</b>";
    const maxLength = 120;
    const expected = sanitizeTextInput(payload, {
      allowNewLines: false,
      maxLength,
    });

    const wrapper = mount(TextInput, {
      props: {
        modelValue: payload,
        maxLength,
      },
    });

    const input = wrapper.find('input');
    expect(input.element.value).toBe(expected);
  });

  it('sanitizes emitted values for input and change events', async () => {
    const payload = '<img src="javascript:alert(1)" onerror="evil()">Test';
    const maxLength = 80;
    const expected = sanitizeTextInput(payload, {
      allowNewLines: false,
      maxLength,
    });

    const wrapper = mount(TextInput, {
      props: {
        modelValue: '',
        maxLength,
      },
    });

    const input = wrapper.find('input');
    await input.setValue(payload);

    const updateEvents = wrapper.emitted('update:modelValue');
    expect(updateEvents?.at(-1)).toEqual([expected]);

    await input.trigger('change');
    const changeEvents = wrapper.emitted('change');
    expect(changeEvents?.at(-1)).toEqual([expected]);
  });

  describe('Helper text alignment', () => {
    it('applies left alignment to helper text', () => {
      const wrapper = mount(TextInput, {
        props: {
          helperText: 'Left aligned helper',
          helperTextAlign: 'left',
        },
      });

      const meta = wrapper.find('.text-input__meta');
      expect(meta.attributes('data-helper-align')).toBe('left');
    });

    it('applies right alignment to helper text (default)', () => {
      const wrapper = mount(TextInput, {
        props: {
          helperText: 'Right aligned helper',
          helperTextAlign: 'right',
        },
      });

      const meta = wrapper.find('.text-input__meta');
      expect(meta.attributes('data-helper-align')).toBe('right');
    });

    it('defaults to right alignment when not specified', () => {
      const wrapper = mount(TextInput, {
        props: {
          helperText: 'Default alignment',
        },
      });

      const meta = wrapper.find('.text-input__meta');
      expect(meta.attributes('data-helper-align')).toBe('right');
    });
  });

  describe('Meta visibility', () => {
    it('hides meta section when no helper, error, or counter', () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: 'test',
        },
      });

      expect(wrapper.find('.text-input__meta').exists()).toBe(false);
    });

    it('shows meta section when helper text is provided', () => {
      const wrapper = mount(TextInput, {
        props: {
          helperText: 'Some help',
        },
      });

      expect(wrapper.find('.text-input__meta').exists()).toBe(true);
    });

    it('shows meta section when error message is provided', () => {
      const wrapper = mount(TextInput, {
        props: {
          errorMessage: 'Error occurred',
          validationState: 'error',
        },
      });

      expect(wrapper.find('.text-input__meta').exists()).toBe(true);
    });

    it('shows meta section when counter is enabled', () => {
      const wrapper = mount(TextInput, {
        props: {
          showCounter: true,
        },
      });

      expect(wrapper.find('.text-input__meta').exists()).toBe(true);
    });

    it('shows meta section when maxLength is set', () => {
      const wrapper = mount(TextInput, {
        props: {
          maxLength: 100,
        },
      });

      expect(wrapper.find('.text-input__meta').exists()).toBe(true);
      expect(wrapper.find('.text-input__counter').exists()).toBe(true);
    });
  });

  describe('Event emissions', () => {
    it('emits focus event', async () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
        },
      });

      const input = wrapper.find('input');
      await input.trigger('focus');

      expect(wrapper.emitted('focus')).toBeTruthy();
      expect(wrapper.emitted('focus')?.[0]).toHaveLength(1);
    });

    it('emits blur event', async () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
        },
      });

      const input = wrapper.find('input');
      await input.trigger('blur');

      expect(wrapper.emitted('blur')).toBeTruthy();
      expect(wrapper.emitted('blur')?.[0]).toHaveLength(1);
    });

    it('emits keydown event', async () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
        },
      });

      const input = wrapper.find('input');
      await input.trigger('keydown', { key: 'A' });

      expect(wrapper.emitted('keydown')).toBeTruthy();
    });

    it('emits both input and update:modelValue events on input', async () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
        },
      });

      const input = wrapper.find('input');
      await input.setValue('new value');

      expect(wrapper.emitted('input')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('input')?.[0]).toEqual(['new value']);
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value']);
    });
  });

  describe('Suffix icon', () => {
    it('renders suffix icon when provided and no clear button', () => {
      const wrapper = mount(TextInput, {
        props: {
          suffixIcon: 'arrow-right-outline',
          modelValue: '',
        },
      });

      const suffixIcon = wrapper.find('.text-input__icon--suffix');
      expect(suffixIcon.exists()).toBe(true);
      expect(suffixIcon.attributes('test-id')).toBe(
        'tds-icon-arrow-right-outline',
      );
    });

    it('does not render suffix icon when clear button is shown', () => {
      const wrapper = mount(TextInput, {
        props: {
          suffixIcon: 'arrow-right-outline',
          modelValue: 'has value',
          clearable: true,
        },
      });

      const suffixIcon = wrapper.find('.text-input__icon--suffix');
      expect(suffixIcon.exists()).toBe(false);
      expect(wrapper.find('.text-input__clear').exists()).toBe(true);
    });
  });

  describe('Component sizing', () => {
    it('applies small size data attribute', () => {
      const wrapper = mount(TextInput, {
        props: {
          size: 'small',
        },
      });

      expect(wrapper.find('.text-input').attributes('data-size')).toBe('small');
    });

    it('applies medium size data attribute (default)', () => {
      const wrapper = mount(TextInput, {
        props: {
          size: 'medium',
        },
      });

      expect(wrapper.find('.text-input').attributes('data-size')).toBe(
        'medium',
      );
    });

    it('applies large size data attribute', () => {
      const wrapper = mount(TextInput, {
        props: {
          size: 'large',
        },
      });

      expect(wrapper.find('.text-input').attributes('data-size')).toBe('large');
    });
  });

  describe('Width and fullWidth', () => {
    it('applies custom width style', () => {
      const wrapper = mount(TextInput, {
        props: {
          width: 500,
        },
      });

      expect(wrapper.find('.text-input').attributes('style')).toContain(
        'width: 500px',
      );
    });

    it('applies full width when fullWidth is true', () => {
      const wrapper = mount(TextInput, {
        props: {
          fullWidth: true,
        },
      });

      expect(wrapper.find('.text-input').attributes('style')).toContain(
        'width: 100%',
      );
      expect(wrapper.find('.text-input').attributes('data-full-width')).toBe(
        'true',
      );
    });
  });

  describe('Validation states', () => {
    it('applies default validation state', () => {
      const wrapper = mount(TextInput, {
        props: {
          validationState: 'default',
        },
      });

      expect(wrapper.find('.text-input').attributes('data-status')).toBe(
        'default',
      );
    });

    it('hides status icon when showValidationIcon is false', () => {
      const wrapper = mount(TextInput, {
        props: {
          validationState: 'success',
          showValidationIcon: false,
        },
      });

      expect(wrapper.find('.text-input__status-icon').exists()).toBe(false);
    });
  });

  describe('Input attributes', () => {
    it('applies required attribute', () => {
      const wrapper = mount(TextInput, {
        props: {
          required: true,
          label: 'Name',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('required')).toBeDefined();
      expect(wrapper.find('.text-input__required').exists()).toBe(true);
    });

    it('applies name attribute', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'user-email',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('name')).toBe('user-email');
    });

    it('applies autocomplete attribute', () => {
      const wrapper = mount(TextInput, {
        props: {
          autocomplete: 'email',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('autocomplete')).toBe('email');
    });

    it('applies inputmode attribute', () => {
      const wrapper = mount(TextInput, {
        props: {
          inputmode: 'numeric',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('inputmode')).toBe('numeric');
    });

    it('applies pattern attribute', () => {
      const wrapper = mount(TextInput, {
        props: {
          pattern: '[0-9]{3}',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('pattern')).toBe('[0-9]{3}');
    });

    it('applies min/max for number type', () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'number',
          min: 0,
          max: 100,
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('min')).toBe('0');
      expect(input.attributes('max')).toBe('100');
    });

    it('applies step for number type', () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'number',
          step: 0.01,
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('step')).toBe('0.01');
    });

    it('applies minlength attribute', () => {
      const wrapper = mount(TextInput, {
        props: {
          minLength: 5,
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('minlength')).toBe('5');
    });
  });

  describe('ARIA and accessibility', () => {
    it('sets aria-invalid when in error state', () => {
      const wrapper = mount(TextInput, {
        props: {
          validationState: 'error',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('aria-invalid')).toBe('true');
    });

    it('sets aria-required when required', () => {
      const wrapper = mount(TextInput, {
        props: {
          required: true,
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('aria-required')).toBe('true');
    });

    it('combines helper and error in aria-describedby', () => {
      const wrapper = mount(TextInput, {
        props: {
          id: 'test-input',
          helperText: 'Helper',
          errorMessage: 'Error',
          validationState: 'error',
        },
      });

      const input = wrapper.find('input');
      const describedBy = input.attributes('aria-describedby');
      expect(describedBy).toContain('test-input-helper');
      expect(describedBy).toContain('test-input-error');
    });

    it('uses custom ariaDescribedBy when provided', () => {
      const wrapper = mount(TextInput, {
        props: {
          ariaDescribedBy: 'custom-description',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('aria-describedby')).toBe('custom-description');
    });

    it('sets aria-label fallback to placeholder when no label', () => {
      const wrapper = mount(TextInput, {
        props: {
          placeholder: 'Search here',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('aria-label')).toBe('Search here');
    });

    it('uses default aria-label when no label or placeholder', () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('aria-label')).toBe('Text field');
    });
  });

  describe('Data attributes', () => {
    it('sets data-disabled when disabled', () => {
      const wrapper = mount(TextInput, {
        props: {
          disabled: true,
        },
      });

      expect(wrapper.find('.text-input').attributes('data-disabled')).toBe(
        'true',
      );
    });

    it('sets data-focused when input is focused', async () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
        },
      });

      const input = wrapper.find('input');
      await input.trigger('focus');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('.text-input').attributes('data-focused')).toBe(
        'true',
      );
    });

    it('removes data-focused when input is blurred', async () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
        },
      });

      const input = wrapper.find('input');
      await input.trigger('focus');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('.text-input').attributes('data-focused')).toBe(
        'true',
      );

      await input.trigger('blur');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('.text-input').attributes('data-focused')).toBe(
        'false',
      );
    });

    it('sets data-has-value when input has value', () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: 'some value',
        },
      });

      expect(wrapper.find('.text-input').attributes('data-has-value')).toBe(
        'true',
      );
    });

    it('removes data-has-value when input is empty', () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
        },
      });

      expect(wrapper.find('.text-input').attributes('data-has-value')).toBe(
        'false',
      );
    });
  });

  describe('ID generation', () => {
    it('uses provided id prop', () => {
      const wrapper = mount(TextInput, {
        props: {
          id: 'custom-id',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('id')).toBe('custom-id');
    });

    it('generates id when not provided', () => {
      const wrapper = mount(TextInput, { props: { modelValue: '' } });

      const id = wrapper.find('input').attributes('id');

      expect(id).toBeTruthy();
      expect(id).toMatch(/^v-/); // Vue's useId format
    });
  });

  describe('Counter without maxLength', () => {
    it('shows counter without max when showCounter is true', () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: 'test',
          showCounter: true,
        },
      });

      const counter = wrapper.find('.text-input__counter');
      expect(counter.exists()).toBe(true);
      expect(counter.text()).toBe('4');
    });
  });

  describe('Messages container', () => {
    it('wraps messages in messages container', () => {
      const wrapper = mount(TextInput, {
        props: {
          helperText: 'Helper',
        },
      });

      const messagesContainer = wrapper.find('.text-input__messages');
      expect(messagesContainer.exists()).toBe(true);
      expect(messagesContainer.find('.text-input__helper').exists()).toBe(true);
    });

    it('shows both helper and error in messages container', () => {
      const wrapper = mount(TextInput, {
        props: {
          helperText: 'Helper',
          errorMessage: 'Error',
          validationState: 'error',
        },
      });

      const messagesContainer = wrapper.find('.text-input__messages');
      expect(messagesContainer.exists()).toBe(true);
      expect(messagesContainer.find('.text-input__helper').exists()).toBe(true);
      expect(messagesContainer.find('.text-input__error').exists()).toBe(true);
    });

    it('sets data-has-both when both helper and error present', () => {
      const wrapper = mount(TextInput, {
        props: {
          helperText: 'Helper',
          errorMessage: 'Error',
          validationState: 'error',
        },
      });

      const meta = wrapper.find('.text-input__meta');
      expect(meta.attributes('data-has-both')).toBe('true');
    });
  });

  describe('AutoFocus', () => {
    it('focuses input when autoFocus is true', async () => {
      const wrapper = mount(TextInput, {
        props: {
          autoFocus: true,
        },
        attachTo: document.body,
      });

      await wrapper.vm.$nextTick();
      await new Promise((resolve) => setTimeout(resolve, 10));

      const input = wrapper.find('input').element;
      expect(document.activeElement).toBe(input);

      wrapper.unmount();
    });

    it('does not focus input when autoFocus is false', () => {
      const wrapper = mount(TextInput, {
        props: {
          autoFocus: false,
        },
        attachTo: document.body,
      });

      const input = wrapper.find('input').element;
      expect(document.activeElement).not.toBe(input);

      wrapper.unmount();
    });
  });

  describe('Password visibility toggle', () => {
    it('renders password toggle button for password type', () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
        },
      });

      const toggleButton = wrapper.find('.text-input__password-toggle');
      expect(toggleButton.exists()).toBe(true);
    });

    it('does not render password toggle for non-password types', () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'text',
          modelValue: 'visible',
        },
      });

      const toggleButton = wrapper.find('.text-input__password-toggle');
      expect(toggleButton.exists()).toBe(false);
    });

    it('starts with password hidden (type="password")', () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe('password');
    });

    it('shows eye-closed icon when password is hidden', () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
        },
      });

      const toggleButton = wrapper.find('.text-input__password-toggle');
      const icon = toggleButton.find('[test-id="tds-icon-eye-closed-outline"]');
      expect(icon.exists()).toBe(true);
    });

    it('toggles to visible (type="text") when clicking toggle button', async () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
        },
      });

      const toggleButton = wrapper.find('.text-input__password-toggle');
      await toggleButton.trigger('click');

      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe('text');
    });

    it('shows eye-open icon when password is visible', async () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
        },
      });

      const toggleButton = wrapper.find('.text-input__password-toggle');
      await toggleButton.trigger('click');

      const icon = toggleButton.find('[test-id="tds-icon-eye-open-outline"]');
      expect(icon.exists()).toBe(true);
    });

    it('toggles back to hidden when clicking toggle button again', async () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
        },
      });

      const toggleButton = wrapper.find('.text-input__password-toggle');
      await toggleButton.trigger('click'); // Show
      await toggleButton.trigger('click'); // Hide

      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe('password');
    });

    it('does not show clear button for password type even when clearable', () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
          clearable: true,
        },
      });

      const clearButton = wrapper.find('.text-input__clear');
      expect(clearButton.exists()).toBe(false);
    });

    it('shows password toggle instead of suffix icon for password type', () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
          suffixIcon: 'arrow-right-outline',
        },
      });

      const toggleButton = wrapper.find('.text-input__password-toggle');
      const suffixIcon = wrapper.find('.text-input__icon--suffix');
      expect(toggleButton.exists()).toBe(true);
      expect(suffixIcon.exists()).toBe(false);
    });

    it('has correct aria-label when password is hidden', () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
        },
      });

      const toggleButton = wrapper.find('.text-input__password-toggle');
      expect(toggleButton.attributes('aria-label')).toBe('Show password');
    });

    it('has correct aria-label when password is visible', async () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
        },
      });

      const toggleButton = wrapper.find('.text-input__password-toggle');
      await toggleButton.trigger('click');

      expect(toggleButton.attributes('aria-label')).toBe('Hide password');
    });

    it('has aria-pressed attribute reflecting visibility state', async () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
        },
      });

      const toggleButton = wrapper.find('.text-input__password-toggle');
      expect(toggleButton.attributes('aria-pressed')).toBe('false');

      await toggleButton.trigger('click');
      expect(toggleButton.attributes('aria-pressed')).toBe('true');
    });

    it('disables toggle button when input is disabled', () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
          disabled: true,
        },
      });

      const toggleButton = wrapper.find('.text-input__password-toggle');
      expect(toggleButton.attributes('disabled')).toBeDefined();
    });

    it('does not toggle visibility when disabled', async () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: 'secret',
          disabled: true,
        },
      });

      const toggleButton = wrapper.find('.text-input__password-toggle');
      await toggleButton.trigger('click');

      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe('password');
    });
  });

  describe('MinLength real-time validation', () => {
    it('shows error state when value is shorter than minLength', async () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
          minLength: 8,
        },
      });

      const input = wrapper.find('input');
      await input.setValue('short');
      await wrapper.setProps({ modelValue: 'short' });

      expect(wrapper.find('.text-input').attributes('data-status')).toBe(
        'error',
      );
      expect(wrapper.find('.text-input__error').exists()).toBe(true);
      expect(wrapper.find('.text-input__error').text()).toBe(
        'Minimum 8 characters required',
      );
    });

    it('does not show error when value meets minLength', async () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
          minLength: 8,
        },
      });

      const input = wrapper.find('input');
      await input.setValue('longvalue123');
      await wrapper.setProps({ modelValue: 'longvalue123' });

      expect(wrapper.find('.text-input').attributes('data-status')).toBe(
        'default',
      );
      expect(wrapper.find('.text-input__error').exists()).toBe(false);
    });

    it('does not show error until user starts typing', () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
          minLength: 8,
        },
      });

      expect(wrapper.find('.text-input').attributes('data-status')).toBe(
        'default',
      );
      expect(wrapper.find('.text-input__error').exists()).toBe(false);
    });

    it('does not show error for empty value after typing and clearing', async () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
          minLength: 8,
        },
      });

      const input = wrapper.find('input');
      await input.setValue('hi');
      await wrapper.setProps({ modelValue: 'hi' });
      await input.setValue('');
      await wrapper.setProps({ modelValue: '' });

      expect(wrapper.find('.text-input').attributes('data-status')).toBe(
        'default',
      );
    });

    it('shows error icon when minLength validation fails', async () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
          minLength: 8,
        },
      });

      const input = wrapper.find('input');
      await input.setValue('short');
      await wrapper.setProps({ modelValue: 'short' });

      const statusIcon = wrapper.find('.text-input__status-icon');
      expect(statusIcon.exists()).toBe(true);
      expect(statusIcon.attributes('test-id')).toBe(
        'tds-icon-error-filled-red',
      );
    });

    it('parent validation state takes precedence over minLength validation', async () => {
      const wrapper = mount(TextInput, {
        props: {
          modelValue: '',
          minLength: 8,
          validationState: 'success',
        },
      });

      const input = wrapper.find('input');
      await input.setValue('short');
      await wrapper.setProps({ modelValue: 'short' });

      expect(wrapper.find('.text-input').attributes('data-status')).toBe(
        'success',
      );
    });

    it('works with password type inputs', async () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'password',
          modelValue: '',
          minLength: 8,
        },
      });

      const input = wrapper.find('input');
      await input.setValue('short');
      await wrapper.setProps({ modelValue: 'short' });

      expect(wrapper.find('.text-input').attributes('data-status')).toBe(
        'error',
      );
      expect(wrapper.find('.text-input__error').text()).toBe(
        'Minimum 8 characters required',
      );
    });

    it('works with email type inputs', async () => {
      const wrapper = mount(TextInput, {
        props: {
          type: 'email',
          modelValue: '',
          minLength: 5,
        },
      });

      const input = wrapper.find('input');
      await input.setValue('ab');
      await wrapper.setProps({ modelValue: 'ab' });

      expect(wrapper.find('.text-input').attributes('data-status')).toBe(
        'error',
      );
    });
  });
});
