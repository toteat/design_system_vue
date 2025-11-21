import { GroupedButtonsProps } from '../../types';
declare const _default: import('vue').DefineComponent<GroupedButtonsProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (value: string | number) => any;
    "update:selectedButton": (value: string | number) => any;
}, string, import('vue').PublicProps, Readonly<GroupedButtonsProps> & Readonly<{
    onChange?: ((value: string | number) => any) | undefined;
    "onUpdate:selectedButton"?: ((value: string | number) => any) | undefined;
}>, {
    size: import('../../types').ButtonSize;
    disabled: boolean;
    fullWidth: boolean;
    selectedButton: string | number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLFieldSetElement>;
export default _default;
