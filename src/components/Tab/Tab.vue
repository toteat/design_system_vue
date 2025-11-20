<script setup lang="ts">
import { computed, ref } from 'vue';
import type { TabProps } from '@/types';
import GroupedButtons from '../GroupedButtons/GroupedButtons.vue';

const props = withDefaults(defineProps<TabProps>(), {
  modelValue: undefined,
  size: 'medium',
  variant: 'primary',
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  change: [value: string | number];
  'tab-click': [tab: { value: string | number; label: string }];
}>();

// Initialize with first tab if no modelValue provided
const internalValue = ref(props.modelValue ?? props.tabs[0]?.value);

const currentValue = computed({
  get: () => props.modelValue ?? internalValue.value,
  set: (value) => {
    internalValue.value = value;
    emit('update:modelValue', value);
  },
});

const handleTabChange = (value: string | number) => {
  currentValue.value = value;

  const tab = props.tabs.find((t) => t.value === value);
  if (tab) {
    emit('tab-click', { value: tab.value, label: tab.label });
  }

  emit('change', value);
};

const currentTab = computed(() => {
  return props.tabs.find((tab) => tab.value === currentValue.value);
});
</script>

<template>
  <div class="tot-ds-root tab-component">
    <!-- Tab Navigation -->
    <GroupedButtons
      :options="tabs"
      :model-value="currentValue"
      :size="size"
      :variant="variant"
      class="tab-component__navigation"
      @update:model-value="handleTabChange"
    />

    <!-- Tab Content -->
    <div class="tab-component__content">
      <slot :current-tab="currentTab" :current-value="currentValue">
        <!-- Default content if no slot provided -->
        <div class="tab-component__default-content">
          <p
            style="font-size: var(--text-base); color: var(--color-neutral-400)"
          >
            Tab content for: <strong>{{ currentTab?.label }}</strong>
          </p>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.tab-component {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .tab-component__navigation {
      flex-shrink: 0;
    }

    .tab-component__content {
      display: block;
      background-color: var(--color-white);
      border: 1px solid var(--color-neutral-200);
      border-radius: var(--radius-base);
      padding: 1.5rem;
      min-height: 200px;
    }

    .tab-component__default-content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 150px;
    }
  }
}
</style>
