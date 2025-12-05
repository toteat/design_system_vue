import { CardProps } from '../../types';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        default?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<CardProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (event: MouseEvent) => any;
    "update:hovered": (value: boolean) => any;
    "update:focused": (value: boolean) => any;
    "update:pressed": (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<CardProps> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
    "onUpdate:hovered"?: ((value: boolean) => any) | undefined;
    "onUpdate:focused"?: ((value: boolean) => any) | undefined;
    "onUpdate:pressed"?: ((value: boolean) => any) | undefined;
}>, {
    padding: "none" | "small" | "medium" | "large";
    elevation: "none" | "small" | "medium" | "large";
    hoverable: boolean;
    hovered: boolean;
    focused: boolean;
    pressed: boolean;
    maxWidth: number | string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
