import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import BackgroundWrapper from '../BackgroundWrapper.vue';
import Button from '../../Button/Button.vue';
import Checkbox from '../../Checkbox/Checkbox.vue';

const meta: Meta<typeof BackgroundWrapper> = {
  title: 'Components/BackgroundWrapper',
  component: BackgroundWrapper,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof BackgroundWrapper>;

export const Default: Story = {
  parameters: {
    viewport: {
      viewports: {
        desktopLarge: {
          name: 'Desktop Large',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
      defaultViewport: 'desktopLarge',
    },
    layout: 'fullscreen',
    chromatic: { viewports: [1920] },
    docs: {
      source: {
        code: `<script setup lang="ts">
import { ref } from 'vue';
import { BackgroundWrapper, Button, Checkbox } from '@toteat-eng/design-system-vue';

const rememberMe = ref(false);
</script>

<template>
  <BackgroundWrapper>
    <div class="login-card">
      <h1>Sign In</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <Checkbox v-model="rememberMe" label="Remember me" />
        <Button text="Sign In" variant="primary" :is-full="true" />
      </form>
    </div>
  </BackgroundWrapper>
</template>`,
      },
    },
  },
  decorators: [
    () => ({
      template: '<story />',
    }),
  ],
  render: (args) => ({
    components: { BackgroundWrapper, Button, Checkbox },
    setup() {
      const rememberMe = ref(false);
      return { args, rememberMe };
    },
    template: `
      <BackgroundWrapper>
        <div style="background: white; padding: 3rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); max-width: 450px; width: 100%;">
          <h1 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: 0.5rem; text-align: center;">Sign In</h1>
          <p style="text-align: center; color: var(--color-neutral-400); margin-bottom: 2rem;">Welcome back! Please enter your details.</p>

          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: var(--text-sm);">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                style="width: 100%; padding: 0.875rem; border: 1px solid var(--color-neutral-200); border-radius: 6px; font-size: var(--text-base);"
              />
            </div>

            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: var(--text-sm);">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                style="width: 100%; padding: 0.875rem; border: 1px solid var(--color-neutral-200); border-radius: 6px; font-size: var(--text-base);"
              />
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <Checkbox v-model="rememberMe" label="Remember me" />
              <a href="#" style="font-size: var(--text-sm); color: var(--color-primary); text-decoration: none;">Forgot password?</a>
            </div>

            <Button text="Sign In" variant="primary" size="medium" :is-full="true" />

            <p style="text-align: center; margin-top: 1rem; font-size: var(--text-sm); color: var(--color-neutral-400);">
              Don't have an account? <a href="#" style="color: var(--color-primary); text-decoration: none; font-weight: 500;">Sign up</a>
            </p>
          </div>
        </div>
      </BackgroundWrapper>
    `,
  }),
};
