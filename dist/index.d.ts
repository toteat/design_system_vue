import { App } from 'vue';
import { default as Button } from './components/Button/Button';
import { default as Icon } from './components/Icon/Icon';
import { default as Spinner } from './components/Spinner/Spinner';
export type { ButtonType, ButtonSize, ButtonProps, SpinnerProps, IconContent, IconProps, ThemeColor, ImageStringType, ImageMime, LoadImageTypeFunction, } from './types/index.d';
export { Button, Icon, Spinner };
export declare const install: (app: App) => void;
export declare const ToteatDesignSystem: {
    install: (app: App) => void;
};
declare const _default: {
    install: (app: App) => void;
};
export default _default;
