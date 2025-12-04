<script setup lang="ts">
import { ref, computed, toRef } from 'vue';
import type { SelectProps, MultiselectOption } from '@/types';
import { useSelector } from '@/composables/useSelector';
import Icon from '../Icon/Icon.vue';

/* global HTMLInputElement, Event */

const props = withDefaults(defineProps<SelectProps>(), {
  disabled: false,
  searchable: true,
  disableAutofilter: false,
  size: 'medium',
  modelValue: null,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null];
  'update:searchQuery': [value: string];
  change: [value: string | number | null];
  open: [];
  close: [];
  select: [option: MultiselectOption];
}>();

// Computed placeholder
const placeholderText = computed(() => {
  if (props.searchable) {
    return props.searchPlaceholder ?? props.placeholder ?? 'Search...';
  }
  return props.placeholder ?? 'Select an option...';
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
  isOptionDisabled,
} = useSelector({
  options: toRef(props, 'options'),
  searchQueryProp: toRef(props, 'searchQuery'),
  searchable: toRef(props, 'searchable'),
  disableAutofilter: toRef(props, 'disableAutofilter'),
  closeOnSelect: ref(true),
  emit: {
    open: () => emit('open'),
    close: () => emit('close'),
    updateSearchQuery: (value: string) => emit('update:searchQuery', value),
  },
});

// Get selected option
const selectedOption = computed(() => {
  if (props.modelValue == null) return null;
  return (
    props.options.find((option) => option.value === props.modelValue) ?? null
  );
});

// Display value for non-searchable mode or when dropdown is closed
const displayValue = computed(() => {
  return selectedOption.value?.label ?? '';
});

// Check if an option is selected
const isSelected = (option: MultiselectOption) => {
  return props.modelValue === option.value;
};

// Select an option
const selectOption = (option: MultiselectOption) => {
  if (isOptionDisabled(option)) return;

  emit('select', option);
  emit('update:modelValue', option.value);
  emit('change', option.value);
  closeDropdown();
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
    class="tot-ds-root tds-select"
    :class="[
      `tds-select--size-${size}`,
      {
        'tds-select--disabled': disabled,
        'tds-select--open': isOpen,
      },
    ]"
    :data-testid="`tds-select-${isOpen ? 'open' : 'closed'}`"
  >
    <!-- Searchable input trigger -->
    <div v-if="searchable" class="tds-select__input-wrapper">
      <input
        ref="inputRef"
        type="text"
        class="tds-select__search-input"
        :id="id"
        :name="name"
        :value="isOpen ? searchQuery : displayValue"
        :placeholder="placeholderText"
        :disabled="disabled"
        @input="handleSearchInput"
        @focus="handleInputFocus"
        @keydown.escape="closeDropdown"
      />
      <div class="tds-select__actions">
        <Icon
          name="search-outline"
          :size="1.25"
          color="neutral-400"
          class="tds-select__search-icon"
        />
      </div>
    </div>

    <!-- Non-searchable trigger -->
    <div
      v-else
      class="tds-select__trigger"
      :tabindex="disabled ? -1 : 0"
      @click="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.escape="closeDropdown"
    >
      <span class="tds-select__trigger-text" :data-placeholder="!displayValue">
        {{ displayValue || placeholderText }}
      </span>
      <div class="tds-select__actions">
        <Icon
          name="chevron-down-outline"
          :size="1.25"
          color="neutral-400"
          class="tds-select__arrow"
        />
      </div>
    </div>

    <!-- Dropdown (absolute positioned) -->
    <Transition name="tds-select-dropdown">
      <div v-if="isOpen" class="tds-select__dropdown">
        <ul class="tds-select__options">
          <!-- eslint-disable-next-line vuejs-accessibility/interactive-supports-focus -->
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            class="tds-select__option"
            :data-selected="isSelected(option)"
            :data-disabled="isOptionDisabled(option)"
            role="option"
            :aria-selected="isSelected(option)"
            :aria-disabled="isOptionDisabled(option)"
            :tabindex="isOptionDisabled(option) ? -1 : 0"
            @click="selectOption(option)"
            @keydown.enter.prevent="selectOption(option)"
            @keydown.space.prevent="selectOption(option)"
          >
            <slot name="option" :option="option" :selected="isSelected(option)">
              {{ option.label }}
            </slot>
          </li>
          <li
            v-if="filteredOptions.length === 0"
            class="tds-select__no-options"
          >
            No options found
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.tds-select {
    position: relative;
    width: 100%;
    font-family: inherit;
  }

  /* Input wrapper (searchable mode) */
  .tds-select__input-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-neutral);
    border: 1.5px solid var(--color-neutral-300);
    border-radius: var(--radius-base);
    transition: all 0.2s ease-in-out;
    min-height: 3rem;
    position: relative;

    &:hover:not(.tds-select--disabled &) {
      border-color: var(--color-neutral-400);
    }

    &:focus-within {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
  }

  &.tds-select--open .tds-select__input-wrapper {
    border-color: var(--color-primary);
  }

  &.tds-select--disabled .tds-select__input-wrapper {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: var(--color-neutral-100);
  }

  /* Trigger (non-searchable mode) */
  .tds-select__trigger {
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

    &:hover:not(.tds-select--disabled &) {
      border-color: var(--color-neutral-400);
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
  }

  .tds-select__trigger-text {
    flex: 1;
    color: var(--color-neutral-900);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &[data-placeholder='true'] {
      color: var(--color-neutral-400);
    }
  }

  &.tds-select--open .tds-select__trigger {
    border-color: var(--color-primary);
  }

  &.tds-select--disabled .tds-select__trigger {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: var(--color-neutral-100);
  }

  /* Size variants */
  &.tds-select--size-tiny {
    & .tds-select__trigger,
    & .tds-select__input-wrapper {
      min-height: 2rem;
      font-size: var(--text-xs);
    }

    & .tds-select__search-input {
      padding: 0.25rem 0 0.25rem 0.5rem;
    }

    & .tds-select__actions {
      padding: 0.25rem 0.5rem;
    }
  }

  &.tds-select--size-small {
    & .tds-select__trigger,
    & .tds-select__input-wrapper {
      min-height: 2.5rem;
      font-size: var(--text-sm);
    }

    & .tds-select__search-input {
      padding: 0.375rem 0 0.375rem 0.625rem;
    }

    & .tds-select__actions {
      padding: 0.375rem 0.625rem 0.375rem 0.5rem;
    }
  }

  &.tds-select--size-medium {
    & .tds-select__trigger,
    & .tds-select__input-wrapper {
      min-height: 3rem;
      font-size: var(--text-base);
    }

    & .tds-select__search-input {
      padding: 0.5rem 0 0.5rem 0.75rem;
    }

    & .tds-select__actions {
      padding: 0.5rem 0.75rem 0.5rem 0.5rem;
    }
  }

  &.tds-select--size-large {
    & .tds-select__trigger,
    & .tds-select__input-wrapper {
      min-height: 3.75rem;
      font-size: var(--text-lg);
    }

    & .tds-select__search-input {
      padding: 0.75rem 0 0.75rem 1rem;
    }

    & .tds-select__actions {
      padding: 0.75rem 1rem 0.75rem 0.5rem;
    }
  }

  .tds-select__search-input {
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

  .tds-select__actions {
    display: flex;
    align-items: center;
    align-self: stretch;
    flex-shrink: 0;
    border-left: 1px solid var(--color-neutral-300);
    gap: 0.25rem;
  }

  .tds-select__search-icon {
    flex-shrink: 0;
  }

  .tds-select__arrow {
    flex-shrink: 0;
    transition: transform 200ms ease-out;
  }

  &.tds-select--open .tds-select__arrow {
    transform: rotate(180deg);
  }

  /* Dropdown - ABSOLUTE POSITIONED */
  .tds-select__dropdown {
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

  .tds-select__options {
    list-style: none;
    margin: 0;
    padding: 0.25rem 0;
    overflow-y: auto;
    max-height: 240px;
  }

  .tds-select__option {
    display: block;
    padding: 0.625rem 0.75rem;
    font-size: var(--text-sm);
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    &:hover:not([data-disabled='true']) {
      background-color: var(--color-tertiary-light);
    }

    &[data-selected='true'] {
      background-color: rgba(0, 123, 255, 0.05);
      font-weight: 500;
    }

    &[data-disabled='true'] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .tds-select__no-options {
    padding: 1rem 0.75rem;
    text-align: center;
    color: var(--color-neutral-400);
    font-size: var(--text-sm);
  }

  /* Dropdown transition */
  .tds-select-dropdown-enter-active,
  .tds-select-dropdown-leave-active {
    transition: all 0.2s ease-in-out;
    transform-origin: top;
  }

  .tds-select-dropdown-enter-from,
  .tds-select-dropdown-leave-to {
    opacity: 0;
    transform: scaleY(0.95) translateY(-0.5rem);
  }

  .tds-select-dropdown-enter-to,
  .tds-select-dropdown-leave-from {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }
}
</style>
