// Import styles
import './style.css'

// Import components
import Button from './components/Button/Button.vue'

// Export all components
export { Button }

// Export Vue plugin
export default {
  install: (app: any) => {
    // Register components globally
    app.component('TotButton', Button)
  },
}

// Export type definitions
import type * as ComponentTypes from './types/index.d.ts'
export type { ComponentTypes }

// We can't export ButtonProps directly, as it's not exported from the component file
// Consumers should import the types they need from our exported ComponentTypes
