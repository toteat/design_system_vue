<script setup lang="ts">
import { computed, ref } from 'vue';
import type { TabProps } from '@/types';
import GroupedButtons from '../GroupedButtons/GroupedButtons.vue';

const props = withDefaults(defineProps<TabProps>(), {
  selectedTab: undefined,
  size: 'medium',
});

const emit = defineEmits<{
  'update:selectedTab': [value: string | number];
  change: [value: string | number];
  'tab-click': [tab: { value: string | number; label: string }];
}>();

// Initialize internal value
const internalValue = ref<string | number | undefined>(undefined);

const currentValue = computed({
  get: () => {
    // If selectedTab prop is provided, use it; otherwise use internal value or first tab
    if (props.selectedTab !== undefined) {
      return props.selectedTab;
    }
    if (internalValue.value !== undefined) {
      return internalValue.value;
    }
    return props.tabs[0]?.value;
  },
  set: (value) => {
    internalValue.value = value;
    emit('update:selectedTab', value);

    // Emit additional events
    const tab = props.tabs.find((t) => t.value === value);
    if (tab) {
      emit('tab-click', { value: tab.value, label: tab.label });
    }
    emit('change', value);
  },
});

const currentTab = computed(() => {
  return props.tabs.find((tab) => tab.value === currentValue.value);
});
</script>

<template>
  <div class="tot-ds-root tab-component">
    <!-- Tab Navigation -->
    <GroupedButtons
      :options="tabs"
      v-model:selected-button="currentValue"
      :size="size"
      class="tab-component__navigation"
    />

    <!-- Tab Content -->
    <div class="tab-component__content">
      <slot :current-tab="currentTab" :current-value="currentValue" />
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
  }
}
</style>
