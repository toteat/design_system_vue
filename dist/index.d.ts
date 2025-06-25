import { App } from 'vue';
import { default as Button } from './components/Button/Button';
import { default as Icon } from './components/Icon/Icon';
import { default as Spinner } from './components/Spinner/Spinner';
import { default as DropZone } from './components/DropZone';
import { default as SkeletonPreload } from './components/SkeletonPreload';
import { ImagePreview } from './components/ImagePreview';
export type { Variant, ButtonSize, ButtonProps, SpinnerProps, IconContent, IconProps, ThemeColor, ImageStringType, ImageMime, LoadImageTypeFunction, } from './types/index.d';
export { Button, Icon, Spinner, DropZone, SkeletonPreload, ImagePreview };
export declare const install: (app: App) => void;
export declare const ToteatDesignSystem: {
    install: (app: App) => void;
};
declare const _default: {
    install: (app: App) => void;
};
export default _default;
