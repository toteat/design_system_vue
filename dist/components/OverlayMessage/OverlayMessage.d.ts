import { OverlayMessageProps, OverlayMessageStatus } from '../../types';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        icon?(_: {}): any;
        icon?(_: {}): any;
        default?(_: {}): any;
        default?(_: {}): any;
        actions?(_: {
            close: () => void;
            primary: () => void;
            secondary: () => void;
        }): any;
        actions?(_: {
            close: () => void;
            primary: () => void;
            secondary: () => void;
        }): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<OverlayMessageProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: () => any;
    "update:visible": (value: boolean) => any;
    escape: () => any;
    "backdrop-click": () => any;
    "primary-click": () => any;
    "secondary-click": () => any;
}, string, import('vue').PublicProps, Readonly<OverlayMessageProps> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
    onEscape?: (() => any) | undefined;
    "onBackdrop-click"?: (() => any) | undefined;
    "onPrimary-click"?: (() => any) | undefined;
    "onSecondary-click"?: (() => any) | undefined;
}>, {
    standalone: boolean;
    iconSize: number;
    maxWidth: number;
    visible: boolean;
    dismissible: boolean;
    closeOnBackdrop: boolean;
    closeOnEsc: boolean;
    lockScroll: boolean;
    status: OverlayMessageStatus;
    closeButtonLabel: string;
    primaryButtonVariant: import('../../types').Variant;
    secondaryButtonVariant: import('../../types').Variant;
    loadingPrimary: boolean;
    loadingSecondary: boolean;
    showCloseButton: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
