<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import type { CheckboxProps } from '@/types';
import Icon from '../Icon/Icon.vue';
import { COMPONENT_SIZE_MAP } from '@/constants';

const props = withDefaults(defineProps<CheckboxProps>(), {
  checked: false,
  disabled: false,
  size: 'medium',
  color: 'primary',
  checkboxPosition: 'left',
  fullWidth: false,
  title: undefined,
  description: undefined,
  card: false,
});

const emit = defineEmits<{
  change: [checked: boolean];
  'update:checked': [checked: boolean];
}>();

// Generate unique ID for accessibility using component UID
const instance = getCurrentInstance();
const checkboxId = `checkbox-${instance?.uid ?? Math.random().toString(36).substring(2, 11)}`;

// Map size prop to rem values for icon sizing using shared constant
const iconSize = computed(() => {
  return COMPONENT_SIZE_MAP[props.size] || COMPONENT_SIZE_MAP.medium;
});

// Determine icon color based on state
const iconColor = computed(() => {
  if (props.disabled) {
    return 'neutral-300';
  }
  return props.checked ? props.color : 'neutral-400';
});

// Handle checkbox toggle
const handleClick = () => {
  if (props.disabled) return;

  const newValue = !props.checked;
  emit('update:checked', newValue);
  emit('change', newValue);
};
</script>

<template>
  <label
    :for="checkboxId"
    class="tot-ds-root checkbox"
    :class="{
      'checkbox-checked': checked,
      'checkbox-disabled': disabled,
    }"
    :data-checkbox-position="checkboxPosition"
    :data-full-width="fullWidth"
    :data-size="size"
    :data-card="card || undefined"
    :test-id="`tds-checkbox-${checked ? 'checked' : 'unchecked'}`"
  >
    <input
      :id="checkboxId"
      type="checkbox"
      class="checkbox__native"
      :checked="checked"
      :disabled="disabled"
      :aria-checked="checked"
      :aria-disabled="disabled"
      @change="handleClick"
    />
    <span class="checkbox__visual">
      <Icon
        v-if="checked"
        name="checkbox-checked"
        :size="iconSize"
        :color="iconColor"
      />
      <Icon
        v-else
        name="checkbox-unchecked"
        :size="iconSize"
        :color="iconColor"
      />
    </span>
    <!-- Card mode: title and description -->
    <span v-if="title" class="checkbox__content">
      <span class="checkbox__title">{{ title }}</span>
      <span v-if="description" class="checkbox__description">{{
        description
      }}</span>
    </span>
    <!-- Default mode: slot content -->
    <span v-else-if="$slots.default" class="checkbox__label">
      <slot />
    </span>
  </label>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.checkbox {
    --checkbox-gap: 0.5rem;
    --checkbox-padding-y: 0;
    --checkbox-padding-x: 0;
    --checkbox-content-gap: 2px;
    --checkbox-transition: 150ms ease-out;

    display: inline-flex;
    align-items: center;
    gap: var(--checkbox-gap);
    padding: var(--checkbox-padding-y) var(--checkbox-padding-x);
    cursor: pointer;
    user-select: none;
    position: relative;
    font-family: inherit;

    /* Hide native checkbox but keep it accessible */
    .checkbox__native {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    .checkbox__visual {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .checkbox__label {
      flex: 1;
    }

    /* Content container for card mode */
    .checkbox__content {
      display: flex;
      flex-direction: column;
      gap: var(--checkbox-content-gap);
      min-width: 0;
    }

    /* Title */
    .checkbox__title {
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--color-neutral-500);
      line-height: var(--text-sm--line-height);
    }

    /* Description */
    .checkbox__description {
      font-size: var(--text-xs);
      font-weight: 400;
      color: var(--color-neutral-400);
      line-height: var(--text-xs--line-height);
    }

    /* Size variants inherit from global .tot-ds-root[data-size] definitions in style.css */

    /* Default: checkbox on left, label on right */
    &[data-checkbox-position='left'] {
      .checkbox__visual {
        order: 1;
      }

      .checkbox__label,
      .checkbox__content {
        order: 2;
      }
    }

    /* Checkbox on right, label on left */
    &[data-checkbox-position='right'] {
      .checkbox__visual {
        order: 2;
      }

      .checkbox__label,
      .checkbox__content {
        order: 1;
      }
    }

    /* Full width variant - using data attribute */
    &[data-full-width='true'] {
      display: flex;
      width: 100%;
    }

    /* Focus state from native checkbox */
    .checkbox__native:focus-visible + .checkbox__visual {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    &:hover:not(.checkbox-disabled) .checkbox__visual {
      opacity: 0.8;
    }

    &.checkbox-disabled {
      cursor: not-allowed;

      .checkbox__visual {
        opacity: 0.5;
      }

      .checkbox__title {
        color: var(--color-neutral-400);
      }

      .checkbox__description {
        color: var(--color-neutral-400);
      }
    }

    &:not(.checkbox-disabled):active .checkbox__visual {
      opacity: 0.6;
    }

    /* Card variant */
    &[data-card] {
      --checkbox-gap: var(--radius-lg);
      --checkbox-padding-y: var(--radius-lg);
      --checkbox-padding-x: var(--radius-xl);

      background-color: var(--color-white);
      border: 1px solid var(--color-neutral-200);
      border-radius: var(--radius-base);
      transition:
        border-color var(--checkbox-transition),
        box-shadow var(--checkbox-transition);

      /* Card hover state */
      &:not(.checkbox-disabled):hover {
        border-color: var(--color-neutral-300);
      }

      /* Card focus state */
      &:has(.checkbox__native:focus-visible) {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;

        .checkbox__visual {
          outline: none;
        }
      }

      /* Card checked state */
      &.checkbox-checked {
        border-color: var(--color-primary);

        &:hover:not(.checkbox-disabled) {
          border-color: var(--color-primary);
        }
      }

      /* Card disabled state */
      &.checkbox-disabled {
        background-color: var(--color-neutral-100);
        border-color: var(--color-neutral-400);
      }
    }

    /* Size variants for card mode */
    &[data-size='tiny'] {
      &[data-card] {
        --checkbox-gap: var(--radius-sm);
        --checkbox-padding-y: var(--radius-sm);
        --checkbox-padding-x: var(--radius-base);
        min-height: 2rem;
      }

      .checkbox__title {
        font-size: var(--text-xs);
        line-height: var(--text-xs--line-height);
      }

      .checkbox__description {
        display: none;
      }
    }

    &[data-size='small'] {
      &[data-card] {
        --checkbox-gap: var(--radius-base);
        --checkbox-padding-y: var(--radius-base);
        --checkbox-padding-x: var(--radius-lg);
        min-height: 2.75rem;
      }

      .checkbox__title {
        font-size: var(--text-xs);
        line-height: var(--text-xs--line-height);
      }

      .checkbox__description {
        font-size: var(--text-xs);
      }
    }

    &[data-size='medium'] {
      &[data-card] {
        min-height: 3.25rem;
      }
    }

    &[data-size='large'] {
      &[data-card] {
        --checkbox-gap: var(--radius-xl);
        --checkbox-padding-y: var(--radius-xl);
        --checkbox-padding-x: var(--text-lg);
        min-height: 4.5rem;
      }

      .checkbox__title {
        font-size: var(--text-lg);
        line-height: var(--text-lg--line-height);
      }

      .checkbox__description {
        font-size: var(--text-sm);
      }
    }
  }
}
</style>
