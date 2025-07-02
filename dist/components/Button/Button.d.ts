import { ButtonProps } from '../../types';
declare const _default: import('vue').DefineComponent<ButtonProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (event: MouseEvent | TouchEvent) => any;
}, string, import('vue').PublicProps, Readonly<ButtonProps> & Readonly<{
    onClick?: ((event: MouseEvent | TouchEvent) => any) | undefined;
}>, {
    size: import('../../types').ButtonSize;
    type: ButtonHTMLAttributes["type"];
    text: string;
    variant: import('../../types').Variant;
    disabled: boolean;
    isFull: boolean;
    loading: boolean;
    selected: boolean;
    iconPosition: "left" | "right";
    iconName: import('../Icon').IconNames;
    onlyIcon: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLButtonElement>;
export default _default;
