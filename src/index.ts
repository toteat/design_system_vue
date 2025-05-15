// Import styles
import './style.css'

// Import components
import Button from './components/Button/Button.vue'
import Icon from './components/Icon/Icon.vue'
import Spinner from './components/Spinner/Spinner.vue'

// Export all components
export { Button, Icon, Spinner }

// Export Vue plugin
export const install = (app: any) => {
  // Register components globally
  app.component('Button', Button)
  app.component('Icon', Icon)
  app.component('Spinner', Spinner)
}

// Export plugin object
export const ToteatDesignSystem = {
  install
}

// Export type definitions
import type * as ComponentTypes from './types/index.d.ts'
export type { ComponentTypes }

// We can't export ButtonProps directly, as it's not exported from the component file
// Consumers should import the types they need from our exported ComponentTypes
