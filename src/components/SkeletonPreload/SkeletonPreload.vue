<script setup lang="ts">
import type { SkeletonPreloadProps } from '@/types';

const props = withDefaults(defineProps<SkeletonPreloadProps>(), {
  width: 40,
  height: 40,
  borderRadius: 8,
  isRounded: false,
});
</script>

<template>
  <div
    class="tot-ds-root skeleton-preload"
    :style="{
      '--skeleton-width': `${props.width}px`,
      '--skeleton-height': props.isRounded
        ? `${props.width}px`
        : `${props.height}px`,
      '--skeleton-border-radius': props.isRounded
        ? '50%'
        : `${props.borderRadius}px`,
    }"
  />
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.skeleton-preload {
    width: var(--skeleton-width);
    height: var(--skeleton-height);
    background: linear-gradient(
      90deg,
      var(--color-neutral-200) 0%,
      var(--color-neutral-100) 50%,
      var(--color-neutral-200) 100%
    );
    background-size: 200% 100%;
    background-color: var(--color-primary-light);
    animation: shimmer 1.5s infinite;
    opacity: 1;
    visibility: visible;
    border-radius: var(--skeleton-border-radius);
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
