import { MultiselectProps, MultiselectOption } from '../../types';
declare const _default: import('vue').DefineComponent<MultiselectProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: (string | number)[]) => any;
    change: (value: (string | number)[]) => any;
    clear: () => any;
    close: () => any;
    "update:searchQuery": (value: string) => any;
    open: () => any;
    "option-select": (option: MultiselectOption) => any;
    "option-deselect": (option: MultiselectOption) => any;
    "remove-tag": (value: string | number) => any;
}, string, import('vue').PublicProps, Readonly<MultiselectProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: (string | number)[]) => any) | undefined;
    onChange?: ((value: (string | number)[]) => any) | undefined;
    onClear?: (() => any) | undefined;
    onClose?: (() => any) | undefined;
    "onUpdate:searchQuery"?: ((value: string) => any) | undefined;
    onOpen?: (() => any) | undefined;
    "onOption-select"?: ((option: MultiselectOption) => any) | undefined;
    "onOption-deselect"?: ((option: MultiselectOption) => any) | undefined;
    "onRemove-tag"?: ((value: string | number) => any) | undefined;
}>, {
    size: import('../../types').ButtonSize;
    disabled: boolean;
    modelValue: (string | number)[];
    checkboxPosition: "left" | "right";
    searchable: boolean;
    closeOnSelect: boolean;
    clearable: boolean;
    showSelectedItems: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    dropdownRef: HTMLDivElement;
    inputRef: HTMLInputElement;
}, HTMLDivElement>;
export default _default;
