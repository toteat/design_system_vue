// Import styles
import './style.css';

// Import Vue types
import type { App } from 'vue';

// Import components for plugin installation
import Button from './components/Button/Button.vue';
import Icon from './components/Icon/Icon.vue';
import Spinner from './components/Spinner/Spinner.vue';
import DropZone from './components/DropZone';
import SkeletonPreload from './components/SkeletonPreload';
import ImagePreview from './components/ImagePreview';
import Checkbox from './components/Checkbox';
import Multiselect from './components/Multiselect';
import Tooltip from './components/Tooltip';

// Export all component types
export type {
  Variant,
  ButtonSize,
  ButtonProps,
  SpinnerProps,
  IconContent,
  IconProps,
  ThemeColor,
  ImageStringType,
  ImageMime,
  LoadImageTypeFunction,
  CheckboxProps,
  MultiselectProps,
  MultiselectOption,
  TooltipProps,
  TooltipPosition,
} from './types/index.d';

// Export components using export...from syntax
export { default as Button } from './components/Button/Button.vue';
export { default as Icon } from './components/Icon/Icon.vue';
export { default as Spinner } from './components/Spinner/Spinner.vue';
export { default as DropZone } from './components/DropZone';
export { default as SkeletonPreload } from './components/SkeletonPreload';
export { default as ImagePreview } from './components/ImagePreview';
export { default as Checkbox } from './components/Checkbox';
export { default as Multiselect } from './components/Multiselect';
export { default as Tooltip } from './components/Tooltip';

// Export Vue plugin
export const install = (app: App) => {
  // Register components globally
  app.component('Button', Button);
  app.component('Checkbox', Checkbox);
  app.component('DropZone', DropZone);
  app.component('Icon', Icon);
  app.component('ImagePreview', ImagePreview);
  app.component('Multiselect', Multiselect);
  app.component('SkeletonPreload', SkeletonPreload);
  app.component('Spinner', Spinner);
  app.component('Tooltip', Tooltip);
};

// Export plugin object
export const ToteatDesignSystem = {
  install,
};

// Default export for convenience
export default {
  install,
};

// We can't export ButtonProps directly, as it's not exported from the component file
// Consumers should import the types they need from our exported ComponentTypes
