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
export * from './types'
export type { ButtonProps } from './components/Button/Button.vue' 