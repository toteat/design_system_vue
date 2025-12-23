<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { DropdownButtonProps, DropdownButtonMenuItem } from '@/types';
import Icon from '../Icon/Icon.vue';

/* global MouseEvent, Node, document, KeyboardEvent, HTMLElement, HTMLButtonElement */

const props = withDefaults(defineProps<DropdownButtonProps>(), {
  size: 'medium',
  disabled: false,
});

const emit = defineEmits<{
  select: [item: DropdownButtonMenuItem];
  open: [];
  close: [];
}>();

// Dropdown state
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLButtonElement | null>(null);
const focusedIndex = ref(-1);

// Toggle dropdown
const toggleDropdown = (): void => {
  if (props.disabled) return;

  if (isOpen.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
};

const openDropdown = (): void => {
  isOpen.value = true;
  focusedIndex.value = -1;
  emit('open');
};

const closeDropdown = (): void => {
  isOpen.value = false;
  focusedIndex.value = -1;
  emit('close');
};

// Handle menu item selection
const selectItem = (item: DropdownButtonMenuItem): void => {
  if (item.disabled) return;

  emit('select', item);
  closeDropdown();
};

// Keyboard navigation
const handleKeyDown = (event: KeyboardEvent): void => {
  if (!isOpen.value) {
    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'ArrowDown'
    ) {
      event.preventDefault();
      openDropdown();
      focusedIndex.value = 0;
    }
    return;
  }

  handleOpenKeyDown(event);
};

const handleEscapeKey = (): void => {
  closeDropdown();
  buttonRef.value?.focus();
};

const handleArrowDownKey = (): void => {
  focusedIndex.value = Math.min(
    focusedIndex.value + 1,
    props.menuItems.length - 1,
  );
};

const handleArrowUpKey = (): void => {
  focusedIndex.value = Math.max(focusedIndex.value - 1, 0);
};

const handleSelectKey = (): void => {
  if (focusedIndex.value >= 0) {
    const item = props.menuItems[focusedIndex.value];
    if (item && !item.disabled) {
      selectItem(item);
    }
  }
};

const keyHandlers: Record<string, () => void> = {
  Escape: handleEscapeKey,
  ArrowDown: handleArrowDownKey,
  ArrowUp: handleArrowUpKey,
  Enter: handleSelectKey,
  ' ': handleSelectKey,
  Tab: closeDropdown,
};

const handleOpenKeyDown = (event: KeyboardEvent): void => {
  const handler = keyHandlers[event.key];
  if (handler) {
    event.preventDefault();
    handler();
  }
};

// Click outside handler
const handleClickOutside = (event: MouseEvent): void => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

onMounted((): void => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted((): void => {
  document.removeEventListener('click', handleClickOutside);
});

// Size mappings for icons
const ICON_SIZE_MAP = {
  tiny: 0.875,
  small: 1,
  medium: 1.25,
  large: 1.5,
} as const;

const getIconSize = (): number => {
  return props.size ? ICON_SIZE_MAP[props.size] : ICON_SIZE_MAP.medium;
};
</script>

<template>
  <div
    ref="dropdownRef"
    class="tot-ds-root tds-dropdown-button"
    :class="[
      `tds-dropdown-button--size-${size}`,
      {
        'tds-dropdown-button--disabled': disabled,
        'tds-dropdown-button--open': isOpen,
      },
    ]"
  >
    <!-- Button trigger -->
    <button
      ref="buttonRef"
      type="button"
      class="tds-dropdown-button__trigger"
      :disabled="disabled"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      @click="toggleDropdown"
      @keydown="handleKeyDown"
    >
      <span class="tds-dropdown-button__text">{{ text }}</span>
      <span class="tds-dropdown-button__separator" aria-hidden="true"></span>
      <span class="tds-dropdown-button__icon-wrapper">
        <Icon
          name="chevron-down-outline"
          :size="getIconSize()"
          color="white"
          class="tds-dropdown-button__chevron"
        />
      </span>
    </button>

    <!-- Dropdown menu -->
    <Transition name="tds-dropdown-button-menu">
      <ul
        v-if="isOpen"
        class="tds-dropdown-button__menu"
        role="menu"
        :aria-label="`${text} menu`"
      >
        <li
          v-for="(item, index) in menuItems"
          :key="item.value"
          class="tds-dropdown-button__menu-item"
          :data-disabled="item.disabled ?? false"
          :data-focused="focusedIndex === index"
          role="menuitem"
        >
          <button
            type="button"
            class="tds-dropdown-button__menu-button"
            :disabled="item.disabled"
            :tabindex="isOpen ? 0 : -1"
            @click="() => selectItem(item)"
          >
            <Icon
              v-if="item.icon"
              :name="item.icon"
              :size="1.25"
              color="neutral-500"
              class="tds-dropdown-button__menu-icon"
            />
            <span class="tds-dropdown-button__menu-label">{{
              item.label
            }}</span>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.tds-dropdown-button {
    position: relative;
    display: inline-block;
  }

  /* Button trigger - pill shaped, blue background */
  .tds-dropdown-button__trigger {
    display: flex;
    align-items: center;
    gap: 0;
    background-color: var(--color-blue);
    color: var(--color-white);
    border: none;
    border-radius: var(--radius-pill);
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;

    /* Mobile optimization */
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;

    &:hover:not(:disabled) {
      opacity: 0.85;
    }

    &:focus-visible {
      outline: 2px solid var(--color-blue);
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      filter: grayscale(1) opacity(0.25);
    }
  }

  .tds-dropdown-button__text {
    white-space: nowrap;
  }

  /* Vertical separator line */
  .tds-dropdown-button__separator {
    width: 1px;
    align-self: stretch;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .tds-dropdown-button__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tds-dropdown-button__chevron {
    transition: transform 200ms ease-out;
  }

  &.tds-dropdown-button--open .tds-dropdown-button__chevron {
    transform: rotate(180deg);
  }

  /* Size variants */
  &.tds-dropdown-button--size-tiny {
    .tds-dropdown-button__trigger {
      font-size: var(--text-xs);
      min-height: 2rem;
    }

    .tds-dropdown-button__text {
      padding: 0 var(--spacing-md);
    }

    .tds-dropdown-button__icon-wrapper {
      padding: 0 var(--spacing-sm);
    }

    .tds-dropdown-button__separator {
      margin: var(--spacing-xs) 0;
    }
  }

  &.tds-dropdown-button--size-small {
    .tds-dropdown-button__trigger {
      font-size: var(--text-sm);
      min-height: 2.75rem;
    }

    .tds-dropdown-button__text {
      padding: 0 var(--spacing-md);
    }

    .tds-dropdown-button__icon-wrapper {
      padding: 0 var(--spacing-sm);
    }

    .tds-dropdown-button__separator {
      margin: var(--spacing-xs) 0;
    }
  }

  &.tds-dropdown-button--size-medium {
    .tds-dropdown-button__trigger {
      font-size: var(--text-base);
      min-height: 3.75rem;
    }

    .tds-dropdown-button__text {
      padding: 0 var(--spacing-lg);
    }

    .tds-dropdown-button__icon-wrapper {
      padding: 0 var(--spacing-md);
    }

    .tds-dropdown-button__separator {
      margin: var(--spacing-sm) 0;
    }
  }

  &.tds-dropdown-button--size-large {
    .tds-dropdown-button__trigger {
      font-size: var(--text-lg);
      min-height: 5rem;
    }

    .tds-dropdown-button__text {
      padding: 0 var(--spacing-xl);
    }

    .tds-dropdown-button__icon-wrapper {
      padding: 0 var(--spacing-lg);
    }

    .tds-dropdown-button__separator {
      margin: var(--spacing-md) 0;
    }
  }

  /* Dropdown menu */
  .tds-dropdown-button__menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    min-width: 100%;
    background-color: var(--color-white);
    border: 1.5px solid var(--color-neutral-300);
    border-radius: var(--radius-base);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin-top: var(--spacing-xs);
    padding: var(--spacing-xs) 0;
    list-style: none;
    overflow: hidden;
  }

  .tds-dropdown-button__menu-item {
    display: block;
  }

  .tds-dropdown-button__menu-button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--text-sm);
    font-family: inherit;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-neutral-500);
    transition: background-color 0.15s ease-in-out;
    white-space: nowrap;

    &:hover:not(:disabled) {
      background-color: var(--color-tertiary-light);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .tds-dropdown-button__menu-item[data-focused='true']
    .tds-dropdown-button__menu-button {
    background-color: var(--color-tertiary-light);
  }

  .tds-dropdown-button__menu-icon {
    flex-shrink: 0;
  }

  .tds-dropdown-button__menu-label {
    flex: 1;
  }

  /* Dropdown transition */
  .tds-dropdown-button-menu-enter-active,
  .tds-dropdown-button-menu-leave-active {
    transition: all 0.2s ease-in-out;
    transform-origin: top;
  }

  .tds-dropdown-button-menu-enter-from,
  .tds-dropdown-button-menu-leave-to {
    opacity: 0;
    transform: scaleY(0.95) translateY(-0.5rem);
  }

  .tds-dropdown-button-menu-enter-to,
  .tds-dropdown-button-menu-leave-from {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }

  /* Disabled state */
  &.tds-dropdown-button--disabled {
    .tds-dropdown-button__trigger {
      cursor: not-allowed;
      filter: grayscale(1) opacity(0.25);
    }
  }
}
</style>
