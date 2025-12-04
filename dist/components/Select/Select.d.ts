import { SelectProps, MultiselectOption } from '../../types';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        option?(_: {
            option: MultiselectOption;
            selected: boolean;
        }): any;
    };
    refs: {
        dropdownRef: HTMLDivElement;
        inputRef: HTMLInputElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<SelectProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    select: (option: MultiselectOption) => any;
    "update:modelValue": (value: string | number | null) => any;
    change: (value: string | number | null) => any;
    close: () => any;
    "update:searchQuery": (value: string) => any;
    open: () => any;
}, string, import('vue').PublicProps, Readonly<SelectProps> & Readonly<{
    onSelect?: ((option: MultiselectOption) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | number | null) => any) | undefined;
    onChange?: ((value: string | number | null) => any) | undefined;
    onClose?: (() => any) | undefined;
    "onUpdate:searchQuery"?: ((value: string) => any) | undefined;
    onOpen?: (() => any) | undefined;
}>, {
    size: import('../../types').ButtonSize;
    disabled: boolean;
    modelValue: string | number | null;
    searchable: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    dropdownRef: HTMLDivElement;
    inputRef: HTMLInputElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
