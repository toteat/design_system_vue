import type { IconNames } from '../components/Icon/icons';

// Common types used across the design system

// Button types
export type Variant = 'outline' | 'primary' | 'secondary' | 'text';

// Button size
export type ButtonSize = 'medium' | 'large' | 'small' | 'tiny';

export type ButtonProps = {
  variant?: Variant;
  disabled?: boolean;
  isFull?: boolean;
  size?: ButtonSize;
  type?: ButtonHTMLAttributes['type'];
  loading?: boolean;
  text?: string;
  selected?: boolean;
  iconPosition?: 'left' | 'right';
  iconName?: IconNames;
  onlyIcon?: boolean;
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
  borderRadius?: number;
};

export type ImageMime = string | undefined;

export type ImageStringType = {
  type: 'base64' | 'url' | undefined;
  mime: ImageMime;
};

export type LoadImageTypeFunction = (
  imageSrc: string | undefined,
  imageTypeInfo: { value: ImageStringType | null },
  isLoading: { value: boolean },
  hasError: { value: boolean },
  isBase64Image: { value: boolean },
  computedImageSrc: { value: string | undefined },
) => Promise<void>;

export type AllowedFileTypes = 'images' | 'video' | 'text';

export type DropZoneProps = {
  instanceName: string;
  allowedFileTypes?: AllowedFileTypes;
  multiple?: boolean;
  accept?: string;
  label?: string;
  displayPreview?: boolean;
  displayFileList?: boolean;
};

export type FileList = globalThis.FileList;
export type HTMLInputElement = globalThis.HTMLInputElement;
export type DragEvent = globalThis.DragEvent;
export type Event = globalThis.Event;
export interface FileWithPreview {
  file: File;
  name: string;
  preview: string;
}

export type MultiselectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

export type MultiselectProps = {
  options: MultiselectOption[];
  modelValue?: (string | number)[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  maxSelections?: number;
  searchable?: boolean;
  clearable?: boolean;
  closeOnSelect?: boolean;
  size?: ButtonSize;
};

export type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  size?: number;
  color?: ThemeColor;
};
