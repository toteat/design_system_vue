import { Ref, ComputedRef } from 'vue';
import { MultiselectOption } from '../types';
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
export declare function useSelector(options: UseSelectorOptions): UseSelectorReturn;
