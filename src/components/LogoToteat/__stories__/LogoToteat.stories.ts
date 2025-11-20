import type { Meta, StoryObj } from '@storybook/vue3-vite';
import LogoToteat from '../LogoToteat.vue';
import Button from '../../Button/Button.vue';

const meta: Meta<typeof LogoToteat> = {
  title: 'Components/LogoToteat',
  component: LogoToteat,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['icon', 'complete'],
      description: 'Display mode: icon-only or complete logo with text',
    },
    variant: {
      control: { type: 'select' },
      options: ['original', 'cream-orange', 'black-cream'],
      description: 'Color variant of the logo',
    },
    width: {
      control: 'number',
      description: 'Custom width in pixels (optional)',
    },
    height: {
      control: 'number',
      description: 'Custom height in pixels (optional)',
    },
  },
  args: {
    mode: 'complete',
    variant: 'original',
  },
};

export default meta;
type Story = StoryObj<typeof LogoToteat>;

// Default story
export const Default: Story = {
  render: (args) => ({
    components: { LogoToteat },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 2rem;">
        <LogoToteat v-bind="args" />
      </div>
    `,
  }),
};

// Complete mode variants
export const CompleteOriginal: Story = {
  render: () => ({
    components: { LogoToteat },
    template: `
      <div style="padding: 2rem; background: white;">
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600;">Complete Logo - Original</h3>
        <LogoToteat mode="complete" variant="original" />
      </div>
    `,
  }),
};

export const CompleteCreamOrange: Story = {
  render: () => ({
    components: { LogoToteat },
    template: `
      <div style="padding: 2rem; background: #1B1B1B;">
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600; color: white;">Complete Logo - Cream Orange</h3>
        <LogoToteat mode="complete" variant="cream-orange" />
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const CompleteBlackCream: Story = {
  render: () => ({
    components: { LogoToteat },
    template: `
      <div style="padding: 2rem; background: white;">
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600;">Complete Logo - Black Cream</h3>
        <LogoToteat mode="complete" variant="black-cream" />
      </div>
    `,
  }),
};

// Icon mode variants
export const IconOriginal: Story = {
  render: () => ({
    components: { LogoToteat },
    template: `
      <div style="padding: 2rem; background: white;">
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600;">Icon Only - Original</h3>
        <LogoToteat mode="icon" variant="original" />
      </div>
    `,
  }),
};

export const IconCreamOrange: Story = {
  render: () => ({
    components: { LogoToteat },
    template: `
      <div style="padding: 2rem; background: #1B1B1B;">
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600; color: white;">Icon Only - Cream Orange</h3>
        <LogoToteat mode="icon" variant="cream-orange" />
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const IconBlackCream: Story = {
  render: () => ({
    components: { LogoToteat },
    template: `
      <div style="padding: 2rem; background: white;">
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600;">Icon Only - Black Cream</h3>
        <LogoToteat mode="icon" variant="black-cream" />
      </div>
    `,
  }),
};

// All variants comparison
export const AllVariants: Story = {
  render: () => ({
    components: { LogoToteat },
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem; padding: 2rem;">
        <!-- Complete Mode Variants -->
        <div>
          <h2 style="margin-bottom: 2rem; font-size: var(--text-xl); font-weight: 600;">Complete Mode</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <div style="padding: 2rem; background: var(--color-white); border: 1px solid var(--color-neutral-200); border-radius: 8px;">
              <h4 style="margin-bottom: 1rem; font-size: var(--text-base); font-weight: 600; color: var(--color-neutral-400);">Original Variant</h4>
              <LogoToteat mode="complete" variant="original" />
            </div>
            <div style="padding: 2rem; background: var(--color-secondary); border-radius: 8px;">
              <h4 style="margin-bottom: 1rem; font-size: var(--text-base); font-weight: 600; color: var(--color-white);">Cream Orange Variant</h4>
              <LogoToteat mode="complete" variant="cream-orange" />
            </div>
            <div style="padding: 2rem; background: var(--color-white); border: 1px solid var(--color-neutral-200); border-radius: 8px;">
              <h4 style="margin-bottom: 1rem; font-size: var(--text-base); font-weight: 600; color: var(--color-neutral-400);">Black Cream Variant</h4>
              <LogoToteat mode="complete" variant="black-cream" />
            </div>
          </div>
        </div>

        <!-- Icon Mode Variants -->
        <div>
          <h2 style="margin-bottom: 2rem; font-size: var(--text-xl); font-weight: 600;">Icon Mode</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <div style="padding: 2rem; background: var(--color-white); border: 1px solid var(--color-neutral-200); border-radius: 8px;">
              <h4 style="margin-bottom: 1rem; font-size: var(--text-base); font-weight: 600; color: var(--color-neutral-400);">Original Variant</h4>
              <LogoToteat mode="icon" variant="original" />
            </div>
            <div style="padding: 2rem; background: var(--color-secondary); border-radius: 8px;">
              <h4 style="margin-bottom: 1rem; font-size: var(--text-base); font-weight: 600; color: var(--color-white);">Cream Orange Variant</h4>
              <LogoToteat mode="icon" variant="cream-orange" />
            </div>
            <div style="padding: 2rem; background: var(--color-white); border: 1px solid var(--color-neutral-200); border-radius: 8px;">
              <h4 style="margin-bottom: 1rem; font-size: var(--text-base); font-weight: 600; color: var(--color-neutral-400);">Black Cream Variant</h4>
              <LogoToteat mode="icon" variant="black-cream" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

// Different sizes
export const CustomSizes: Story = {
  render: () => ({
    components: { LogoToteat },
    template: `
      <div style="padding: 2rem;">
        <h2 style="margin-bottom: 2rem; font-size: var(--text-xl); font-weight: 600;">Custom Sizes - Complete Mode</h2>
        <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
          <div>
            <p style="margin-bottom: 0.5rem; font-size: var(--text-sm); color: var(--color-neutral-400);">Small (120x30)</p>
            <LogoToteat mode="complete" variant="original" :width="120" :height="30" />
          </div>
          <div>
            <p style="margin-bottom: 0.5rem; font-size: var(--text-sm); color: var(--color-neutral-400);">Default (160x40)</p>
            <LogoToteat mode="complete" variant="original" />
          </div>
          <div>
            <p style="margin-bottom: 0.5rem; font-size: var(--text-sm); color: var(--color-neutral-400);">Large (240x60)</p>
            <LogoToteat mode="complete" variant="original" :width="240" :height="60" />
          </div>
        </div>

        <h2 style="margin: 3rem 0 2rem 0; font-size: var(--text-xl); font-weight: 600;">Custom Sizes - Icon Mode</h2>
        <div style="display: flex; gap: 2rem; align-items: flex-start;">
          <div>
            <p style="margin-bottom: 0.5rem; font-size: var(--text-sm); color: var(--color-neutral-400);">Small (24px)</p>
            <LogoToteat mode="icon" variant="original" :width="24" :height="24" />
          </div>
          <div>
            <p style="margin-bottom: 0.5rem; font-size: var(--text-sm); color: var(--color-neutral-400);">Default (44px)</p>
            <LogoToteat mode="icon" variant="original" />
          </div>
          <div>
            <p style="margin-bottom: 0.5rem; font-size: var(--text-sm); color: var(--color-neutral-400);">Large (64px)</p>
            <LogoToteat mode="icon" variant="original" :width="64" :height="64" />
          </div>
          <div>
            <p style="margin-bottom: 0.5rem; font-size: var(--text-sm); color: var(--color-neutral-400);">Extra Large (80px)</p>
            <LogoToteat mode="icon" variant="original" :width="80" :height="80" />
          </div>
        </div>
      </div>
    `,
  }),
};

// Usage in navigation
export const NavigationExample: Story = {
  render: () => ({
    components: { LogoToteat, Button },
    template: `
      <div>
        <!-- Desktop Navigation -->
        <div style="padding: 1rem 2rem; background: var(--color-white); border-bottom: 1px solid var(--color-neutral-200); display: flex; align-items: center; justify-content: space-between;">
          <LogoToteat mode="complete" variant="original" :width="140" :height="35" />
          <nav style="display: flex; gap: 2rem;">
            <a href="#" style="font-size: var(--text-base); color: var(--color-secondary); text-decoration: none;">Menu</a>
            <a href="#" style="font-size: var(--text-base); color: var(--color-secondary); text-decoration: none;">About</a>
            <a href="#" style="font-size: var(--text-base); color: var(--color-secondary); text-decoration: none;">Contact</a>
          </nav>
        </div>

        <!-- Mobile Navigation -->
        <div style="margin-top: 2rem; padding: 1rem; background: var(--color-white); border-bottom: 1px solid var(--color-neutral-200); display: flex; align-items: center; justify-content: space-between;">
          <LogoToteat mode="icon" variant="original" :width="32" :height="32" />
          <Button text="Menu" variant="primary" size="small" />
        </div>

        <!-- Dark Navigation -->
        <div style="margin-top: 2rem; padding: 1rem 2rem; background: var(--color-secondary); display: flex; align-items: center; justify-content: space-between;">
          <LogoToteat mode="complete" variant="cream-orange" :width="140" :height="35" />
          <nav style="display: flex; gap: 2rem;">
            <a href="#" style="font-size: var(--text-base); color: var(--color-white); text-decoration: none;">Menu</a>
            <a href="#" style="font-size: var(--text-base); color: var(--color-white); text-decoration: none;">About</a>
            <a href="#" style="font-size: var(--text-base); color: var(--color-white); text-decoration: none;">Contact</a>
          </nav>
        </div>
      </div>
    `,
  }),
};

// Footer example
export const FooterExample: Story = {
  render: () => ({
    components: { LogoToteat },
    template: `
      <div>
        <!-- Light Footer -->
        <footer style="padding: 3rem 2rem; background: var(--color-neutral-100);">
          <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem;">
            <div>
              <LogoToteat mode="complete" variant="black-cream" :width="120" :height="30" />
              <p style="margin-top: 1rem; font-size: var(--text-sm); color: var(--color-neutral-400);">
                Discover the best dining experiences
              </p>
            </div>
            <div>
              <h4 style="margin-bottom: 1rem; font-size: var(--text-base); font-weight: 600;">Quick Links</h4>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 0.5rem;"><a href="#" style="font-size: var(--text-sm); color: var(--color-neutral-400); text-decoration: none;">About</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="#" style="font-size: var(--text-sm); color: var(--color-neutral-400); text-decoration: none;">Contact</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="#" style="font-size: var(--text-sm); color: var(--color-neutral-400); text-decoration: none;">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 style="margin-bottom: 1rem; font-size: var(--text-base); font-weight: 600;">Connect</h4>
              <p style="font-size: var(--text-sm); color: var(--color-neutral-400);">Follow us on social media</p>
            </div>
          </div>
        </footer>

        <!-- Dark Footer -->
        <footer style="margin-top: 2rem; padding: 3rem 2rem; background: var(--color-secondary);">
          <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem;">
            <div>
              <LogoToteat mode="complete" variant="cream-orange" :width="120" :height="30" />
              <p style="margin-top: 1rem; font-size: var(--text-sm); color: var(--color-secondary-light);">
                Discover the best dining experiences
              </p>
            </div>
            <div>
              <h4 style="margin-bottom: 1rem; font-size: var(--text-base); font-weight: 600; color: var(--color-white);">Quick Links</h4>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 0.5rem;"><a href="#" style="font-size: var(--text-sm); color: var(--color-secondary-light); text-decoration: none;">About</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="#" style="font-size: var(--text-sm); color: var(--color-secondary-light); text-decoration: none;">Contact</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="#" style="font-size: var(--text-sm); color: var(--color-secondary-light); text-decoration: none;">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 style="margin-bottom: 1rem; font-size: var(--text-base); font-weight: 600; color: var(--color-white);">Connect</h4>
              <p style="font-size: var(--text-sm); color: var(--color-secondary-light);">Follow us on social media</p>
            </div>
          </div>
        </footer>
      </div>
    `,
  }),
};
