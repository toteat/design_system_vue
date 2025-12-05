<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { CardProps } from '@/types';

/* global MouseEvent, KeyboardEvent */

const props = withDefaults(defineProps<CardProps>(), {
  padding: 'medium',
  elevation: 'none',
  hoverable: false,
  hovered: false,
  focused: false,
  pressed: false,
  maxWidth: undefined,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  'update:hovered': [value: boolean];
  'update:focused': [value: boolean];
  'update:pressed': [value: boolean];
}>();

const attrs = useAttrs();

const isClickable = computed(() => !!props.href || !!attrs.onClick);

const maxWidthStyle = computed(() => {
  if (!props.maxWidth) return undefined;
  const value =
    typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth;
  return { '--card-max-width': value };
});

const handleClick = (event: MouseEvent): void => {
  if (!props.href) {
    emit('click', event);
  }
};

const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    // Create a synthetic MouseEvent for consistency
    const mouseEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    handleClick(mouseEvent);
  }
};

const handleMouseEnter = (): void => {
  emit('update:hovered', true);
};

const handleMouseLeave = (): void => {
  emit('update:hovered', false);
  emit('update:pressed', false);
};

const handleFocus = (): void => {
  emit('update:focused', true);
};

const handleBlur = (): void => {
  emit('update:focused', false);
};

const handleMouseDown = (): void => {
  emit('update:pressed', true);
};

const handleMouseUp = (): void => {
  emit('update:pressed', false);
};
</script>

<template>
  <!-- Render as link if href provided -->
  <a
    v-if="href"
    :href="href"
    :target="target"
    :rel="target === '_blank' ? rel || 'noopener noreferrer' : rel"
    class="tot-ds-root card"
    :data-padding="padding"
    :data-elevation="elevation"
    :data-hoverable="hoverable || isClickable"
    :data-clickable="isClickable"
    :style="maxWidthStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focus="handleFocus"
    @blur="handleBlur"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <slot />
  </a>

  <!-- Render as button if clickable (no href) -->
  <button
    v-else-if="isClickable"
    type="button"
    class="tot-ds-root card"
    :data-padding="padding"
    :data-elevation="elevation"
    :data-hoverable="hoverable || isClickable"
    :data-clickable="isClickable"
    :style="maxWidthStyle"
    @click="handleClick"
    @keydown="handleKeydown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focus="handleFocus"
    @blur="handleBlur"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <slot />
  </button>

  <!-- Render as section if not clickable -->
  <section
    v-else
    class="tot-ds-root card"
    :data-padding="padding"
    :data-elevation="elevation"
    :data-hoverable="false"
    :data-clickable="false"
    :style="maxWidthStyle"
  >
    <slot />
  </section>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.card {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-neutral-200);
    border-radius: var(--radius-base);
    background-color: var(--color-white);
    transition:
      box-shadow 200ms ease-in-out,
      transform 200ms ease-in-out;
    max-width: var(--card-max-width, none);
    padding: var(--spacing-lg); /* Default medium padding */

    /* Clickable cards (both <a> and <button>) */
    &[data-clickable='true'] {
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      user-select: none;
      font: inherit;
      text-align: inherit;

      /* Keyboard focus */
      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }

      /* Active/pressed state */
      &:active {
        transform: scale(0.98);
      }

      /* Hover state for clickable cards */
      &:hover {
        border-color: var(--color-neutral-300);
      }
    }

    /* Padding variants */
    &[data-padding='none'] {
      padding: 0;
    }

    &[data-padding='small'] {
      padding: var(--spacing-sm);
    }

    &[data-padding='medium'] {
      padding: var(--spacing-lg);
    }

    &[data-padding='large'] {
      padding: var(--spacing-xl);
    }

    /* Elevation variants */
    &[data-elevation='none'] {
      box-shadow: none;
    }

    &[data-elevation='small'] {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    &[data-elevation='medium'] {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }

    &[data-elevation='large'] {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    /* Hoverable */
    &[data-hoverable='true']:hover {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
