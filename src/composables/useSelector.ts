import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  type Ref,
  type ComputedRef,
} from 'vue';
import type { MultiselectOption } from '@/types';

/* global MouseEvent, Node, document, HTMLElement, HTMLInputElement */

export interface UseSelectorOptions {
  /** Options array */
  options: Ref<MultiselectOption[]>;
  /** Search query (external v-model) */
  searchQueryProp?: Ref<string | undefined>;
  /** Whether search is enabled */
  searchable?: Ref<boolean>;
  /** Whether to close on select */
  closeOnSelect?: Ref<boolean>;
  /** When true, disables client-side filtering (backend handles filtering) */
  disableAutofilter?: Ref<boolean>;
  /** Emit functions */
  emit: {
    open: () => void;
    close: () => void;
    updateSearchQuery: (value: string) => void;
  };
}

export interface UseSelectorReturn {
  /** Whether dropdown is open */
  isOpen: Ref<boolean>;
  /** Internal search query */
  internalSearchQuery: Ref<string>;
  /** Computed search query (uses prop if provided, otherwise internal) */
  searchQuery: ComputedRef<string>;
  /** Set search query */
  setSearchQuery: (value: string) => void;
  /** Filtered options based on search */
  filteredOptions: ComputedRef<MultiselectOption[]>;
  /** Reference to dropdown container element */
  dropdownRef: Ref<HTMLElement | null>;
  /** Reference to input element */
  inputRef: Ref<HTMLInputElement | null>;
  /** Open dropdown */
  openDropdown: () => void;
  /** Close dropdown */
  closeDropdown: () => void;
  /** Toggle dropdown */
  toggleDropdown: () => void;
  /** Handle input focus */
  handleInputFocus: () => void;
  /** Check if option is disabled */
  isOptionDisabled: (option: MultiselectOption) => boolean;
}

export function useSelector(options: UseSelectorOptions): UseSelectorReturn {
  const {
    options: optionsRef,
    searchQueryProp,
    searchable = ref(true),
    closeOnSelect: _closeOnSelect = ref(true),
    disableAutofilter = ref(false),
    emit,
  } = options;

  const isOpen = ref(false);
  const internalSearchQuery = ref('');
  const dropdownRef = ref<HTMLElement | null>(null);
  const inputRef = ref<HTMLInputElement | null>(null);

  // Use prop searchQuery if provided, otherwise use internal state
  const searchQuery = computed(
    () => searchQueryProp?.value ?? internalSearchQuery.value,
  );

  const setSearchQuery = (value: string) => {
    internalSearchQuery.value = value;
    emit.updateSearchQuery(value);
  };

  // Filtered options based on search
  // When disableAutofilter is true, return all options (backend handles filtering)
  const filteredOptions = computed(() => {
    if (disableAutofilter.value) {
      return optionsRef.value;
    }

    if (!searchable.value || !searchQuery.value) {
      return optionsRef.value;
    }

    const query = searchQuery.value.toLowerCase();
    return optionsRef.value.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  });

  // Open dropdown
  const openDropdown = () => {
    if (!isOpen.value) {
      isOpen.value = true;
      emit.open();
    }
  };

  // Close dropdown
  const closeDropdown = () => {
    if (isOpen.value) {
      isOpen.value = false;
      setSearchQuery('');
      if (inputRef.value) {
        inputRef.value.blur();
      }
      emit.close();
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    if (isOpen.value) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    openDropdown();
  };

  // Check if option is disabled
  const isOptionDisabled = (option: MultiselectOption) => {
    return option.disabled ?? false;
  };

  // Handle click outside to close dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.value &&
      !dropdownRef.value.contains(event.target as Node)
    ) {
      closeDropdown();
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  return {
    isOpen,
    internalSearchQuery,
    searchQuery,
    setSearchQuery,
    filteredOptions,
    dropdownRef,
    inputRef,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    handleInputFocus,
    isOptionDisabled,
  };
}
