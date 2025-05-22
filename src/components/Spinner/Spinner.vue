<script setup lang="ts">
import type { SpinnerProps } from '@/types';

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 4,
});
</script>

<template>
  <i
    class="tot-ds-root spinner"
    :style="{ '--size': `${props.size}rem` }"
    aria-label="Loading"
  />
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size, 1rem);
    height: var(--size, 1rem);
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
