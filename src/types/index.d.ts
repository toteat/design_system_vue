import type { IconNames } from '../components/Icon/icons';

// Common types used across the design system

// Button types
export type Variant =
  | 'outline'
  | 'outline-gray'
  | 'primary'
  | 'secondary'
  | 'text'
  | 'neutral-dark';

// Component sizes - shared across components
export type ComponentSize =
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'very-large'
  | 'very-very-large'
  | 'ridiculously-large';

// Button size (legacy, using ComponentSize)
export type ButtonSize = 'tiny' | 'small' | 'medium' | 'large';

// Checkbox size
export type CheckboxSize = ComponentSize;

export type ButtonGroupPosition = 'left' | 'center' | 'right' | 'standalone';

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
  groupPosition?: ButtonGroupPosition;
};

export type SpinnerProps = {
  size?: number;
};

export type CardProps = {
  /**
   * Padding size inside the card
   * @default 'medium'
   */
  padding?: 'none' | 'small' | 'medium' | 'large';
  /**
   * Shadow elevation level
   * @default 'none'
   */
  elevation?: 'none' | 'small' | 'medium' | 'large';
  /**
   * Whether card shows shadow on hover
   * @default false
   */
  hoverable?: boolean;
  /**
   * URL to navigate to when card is clicked (renders as <a>)
   */
  href?: string;
  /**
   * Link target attribute (_blank, _self, etc.)
   */
  target?: string;
  /**
   * Link rel attribute (e.g., 'noopener noreferrer')
   */
  rel?: string;
  /**
   * Two-way binding for hover state
   */
  hovered?: boolean;
  /**
   * Two-way binding for focus state
   */
  focused?: boolean;
  /**
   * Two-way binding for pressed/active state
   */
  pressed?: boolean;
  /**
   * Maximum width of the card (in pixels or CSS value)
   */
  maxWidth?: number | string;
  /**
   * Flex direction of the card content
   */
  flexDirection?: 'row' | 'column';
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

export type TextInputType =
  | 'text'
  | 'password'
  | 'email'
  | 'search'
  | 'tel'
  | 'url'
  | 'number'
  | 'date';

export type TextInputValidationState =
  | 'default'
  | 'success'
  | 'warning'
  | 'error';
export type TextInputSize = 'small' | 'medium' | 'large';
export type TextInputInputMode =
  | 'text'
  | 'email'
  | 'search'
  | 'tel'
  | 'url'
  | 'none'
  | 'numeric'
  | 'decimal';

export type TextInputProps = {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  helperTextAlign?: 'left' | 'right';
  errorMessage?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  type?: TextInputType;
  name?: string;
  id?: string;
  autocomplete?: string;
  inputmode?: TextInputInputMode;
  maxLength?: number;
  minLength?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  prefixIcon?: IconNames;
  suffixIcon?: IconNames;
  clearable?: boolean;
  autoFocus?: boolean;
  size?: TextInputSize;
  fullWidth?: boolean;
  validationState?: TextInputValidationState;
  showCounter?: boolean;
  width?: number;
  height?: number;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  showValidationIcon?: boolean;
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

export type AllowedFileTypes = 'images' | 'video' | 'text' | 'spreadsheet';

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
  searchQuery?: string;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  maxSelectionsMessage?: string;
  disabled?: boolean;
  maxSelections?: number;
  searchable?: boolean;
  clearable?: boolean;
  closeOnSelect?: boolean;
  size?: ButtonSize;
  id?: string;
  name?: string;
  checkboxPosition?: 'left' | 'right';
  showSelectedItems?: boolean;
  validationState?: TextInputValidationState;
  errorMessage?: string;
  helperText?: string;
  /** When true, renders dropdown in body using Teleport to escape overflow containers */
  appendToBody?: boolean;
};

// Select - Single selection combobox with search
export type SelectProps = {
  options: MultiselectOption[];
  modelValue?: string | number | null;
  searchQuery?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  /** When true, disables client-side filtering. Use when backend handles filtering. */
  disableAutofilter?: boolean;
  size?: ButtonSize;
  id?: string;
  name?: string;
  validationState?: TextInputValidationState;
  errorMessage?: string;
  helperText?: string;
  /** When true, renders dropdown in body using Teleport to escape overflow containers */
  appendToBody?: boolean;
};

export type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  size?: CheckboxSize;
  color?: ThemeColor;
  checkboxPosition?: 'left' | 'right';
  fullWidth?: boolean;
  title?: string;
  description?: string;
  card?: boolean;
};

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  content: string;
  position?: TooltipPosition;
  disabled?: boolean;
  delay?: number;
  maxWidth?: number;
};

export type LogoToteatMode = 'icon' | 'complete';
export type LogoToteatVariant = 'original' | 'cream-orange' | 'black-cream';

export type LogoToteatProps = {
  mode?: LogoToteatMode;
  variant?: LogoToteatVariant;
  width?: number;
  height?: number;
  alt?: string;
};

// GroupedButtons
export type GroupedButtonsOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: IconNames;
};

export type GroupedButtonsProps = {
  options: GroupedButtonsOption[];
  selectedButton?: string | number;
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
};

// Tab
export type TabItem = {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: IconNames;
  content?: () => unknown; // Render function that returns VNode
};

export type TabProps = {
  tabs: TabItem[];
  selectedTab?: string | number;
  size?: ButtonSize;
  fullWidth?: boolean;
};

// BackgroundWrapper - Fixed styling, no props
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type BackgroundWrapperProps = {};

// Table
export type TableSortOrder = 'asc' | 'desc';

export type TableColumnType = 'text' | 'number' | 'date';

export type TableColumn = {
  key: string;
  label: string;
  sortable?: boolean;
  sortType?: TableColumnType;
};

export type TableData = Record<string, unknown>;

export type TableProps = {
  columns: TableColumn[];
  data: TableData[];
  striped?: boolean;
  defaultSortColumn?: string;
  defaultSortOrder?: TableSortOrder;
  nonInteractive?: boolean;
};

// Radio
export type RadioProps = {
  title: string;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
  size?: ButtonSize;
  card?: boolean;
};

export type OverlayPlacement = 'top' | 'center' | 'bottom';

export type OverlayProps = {
  visible?: boolean;
  dismissible?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  lockScroll?: boolean;
  blur?: boolean;
  placement?: OverlayPlacement;
  zIndex?: number;
  role?: 'presentation' | 'dialog';
  ariaLabel?: string;
};

export type OverlayMessageStatus = 'success' | 'info' | 'warning' | 'error';

export type OverlayMessageProps = {
  visible?: boolean;
  status?: OverlayMessageStatus;
  iconName?: IconNames;
  iconColor?: ThemeColor;
  iconSize?: number;
  title: string;
  eyebrow?: string;
  dismissible?: boolean;
  closeButtonLabel?: string;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  lockScroll?: boolean;
  zIndex?: number;
  blur?: boolean;
  placement?: OverlayPlacement;
  ariaLabel?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  primaryButtonVariant?: Variant;
  secondaryButtonVariant?: Variant;
  loadingPrimary?: boolean;
  loadingSecondary?: boolean;
  showCloseButton?: boolean;
  maxWidth?: number;
  standalone?: boolean;
};

// DropdownButton - Button with dropdown menu
export type DropdownButtonMenuItem = {
  value: string | number;
  label: string;
  icon?: IconNames;
  disabled?: boolean;
};

export type DropdownButtonProps = {
  /** Button text */
  text: string;
  /** Menu items for the dropdown */
  menuItems: DropdownButtonMenuItem[];
  /** Button size */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
};
