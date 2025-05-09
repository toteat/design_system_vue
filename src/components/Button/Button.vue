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
  @apply w-4 h-4 animate-spin rounded-full border-2 border-solid;
  border-color: var(--color-primary-light);
  border-top-color: var(--color-primary);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Base button styles */
.btn {
  @apply flex items-center justify-center gap-2 font-bold text-neutral my-auto transition-all duration-200 ease-in-out rounded-[1.43rem] py-2 px-4;
  padding: var(--btn-padding-y) var(--btn-padding-x);

  /* Text content always wrapped */
  & span {
    @apply whitespace-nowrap;
  }

  /* Full width button */
  &.btn-full {
    @apply w-full;
  }

  /* Button sizes */
  &.btn-size-small {
    @apply text-xs rounded-[1.43rem];
  }

  &.btn-size-medium {
    @apply text-base rounded-[1.43rem];
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
    @apply border border-secondary text-secondary rounded-[1.5rem];
    padding: 0.438rem 1.438rem;

    &:hover:not(:disabled) {
      @apply border-primary text-primary;
    }

    &:disabled {
      @apply border-secondary-light text-neutral-300;
    }

    &.btn-size-large {
      padding: 0.5rem 1.438rem;
    }
  }

  /* Text Button */
  &.btn-text {
    @apply w-auto rounded-none border-b border-secondary text-secondary shadow-none;
    padding: 0.375rem 1.438rem;

    &:hover:not(:disabled) {
      @apply border-b border-primary text-primary;
    }

    &:disabled {
      @apply border-b border-transparent text-neutral-300;
    }

    &.btn-size-large {
      padding: 0.5rem 1.438rem;
    }
  }

  /* Navigate Button */
  &.btn-navigate {
    @apply bg-neutral-200 text-secondary rounded-[1.5rem] gap-1 py-2 px-4;

    &:hover:not(:disabled) {
      @apply text-neutral;
    }

    &:disabled {
      @apply bg-neutral-100 text-neutral-200;
    }
  }

  /* Icon Button */
  &.btn-icon {
    @apply flex items-center justify-center w-8 h-8 rounded-full;

    &:hover:not(:disabled) {
      @apply bg-tertiary-light;
    }
  }
}
</style>
