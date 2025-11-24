<script setup lang="ts">
import { computed } from 'vue';
import type { RadioProps } from '@/types';

const props = withDefaults(defineProps<RadioProps>(), {
  checked: false,
  description: undefined,
  disabled: false,
  size: 'medium',
  card: false,
});

const emit = defineEmits<{
  'update:checked': [value: boolean];
  change: [value: boolean];
}>();

const isChecked = computed(() => props.checked);

const handleToggle = () => {
  if (props.disabled) return;
  const newValue = !isChecked.value;
  emit('update:checked', newValue);
  emit('change', newValue);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleToggle();
  }
};
</script>

<template>
  <label
    class="tot-ds-root radio"
    :data-size="size"
    :data-checked="isChecked || undefined"
    :data-disabled="disabled || undefined"
    :data-card="card || undefined"
    @keydown="handleKeydown"
  >
    <!-- Hidden native radio for accessibility -->
    <input
      type="radio"
      :checked="isChecked"
      :disabled="disabled"
      class="radio__input"
      @change="handleToggle"
    />

    <!-- Circle indicator -->
    <span class="radio__indicator">
      <span class="radio__indicator-dot" />
    </span>

    <!-- Content -->
    <span class="radio__content">
      <span class="radio__title">{{ title }}</span>
      <span v-if="description" class="radio__description">{{
        description
      }}</span>
    </span>
  </label>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.radio {
    /* Component-specific variables */
    --radio-gap: var(--radius-lg);
    --radio-padding-y: 0;
    --radio-padding-x: 0;
    --radio-indicator-size: var(--text-xl);
    --radio-indicator-dot-size: var(--text-xs);
    --radio-indicator-border: 2px;
    --radio-content-gap: 2px;
    --radio-transition: 150ms ease-out;

    display: flex;
    align-items: center;
    gap: var(--radio-gap);
    padding: var(--radio-padding-y) var(--radio-padding-x);
    cursor: pointer;
    user-select: none;

    /* Hidden native radio */
    & .radio__input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Circle indicator */
    & .radio__indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--radio-indicator-size);
      height: var(--radio-indicator-size);
      border: var(--radio-indicator-border) solid var(--color-neutral-300);
      border-radius: var(--radius-circle);
      flex-shrink: 0;
      transition:
        border-color var(--radio-transition),
        background-color var(--radio-transition);
    }

    /* Inner dot - animated */
    & .radio__indicator-dot {
      width: var(--radio-indicator-dot-size);
      height: var(--radio-indicator-dot-size);
      background-color: var(--color-primary);
      border-radius: var(--radius-circle);
      transform: scale(0);
      opacity: 0;
      transition:
        transform var(--radio-transition),
        opacity var(--radio-transition);
    }

    /* Content container */
    & .radio__content {
      display: flex;
      flex-direction: column;
      gap: var(--radio-content-gap);
      min-width: 0;
    }

    /* Title */
    & .radio__title {
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--color-neutral-500);
      line-height: var(--text-sm--line-height);
    }

    /* Description */
    & .radio__description {
      font-size: var(--text-xs);
      font-weight: 400;
      color: var(--color-neutral-400);
      line-height: var(--text-xs--line-height);
    }

    /* Focus state */
    &:has(.radio__input:focus-visible) {
      & .radio__indicator {
        outline: var(--radio-indicator-border) solid var(--color-primary);
        outline-offset: var(--radio-indicator-border);
      }
    }

    /* Checked state */
    &[data-checked] {
      & .radio__indicator {
        border-color: var(--color-primary);
        background-color: transparent;
      }

      & .radio__indicator-dot {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* Disabled state */
    &[data-disabled] {
      cursor: not-allowed;

      & .radio__indicator {
        border-color: var(--color-neutral-300);
      }

      & .radio__indicator-dot {
        background-color: var(--color-neutral-300);
      }

      & .radio__title {
        color: var(--color-neutral-400);
      }

      & .radio__description {
        color: var(--color-neutral-400);
      }
    }

    /* Card variant */
    &[data-card] {
      --radio-padding-y: var(--radius-lg);
      --radio-padding-x: var(--radius-xl);

      background-color: var(--color-white);
      border: 1px solid var(--color-neutral-200);
      border-radius: var(--radius-base);
      transition:
        border-color var(--radio-transition),
        box-shadow var(--radio-transition);

      /* Card hover state */
      &:not([data-disabled]):hover {
        border-color: var(--color-neutral-300);
      }

      /* Card focus state */
      &:has(.radio__input:focus-visible) {
        outline: var(--radio-indicator-border) solid var(--color-primary);
        outline-offset: var(--radio-indicator-border);

        & .radio__indicator {
          outline: none;
        }
      }

      /* Card checked state */
      &[data-checked] {
        border-color: var(--color-primary);

        &:hover:not([data-disabled]) {
          border-color: var(--color-primary);
        }
      }

      /* Card disabled state */
      &[data-disabled] {
        background-color: var(--color-neutral-100);
        border-color: var(--color-neutral-400);
      }
    }

    /* Size variants */
    &[data-size='tiny'] {
      --radio-gap: var(--radius-sm);
      --radio-indicator-size: var(--text-base);
      --radio-indicator-dot-size: var(--radius-sm);

      & .radio__title {
        font-size: var(--text-xs);
        line-height: var(--text-xs--line-height);
      }

      & .radio__description {
        display: none;
      }

      &[data-card] {
        --radio-padding-y: var(--radius-sm);
        --radio-padding-x: var(--radius-base);
        min-height: 2rem;
      }
    }

    &[data-size='small'] {
      --radio-gap: var(--radius-base);
      --radio-indicator-size: var(--text-lg);
      --radio-indicator-dot-size: var(--radius-base);

      & .radio__title {
        font-size: var(--text-xs);
        line-height: var(--text-xs--line-height);
      }

      & .radio__description {
        font-size: var(--text-xs);
      }

      &[data-card] {
        --radio-padding-y: var(--radius-base);
        --radio-padding-x: var(--radius-lg);
        min-height: 2.75rem;
      }
    }

    &[data-size='medium'] {
      &[data-card] {
        min-height: 3.25rem;
      }
    }

    &[data-size='large'] {
      --radio-gap: var(--radius-xl);
      --radio-indicator-size: var(--text-2xl);
      --radio-indicator-dot-size: var(--text-sm);

      & .radio__title {
        font-size: var(--text-lg);
        line-height: var(--text-lg--line-height);
      }

      & .radio__description {
        font-size: var(--text-sm);
      }

      &[data-card] {
        --radio-padding-y: var(--radius-xl);
        --radio-padding-x: var(--text-lg);
        min-height: 4.5rem;
      }
    }
  }
}
</style>
