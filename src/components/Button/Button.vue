<script lang="ts" setup>
import type { ButtonProps } from '@/types';

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  disabled: false,
  isFull: false,
  size: 'medium',
  typeButton: 'button',
  loading: false,
  text: 'Loading...',
  selected: false,
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
        'p-[.375rem]': props.size === 'auto',
        'selected': props.selected,
      },
    ]"
    :disabled="props.disabled"
  >
    <i class="spinner" v-if="props.loading" />
    <span v-if="props.type !== 'icon'">
      {{ props.text }}
    </span>
  </button>
</template>

<style scoped>
@import '@/style.css';

/* Base button styles */
.tot-ds-root {
  &.btn {
    @apply flex leading-none border border-transparent items-center justify-center gap-2 rounded-full font-semibold;
    transition-property: border-color, background-color, opacity;
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
    }

    &.btn-size-small {
      @apply text-xs min-w-16 min-h-11 px-3;
    }

    &.btn-size-medium {
      @apply text-base min-w-19 min-h-15 px-4;
    }

    &.btn-size-large {
      @apply text-2xl min-w-23 min-h-20 px-5;
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

    /* Secondary White Button */
    &.btn-secondary-white {
      @apply bg-neutral text-secondary;
    }

    /* Tertiary Button */
    &.btn-tertiary {
      @apply bg-tertiary text-secondary;
    }

    /* Outline Button */
    &.btn-outline {
      @apply    border-secondary text-secondary;
      &:not(:disabled) {
        &.selected,
        &:active {
          border-color: rgba(0, 0, 0, 0.5);
        }
      }
    }

    /* Text Button */
    &.btn-text {
      @apply text-secondary;
      border: 0 0 0 1px;
    }

    /* Navigate Button */
    &.btn-navigate {
      @apply bg-neutral-200 text-secondary;
    }


    /* Common states */
    &:disabled {
      @apply cursor-not-allowed;
      filter: grayscale(1) opacity(0.25);
    }
  }
}
</style>
