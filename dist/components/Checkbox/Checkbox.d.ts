import { CheckboxProps } from '../../types';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLLabelElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<CheckboxProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (checked: boolean) => any;
    "update:checked": (checked: boolean) => any;
}, string, import('vue').PublicProps, Readonly<CheckboxProps> & Readonly<{
    onChange?: ((checked: boolean) => any) | undefined;
    "onUpdate:checked"?: ((checked: boolean) => any) | undefined;
}>, {
    size: import('../../types').CheckboxSize;
    color: import('../../types').ThemeColor;
    disabled: boolean;
    checked: boolean;
    checkboxPosition: "left" | "right";
    fullWidth: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLLabelElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
