<script setup lang="ts">
import type { GroupedButtonsProps } from '@/types';
import Button from '../Button/Button.vue';

const props = withDefaults(defineProps<GroupedButtonsProps>(), {
  modelValue: undefined,
  size: 'medium',
  variant: 'primary',
  fullWidth: false,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  change: [value: string | number];
}>();

const handleSelect = (value: string | number, optionDisabled: boolean) => {
  if (props.disabled || optionDisabled) return;

  emit('update:modelValue', value);
  emit('change', value);
};

const isSelected = (value: string | number) => {
  return props.modelValue === value;
};

const getGroupPosition = (index: number) => {
  const totalOptions = props.options.length;
  if (totalOptions === 1) return 'standalone';
  if (index === 0) return 'left';
  if (index === totalOptions - 1) return 'right';
  return 'center';
};
</script>

<template>
  <div
    class="tot-ds-root grouped-buttons"
    role="group"
    :aria-label="'Button group'"
    :data-full-width="fullWidth"
  >
    <Button
      v-for="(option, index) in options"
      :key="option.value"
      :text="option.label"
      :icon="option.icon"
      :size="size"
      :variant="isSelected(option.value) ? 'secondary' : 'outline'"
      :disabled="disabled || option.disabled"
      :group-position="getGroupPosition(index)"
      class="grouped-buttons__button"
      @click="handleSelect(option.value, option.disabled ?? false)"
    />
  </div>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.grouped-buttons {
    display: inline-flex;
    gap: 0;
    border-radius: var(--radius-pill);
    overflow: hidden;

    &[data-full-width='true'] {
      display: flex;
      width: 100%;

      & .grouped-buttons__button {
        flex: 1;
      }
    }
  }
}
</style>
