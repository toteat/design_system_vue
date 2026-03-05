<script setup lang="ts">
import type { SpinnerProps } from '@/types';

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'medium',
  color: 'neutral-300',
});
</script>

<template>
  <svg
    class="tot-ds-root spinner"
    :class="[`spinner--size-${props.size}`, `spinner--${props.color}`]"
    viewBox="0 0 100 100"
    aria-label="Loading"
    test-id="tds-spinner"
  >
    <!-- Full ring (donut): thickness matches loading-gray.svg (8/37 ≈ 9/42 in viewBox 100) -->
    <path
      class="spinner__ring"
      fill-rule="evenodd"
      d="M 92 50 A 42 42 0 0 1 8 50 A 42 42 0 0 1 92 50 M 83 50 A 33 33 0 0 0 17 50 A 33 33 0 0 0 83 50"
    />
    <!-- Rounded head at start (3 o'clock); radius = half of ring thickness -->
    <circle class="spinner__head" cx="87.5" cy="50" r="4.5" />
  </svg>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root.spinner {
  animation: spin 0.6s linear infinite;

  & .spinner__ring {
    transform-origin: 50% 50%;
    mask: conic-gradient(
      from 90deg at 50% 50%,
      black 0deg,
      black 90deg,
      transparent 330deg
    );
  }

  &.spinner--neutral-300 .spinner__ring,
  &.spinner--neutral-300 .spinner__head {
    fill: var(--color-neutral-300);
  }

  &.spinner--primary .spinner__ring,
  &.spinner--primary .spinner__head {
    fill: var(--color-primary);
  }

  /* Predefined sizes (same scale as Button/Checkbox) - DS tokens where possible */
  &.spinner--size-tiny {
    width: 1rem;
    height: 1rem;
  }

  &.spinner--size-small {
    width: 1.5rem;
    height: 1.5rem;
  }

  &.spinner--size-medium {
    width: 2rem;
    height: 2rem;
  }

  &.spinner--size-large {
    width: 3rem;
    height: 3rem;
  }

  &.spinner--size-very-large {
    width: 4rem;
    height: 4rem;
  }

  &.spinner--size-very-very-large {
    width: 5rem;
    height: 5rem;
  }

  &.spinner--size-ridiculously-large {
    width: 6rem;
    height: 6rem;
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
