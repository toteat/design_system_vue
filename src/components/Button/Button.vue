<script lang="ts" setup>
import type { ButtonProps } from '@/types';
import Spinner from '../Spinner/Spinner.vue';
import Icon from '../Icon/Icon.vue';

// Map button sizes to spinner dimensions
const BUTTON_SIZE_MAP = {
  smaller: 4,
  small: 4,
  medium: 6,
  large: 8,
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
});
</script>

<template>
  <button
    :type="typeButton || 'button'"
    class="tot-ds-root"
    :class="[
      'btn',
      `btn-${props.type}`,
      `btn-size-${props.size}`,
      {
        'btn-full': isFull,
        'btn-loading': props.loading && !props.disabled,
        selected: props.selected,
      },
    ]"
    :disabled="props.disabled"
  >
    <Spinner v-if="props.loading" :dimension="getSizeDimension(props.size)" />
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
@import '@/style.css';

/* Base button styles */
.tot-ds-root {
  &.btn {
    @apply flex leading-none border border-transparent items-center justify-center gap-2 rounded-full font-semibold;
    border-width: 1.5px;
    transition-property: border-color, background-color, opacity, color;
    transition-duration: 0.25s;
    transition-timing-function: ease-in-out;
    cursor: pointer;

    /* Text content always wrapped */
    & span {
      @apply whitespace-nowrap;
    }

    &:not(:disabled) {
      &.selected,
      &:active {
        border-color: rgba(255, 255, 255, 0.5);
      }
    }

    &.btn-full {
      @apply w-full;
    }

    /* Button sizes */
    &.btn-size-smaller {
      @apply text-xs min-w-16 min-h-8 px-3;

      .spinner {
        @apply w-3 h-3;
      }
    }

    &.btn-size-small {
      @apply text-xs min-w-16 min-h-11 px-3;

      .spinner {
        @apply w-3 h-3;
      }
    }

    &.btn-size-medium {
      @apply text-base min-w-19 min-h-15 px-4;

      .spinner {
        @apply w-4 h-4;
      }
    }

    &.btn-size-large {
      @apply text-2xl min-w-23 min-h-20 px-5;

      .spinner {
        @apply w-8 h-8;
      }
    }

    &:hover:not(:disabled),
    &.btn-loading {
      @apply opacity-30;
    }

    /* Primary Button */
    &.btn-primary {
      @apply bg-primary text-neutral;
    }

    /* Secondary Button */
    &.btn-secondary {
      @apply bg-secondary text-neutral;
    }

    /* Outline Button */
    &.btn-outline {
      @apply border-secondary text-secondary;
      &:not(:disabled) {
        &.selected,
        &:hover {
          @apply border-primary;
        }

        &.selected {
          @apply text-primary border-primary;
        }

        &:active {
          @apply border-primary-light text-primary-light;

          svg {
            @apply fill-primary-light;
          }
        }
      }
    }

    /* Text Button */
    &.btn-text {
      @apply text-secondary;
      border: 0 0 0 1px;
    }

    /* Common states */
    &:disabled {
      @apply cursor-not-allowed;
      filter: grayscale(1) opacity(0.25);
    }

    svg {
      transition-property: fill;
      transition-duration: 0.25s;
      transition-timing-function: ease-in-out;
    }
  }
}
</style>
