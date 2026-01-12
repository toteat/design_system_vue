<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useId } from 'vue';
import { sanitizeTextInput } from '@/utils/string';
import Icon from '../Icon/Icon.vue';
import type { TextInputProps, TextInputInputMode } from '@/types';

const props = withDefaults(defineProps<TextInputProps>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  helperText: '',
  helperTextAlign: 'right',
  errorMessage: '',
  disabled: false,
  readonly: false,
  required: false,
  type: 'text',
  autocomplete: 'on',
  maxLength: undefined,
  minLength: undefined,
  min: undefined,
  max: undefined,
  step: undefined,
  pattern: undefined,
  prefixIcon: undefined,
  suffixIcon: undefined,
  clearable: false,
  autoFocus: false,
  size: 'medium',
  fullWidth: false,
  validationState: 'default',
  showCounter: false,
  width: 404,
  ariaLabel: undefined,
  ariaDescribedBy: undefined,
  name: undefined,
  id: undefined,
  showValidationIcon: true,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  input: [value: string];
  change: [value: string];
  focus: [event: globalThis.FocusEvent];
  blur: [event: globalThis.FocusEvent];
  clear: [];
  keydown: [event: globalThis.KeyboardEvent];
  enter: [value: string];
}>();

const inputRef = ref<globalThis.HTMLInputElement | null>(null);
const isFocused = ref(false);
const generatedId = useId();
const isPasswordVisible = ref(false);

const isPasswordType = computed(() => props.type === 'password');
const resolvedType = computed(() => {
  if (isPasswordType.value && isPasswordVisible.value) {
    return 'text';
  }
  return props.type;
});
const passwordToggleIcon = computed(() =>
  isPasswordVisible.value ? 'eye-open-outline' : 'eye-closed-outline',
);

const resolvedId = computed(() => {
  return props.id && props.id.trim().length > 0 ? props.id : generatedId;
});

const helperId = computed(() =>
  props.helperText ? `${resolvedId.value}-helper` : undefined,
);
const errorId = computed(() =>
  props.validationState === 'error' && props.errorMessage
    ? `${resolvedId.value}-error`
    : undefined,
);
const describedBy = computed(() => {
  if (props.ariaDescribedBy) {
    return props.ariaDescribedBy;
  }

  return [helperId.value, errorId.value].filter(Boolean).join(' ') || undefined;
});

const showErrorMessage = computed(
  () => props.validationState === 'error' && Boolean(props.errorMessage),
);
const showHelperText = computed(() => Boolean(props.helperText));
const hasValue = computed(() => Boolean(sanitizedModelValue.value.length));
const showClearButton = computed(
  () =>
    props.clearable &&
    hasValue.value &&
    !props.disabled &&
    !props.readonly &&
    !isPasswordType.value,
);
const hasMaxLength = computed(() => typeof props.maxLength === 'number');
const shouldShowCounter = computed(
  () => hasMaxLength.value || props.showCounter,
);
const characterCount = computed(() => sanitizedModelValue.value.length);
const shouldShowMeta = computed(
  () =>
    showHelperText.value || showErrorMessage.value || shouldShowCounter.value,
);

const iconSizeMap = {
  small: 1,
  medium: 1.25,
  large: 1.5,
} as const;
const iconSize = computed(() => iconSizeMap[props.size]);

const statusIconName = computed(() => {
  if (!props.showValidationIcon) return undefined;
  if (props.validationState === 'success') return 'success-filled-green';
  if (props.validationState === 'warning') return 'warning-outline';
  if (props.validationState === 'error') return 'error-filled-red';
  return undefined;
});

const resolvedInputmode = computed<TextInputInputMode | undefined>(
  () => props.inputmode,
);

const componentStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.fullWidth) {
    style.width = '100%';
  } else if (props.width) {
    style.width = `${props.width}px`;
  }

  return style;
});

const sanitizeInputValue = (value: string): string => {
  return sanitizeTextInput(value, {
    allowNewLines: false,
    maxLength: props.maxLength,
  });
};

const sanitizedModelValue = computed(() =>
  sanitizeInputValue(props.modelValue ?? ''),
);

const computedAriaLabel = computed(() => {
  if (props.label) {
    return undefined;
  }

  if (props.ariaLabel) {
    return props.ariaLabel;
  }

  return props.placeholder || 'Text field';
});

function updateValue(newValue: string): void {
  const sanitizedValue = sanitizeInputValue(newValue);
  emit('update:modelValue', sanitizedValue);
  emit('input', sanitizedValue);
}

function isNegativeNumberInput(value: string): boolean {
  if (props.type === 'number' && (props.min === 0 || props.min === '0')) {
    return /^-/.test(value);
  }
  return false;
}

function handleInput(event: globalThis.Event): void {
  const target = event.target as globalThis.HTMLInputElement | null;
  let value = target?.value ?? '';
  if (isNegativeNumberInput(value)) {
    value = value.replaceAll('-', '');
    if (target) target.value = value;
  }
  updateValue(value);
}

function handleChange(event: globalThis.Event): void {
  const target = event.target as globalThis.HTMLInputElement | null;
  const sanitizedValue = sanitizeInputValue(target?.value ?? '');
  emit('change', sanitizedValue);
}

function handleFocus(event: globalThis.FocusEvent): void {
  isFocused.value = true;
  emit('focus', event);
}

function handleBlur(event: globalThis.FocusEvent): void {
  isFocused.value = false;
  emit('blur', event);
}

function handleKeydown(event: globalThis.KeyboardEvent): void {
  emit('keydown', event);

  if (event.key === 'Enter') {
    emit('enter', sanitizedModelValue.value);
  }
}

function handleKeypress(event: globalThis.KeyboardEvent): void {
  if (
    props.type === 'number' &&
    (props.min === 0 || props.min === '0') &&
    (event.key === '-' || event.key === '+')
  ) {
    event.preventDefault();
  }
}

function handleClear(): void {
  if (props.disabled || props.readonly) return;

  updateValue('');
  emit('clear');

  nextTick(() => {
    inputRef.value?.focus();
  });
}

function togglePasswordVisibility(): void {
  if (props.disabled) return;
  isPasswordVisible.value = !isPasswordVisible.value;
}

onMounted(() => {
  if (props.autoFocus) {
    nextTick(() => inputRef.value?.focus());
  }
});
</script>

<template>
  <div
    class="tot-ds-root text-input"
    :aria-disabled="props.disabled || undefined"
    :aria-readonly="props.readonly || undefined"
    :data-size="props.size"
    :data-status="props.validationState"
    :data-disabled="props.disabled"
    :data-focused="isFocused"
    :data-has-value="hasValue"
    :data-full-width="props.fullWidth"
    :style="componentStyle"
  >
    <label v-if="props.label" class="text-input__label" :for="resolvedId">
      <span>{{ props.label }}</span>
      <span v-if="props.required" class="text-input__required">*</span>
    </label>

    <div class="text-input__field">
      <Icon
        v-if="props.prefixIcon"
        class="text-input__icon text-input__icon--prefix"
        :name="props.prefixIcon"
        :size="iconSize"
        aria-hidden="true"
      />

      <input
        ref="inputRef"
        class="text-input__control"
        :id="resolvedId"
        :name="props.name"
        :type="resolvedType"
        :value="sanitizedModelValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :maxlength="props.maxLength"
        :minlength="props.minLength"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        :pattern="props.pattern"
        :autocomplete="props.autocomplete"
        :inputmode="resolvedInputmode"
        :aria-invalid="props.validationState === 'error'"
        :aria-required="props.required || undefined"
        :aria-describedby="describedBy"
        :aria-label="computedAriaLabel"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @keypress="handleKeypress"
      />

      <button
        v-if="showClearButton"
        class="text-input__clear"
        type="button"
        aria-label="Clear input"
        @click="handleClear"
      >
        <Icon name="close-outline" :size="1" aria-hidden="true" />
      </button>

      <button
        v-else-if="isPasswordType"
        class="text-input__password-toggle"
        type="button"
        :aria-label="isPasswordVisible ? 'Hide password' : 'Show password'"
        :aria-pressed="isPasswordVisible"
        :disabled="props.disabled"
        @click="togglePasswordVisibility"
      >
        <Icon :name="passwordToggleIcon" :size="iconSize" aria-hidden="true" />
      </button>

      <Icon
        v-else-if="props.suffixIcon"
        class="text-input__icon text-input__icon--suffix"
        :name="props.suffixIcon"
        :size="iconSize"
        aria-hidden="true"
      />

      <Icon
        v-if="statusIconName"
        class="text-input__status-icon"
        :name="statusIconName"
        :size="iconSize"
        aria-hidden="true"
      />
    </div>

    <div
      v-if="shouldShowMeta"
      class="text-input__meta"
      :data-helper-align="props.helperTextAlign"
      :data-has-both="showHelperText && showErrorMessage"
    >
      <div
        v-if="showHelperText || showErrorMessage"
        class="text-input__messages"
      >
        <p v-if="showHelperText" class="text-input__helper" :id="helperId">
          {{ props.helperText }}
        </p>

        <p v-if="showErrorMessage" class="text-input__error" :id="errorId">
          {{ props.errorMessage }}
        </p>
      </div>

      <span v-if="shouldShowCounter" class="text-input__counter">
        {{ characterCount
        }}<span v-if="props.maxLength">/{{ props.maxLength }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.text-input {
    --text-input-error-border: var(--color-red);
    --text-input-warning-border: color-mix(
      in srgb,
      var(--color-yellow) 75%,
      var(--color-red) 25%
    );

    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    &[data-full-width='true'] {
      width: 100%;
    }

    &[data-disabled='true'] {
      .text-input__label,
      .text-input__helper,
      .text-input__counter {
        color: var(--color-neutral-400);
      }

      .text-input__control {
        color: var(--color-neutral-400);
      }

      .text-input__icon,
      .text-input__status-icon {
        color: var(--color-neutral-300);
      }
    }

    .text-input__label {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-neutral-500);
      display: inline-flex;
      gap: var(--spacing-xs);
      align-items: center;
      margin-inline: var(--spacing-md);
    }

    .text-input__required {
      color: var(--color-red);
    }

    .text-input__field {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      border-radius: var(--radius-base);
      border: 1px solid var(--color-neutral-200);
      padding: var(--spacing-sm) 0.75rem;
      transition:
        border-color 160ms ease,
        background-color 160ms ease,
        box-shadow 160ms ease;
      background-color: var(--color-white);
      min-height: 3.75rem;
    }

    &[data-size='small'] .text-input__field {
      min-height: 2.75rem;
    }

    &[data-size='large'] .text-input__field {
      min-height: 5rem;
    }

    &[data-focused='true'] .text-input__field {
      border-color: var(--color-neutral-500);
    }

    &[data-status='error'] .text-input__field {
      border-color: var(--text-input-error-border);
      box-shadow: 0 0 0 1px
        color-mix(in srgb, var(--text-input-error-border) 35%, transparent);
    }

    &[data-status='success'] .text-input__field {
      border-color: var(--color-green);
      box-shadow: 0 0 0 1px
        color-mix(in srgb, var(--color-green) 25%, transparent);
    }

    &[data-status='warning'] .text-input__field {
      border-color: var(--text-input-warning-border);
      box-shadow: 0 0 0 1px
        color-mix(in srgb, var(--text-input-warning-border) 35%, transparent);
    }

    &[data-disabled='true'] .text-input__field {
      background-color: var(--color-neutral-100);
      border-color: var(--color-neutral-200);
      box-shadow: none;
    }

    .text-input__control {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: var(--color-secondary);
      font-size: var(--text-base);
      line-height: var(--text-base--line-height);
      height: 100%;
      min-height: 100%;
      min-width: 0;
      text-overflow: ellipsis;

      &::placeholder {
        color: var(--color-neutral-400);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }

    &[data-size='small'] .text-input__control {
      font-size: var(--text-sm);
      line-height: var(--text-sm--line-height);
    }

    &[data-size='large'] .text-input__control {
      font-size: var(--text-lg);
      line-height: var(--text-lg--line-height);
    }

    .text-input__icon {
      color: var(--color-neutral-400);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .text-input__status-icon {
      color: var(--color-neutral-400);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    &[data-status='success'] .text-input__status-icon {
      color: var(--color-green);
    }

    &[data-status='warning'] .text-input__status-icon {
      color: var(--text-input-warning-border);
    }

    &[data-status='error'] .text-input__status-icon {
      color: var(--text-input-error-border);
    }

    .text-input__clear,
    .text-input__password-toggle {
      border: none;
      background: none;
      padding: var(--spacing-xs);
      border-radius: var(--radius-pill);
      color: var(--color-neutral-400);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 160ms ease;

      &:hover:not(:disabled) {
        background-color: color-mix(
          in srgb,
          var(--color-neutral-200) 60%,
          transparent
        );
      }

      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }

      &:disabled {
        cursor: not-allowed;
        color: var(--color-neutral-300);
      }
    }

    .text-input__meta {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--spacing-sm);
      min-height: 1rem;
      margin-inline: var(--spacing-md);

      &[data-helper-align='left'] {
        flex-direction: row;

        .text-input__messages {
          order: 0;
        }

        .text-input__counter {
          order: 1;
          margin-left: auto;
        }
      }

      &[data-helper-align='right'] {
        flex-direction: row-reverse;

        .text-input__messages {
          order: 1;
          margin-left: auto;
        }

        .text-input__counter {
          order: 0;
          margin-left: 0;
        }
      }
    }

    .text-input__messages {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      flex: 1;
      min-width: 0;
    }

    .text-input__helper {
      font-size: var(--text-sm);
      color: var(--color-neutral-400);
      margin: 0;
    }

    .text-input__error {
      font-size: var(--text-sm);
      color: var(--color-red);
      margin: 0;
    }

    .text-input__counter {
      font-size: var(--text-sm);
      color: var(--color-neutral-400);
      flex-shrink: 0;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .tot-ds-root.text-input {
    transition: none;

    .text-input__field,
    .text-input__clear,
    .text-input__password-toggle {
      transition: none;
    }
  }
}
</style>
