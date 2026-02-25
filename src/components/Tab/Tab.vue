<script setup lang="ts">
import { computed, ref } from 'vue';
import type { TabProps } from '@/types';
import Icon from '../Icon/Icon.vue';
import { COMPONENT_SIZE_MAP } from '@/constants';

const props = withDefaults(defineProps<TabProps>(), {
  selectedTab: undefined,
  size: 'medium',
  fullWidth: true,
  selectedColor: 'black',
});

const emit = defineEmits<{
  'update:selectedTab': [value: string | number];
  change: [value: string | number];
  'tab-click': [tab: { value: string | number; label: string }];
}>();

// Icon size from design system constant (rem) - same pattern as Checkbox
const iconSize = computed(
  () => COMPONENT_SIZE_MAP[props.size] ?? COMPONENT_SIZE_MAP.medium,
);

// Initialize internal value
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

const isSelected = (value: string | number): boolean =>
  currentValue.value === value;

function selectTab(tab: (typeof props.tabs)[0]): void {
  if (tab.disabled) return;
  currentValue.value = tab.value;
}

function pillIconColor(
  tab: (typeof props.tabs)[0],
): 'white' | 'secondary' | 'neutral-500' {
  if (!isSelected(tab.value)) return 'neutral-500';
  if (props.selectedColor === 'black' || props.selectedColor === 'red')
    return 'white';
  return 'secondary';
}
</script>

<template>
  <div class="tot-ds-root tab-component">
    <!-- Tab Navigation - Pills style -->
    <div
      class="tot-ds-root tab-component__navigation"
      :data-full-width="fullWidth"
      :data-size="size"
      :data-selected-color="selectedColor"
    >
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        class="tab-component__pill"
        :class="{
          'tab-component__pill-selected': isSelected(tab.value),
          'tab-component__pill-disabled': tab.disabled,
        }"
        :disabled="tab.disabled"
        @click="() => selectTab(tab)"
      >
        <Icon
          v-if="tab.icon"
          :name="tab.icon"
          :size="iconSize"
          :color="pillIconColor(tab)"
          class="tab-component__pill-icon"
        />
        {{ tab.label }}
      </button>
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
        color-mix(in srgb, var(--color-neutral-300) 54% transparent);
      flex-shrink: 0;
      width: fit-content;

      &[data-full-width='true'] {
        width: 100%;
        overflow-x: auto;
        gap: var(--spacing-md);

        & .tab-component__pill {
          flex: 1;
          min-width: max-content;
        }
      }

      .tab-component__pill {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-sm) var(--spacing-xl);
        font-family: inherit;
        font-weight: 500;
        border: none;
        border-radius: var(--radius-pill);
        cursor: pointer;
        transition:
          background-color 0.15s ease,
          color 0.15s ease;
        background-color: transparent;
        color: var(--color-neutral-500);

        &.tab-component__pill-selected {
          background-color: var(--color-secondary);
          color: var(--color-white);
        }

        &.tab-component__pill-disabled {
          background-color: var(--color-neutral-100);
          color: var(--color-neutral-300);
          cursor: not-allowed;
        }

        .tab-component__pill-icon {
          flex-shrink: 0;
        }
      }

      /* Font-size comes from global .tot-ds-root[data-size] in style.css; pills inherit. */
      /* Min-height and padding aligned with Button sizes. */
      &[data-size='tiny'] .tab-component__pill {
        min-height: 2rem;
        padding: var(--spacing-xs) var(--spacing-md);
      }

      &[data-size='small'] .tab-component__pill {
        min-height: 2.75rem;
        padding: var(--spacing-sm) var(--spacing-md);
      }

      &[data-size='medium'] .tab-component__pill {
        min-height: 3.75rem;
        padding: var(--spacing-sm) var(--spacing-lg);
      }

      &[data-size='large'] .tab-component__pill {
        min-height: 5rem;
        padding: var(--spacing-sm) var(--spacing-xl);
      }
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

/* Override selected color based on parent data attribute - outside nested block for correct specificity */
.tot-ds-root.tab-component
  .tab-component__navigation[data-selected-color='black']
  .tab-component__pill.tab-component__pill-selected {
  background-color: var(--color-secondary);
  color: var(--color-white);
}

.tot-ds-root.tab-component
  .tab-component__navigation[data-selected-color='arena']
  .tab-component__pill.tab-component__pill-selected {
  background-color: var(--color-tertiary);
  color: var(--color-secondary);
}

.tot-ds-root.tab-component
  .tab-component__navigation[data-selected-color='gray']
  .tab-component__pill.tab-component__pill-selected {
  background-color: var(--color-neutral-100);
  color: var(--color-secondary);
}

.tot-ds-root.tab-component
  .tab-component__navigation[data-selected-color='red']
  .tab-component__pill.tab-component__pill-selected {
  background-color: var(--color-primary);
  color: var(--color-white);
}

@media screen and (width <= 1024px) {
  :deep(.tot-ds-root) {
    &.tab-component {
      .tab-component__navigation[data-full-width='true'] {
        gap: var(--spacing-lg);
      }
    }
  }
}
</style>
