// Common types used across the design system

// Button types
export type ButtonType = 'icon' | 'navigate' | 'outline' | 'primary' | 'secondary' | 'tertiary' | 'text'

// Button size
export type ButtonSize = 'auto' | 'medium' | 'large' | 'smaller' | 'small'

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
  selected?: boolean;
}