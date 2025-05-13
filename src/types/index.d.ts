// Common types used across the design system

// Button types
export type ButtonType = 'icon' | 'outline' | 'primary' | 'secondary' | 'text'

// Button size
export type ButtonSize = 'medium' | 'large' | 'smaller' | 'small'

// Icon names
export type IconNames =
  | 'barcode-outline'
  | 'radio-button-unchecked-outline'
  | 'radio-button-checked-outline'
  | 'discount-outline'
  | 'ticket-outline'
  | 'tag-outline'
  | 'shopping-basket-outline'
  | 'shopping-bag-outline'
  | 'shopping-cart-outline'
  | 'home-outline'
  | 'copy-square-outline'
  | 'copy-generic-outline'
  | 'arrow-up-outline'
  | 'arrow-down-outline'
  | 'arrow-right-outline'
  | 'arrow-left-outline'
  | 'arrow-list-outline'
  | 'chevron-right-bicolor'
  | 'chevron-left-bicolor'
  | 'refresh-single-outline'
  | 'refresh-double-outline'
  | 'close-outline'
  | 'user-outline'
  | 'document-history-outline'
  | 'search-outline'
  | 'document-list-outline'
  | 'document-generic-outline'
  | 'eye-closed-outline'
  | 'eye-open-filled'
  | 'eye-open-outline'
  | 'linkedin-filled'
  | 'facebook-filled'
  | 'apple-filled'
  | 'google-filled'
  | 'whatsapp-outline'
  | 'twitter-filled'
  | 'instagram-filled'
  | 'delete-outline'
  | 'pencil-outline'
  | 'checkbox-checked'
  | 'checkbox-unchecked'
  | 'exclamation-outline'
  | 'rocket-outline'
  | 'info-outline'
  | 'warning-outline'
  | 'error-outline'
  | 'success-outline'
  | 'info-filled'
  | 'warning-filled'
  | 'success-filled'
  | 'error-filled'

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

