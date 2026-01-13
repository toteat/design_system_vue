<script setup lang="ts">
import type { AccordionProps } from '@/types';
import Icon from '../Icon/Icon.vue';

const props = withDefaults(defineProps<AccordionProps>(), {
  expanded: false,
  disabled: false,
  bordered: false,
});

const emit = defineEmits<{
  'toggle-expand': [];
}>();

const handleToggleExpand = (): void => {
  if (!props.disabled) {
    emit('toggle-expand');
  }
};

const handleKeydown = (event: globalThis.KeyboardEvent): void => {
  if (props.disabled) return;

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      handleToggleExpand();
      break;
  }
};
</script>

<template>
  <div
    class="tot-ds-root accordion"
    :data-expanded="expanded"
    :data-disabled="disabled"
    :data-bordered="bordered"
  >
    <button
      type="button"
      class="accordion__trigger"
      :aria-expanded="expanded"
      :aria-label="expanded ? 'Collapse' : 'Expand'"
      :disabled="disabled"
      @click.stop="handleToggleExpand"
      @keydown="handleKeydown"
    >
      <div class="accordion__header">
        <slot name="label" :expanded="expanded">
          <span class="accordion__label">{{ label }}</span>
        </slot>
      </div>
      <Icon name="chevron-down-outline" :size="1" class="accordion__icon" />
    </button>

    <div class="accordion__content" role="region" :hidden="!expanded">
      <div class="accordion__body">
        <slot :expanded="expanded" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.accordion {
    width: 100%;

    .accordion__trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-md);
      width: 100%;
      padding: var(--spacing-md);
      min-height: 44px;
      border: none;
      background-color: transparent;
      border-radius: var(--radius-sm);
      cursor: pointer;
      color: var(--color-neutral-500);
      font-weight: 500;
      transition: background-color 150ms ease;

      &:hover:not(:disabled) {
        background-color: var(--color-neutral-100);
      }

      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: -2px;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

    .accordion__header {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      flex: 1;
      text-align: left;
    }

    .accordion__label {
      font-size: var(--text-sm);
      color: var(--color-neutral-500);
    }

    .accordion__icon {
      flex-shrink: 0;
      color: var(--color-neutral-400);
      transition: transform 200ms ease-out;
    }

    &[data-expanded='true'] .accordion__icon {
      transform: rotate(180deg);
    }

    .accordion__content {
      overflow: hidden;
      transition: max-height 200ms ease-out;

      &[hidden] {
        display: none;
      }
    }

    .accordion__body {
      padding: 0 var(--spacing-md) var(--spacing-md);
      color: var(--color-neutral-500);
    }

    /* Bordered variant */
    &[data-bordered='true'] {
      border: 1px solid var(--color-neutral-200);
      border-radius: var(--radius-lg);
      overflow: hidden;

      .accordion__trigger {
        padding: var(--spacing-md);
        border-radius: 0;
      }

      .accordion__body {
        padding: var(--spacing-md);
      }
    }
  }
}
</style>
