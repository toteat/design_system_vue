<script setup lang="ts">
import { ref, computed, toRef } from 'vue';
import type { MultiselectProps, MultiselectOption } from '@/types';
import { useSelector } from '@/composables/useSelector';
import Icon from '../Icon/Icon.vue';
import Button from '../Button/Button.vue';
import Checkbox from '../Checkbox/Checkbox.vue';
import Tooltip from '../Tooltip/Tooltip.vue';

/* global Event, Element, HTMLElement, HTMLInputElement */

const props = withDefaults(defineProps<MultiselectProps>(), {
  disabled: false,
  searchable: true,
  clearable: true,
  closeOnSelect: false,
  size: 'medium',
  modelValue: () => [],
  checkboxPosition: 'left',
  showSelectedItems: true,
});

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]];
  'update:searchQuery': [value: string];
  change: [value: (string | number)[]];
  open: [];
  close: [];
  clear: [];
  'option-select': [option: MultiselectOption];
  'option-deselect': [option: MultiselectOption];
  'remove-tag': [value: string | number];
}>();

// Computed placeholders with fallback
const selectPlaceholderText = computed(
  () => props.selectPlaceholder || 'Select options...',
);
const searchPlaceholderText = computed(() => {
  if (props.searchable) {
    return props.searchPlaceholder || 'Search...';
  }
  return props.selectPlaceholder || 'Select options...';
});

// Use shared selector composable
const {
  isOpen,
  searchQuery,
  setSearchQuery,
  filteredOptions,
  dropdownRef,
  inputRef,
  closeDropdown,
  toggleDropdown,
  handleInputFocus,
} = useSelector({
  options: toRef(props, 'options'),
  searchQueryProp: toRef(props, 'searchQuery'),
  searchable: toRef(props, 'searchable'),
  closeOnSelect: toRef(props, 'closeOnSelect'),
  emit: {
    open: () => emit('open'),
    close: () => emit('close'),
    updateSearchQuery: (value: string) => emit('update:searchQuery', value),
  },
});

const isDropdownAnimating = ref(false);

// Computed property for selected values
const selectedValues = computed(() => {
  return props.modelValue || [];
});

// Get selected options (maintaining selection order) for display
const selectedOptions = computed(() => {
  // Map selected values to their full option objects, maintaining selection order
  return selectedValues.value
    .map((value) => props.options.find((option) => option.value === value))
    .filter((option) => option !== undefined) as MultiselectOption[];
});

// Get selected option labels for display
const selectedLabels = computed(() => {
  return selectedOptions.value.map((option) => option.label);
});

// Check if an option is selected
const isSelected = (option: MultiselectOption) => {
  return selectedValues.value.includes(option.value);
};

// Check if selection limit is reached
const isLimitReached = computed(() => {
  return (
    props.maxSelections !== undefined &&
    selectedValues.value.length >= props.maxSelections
  );
});

// Check if an option should be disabled
const isOptionDisabled = (option: MultiselectOption) => {
  return option.disabled || (isLimitReached.value && !isSelected(option));
};

// Toggle option selection
const toggleOption = (option: MultiselectOption) => {
  if (isOptionDisabled(option)) {
    return;
  }

  const newValue: (string | number)[] = [...selectedValues.value];
  const index = newValue.indexOf(option.value);

  if (index > -1) {
    // Remove if already selected
    newValue.splice(index, 1);
    emit('option-deselect', option);
  } else if (!isLimitReached.value) {
    // Add if not selected and limit not reached
    newValue.push(option.value);
    emit('option-select', option);
  }

  emit('update:modelValue', newValue);
  emit('change', newValue);

  if (props.closeOnSelect) {
    closeDropdown();
  }
};

// Remove a selected item
const removeItem = (value: string | number, event: Event) => {
  event.stopPropagation();
  const newValue = selectedValues.value.filter((v) => v !== value);
  emit('remove-tag', value);
  emit('update:modelValue', newValue);
  emit('change', newValue);
};

// Clear all selections
const clearAll = (event: Event) => {
  event.stopPropagation();
  emit('clear');
  emit('update:modelValue', []);
  emit('change', []);
};

// Dropdown transition hooks
const onDropdownAfterEnter = () => {
  isDropdownAnimating.value = false;
};

const onDropdownLeave = () => {
  isDropdownAnimating.value = true;
};

const onDropdownAfterLeave = () => {
  isDropdownAnimating.value = false;
};

// Smooth transition hooks for selected items
const onSelectedEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;

  element.style.height = '0';
  element.style.opacity = '0';
  element.style.marginTop = '0';
  element.style.overflow = 'hidden';

  void element.offsetHeight;

  element.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
  element.style.height = `${element.scrollHeight}px`;
  element.style.opacity = '1';
  element.style.marginTop = '0.5rem';

  const handleTransitionEnd = () => {
    element.style.height = 'auto';
    element.style.overflow = 'visible';
    element.removeEventListener('transitionend', handleTransitionEnd);
    done();
  };

  element.addEventListener('transitionend', handleTransitionEnd);
};

const onSelectedLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;

  element.style.height = `${element.scrollHeight}px`;
  element.style.overflow = 'hidden';

  void element.offsetHeight;

  element.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
  element.style.height = '0';
  element.style.opacity = '0';
  element.style.marginTop = '0';

  const handleTransitionEnd = () => {
    element.removeEventListener('transitionend', handleTransitionEnd);
    done();
  };

  element.addEventListener('transitionend', handleTransitionEnd);
};

// Handle search input
const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  setSearchQuery(target.value);
};
</script>

<template>
  <div
    ref="dropdownRef"
    class="tot-ds-root multiselect"
    :class="[
      `multiselect-size-${size}`,
      {
        'multiselect-disabled': disabled,
        'multiselect-open': isOpen,
        'multiselect-dropdown-animating': isDropdownAnimating,
      },
    ]"
    :test-id="`tds-multiselect-${isOpen ? 'open' : 'closed'}`"
  >
    <!-- Search input trigger (when searchable) -->
    <div v-if="searchable" class="multiselect__input-wrapper">
      <input
        ref="inputRef"
        type="text"
        class="multiselect__search-input"
        :id="id"
        :name="name"
        :value="searchQuery"
        :placeholder="searchPlaceholderText"
        :disabled="disabled"
        @input="handleSearchInput"
        @focus="handleInputFocus"
        @keydown.escape="closeDropdown"
      />
      <button
        type="button"
        class="multiselect__actions"
        @click="toggleDropdown"
        :tabindex="-1"
        aria-label="Toggle dropdown"
      >
        <Icon
          name="chevron-down-outline"
          :size="1.25"
          color="neutral-400"
          class="multiselect__arrow"
        />
      </button>
    </div>

    <!-- Simple trigger (when not searchable) -->
    <div
      v-else
      class="multiselect__trigger"
      :tabindex="disabled ? -1 : 0"
      @click="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.escape="closeDropdown"
    >
      <span class="multiselect__trigger-text">
        {{ selectPlaceholderText }}
      </span>
      <div class="multiselect__actions">
        <Icon
          name="chevron-down-outline"
          :size="1.25"
          color="neutral-400"
          class="multiselect__arrow"
        />
      </div>
    </div>

    <!-- Dropdown (ABSOLUTE POSITIONED) -->
    <Transition
      name="multiselect-dropdown"
      @after-enter="onDropdownAfterEnter"
      @leave="onDropdownLeave"
      @after-leave="onDropdownAfterLeave"
    >
      <div v-if="isOpen" class="multiselect__dropdown">
        <!-- Selection limit indicator -->
        <div
          v-if="maxSelections !== undefined"
          class="multiselect__limit-info"
          :class="{ 'multiselect__limit-info-max': isLimitReached }"
        >
          {{ selectedValues.length }} / {{ maxSelections }} selected
        </div>

        <!-- Options list -->
        <ul class="multiselect__options">
          <!-- eslint-disable-next-line vuejs-accessibility/interactive-supports-focus -->
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            class="multiselect__option"
            :class="{
              'multiselect__option-selected': isSelected(option),
              'multiselect__option-disabled': isOptionDisabled(option),
            }"
            role="option"
            :aria-selected="isSelected(option)"
            :aria-disabled="isOptionDisabled(option)"
            :tabindex="isOptionDisabled(option) ? -1 : 0"
            @click="toggleOption(option)"
            @keydown.enter.prevent="toggleOption(option)"
            @keydown.space.prevent="toggleOption(option)"
          >
            <Checkbox
              :checked="isSelected(option)"
              :disabled="isOptionDisabled(option)"
              size="small"
              full-width
              :checkbox-position="checkboxPosition"
              color="black"
              class="multiselect__checkbox"
              @change="toggleOption(option)"
            >
              {{ option.label }}
            </Checkbox>
          </li>
          <li
            v-if="filteredOptions.length === 0"
            class="multiselect__no-options"
          >
            No options found
          </li>
        </ul>
      </div>
    </Transition>

    <!-- Selected items display (below selector) -->
    <Transition @enter="onSelectedEnter" @leave="onSelectedLeave" :css="false">
      <div
        v-if="showSelectedItems && selectedLabels.length > 0"
        class="multiselect__selected-wrapper"
      >
        <div class="multiselect__selected-tags">
          <Button
            v-for="(label, index) in selectedLabels"
            :key="index"
            variant="neutral-dark"
            size="tiny"
            :text="label"
            :disabled="disabled"
            icon-name="close-outline"
            icon-position="right"
            @click="
              removeItem(selectedValues[index] as string | number, $event)
            "
            :aria-label="`Remove ${label}`"
            class="multiselect__tag"
          />
          <Tooltip
            content="Limpiar todo"
            position="right"
            class="multiselect__clear-all"
          >
            <Button
              v-if="clearable && !disabled"
              variant="outline"
              size="tiny"
              icon-name="delete-outline"
              only-icon
              @click="clearAll"
              aria-label="Clear all selections"
            />
          </Tooltip>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.multiselect {
    position: relative;
    width: 100%;
    font-family: inherit;
  }

  /* Selected wrapper with border - displayed below selector */
  .multiselect__selected-wrapper {
    border: 1px solid var(--color-neutral-300);
    border-radius: var(--radius-base);
    padding: 0.5rem;
    padding-right: 3rem;
    margin-top: 0.5rem;
    position: relative;
  }

  /* Selected tags container (inside wrapper) */
  .multiselect__selected-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    align-items: center;
    justify-content: flex-start;
  }

  /* Tag button styling */
  .multiselect__tag {
    flex-shrink: 0;
  }

  .multiselect__clear-all {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
  }

  /* Simple trigger (non-searchable mode) */
  .multiselect__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    background-color: var(--color-neutral);
    border: 1.5px solid var(--color-neutral-300);
    border-radius: var(--radius-base);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    min-height: 3rem;
    padding: 0 0 0 0.75rem;

    &:hover:not(.multiselect-disabled &) {
      border-color: var(--color-neutral-400);
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
  }

  .multiselect__trigger-text {
    flex: 1;
    color: var(--color-neutral-400);
  }

  &.multiselect-open .multiselect__trigger {
    border-color: var(--color-black);
  }

  &.multiselect-disabled .multiselect__trigger {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: var(--color-neutral-100);
  }

  /* Search input wrapper (searchable mode) */
  .multiselect__input-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-neutral);
    border: 1.5px solid var(--color-neutral-300);
    border-radius: var(--radius-base);
    transition: all 0.2s ease-in-out;
    min-height: 3rem;
    position: relative;

    &:hover:not(.multiselect-disabled &) {
      border-color: var(--color-neutral-400);
    }

    &:focus-within {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
  }

  &.multiselect-open .multiselect__input-wrapper {
    border-color: var(--color-primary);
  }

  &.multiselect-disabled .multiselect__input-wrapper {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: var(--color-neutral-100);
  }

  /* Size variants for both trigger and input wrapper */
  &.multiselect-size-tiny {
    & .multiselect__trigger,
    & .multiselect__input-wrapper {
      min-height: 2rem;
      font-size: var(--text-xs);
    }

    & .multiselect__search-input {
      padding: 0.25rem 0 0.25rem 0.5rem;
    }

    & .multiselect__actions {
      padding: 0.25rem 0.5rem;
    }
  }

  &.multiselect-size-small {
    & .multiselect__trigger,
    & .multiselect__input-wrapper {
      min-height: 2.5rem;
      font-size: var(--text-sm);
    }

    & .multiselect__search-input {
      padding: 0.375rem 0 0.375rem 0.625rem;
    }

    & .multiselect__actions {
      padding: 0.375rem 0.625rem 0.375rem 0.5rem;
    }
  }

  &.multiselect-size-medium {
    & .multiselect__trigger,
    & .multiselect__input-wrapper {
      min-height: 3rem;
      font-size: var(--text-base);
    }

    & .multiselect__search-input {
      padding: 0.5rem 0 0.5rem 0.75rem;
    }

    & .multiselect__actions {
      padding: 0.5rem 0.75rem 0.5rem 0.5rem;
    }
  }

  &.multiselect-size-large {
    & .multiselect__trigger,
    & .multiselect__input-wrapper {
      min-height: 3.75rem;
      font-size: var(--text-lg);
    }

    & .multiselect__search-input {
      padding: 0.75rem 0 0.75rem 1rem;
    }

    & .multiselect__actions {
      padding: 0.75rem 1rem 0.75rem 0.5rem;
    }
  }

  .multiselect__search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: inherit;
    background: transparent;
    font-family: inherit;
    color: var(--color-neutral-900);

    &::placeholder {
      color: var(--color-neutral-400);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  .multiselect__clear {
    display: inline-flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  .multiselect__actions {
    display: flex;
    align-items: center;
    align-self: stretch;
    flex-shrink: 0;
    border-left: 1px solid var(--color-neutral-300);
    min-width: 44px;
    justify-content: center;
    cursor: pointer;
    transition: opacity 200ms ease-in-out;

    &:hover {
      opacity: 0.7;
    }
  }

  .multiselect__arrow {
    flex-shrink: 0;
    transition: transform 200ms ease-out;
  }

  &.multiselect-open .multiselect__arrow {
    transform: rotate(180deg);
  }

  /* Dropdown - ABSOLUTE POSITIONED */
  .multiselect__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: var(--color-neutral);
    border: 1.5px solid var(--color-neutral-300);
    border-radius: var(--radius-base);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    max-height: 300px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-top: 0.25rem;
  }

  .multiselect__limit-info {
    padding: 0.5rem 0.75rem;
    font-size: var(--text-sm);
    color: var(--color-neutral-400);
    background-color: var(--color-neutral-100);
    border-bottom: 1px solid var(--color-neutral-200);
    text-align: center;
    transition:
      background-color 300ms ease-in-out,
      color 300ms ease-in-out;

    &.multiselect__limit-info-max {
      color: var(--color-white);
      background-color: var(--color-black);
      border-bottom-color: var(--color-black);
      font-weight: 700;
      animation: limit-pulse 1.5s ease-in-out infinite;
    }
  }

  @keyframes limit-pulse {
    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.7;
    }
  }

  .multiselect__options {
    list-style: none;
    margin: 0;
    padding: 0.25rem 0;
    overflow-y: auto;
    max-height: 240px;
  }

  .multiselect__option {
    display: block;
    padding: 0;

    &.multiselect__option-disabled {
      opacity: 0.5;
    }
  }

  .multiselect__checkbox {
    width: 100%;
    padding: 0.625rem 0.75rem;
    border-radius: var(--radius-none);
    transition: background-color 0.15s ease-in-out;
    font-size: var(--text-sm);
    gap: 0.5rem;

    &:hover:not(:disabled) {
      background-color: var(--color-tertiary-light);
    }

    .multiselect__option-selected & {
      background-color: rgba(0, 123, 255, 0.05);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  .multiselect__no-options {
    padding: 1rem 0.75rem;
    text-align: center;
    color: var(--color-neutral-400);
    font-size: 0.875rem;
  }

  /* Dropdown transition */
  .multiselect-dropdown-enter-active,
  .multiselect-dropdown-leave-active {
    transition: all 0.2s ease-in-out;
    transform-origin: top;
  }

  .multiselect-dropdown-enter-from,
  .multiselect-dropdown-leave-to {
    opacity: 0;
    transform: scaleY(0.95) translateY(-0.5rem);
  }

  .multiselect-dropdown-enter-to,
  .multiselect-dropdown-leave-from {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }
}
</style>
