<script lang="ts" setup>
import type { SpinnerProps } from '@/types';

const props = withDefaults(defineProps<SpinnerProps>(), {
  dimension: 4,
});
</script>

<template>
  <i
    class="tot-ds-root"
    :class="['spinner', `w-${props.dimension} h-${props.dimension}`]"
    aria-label="Loading"
  />
</template>

<style scoped>
@import '@/style.css';

.tot-ds-root {
  &.spinner {
    @apply flex items-center justify-center rounded-full border-2 border-solid border-t-transparent animate-spin;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
