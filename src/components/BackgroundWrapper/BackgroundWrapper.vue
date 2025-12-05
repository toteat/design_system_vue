<script setup lang="ts">
import type { BackgroundWrapperProps } from '@/types';

defineProps<BackgroundWrapperProps>();
</script>

<template>
  <div class="tot-ds-root background-wrapper">
    <div class="background-wrapper__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.background-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 100dvh;
    min-width: 100dvw;
    background-color: #ffffff;
    color: #1b1b1b;
    gap: var(--spacing-lg);
    background-image: url('./assets/login-background-mobile.svg');
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: 100dvw auto;

    @media (width >= 768px) {
      background-image: url('./assets/login-background-desktop.svg');
      background-position: right top;
      background-repeat: no-repeat;
      background-size: 30% auto;

      /* Flip the second instance (bottom-left) horizontally and vertically */
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 29dvw;
        height: 35dvw;
        background-image: url('./assets/login-background-desktop.svg');
        background-size: contain;
        background-repeat: no-repeat;
        transform: rotateZ(180deg);
        pointer-events: none;
        z-index: 0;
      }
    }

    & .background-wrapper__content {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 100%;
      padding: var(--spacing-2xl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
