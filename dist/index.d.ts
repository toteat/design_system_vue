
import type { App } from 'vue';
import type { DefineComponent } from 'vue';

// Component types
export type ButtonType = 'outline' | 'primary' | 'secondary' | 'text';
export type ButtonSize = 'medium' | 'large' | 'smaller' | 'small';
export type ButtonProps = {
  type?: ButtonType;
  disabled?: boolean;
  isFull?: boolean;
  size?: ButtonSize;
  typeButton?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  text?: string;
  selected?: boolean;
  iconName?: string;
  onlyIcon?: boolean;
};

export type SpinnerProps = {
  dimension?: number;
};

export type IconContent = {
  path: string;
  viewBox: string;
};

export type IconProps = {
  name: string;
  size?: number;
  color?: ThemeColor;
};

export type ThemeColor =
  | 'primary'
  | 'primary-light'
  | 'secondary'
  | 'secondary-light'
  | 'tertiary'
  | 'tertiary-light'
  | 'white'
  | 'black'
  | 'neutral'
  | 'neutral-100'
  | 'neutral-200'
  | 'neutral-300'
  | 'neutral-400'
  | 'neutral-500'
  | 'gray-100'
  | 'gray-200'
  | 'gray-300'
  | 'gray-400'
  | 'gray-500'
  | 'blue'
  | 'blue-light'
  | 'green'
  | 'green-light'
  | 'yellow'
  | 'yellow-light'
  | 'red'
  | 'red-light'
  | 'unset';

// Component exports
export declare const Button: DefineComponent<ButtonProps>;
export declare const Icon: DefineComponent<IconProps>;
export declare const Spinner: DefineComponent<SpinnerProps>;

// Plugin exports
export declare const install: (app: App) => void;
export declare const ToteatDesignSystem: {
  install: (app: App) => void;
};

// Default export
declare const _default: {
  install: (app: App) => void;
};
export default _default;
