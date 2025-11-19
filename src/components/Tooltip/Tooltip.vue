<script setup lang="ts">
import { ref, onBeforeUnmount, watch, nextTick } from 'vue';
import type { TooltipProps, TooltipPosition } from '@/types';

/* global setTimeout, clearTimeout, HTMLDivElement */

const props = withDefaults(defineProps<TooltipProps>(), {
  position: 'top',
  disabled: false,
  delay: 200,
  maxWidth: 250,
});

// Emit events for parent component to react to tooltip state
const emit = defineEmits<{
  show: [];
  hide: [];
}>();

const isVisible = ref(false);
const actualPosition = ref<TooltipPosition>('top');
const tooltipRef = ref<HTMLDivElement | null>(null);

let showTimeout: ReturnType<typeof setTimeout> | null = null;
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

// Watch for position prop changes to update actualPosition
watch(
  () => props.position,
  (newPosition) => {
    actualPosition.value = newPosition;
  },
  { immediate: true },
);

const calculatePosition = () => {
  if (!tooltipRef.value) return;

  const rect = tooltipRef.value.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let finalPosition = props.position;

  // Check if tooltip would overflow viewport and flip if needed
  switch (props.position) {
    case 'top':
      if (rect.top < 0) finalPosition = 'bottom';
      break;
    case 'bottom':
      if (rect.bottom > viewportHeight) finalPosition = 'top';
      break;
    case 'left':
      if (rect.left < 0) finalPosition = 'right';
      break;
    case 'right':
      if (rect.right > viewportWidth) finalPosition = 'left';
      break;
  }

  actualPosition.value = finalPosition;
};

const showTooltip = () => {
  if (props.disabled) return;

  // Clear any pending hide timeout
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }

  // Show after delay
  showTimeout = setTimeout(() => {
    isVisible.value = true;
  }, props.delay);
};

const hideTooltip = () => {
  // Clear any pending show timeout
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }

  // Hide with small delay for smooth transition
  hideTimeout = setTimeout(() => {
    isVisible.value = false;
    actualPosition.value = props.position;
  }, 100);
};

const handleShow = () => {
  showTooltip();
  emit('show');
};

const handleHide = () => {
  hideTooltip();
  emit('hide');
};

// Handle touch events for mobile support
const handleTouchStart = () => {
  if (props.disabled) return;

  // On touch devices, show tooltip on touch
  // The tooltip will auto-hide on blur or when user touches elsewhere
  handleShow();
};

// Calculate position when tooltip becomes visible
watch(isVisible, async (visible) => {
  if (visible) {
    // Wait for DOM to update before calculating position
    await nextTick();
    if (tooltipRef.value) {
      calculatePosition();
    }
  }
});

// Cleanup timeouts on unmount
onBeforeUnmount(() => {
  if (showTimeout) clearTimeout(showTimeout);
  if (hideTimeout) clearTimeout(hideTimeout);
});
</script>

<template>
  <div
    class="tot-ds-root tooltip-wrapper"
    @mouseenter="handleShow"
    @mouseleave="handleHide"
    @focus="handleShow"
    @blur="handleHide"
    @touchstart.passive="handleTouchStart"
  >
    <!-- Trigger element (slotted content) -->
    <div class="tooltip-trigger">
      <slot />
    </div>

    <!-- Tooltip content with integrated text -->
    <div
      v-if="isVisible && !disabled"
      ref="tooltipRef"
      class="tooltip-content"
      :data-position="actualPosition"
      role="tooltip"
      :aria-hidden="!isVisible"
    >
      <div class="tooltip-box">
        <span class="tooltip-text">{{ content }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.tooltip-wrapper {
    position: relative;
    display: inline-block;
  }

  .tooltip-trigger {
    display: inline-block;
  }

  .tooltip-content {
    position: absolute;
    z-index: 9999;
    pointer-events: none;

    /* Position-specific placement and animations */
    &[data-position='top'] {
      bottom: calc(100% + 5px);
      left: 50%;
      transform: translateX(-50%);
      animation: tooltip-slide-in-top 300ms
        cubic-bezier(0.175, 0.885, 0.32, 1.1);
    }

    &[data-position='bottom'] {
      top: calc(100% + 5px);
      left: 50%;
      transform: translateX(-50%);
      animation: tooltip-slide-in-bottom 300ms
        cubic-bezier(0.175, 0.885, 0.32, 1.1);
    }

    &[data-position='left'] {
      right: calc(100% + 5px);
      top: 50%;
      transform: translateY(-50%);
      animation: tooltip-slide-in-left 300ms
        cubic-bezier(0.175, 0.885, 0.32, 1.1);
    }

    &[data-position='right'] {
      left: calc(100% + 5px);
      top: 50%;
      transform: translateY(-50%);
      animation: tooltip-slide-in-right 300ms
        cubic-bezier(0.175, 0.885, 0.32, 1.1);
    }
  }

  .tooltip-box {
    position: relative;
    display: inline-flex;
    background: var(--color-neutral-500);
    border-radius: 0.5rem;
    padding: 0.5rem;
    min-height: 2rem; /* 32px minimum height */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    /* Arrow/pointer using pseudo-element */
    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }
  }

  /* Arrow positioning based on tooltip position */
  .tooltip-content[data-position='top'] .tooltip-box::before {
    bottom: -7px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 7px 7px 0 7px;
    border-color: var(--color-neutral-500) transparent transparent transparent;
  }

  .tooltip-content[data-position='bottom'] .tooltip-box::before {
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 7px 7px 7px;
    border-color: transparent transparent var(--color-neutral-500) transparent;
  }

  .tooltip-content[data-position='left'] .tooltip-box::before {
    right: -7px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 7px 0 7px 7px;
    border-color: transparent transparent transparent var(--color-neutral-500);
  }

  .tooltip-content[data-position='right'] .tooltip-box::before {
    left: -7px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 7px 7px 7px 0;
    border-color: transparent var(--color-neutral-500) transparent transparent;
  }

  .tooltip-text {
    color: var(--color-white);
    font-size: var(--text-sm);
    line-height: var(--text-sm--line-height);
    text-align: center;
    overflow-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    width: max-content;
    max-width: 16rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* slide-in animations for each position */
@keyframes tooltip-slide-in-top {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes tooltip-slide-in-bottom {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-8px);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes tooltip-slide-in-left {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(8px);
  }

  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

@keyframes tooltip-slide-in-right {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-8px);
  }

  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}
</style>
