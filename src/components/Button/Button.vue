<script setup lang="ts">
import { computed } from 'vue'
import type { ColorPalette, Size, Variant } from '@/types'

export interface ButtonProps {
  /**
   * The color of the button
   * @default 'primary'
   */
  color?: ColorPalette
  /**
   * The size of the button
   * @default 'md'
   */
  size?: Size
  /**
   * The variant of the button
   * @default 'filled'
   */
  variant?: Variant
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Whether the button is in loading state
   * @default false
   */
  loading?: boolean
  /**
   * Whether the button takes the full width of its container
   * @default false
   */
  block?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'primary',
  size: 'md',
  variant: 'filled',
  disabled: false,
  loading: false,
  block: false,
})

// Expose events
defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = computed(() => {
  return {
    [`tot-button--${props.color}`]: true,
    [`tot-button--${props.size}`]: true,
    [`tot-button--${props.variant}`]: true,
    'tot-button--block': props.block,
    'tot-button--loading': props.loading,
    'tot-button--disabled': props.disabled,
  }
})
</script>

<template>
  <button
    :class="['tot-button', classes]"
    :disabled="disabled || loading"
    type="button"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="tot-button__loader" />
    <span class="tot-button__content">
      <slot></slot>
    </span>
  </button>
</template>

<style>
.tot-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  outline: none;
  border: 1px solid transparent;
}

.tot-button--block {
  width: 100%;
}

.tot-button--disabled,
.tot-button--loading {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Size variations */
.tot-button--xs {
  padding: 4px 8px;
  font-size: 12px;
}

.tot-button--sm {
  padding: 6px 12px;
  font-size: 14px;
}

.tot-button--md {
  padding: 8px 16px;
  font-size: 16px;
}

.tot-button--lg {
  padding: 10px 20px;
  font-size: 18px;
}

.tot-button--xl {
  padding: 12px 24px;
  font-size: 20px;
}

/* Color and variant combinations */
.tot-button--filled.tot-button--primary {
  background-color: #3b82f6;
  color: white;
}

.tot-button--outlined.tot-button--primary {
  border-color: #3b82f6;
  color: #3b82f6;
  background-color: transparent;
}

.tot-button--text.tot-button--primary {
  color: #3b82f6;
  background-color: transparent;
  border-color: transparent;
}

/* Other color variants would follow similar patterns */
</style> 