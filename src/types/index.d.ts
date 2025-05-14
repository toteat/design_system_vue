import { IconNames } from '../components/Icon/icons'

// Common types used across the design system

// Button types
export type ButtonType = 'icon' | 'outline' | 'primary' | 'secondary' | 'text'

// Button size
export type ButtonSize = 'medium' | 'large' | 'smaller' | 'small'

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

export type IconProps = {
  name: IconNames;
  size?: number;
  color?: string;
}

