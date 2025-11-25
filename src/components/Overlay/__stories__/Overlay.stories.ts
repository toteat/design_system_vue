import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Overlay from '../Overlay.vue';
import Button from '../../Button/Button.vue';

const meta: Meta<typeof Overlay> = {
  title: 'Components/Overlay',
  component: Overlay,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'center', 'bottom'],
    },
  },
  args: {
    visible: false,
    dismissible: true,
    closeOnBackdrop: true,
    closeOnEsc: true,
    lockScroll: true,
    blur: false,
    placement: 'center',
  },
};

export default meta;
type Story = StoryObj<typeof Overlay>;

export const Playground: Story = {
  render: (args) => ({
    components: { Overlay, Button },
    setup() {
      const visible = ref(false);
      const openOverlay = () => {
        visible.value = true;
      };
      const closeOverlay = () => {
        visible.value = false;
      };
      return { args, visible, openOverlay, closeOverlay };
    },
    template: `
      <div style="min-height: 60vh; display: grid; place-items: center;">
        <Button text="Show overlay" variant="primary" @click="openOverlay" />
        <Overlay v-bind="args" v-model:visible="visible">
          <div
            style="
              background: var(--color-white);
              color: var(--color-secondary);
              padding: 2rem;
              border-radius: var(--radius-xl);
              box-shadow: 0 25px 80px rgba(18, 18, 18, 0.25);
              max-width: 28rem;
              display: flex;
              flex-direction: column;
              gap: 1rem;
            "
          >
            <div>
              <p style="font-size: var(--text-sm); text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-neutral-400);">
                Overlay
              </p>
              <h3 style="font-size: var(--text-xl); font-weight: 600; margin-top: 0.25rem;">
                Focus the user on critical content
              </h3>
            </div>
            <p style="font-size: var(--text-base); color: var(--color-neutral-500);">
              Use the Overlay component to dim the interface and place any dialog, media or form in the spotlight.
            </p>
            <Button text="Close" variant="secondary" @click="closeOverlay" />
          </div>
        </Overlay>
      </div>
    `,
  }),
};

export const BlurredBackdrop: Story = {
  args: {
    visible: true,
    blur: true,
    dismissible: false,
    closeOnBackdrop: false,
  },
  render: (args) => ({
    components: { Overlay },
    setup() {
      return { args };
    },
    template: `
      <Overlay v-bind="args">
        <div
          style="
            background: var(--color-white);
            color: var(--color-secondary);
            padding: 2.5rem;
            border-radius: var(--radius-xl);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 26rem;
          "
        >
          <h3 style="font-size: var(--text-lg); margin-bottom: 0.5rem;">Blurred backdrop</h3>
          <p style="font-size: var(--text-base); color: var(--color-neutral-500);">
            Combine the overlay blur option with your own card or modal layout to create highly focused flows.
          </p>
        </div>
      </Overlay>
    `,
  }),
};
