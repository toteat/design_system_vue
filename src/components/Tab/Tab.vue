<script setup lang="ts">
import { computed, ref } from 'vue';
import type { TabProps } from '@/types';
import type { GroupedButtonsOption } from '@/types';
import GroupedButtons from '../GroupedButtons/GroupedButtons.vue';

const props = withDefaults(defineProps<TabProps>(), {
  selectedTab: undefined,
  size: 'medium',
  fullWidth: true,
  selectedColor: 'secondary',
});

const emit = defineEmits<{
  'update:selectedTab': [value: string | number];
  change: [value: string | number];
  'tab-click': [tab: { value: string | number; label: string }];
}>();

// Map TabItem[] to GroupedButtonsOption[] for GroupedButtons
const tabOptions = computed<GroupedButtonsOption[]>(() =>
  props.tabs.map((tab) => ({
    value: tab.value,
    label: tab.label,
    disabled: tab.disabled,
    icon: tab.icon,
  })),
);

const internalValue = ref<string | number | undefined>(undefined);

const currentValue = computed({
  get: () => {
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
    <!-- Tab Navigation: GroupedButtons inside pills-style wrapper -->
    <div
      class="tab-component__navigation"
      :data-full-width="fullWidth"
      :data-size="size"
      :data-selected-color="selectedColor"
    >
      <GroupedButtons
        :options="tabOptions"
        v-model:selected-button="currentValue"
        :size="size"
        :full-width="fullWidth"
      />
    </div>

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
    gap: var(--spacing-lg);

    .tab-component__navigation {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm);
      background-color: var(--color-white);
      border-radius: var(--radius-pill);
      box-shadow: 0 1px 2px
        color-mix(in srgb, var(--color-neutral-300) 54%, transparent);
      flex-shrink: 0;
      width: fit-content;

      &[data-full-width='true'] {
        width: 100%;
        overflow-x: auto;
        gap: var(--spacing-md);
      }

      /* Pills wrapper: make GroupedButtons fieldset fit the container */
      :deep(.grouped-buttons) {
        display: flex;
        gap: var(--spacing-sm);
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
        width: 100%;
        min-width: 0;

        &[data-full-width='true'] {
          & .grouped-buttons__button {
            flex: 1;
            min-width: max-content;
          }
        }
      }

      /* Pill-style buttons: override GroupedButtons/Button default look */
      :deep(.grouped-buttons__button) {
        flex-shrink: 0;
        min-height: 3.75rem;
        padding: var(--spacing-sm) var(--spacing-xl);
        border-radius: var(--radius-pill);
        border: none;
        font-weight: 500;
        background-color: transparent;
        color: var(--color-neutral-500);
        transition:
          background-color 0.15s ease,
          color 0.15s ease;

        /* Unselected: no border, transparent */
        &.btn-outline-gray {
          border-color: transparent;
          background-color: transparent;
          color: var(--color-neutral-500);
        }

        /* Disabled */
        &:disabled {
          background-color: var(--color-neutral-100);
          color: var(--color-neutral-300);
          filter: none;
        }
      }

      /* Selected pill colors applied via rules below (data-selected-color on this wrapper) */
    }

    /* Size variants - min-height and padding aligned with Button sizes */
    .tab-component__navigation[data-size='tiny']
      :deep(.grouped-buttons__button) {
      min-height: 2rem;
      padding: var(--spacing-xs) var(--spacing-md);
    }

    .tab-component__navigation[data-size='small']
      :deep(.grouped-buttons__button) {
      min-height: 2.75rem;
      padding: var(--spacing-sm) var(--spacing-md);
    }

    .tab-component__navigation[data-size='medium']
      :deep(.grouped-buttons__button) {
      min-height: 3.75rem;
      padding: var(--spacing-sm) var(--spacing-lg);
    }

    .tab-component__navigation[data-size='large']
      :deep(.grouped-buttons__button) {
      min-height: 5rem;
      padding: var(--spacing-sm) var(--spacing-xl);
    }

    .tab-component__content {
      display: block;
      background-color: var(--color-white);
      border: 1px solid var(--color-neutral-200);
      border-radius: var(--radius-base);
      padding: var(--spacing-xl);
      min-height: 200px;
    }
  }
}

/* Selected color overrides: data-selected-color is on .tab-component__navigation */
.tot-ds-root.tab-component
  .tab-component__navigation[data-selected-color='primary']
  :deep(.grouped-buttons__button.btn-secondary) {
  background-color: var(--color-primary);
  color: var(--color-white);
  border-color: transparent;
}

.tot-ds-root.tab-component
  .tab-component__navigation[data-selected-color='secondary']
  :deep(.grouped-buttons__button.btn-secondary) {
  background-color: var(--color-secondary);
  color: var(--color-white);
  border-color: transparent;
}

.tot-ds-root.tab-component
  .tab-component__navigation[data-selected-color='tertiary']
  :deep(.grouped-buttons__button.btn-secondary) {
  background-color: var(--color-tertiary);
  color: var(--color-secondary);
  border-color: transparent;
}

.tot-ds-root.tab-component
  .tab-component__navigation[data-selected-color='neutral-100']
  :deep(.grouped-buttons__button.btn-secondary) {
  background-color: var(--color-neutral-100);
  color: var(--color-secondary);
  border-color: transparent;
}

/* Icon color for tertiary/neutral-100 (Button uses white for secondary variant) */
.tot-ds-root.tab-component
  .tab-component__navigation[data-selected-color='tertiary']
  :deep(.grouped-buttons__button.btn-secondary svg),
.tot-ds-root.tab-component
  .tab-component__navigation[data-selected-color='neutral-100']
  :deep(.grouped-buttons__button.btn-secondary svg) {
  fill: var(--color-secondary);
}

@media screen and (width <= 1024px) {
  .tot-ds-root.tab-component
    .tab-component__navigation[data-full-width='true'] {
    gap: var(--spacing-lg);
  }
}
</style>
