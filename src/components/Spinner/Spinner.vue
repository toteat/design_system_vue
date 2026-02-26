<script setup lang="ts">
import { computed } from 'vue';
import type { SpinnerProps } from '@/types';

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 4,
  color: 'gray',
});

const strokeColor = computed(() =>
  props.color === 'red' ? 'var(--color-primary)' : 'var(--color-neutral-300)',
);
</script>

<template>
  <svg
    class="tot-ds-root spinner"
    viewBox="0 0 100 100"
    :style="{
      '--size': `${props.size}rem`,
      '--spinner-stroke': strokeColor,
    }"
    aria-label="Loading"
    test-id="tds-spinner"
  >
    <!-- Anillo completo (donut): grosor como loading-gray.svg (8/37 ≈ 9/42 en viewBox 100) -->
    <path
      class="spinner__ring"
      fill-rule="evenodd"
      d="M 92 50 A 42 42 0 0 1 8 50 A 42 42 0 0 1 92 50 M 83 50 A 33 33 0 0 0 17 50 A 33 33 0 0 0 83 50"
      fill="var(--spinner-stroke)"
    />
    <!-- Cabeza redondeada al inicio (3h), radio = mitad del grosor del anillo -->
    <circle
      class="spinner__head"
      cx="87.5"
      cy="50"
      r="4.5"
      fill="var(--spinner-stroke)"
    />
  </svg>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root.spinner {
  width: var(--size, 1rem);
  height: var(--size, 1rem);
  animation: spinner-spin 0.6s linear infinite;
}

.spinner__ring {
  transform-origin: 50% 50%;
  /* Igual que loading-gray.svg: sólido 0–180°, desvanece hasta 360° */
  mask: conic-gradient(
    from 90deg at 50% 50%,
    black 0deg,
    black 90deg,
    transparent 330deg
  );
}

@keyframes spinner-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
