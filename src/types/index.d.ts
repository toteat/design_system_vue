// Common types used across the design system

// Color palette type
export type ColorPalette = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'

// Size type
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Variant type
export type Variant = 'filled' | 'outlined' | 'text' | 'ghost'

// Position type
export type Position = 'top' | 'right' | 'bottom' | 'left'

// Alignment type
export type Alignment = 'start' | 'center' | 'end' | 'stretch'

// Button types
export type ButtonType = 'primary' | 'secondary' | 'secondary-white' | 'tertiary' | 'outline' | 'text' | 'navigate' | 'icon'

// Button size
export type ButtonSize = 'small' | 'medium' | 'large'

// Icon names
export type IconNames = string

export type ButtonProps = {
  type?: ButtonType;
  disabled?: boolean;
  isFull?: boolean;
  size?: ButtonSize;
  typeButton?: ButtonHTMLAttributes['type'];
  loading?: boolean;
  text?: string;
  loadingText?: string;
}