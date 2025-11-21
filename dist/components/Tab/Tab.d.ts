import { TabProps } from '../../types';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {
            currentTab: import('../../types').TabItem | undefined;
            currentValue: string | number;
        }): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<TabProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (value: string | number) => any;
    "update:selectedTab": (value: string | number) => any;
    "tab-click": (tab: {
        value: string | number;
        label: string;
    }) => any;
}, string, import('vue').PublicProps, Readonly<TabProps> & Readonly<{
    onChange?: ((value: string | number) => any) | undefined;
    "onUpdate:selectedTab"?: ((value: string | number) => any) | undefined;
    "onTab-click"?: ((tab: {
        value: string | number;
        label: string;
    }) => any) | undefined;
}>, {
    size: import('../../types').ButtonSize;
    fullWidth: boolean;
    selectedTab: string | number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
