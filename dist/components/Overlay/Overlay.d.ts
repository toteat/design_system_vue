import { OverlayProps } from '../../types';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<OverlayProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: () => any;
    "update:visible": (value: boolean) => any;
    escape: () => any;
    "backdrop-click": () => any;
}, string, import('vue').PublicProps, Readonly<OverlayProps> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
    onEscape?: (() => any) | undefined;
    "onBackdrop-click"?: (() => any) | undefined;
}>, {
    role: "presentation" | "dialog";
    blur: boolean;
    visible: boolean;
    dismissible: boolean;
    closeOnBackdrop: boolean;
    closeOnEsc: boolean;
    lockScroll: boolean;
    placement: import('../../types').OverlayPlacement;
    zIndex: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
