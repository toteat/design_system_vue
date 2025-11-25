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

  it('prioritizes error message over helper text', () => {
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
    expect(wrapper.find('.text-input__helper').exists()).toBe(false);
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
});
