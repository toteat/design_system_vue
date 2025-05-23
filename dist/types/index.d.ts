import { IconNames } from '../components/Icon/icons';
// Common types used across the design system

// Button types
export type ButtonType = 'outline' | 'primary' | 'secondary' | 'text';

// Button size
export type ButtonSize = 'medium' | 'large' | 'small' | 'tiny';

export type ButtonProps = {
  type?: ButtonType;
  disabled?: boolean;
  isFull?: boolean;
  size?: ButtonSize;
  typeButton?: ButtonHTMLAttributes['type'];
  loading?: boolean;
  text?: string;
  selected?: boolean;
  iconPosition?: 'left' | 'right';
  iconName?: IconNames;
  onlyIcon?: boolean;
  clickEventName?: string;
};

export type SpinnerProps = {
  size?: number;
};

export type IconContent = {
  path: string;
  viewBox: string;
};

export type IconProps = {
  name: IconNames;
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

export type SkeletonPreloadProps = {
  width?: number;
  height?: number;
  borderRadius?: number;
  isRounded?: boolean;
};

export type ImagePreviewProps = {
  width?: number;
  height?: number;
  alt?: string;
  imageSrc: string;
};

export type ImageMime = string | undefined;

export type ImageStringType = {
  type: 'base64' | 'url' | undefined;
  mime: ImageMime;
};

export {};
