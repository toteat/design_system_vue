import { RadioProps } from '../../types';
declare const _default: import('vue').DefineComponent<RadioProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (value: boolean) => any;
    "update:checked": (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<RadioProps> & Readonly<{
    onChange?: ((value: boolean) => any) | undefined;
    "onUpdate:checked"?: ((value: boolean) => any) | undefined;
}>, {
    size: import('../../types').ButtonSize;
    disabled: boolean;
    checked: boolean;
    description: string;
    card: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLLabelElement>;
export default _default;
