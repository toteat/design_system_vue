import { TableProps, TableSortOrder } from '../../types';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<`cell-${string}`, (_: {
        row: import('../../types').TableData;
        column: import('../../types').TableColumn;
        value: unknown;
    }) => any>>;
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<TableProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<TableProps> & Readonly<{}>, {
    striped: boolean;
    defaultSortOrder: TableSortOrder;
    nonInteractive: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
