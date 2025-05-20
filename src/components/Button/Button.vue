<script lang="ts" setup>
import type { ButtonProps } from '@/types';
import Spinner from '../Spinner/Spinner.vue';
import Icon from '../Icon/Icon.vue';
import { computed } from 'vue';

// Map button sizes to spinner dimensions
const BUTTON_SIZE_MAP = {
  smaller: 1,
  small: 1,
  medium: 1.5,
  large: 2,
} as const;

const ICON_COLOR_MAP = {
  primary: 'white',
  secondary: 'white',
  outline: undefined, // Special case, handled in CSS
  text: 'black',
} as const;

// Helper function to get spinner dimension based on button size
const getSizeDimension = (buttonSize: ButtonProps['size']) => {
  return buttonSize ? BUTTON_SIZE_MAP[buttonSize] : BUTTON_SIZE_MAP.small;
};

const getIconColor = (buttonType: ButtonProps['type']) => {
  return buttonType ? ICON_COLOR_MAP[buttonType] : ICON_COLOR_MAP.primary;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  disabled: false,
  isFull: false,
  size: 'medium',
  typeButton: 'button',
  loading: false,
  text: 'Loading...',
  selected: false,
  iconName: undefined,
  onlyIcon: false,
  clickEventName: 'button-click-default-name',
});

const buttonClasses = computed(() => [
  'tot-ds-root',
  'btn',
  `btn-${props.type}`,
  `btn-size-${props.size}`,
  {
    'btn-full': props.isFull,
    'btn-loading': props.loading && !props.disabled,
    selected: props.selected,
  },
]);
</script>

<template>
  <button
    :type="typeButton || 'button'"
    :class="buttonClasses"
    :disabled="props.disabled"
  >
    <Spinner v-if="props.loading" :size="getSizeDimension(props.size)" />
    <span v-if="props.text && !props.onlyIcon">
      {{ props.text }}
    </span>
    <Icon
      v-if="props.iconName"
      :name="props.iconName"
      :size="getSizeDimension(props.size)"
      :color="getIconColor(props.type)"
    />
  </button>
</template>

<style scoped>
@import '../../style.css';
/* Base button styles */
.tot-ds-root {
  &.btn {
    display: flex;
    line-height: 1;
    border: 1.5px solid transparent;
    background-color: transparent;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 9999px;
    font-weight: 600;
    transition:
      border-color 0.25s ease-in-out,
      background-color 0.25s ease-in-out,
      opacity 0.25s ease-in-out,
      color 0.25s ease-in-out;
    cursor: pointer;

    /* Text content always wrapped */
    & span {
      white-space: nowrap;
    }

    &:not(:disabled) {
      &.selected,
      &:active {
        border-color: rgba(255, 255, 255, 0.5);
      }
    }

    &.btn-full {
      width: 100%;
    }

    /* Button sizes */
    &.btn-size-smaller {
      font-size: var(--text-xs);
      line-height: var(--text-xs--line-height);
      min-width: 4rem;
      min-height: 2rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }

    &.btn-size-small {
      font-size: var(--text-xs);
      line-height: var(--text-xs--line-height);
      min-width: 4rem;
      min-height: 2.75rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }

    &.btn-size-medium {
      font-size: var(--text-base);
      line-height: var(--text-base--line-height);
      min-width: 4.75rem;
      min-height: 3.75rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }

    &.btn-size-large {
      font-size: var(--text-2xl);
      line-height: var(--text-2xl--line-height);
      min-width: 5.75rem;
      min-height: 5rem;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }

    &:hover:not(:disabled),
    &.btn-loading {
      opacity: 0.3;
    }

    /* Primary Button */
    &.btn-primary {
      background-color: var(--color-primary);
      color: var(--color-neutral);
    }

    /* Secondary Button */
    &.btn-secondary {
      background-color: var(--color-secondary);
      color: var(--color-neutral);
    }

    /* Outline Button */
    &.btn-outline {
      border-color: var(--color-secondary);
      color: var(--color-secondary);

      &:not(:disabled) {
        &.selected,
        &:hover {
          border-color: var(--color-primary);
        }

        &.selected {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        &:active {
          border-color: var(--color-primary-light);
          color: var(--color-primary-light);

          svg {
            fill: var(--color-primary-light);
          }
        }
      }
    }

    /* Text Button */
    &.btn-text {
      color: var(--color-secondary);
      border-width: 0;
      border-style: solid;
      border-color: currentColor;
    }

    /* Common states */
    &:disabled {
      cursor: not-allowed;
      filter: grayscale(1) opacity(0.25);
    }

    svg {
      flex-shrink: 0;
      transition-property: fill;
      transition-duration: 0.25s;
      transition-timing-function: ease-in-out;
    }
  }
}
</style>
