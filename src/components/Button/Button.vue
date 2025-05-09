<script lang="ts" setup>
import type { ButtonProps } from '@/types';

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  disabled: false,
  isFull: false,
  size: 'medium',
  typeButton: 'button',
  loading: false,
  loadingText: 'Loading...',
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
        'btn-loading': props.loading,
      },
    ]"
    :disabled="props.disabled || props.loading"
  >
    <i class="spinner" v-if="props.loading" />

    <span v-if="props.loading">
      {{ props.loadingText }}
    </span>
    <span v-else>
      {{ props.text }}
    </span>
  </button>
</template>

<style scoped>
@import '@/style.css';

/* Spinner animation for loading state */
.spinner {
  @apply w-4 h-4 rounded-full border-2 border-solid animate-spin;
  border-color: var(--color-primary-light);
  border-top-color: var(--color-primary);
}

/* Base button styles */
.btn {
  @apply flex items-center justify-center gap-2 font-bold text-neutral my-auto transition-all duration-200 ease-in-out;

  /* Text content always wrapped */
  & span {
    @apply whitespace-nowrap;
  }

  /* Common states */
  &:disabled {
    @apply pointer-events-none;
  }

  /* Default button size styles */
  &:not(.btn-text, .btn-icon) {
    @apply py-2 px-4 rounded-[1.43rem];
  }

  /* Full width button */
  &.btn-full {
    @apply w-full;
  }

  /* Button sizes */
  &.btn-size-small {
    @apply text-xs;
  }

  &.btn-size-medium {
    @apply text-base;
  }

  &.btn-size-large {
    @apply text-base rounded-[1.87rem];
  }

  /* Primary Button */
  &.btn-primary {
    @apply bg-primary;

    &:hover:not(:disabled) {
      @apply opacity-30;
    }

    &:disabled, &.btn-loading {
      @apply bg-neutral-300 opacity-100;
    }

    &.btn-loading {
      @apply opacity-30;
    }
  }

  /* Secondary Button */
  &.btn-secondary {
    @apply bg-secondary text-neutral;

    &:hover:not(:disabled) {
      @apply bg-secondary-light;
    }

    &:disabled {
      @apply bg-neutral-300;
    }

    &.btn-loading {
      @apply bg-secondary-light;

      & .spinner {
        @apply border-neutral-400 border-t-neutral-300;
      }
    }
  }

  /* Secondary White Button */
  &.btn-secondary-white {
    @apply bg-neutral text-secondary;

    &:hover:not(:disabled) {
      @apply bg-neutral-200 text-neutral;
    }

    &:disabled {
      @apply bg-neutral-300 text-neutral;
    }
  }

  /* Tertiary Button */
  &.btn-tertiary {
    @apply bg-tertiary text-secondary;

    &:hover:not(:disabled) {
      @apply bg-neutral-100;
    }

    &:disabled {
      @apply bg-neutral-300;
    }
  }

  /* Outline Button */
  &.btn-outline {
    @apply border border-secondary text-secondary;

    &:hover:not(:disabled) {
      @apply border-primary text-primary;
    }

    &:disabled {
      @apply border-secondary-light text-neutral-300;
    }
  }

  /* Text Button */
  &.btn-text {
    @apply w-auto rounded-none border-b border-secondary text-secondary shadow-none px-6 pt-1.5 pb-1.5;

    &:hover:not(:disabled) {
      @apply border-b border-primary text-primary;
    }

    &:disabled {
      @apply border-b border-transparent text-neutral-300;
    }
  }

  /* Navigate Button */
  &.btn-navigate {
    @apply bg-neutral-200 text-secondary gap-1 rounded-[1.5rem];

    &:hover:not(:disabled) {
      @apply text-neutral;
    }

    &:disabled {
      @apply bg-neutral-100 text-neutral-200;
    }
  }

  /* Icon Button */
  &.btn-icon {
    @apply w-8 h-8 rounded-full;

    &:hover:not(:disabled) {
      @apply bg-tertiary-light;
    }
  }

  /* Large size specific styles */
  &.btn-size-large {
    &.btn-text, &.btn-outline {
      @apply pt-2 pb-2;
    }
  }
}
</style>
