// Import styles
import './style.css';

// Import Vue types
import type { App } from 'vue';

// Import components
import Button from './components/Button/Button.vue';
import Icon from './components/Icon/Icon.vue';
import Spinner from './components/Spinner/Spinner.vue';
import DropZone from './components/DropZone';
import SkeletonPreload from './components/SkeletonPreload';
import { ImagePreview } from './components/ImagePreview';

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
} from './types/index.d';

// Export components
export { Button, Icon, Spinner };

// Export Vue plugin
export const install = (app: App) => {
  // Register components globally
  app.component('Button', Button);
  app.component('DropZone', DropZone);
  app.component('Icon', Icon);
  app.component('ImagePreview', ImagePreview);
  app.component('SkeletonPreload', SkeletonPreload);
  app.component('Spinner', Spinner);
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
