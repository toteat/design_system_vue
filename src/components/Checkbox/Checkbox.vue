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
    <span v-if="$slots.default" class="checkbox__label">
      <slot />
    </span>
  </label>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.checkbox {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
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

    /* Size variants inherit from global .tot-ds-root[data-size] definitions in style.css */

    /* Default: checkbox on left, label on right */
    &[data-checkbox-position='left'] {
      .checkbox__visual {
        order: 1;
      }

      .checkbox__label {
        order: 2;
      }
    }

    /* Checkbox on right, label on left */
    &[data-checkbox-position='right'] {
      .checkbox__visual {
        order: 2;
      }

      .checkbox__label {
        order: 1;
      }
    }

    /* Full width variant - using data attribute */
    &[data-full-width='true'] {
      display: flex;
      width: 100%;
    }

    /* Focus state from native checkbox */
    .checkbox__native:focus + .checkbox__visual {
      outline: none;
      opacity: 0.8;
    }

    &:hover:not(.checkbox-disabled) .checkbox__visual {
      opacity: 0.8;
    }

    &.checkbox-disabled {
      cursor: not-allowed;

      .checkbox__visual {
        opacity: 0.5;
      }
    }

    &:not(.checkbox-disabled):active .checkbox__visual {
      opacity: 0.6;
    }
  }
}
</style>
