import { App } from 'vue';
export type { Variant, ButtonSize, ButtonProps, SpinnerProps, IconContent, IconProps, ThemeColor, ImageStringType, ImageMime, LoadImageTypeFunction, CheckboxProps, MultiselectProps, MultiselectOption, TooltipProps, TooltipPosition, LogoToteatProps, LogoToteatMode, LogoToteatVariant, } from './types/index.d';
export { default as Button } from './components/Button/Button';
export { default as Icon } from './components/Icon/Icon';
export { default as Spinner } from './components/Spinner/Spinner';
export { default as DropZone } from './components/DropZone';
export { default as SkeletonPreload } from './components/SkeletonPreload';
export { default as ImagePreview } from './components/ImagePreview';
export { default as Checkbox } from './components/Checkbox';
export { default as Multiselect } from './components/Multiselect';
export { default as Tooltip } from './components/Tooltip';
export { default as LogoToteat } from './components/LogoToteat';
export declare const install: (app: App) => void;
export declare const ToteatDesignSystem: {
    install: (app: App) => void;
};
declare const _default: {
    install: (app: App) => void;
};
export default _default;
