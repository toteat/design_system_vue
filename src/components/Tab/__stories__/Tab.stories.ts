import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, watch } from 'vue';
import Tab from '../Tab.vue';
import Button from '../../Button/Button.vue';
import Checkbox from '../../Checkbox/Checkbox.vue';
import ImagePreview from '../../ImagePreview/ImagePreview.vue';

const meta: Meta<typeof Tab> = {
  title: 'Components/Tab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description:
        'Array of tab items with value, label, optional disabled and icon',
    },
    selectedTab: {
      control: 'select',
      options: ['tab1', 'tab2', 'tab3'],
      description: 'Currently selected tab value (v-model:selected-tab)',
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large'],
      description: 'Tab button size',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make tab buttons take full width of container',
    },
  },
  args: {
    tabs: [
      { value: 'tab1', label: 'Tab 1' },
      { value: 'tab2', label: 'Tab 2' },
      { value: 'tab3', label: 'Tab 3' },
    ],
    selectedTab: 'tab1',
    size: 'medium',
    fullWidth: true,
  },
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {
    tabs: [
      { value: 'tab1', label: 'Tab 1' },
      { value: 'tab2', label: 'Tab 2' },
      { value: 'tab3', label: 'Tab 3' },
    ],
    selectedTab: 'tab1',
  },
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
import { ref } from 'vue';
import { Tab } from '@toteat-eng/design-system-vue';

const activeTab = ref('tab1');
const tabs = [
  { value: 'tab1', label: 'Tab 1' },
  { value: 'tab2', label: 'Tab 2' },
  { value: 'tab3', label: 'Tab 3' },
];
</script>

<template>
  <Tab
    :tabs="tabs"
    v-model:selected-tab="activeTab"
    size="medium"
    :full-width="true"
  >
    <template #default="{ currentTab, currentValue }">
      <div v-if="currentValue === 'tab1'">
        <h2>{{ currentTab?.label }}</h2>
        <p>This is the content for Tab 1. You can put any content here including other components.</p>
      </div>

      <div v-else-if="currentValue === 'tab2'">
        <h2>{{ currentTab?.label }}</h2>
        <p>This is the content for Tab 2. Use v-if with currentValue to show different content per tab.</p>
      </div>

      <div v-else-if="currentValue === 'tab3'">
        <h2>{{ currentTab?.label }}</h2>
        <p>This is the content for Tab 3. See the CompleteExample story for a full implementation with multiple components.</p>
      </div>
    </template>
  </Tab>
</template>`,
      },
    },
  },
  render: (args) => ({
    components: { Tab },
    setup() {
      const activeTab = ref(args.selectedTab);

      watch(
        () => args.selectedTab,
        (newValue) => {
          activeTab.value = newValue;
        },
      );

      return { args, activeTab };
    },
    template: `
      <Tab
        :tabs="args.tabs"
        :size="args.size"
        :full-width="args.fullWidth"
        v-model:selected-tab="activeTab"
      >
        <template #default="{ currentTab, currentValue }">
          <div v-if="currentValue === 'tab1'">
            <h2 style="font-size: var(--text-lg); font-weight: 600; margin-bottom: 1rem;">{{ currentTab?.label }}</h2>
            <p style="line-height: 1.6;">
              This is the content for Tab 1. You can put any content here including other components.
            </p>
          </div>

          <div v-else-if="currentValue === 'tab2'">
            <h2 style="font-size: var(--text-lg); font-weight: 600; margin-bottom: 1rem;">{{ currentTab?.label }}</h2>
            <p style="line-height: 1.6;">
              This is the content for Tab 2. Use v-if with currentValue to show different content per tab.
            </p>
          </div>

          <div v-else-if="currentValue === 'tab3'">
            <h2 style="font-size: var(--text-lg); font-weight: 600; margin-bottom: 1rem;">{{ currentTab?.label }}</h2>
            <p style="line-height: 1.6;">
              This is the content for Tab 3. See the CompleteExample story for a full implementation with multiple components.
            </p>
          </div>
        </template>
      </Tab>
    `,
  }),
};

export const CompleteExample: Story = {
  args: {
    tabs: [
      { value: 'gallery', label: 'Photo Gallery', icon: 'home-outline' },
      { value: 'about', label: 'About Us', icon: 'user-outline' },
      { value: 'settings', label: 'Settings', icon: 'pencil-outline' },
    ],
    selectedTab: 'gallery',
  },
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
import { ref } from 'vue';
import { Tab, Button, Checkbox, ImagePreview } from '@toteat-eng/design-system-vue';

const activeTab = ref('gallery');
const notifyEmail = ref(true);
const notifyPush = ref(false);
const autoSave = ref(true);

const tabs = [
  { value: 'gallery', label: 'Photo Gallery', icon: 'home-outline' },
  { value: 'about', label: 'About Us', icon: 'user-outline' },
  { value: 'settings', label: 'Settings', icon: 'pencil-outline' },
];
</script>

<template>
  <Tab :tabs="tabs" v-model:selected-tab="activeTab">
    <template #default="{ currentTab, currentValue }">
      <div v-if="currentValue === 'gallery'">
        <h2>{{ currentTab?.label }}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
          <ImagePreview image-src="https://picsum.photos/seed/pic1/300/300" alt="Sample 1" :width="150" :height="150" />
          <ImagePreview image-src="https://picsum.photos/seed/pic2/300/300" alt="Sample 2" :width="150" :height="150" />
          <ImagePreview image-src="https://picsum.photos/seed/pic3/300/300" alt="Sample 3" :width="150" :height="150" />
          <ImagePreview image-src="https://picsum.photos/seed/pic4/300/300" alt="Sample 4" :width="150" :height="150" />
          <ImagePreview image-src="https://picsum.photos/seed/pic5/300/300" alt="Sample 5" :width="150" :height="150" />
          <ImagePreview image-src="https://picsum.photos/seed/pic6/300/300" alt="Sample 6" :width="150" :height="150" />
        </div>

        <Button text="View All Photos" variant="primary" size="medium" />
      </div>

      <div v-else-if="currentValue === 'about'">
        <h2>{{ currentTab?.label }}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
          <ImagePreview image-src="https://picsum.photos/seed/team1/400/300" alt="Team 1" :width="200" :height="150" />
          <ImagePreview image-src="https://picsum.photos/seed/team2/400/300" alt="Team 2" :width="200" :height="150" />
        </div>

        <Button text="Learn More" variant="secondary" size="medium" />
      </div>

      <div v-else-if="currentValue === 'settings'">
        <h2>{{ currentTab?.label }}</h2>
        <p>Configure your preferences below.</p>

        <div style="margin: 1.5rem 0;">
          <h3>Notification Preferences</h3>
          <Checkbox v-model="notifyEmail" label="Email Notifications" />
          <Checkbox v-model="notifyPush" label="Push Notifications" />
          <Checkbox v-model="autoSave" label="Auto-save Settings" />
        </div>

        <div style="display: flex; gap: 1rem; margin: 1.5rem 0;">
          <ImagePreview
            image-src="https://picsum.photos/seed/profile/200/200"
            alt="Profile"
            :width="100"
            :height="100"
            :is-rounded="true"
          />
          <div>
            <h4>Profile Picture</h4>
            <Button text="Change Picture" variant="outline" size="small" />
          </div>
        </div>

        <Button text="Save Changes" variant="primary" size="medium" />
      </div>
    </template>
  </Tab>
</template>`,
      },
    },
  },
  render: (args) => ({
    components: { Tab, Button, Checkbox, ImagePreview },
    setup() {
      const activeTab = ref(args.selectedTab);
      const notifyEmail = ref(true);
      const notifyPush = ref(false);
      const autoSave = ref(true);

      watch(
        () => args.selectedTab,
        (newValue) => {
          activeTab.value = newValue;
        },
      );

      return { args, activeTab, notifyEmail, notifyPush, autoSave };
    },
    template: `
      <Tab
        :tabs="args.tabs"
        :size="args.size"
        :full-width="args.fullWidth"
        v-model:selected-tab="activeTab"
      >
        <template #default="{ currentTab, currentValue }">
          <div v-if="currentValue === 'gallery'">
            <h2 style="font-size: var(--text-lg); font-weight: 600; margin-bottom: 1rem;">{{ currentTab?.label }}</h2>
            <p style="line-height: 1.6; margin-bottom: 1rem;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
              <ImagePreview
                image-src="https://picsum.photos/seed/pic1/300/300"
                alt="Sample image 1"
                :width="150"
                :height="150"
              />
              <ImagePreview
                image-src="https://picsum.photos/seed/pic2/300/300"
                alt="Sample image 2"
                :width="150"
                :height="150"
              />
              <ImagePreview
                image-src="https://picsum.photos/seed/pic3/300/300"
                alt="Sample image 3"
                :width="150"
                :height="150"
              />
              <ImagePreview
                image-src="https://picsum.photos/seed/pic4/300/300"
                alt="Sample image 4"
                :width="150"
                :height="150"
              />
              <ImagePreview
                image-src="https://picsum.photos/seed/pic5/300/300"
                alt="Sample image 5"
                :width="150"
                :height="150"
              />
              <ImagePreview
                image-src="https://picsum.photos/seed/pic6/300/300"
                alt="Sample image 6"
                :width="150"
                :height="150"
              />
            </div>

            <p style="line-height: 1.6; margin-bottom: 1rem;">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <Button text="View All Photos" variant="primary" size="medium" />
          </div>

          <div v-else-if="currentValue === 'about'">
            <h2 style="font-size: var(--text-lg); font-weight: 600; margin-bottom: 1rem;">{{ currentTab?.label }}</h2>

            <p style="line-height: 1.6; margin-bottom: 1rem;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
            </p>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
              <ImagePreview
                image-src="https://picsum.photos/seed/team1/400/300"
                alt="Team member 1"
                :width="200"
                :height="150"
              />
              <ImagePreview
                image-src="https://picsum.photos/seed/team2/400/300"
                alt="Team member 2"
                :width="200"
                :height="150"
              />
            </div>

            <p style="line-height: 1.6; margin-bottom: 1rem;">
              Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
              Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.
            </p>

            <p style="line-height: 1.6; margin-bottom: 1rem;">
              Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
              Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus.
            </p>

            <Button text="Learn More" variant="secondary" size="medium" />
          </div>

          <div v-else-if="currentValue === 'settings'">
            <h2 style="font-size: var(--text-lg); font-weight: 600; margin-bottom: 1rem;">{{ currentTab?.label }}</h2>

            <p style="line-height: 1.6; margin-bottom: 1rem;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Configure your preferences below to customize your experience.
            </p>

            <div style="margin: 1.5rem 0;">
              <h3 style="font-size: var(--text-base); font-weight: 600; margin-bottom: 1rem;">Notification Preferences</h3>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <Checkbox v-model="notifyEmail">
                  <template #label>
                    <span>Email Notifications</span>
                  </template>
                </Checkbox>
                <Checkbox v-model="notifyPush">
                  <template #label>
                    <span>Push Notifications</span>
                  </template>
                </Checkbox>
                <Checkbox v-model="autoSave">
                  <template #label>
                    <span>Auto-save Settings</span>
                  </template>
                </Checkbox>
              </div>
            </div>

            <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin: 1.5rem 0;">
              <ImagePreview
                image-src="https://picsum.photos/seed/profile/200/200"
                alt="Profile picture"
                :width="100"
                :height="100"
                :border-radius="50"
                :is-rounded="true"
              />
              <div>
                <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Profile Picture</h4>
                <p style="line-height: 1.6; margin-bottom: 0.5rem;">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                </p>
                <Button text="Change Picture" variant="outline" size="small" />
              </div>
            </div>

            <p style="line-height: 1.6; margin-bottom: 1rem;">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>

            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
              <Button text="Save Changes" variant="primary" size="medium" />
              <Button text="Reset to Default" variant="outline-gray" size="medium" />
            </div>
          </div>
        </template>
      </Tab>
    `,
  }),
};

export const WithIcons: Story = {
  args: {
    tabs: [
      { value: 'profile', label: 'Profile', icon: 'user-outline' },
      { value: 'settings', label: 'Settings', icon: 'pencil-outline' },
      {
        value: 'notifications',
        label: 'Notifications',
        icon: 'warning-outline',
      },
    ],
    selectedTab: 'profile',
  },
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
import { ref } from 'vue';
import { Tab, Button, Checkbox } from '@toteat-eng/design-system-vue';

const activeTab = ref('profile');
const emailNotifications = ref(true);
const pushNotifications = ref(false);
const smsNotifications = ref(false);

const tabs = [
  { value: 'profile', label: 'Profile', icon: 'user-outline' },
  { value: 'settings', label: 'Settings', icon: 'pencil-outline' },
  { value: 'notifications', label: 'Notifications', icon: 'warning-outline' },
];
</script>

<template>
  <Tab :tabs="tabs" v-model:selected-tab="activeTab">
    <template #default="{ currentTab, currentValue }">
      <div v-if="currentValue === 'profile'">
        <h2>{{ currentTab?.label }}</h2>
        <p>Manage your profile information and settings.</p>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Role:</strong> Administrator</p>
        <Button text="Edit Profile" variant="primary" size="small" />
      </div>

      <div v-else-if="currentValue === 'settings'">
        <h2>{{ currentTab?.label }}</h2>
        <p>Configure your application preferences.</p>
        <p><strong>Language:</strong> English</p>
        <p><strong>Theme:</strong> Light</p>
        <p><strong>Timezone:</strong> UTC</p>
        <Button text="Save Settings" variant="primary" size="small" />
      </div>

      <div v-else-if="currentValue === 'notifications'">
        <h2>{{ currentTab?.label }}</h2>
        <p>Manage your notification preferences.</p>
        <Checkbox v-model="emailNotifications" label="Email Notifications" />
        <Checkbox v-model="pushNotifications" label="Push Notifications" />
        <Checkbox v-model="smsNotifications" label="SMS Notifications" />
        <Button text="Update Preferences" variant="primary" size="small" />
      </div>
    </template>
  </Tab>
</template>`,
      },
    },
  },
  render: (args) => ({
    components: { Tab, Button, Checkbox },
    setup() {
      const activeTab = ref(args.selectedTab);
      const emailNotifications = ref(true);
      const pushNotifications = ref(false);
      const smsNotifications = ref(false);

      watch(
        () => args.selectedTab,
        (newValue) => {
          activeTab.value = newValue;
        },
      );

      return {
        args,
        activeTab,
        emailNotifications,
        pushNotifications,
        smsNotifications,
      };
    },
    template: `
      <div>
        <Tab v-bind="args" v-model:selected-tab="activeTab">
          <template #default="{ currentTab, currentValue }">
            <div v-if="currentValue === 'profile'" class="tab-story-content">
              <h2 class="tab-story-heading">{{ currentTab?.label }}</h2>
              <p class="tab-story-text">Manage your profile information and settings.</p>
              <div class="tab-story-info">
                <p class="tab-story-text"><strong>Name:</strong> John Doe</p>
                <p class="tab-story-text"><strong>Email:</strong> john@example.com</p>
                <p class="tab-story-text"><strong>Role:</strong> Administrator</p>
              </div>
              <Button text="Edit Profile" variant="primary" size="small" />
            </div>
            <div v-else-if="currentValue === 'settings'" class="tab-story-content">
              <h2 class="tab-story-heading">{{ currentTab?.label }}</h2>
              <p class="tab-story-text">Configure your application preferences.</p>
              <div class="tab-story-info">
                <p class="tab-story-text"><strong>Language:</strong> English</p>
                <p class="tab-story-text"><strong>Theme:</strong> Light</p>
                <p class="tab-story-text"><strong>Timezone:</strong> UTC</p>
              </div>
              <Button text="Save Settings" variant="primary" size="small" />
            </div>
            <div v-else-if="currentValue === 'notifications'" class="tab-story-content">
              <h2 class="tab-story-heading">{{ currentTab?.label }}</h2>
              <p class="tab-story-text">Manage your notification preferences.</p>
              <div class="tab-story-checkboxes">
                <Checkbox v-model="emailNotifications" label="Email Notifications" />
                <Checkbox v-model="pushNotifications" label="Push Notifications" />
                <Checkbox v-model="smsNotifications" label="SMS Notifications" />
              </div>
              <Button text="Update Preferences" variant="primary" size="small" />
            </div>
          </template>
        </Tab>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
import { ref } from 'vue';
import { Tab } from '@toteat-eng/design-system-vue';

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'details', label: 'Details' },
  { value: 'history', label: 'History' },
];

const activeTiny = ref('overview');
const activeSmall = ref('overview');
const activeMedium = ref('overview');
const activeLarge = ref('overview');
</script>

<template>
  <div>
    <h3>Tiny</h3>
    <Tab :tabs="tabs" v-model:selected-tab="activeTiny" size="tiny">
      <template #default="{ currentTab }">
        <p>Content for {{ currentTab?.label }}</p>
      </template>
    </Tab>

    <h3>Small</h3>
    <Tab :tabs="tabs" v-model:selected-tab="activeSmall" size="small">
      <template #default="{ currentTab }">
        <p>Content for {{ currentTab?.label }}</p>
      </template>
    </Tab>

    <h3>Medium</h3>
    <Tab :tabs="tabs" v-model:selected-tab="activeMedium" size="medium">
      <template #default="{ currentTab }">
        <p>Content for {{ currentTab?.label }}</p>
      </template>
    </Tab>

    <h3>Large</h3>
    <Tab :tabs="tabs" v-model:selected-tab="activeLarge" size="large">
      <template #default="{ currentTab }">
        <p>Content for {{ currentTab?.label }}</p>
      </template>
    </Tab>
  </div>
</template>`,
      },
    },
  },
  render: () => ({
    components: { Tab },
    setup() {
      const tabs = [
        { value: 'overview', label: 'Overview' },
        { value: 'details', label: 'Details' },
        { value: 'history', label: 'History' },
      ];
      const activeTiny = ref('overview');
      const activeSmall = ref('overview');
      const activeMedium = ref('overview');
      const activeLarge = ref('overview');

      return { tabs, activeTiny, activeSmall, activeMedium, activeLarge };
    },
    template: `
      <div class="tab-story-sizes">
        <div class="tab-story-size-section">
          <h3 class="tab-story-size-label">Tiny</h3>
          <Tab :tabs="tabs" v-model:selected-tab="activeTiny" size="tiny">
            <template #default="{ currentTab }">
              <p class="tab-story-text">Content for {{ currentTab?.label }}</p>
            </template>
          </Tab>
        </div>
        <div class="tab-story-size-section">
          <h3 class="tab-story-size-label">Small</h3>
          <Tab :tabs="tabs" v-model:selected-tab="activeSmall" size="small">
            <template #default="{ currentTab }">
              <p class="tab-story-text">Content for {{ currentTab?.label }}</p>
            </template>
          </Tab>
        </div>
        <div class="tab-story-size-section">
          <h3 class="tab-story-size-label">Medium</h3>
          <Tab :tabs="tabs" v-model:selected-tab="activeMedium" size="medium">
            <template #default="{ currentTab }">
              <p class="tab-story-text">Content for {{ currentTab?.label }}</p>
            </template>
          </Tab>
        </div>
        <div class="tab-story-size-section">
          <h3 class="tab-story-size-label">Large</h3>
          <Tab :tabs="tabs" v-model:selected-tab="activeLarge" size="large">
            <template #default="{ currentTab }">
              <p class="tab-story-text">Content for {{ currentTab?.label }}</p>
            </template>
          </Tab>
        </div>
      </div>
    `,
  }),
};

export const WithDisabledTabs: Story = {
  args: {
    tabs: [
      { value: 'enabled1', label: 'Enabled' },
      { value: 'disabled1', label: 'Disabled', disabled: true },
      { value: 'enabled2', label: 'Enabled' },
      { value: 'disabled2', label: 'Disabled', disabled: true },
    ],
    selectedTab: 'enabled1',
  },
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
import { ref } from 'vue';
import { Tab } from '@toteat-eng/design-system-vue';

const activeTab = ref('enabled1');

const tabs = [
  { value: 'enabled1', label: 'Enabled' },
  { value: 'disabled1', label: 'Disabled', disabled: true },
  { value: 'enabled2', label: 'Enabled' },
  { value: 'disabled2', label: 'Disabled', disabled: true },
];
</script>

<template>
  <Tab :tabs="tabs" v-model:selected-tab="activeTab">
    <template #default="{ currentTab }">
      <div>
        <h2>{{ currentTab?.label }}</h2>
        <p>Content for {{ currentTab?.label }}. Disabled tabs cannot be selected.</p>
      </div>
    </template>
  </Tab>
</template>`,
      },
    },
  },
  render: (args) => ({
    components: { Tab },
    setup() {
      const activeTab = ref(args.selectedTab);
      return { args, activeTab };
    },
    template: `
      <div>
        <Tab v-bind="args" v-model:selected-tab="activeTab">
          <template #default="{ currentTab }">
            <div>
              <h2 class="tab-story-heading">{{ currentTab?.label }}</h2>
              <p class="tab-story-text">
                Content for {{ currentTab?.label }}. Disabled tabs cannot be selected.
              </p>
            </div>
          </template>
        </Tab>
      </div>
    `,
  }),
};

export const ManyTabs: Story = {
  args: {
    tabs: [
      { value: 'dashboard', label: 'Dashboard' },
      { value: 'analytics', label: 'Analytics' },
      { value: 'reports', label: 'Reports' },
      { value: 'settings', label: 'Settings' },
      { value: 'users', label: 'Users' },
    ],
    selectedTab: 'dashboard',
  },
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
import { ref } from 'vue';
import { Tab } from '@toteat-eng/design-system-vue';

const activeTab = ref('dashboard');

const tabs = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'reports', label: 'Reports' },
  { value: 'settings', label: 'Settings' },
  { value: 'users', label: 'Users' },
];
</script>

<template>
  <Tab :tabs="tabs" v-model:selected-tab="activeTab">
    <template #default="{ currentTab }">
      <div>
        <h2>{{ currentTab?.label }}</h2>
        <p>This is the content area for the {{ currentTab?.label }} tab.</p>
      </div>
    </template>
  </Tab>
</template>`,
      },
    },
  },
  render: (args) => ({
    components: { Tab },
    setup() {
      const activeTab = ref(args.selectedTab);
      return { args, activeTab };
    },
    template: `
      <div>
        <Tab v-bind="args" v-model:selected-tab="activeTab">
          <template #default="{ currentTab }">
            <div>
              <h2 class="tab-story-heading">{{ currentTab?.label }}</h2>
              <p class="tab-story-text">
                This is the content area for the {{ currentTab?.label }} tab.
              </p>
            </div>
          </template>
        </Tab>
      </div>
    `,
  }),
};

export const FromParentExample: Story = {
  args: {
    tabs: [
      { value: 'profile', label: 'Profile' },
      { value: 'settings', label: 'Settings' },
      { value: 'notifications', label: 'Notifications' },
    ],
    selectedTab: 'profile',
  },
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
import { ref } from 'vue';
import { Tab, Button, Checkbox } from '@toteat-eng/design-system-vue';

const activeTab = ref('profile');
const emailNotifications = ref(true);
const pushNotifications = ref(false);
const smsNotifications = ref(false);

const tabs = [
  { value: 'profile', label: 'Profile' },
  { value: 'settings', label: 'Settings' },
  { value: 'notifications', label: 'Notifications' },
];
</script>

<template>
  <Tab :tabs="tabs" v-model:selected-tab="activeTab">
    <template #default="{ currentTab, currentValue }">
      <div v-if="currentValue === 'profile'">
        <h2>{{ currentTab?.label }}</h2>
        <p>View and edit your profile information below.</p>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Role:</strong> Administrator</p>
        <Button text="Edit Profile" variant="primary" size="small" />
      </div>

      <div v-else-if="currentValue === 'settings'">
        <h2>{{ currentTab?.label }}</h2>
        <p>Manage your application settings and preferences.</p>
        <p><strong>Language:</strong> English (US)</p>
        <p><strong>Theme:</strong> Light Mode</p>
        <p><strong>Timezone:</strong> UTC-05:00 (Eastern Time)</p>
        <Button text="Save Settings" variant="primary" size="small" />
      </div>

      <div v-else-if="currentValue === 'notifications'">
        <h2>{{ currentTab?.label }}</h2>
        <p>Choose how you want to receive notifications.</p>
        <Checkbox v-model="emailNotifications" label="Email Notifications" />
        <Checkbox v-model="pushNotifications" label="Push Notifications" />
        <Checkbox v-model="smsNotifications" label="SMS Notifications" />
        <Button text="Update Preferences" variant="primary" size="small" />
      </div>
    </template>
  </Tab>
</template>`,
      },
    },
  },
  render: (args) => ({
    components: { Tab, Button, Checkbox },
    setup() {
      const activeTab = ref(args.selectedTab);
      const emailNotifications = ref(true);
      const pushNotifications = ref(false);
      const smsNotifications = ref(false);

      watch(
        () => args.selectedTab,
        (newValue) => {
          activeTab.value = newValue;
        },
      );

      return {
        args,
        activeTab,
        emailNotifications,
        pushNotifications,
        smsNotifications,
      };
    },
    template: `
      <div>
        <h3 style="margin-bottom: 1rem; font-size: var(--text-lg); font-weight: 600;">Complex Content from Parent Component</h3>
        <Tab v-bind="args" v-model:selected-tab="activeTab">
          <template #default="{ currentTab, currentValue }">
            <div v-if="currentValue === 'profile'" class="tab-story-content">
              <h2 class="tab-story-heading">{{ currentTab?.label }}</h2>
              <p class="tab-story-text" style="margin-bottom: 1rem;">View and edit your profile information below.</p>
              <div class="tab-story-info" style="margin-bottom: 1.5rem;">
                <p class="tab-story-text" style="margin-bottom: 0.5rem;"><strong>Name:</strong> John Doe</p>
                <p class="tab-story-text" style="margin-bottom: 0.5rem;"><strong>Email:</strong> john.doe@example.com</p>
                <p class="tab-story-text" style="margin-bottom: 0.5rem;"><strong>Role:</strong> Administrator</p>
              </div>
              <Button text="Edit Profile" variant="primary" size="small" />
            </div>

            <div v-else-if="currentValue === 'settings'" class="tab-story-content">
              <h2 class="tab-story-heading">{{ currentTab?.label }}</h2>
              <p class="tab-story-text" style="margin-bottom: 1rem;">Manage your application settings and preferences.</p>
              <div class="tab-story-info" style="margin-bottom: 1.5rem;">
                <p class="tab-story-text" style="margin-bottom: 0.5rem;"><strong>Language:</strong> English (US)</p>
                <p class="tab-story-text" style="margin-bottom: 0.5rem;"><strong>Theme:</strong> Light Mode</p>
                <p class="tab-story-text" style="margin-bottom: 0.5rem;"><strong>Timezone:</strong> UTC-05:00 (Eastern Time)</p>
              </div>
              <Button text="Save Settings" variant="primary" size="small" />
            </div>

            <div v-else-if="currentValue === 'notifications'" class="tab-story-content">
              <h2 class="tab-story-heading">{{ currentTab?.label }}</h2>
              <p class="tab-story-text" style="margin-bottom: 1rem;">Choose how you want to receive notifications.</p>
              <div class="tab-story-checkboxes" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
                <Checkbox v-model="emailNotifications" label="Email Notifications" />
                <Checkbox v-model="pushNotifications" label="Push Notifications" />
                <Checkbox v-model="smsNotifications" label="SMS Notifications" />
              </div>
              <Button text="Update Preferences" variant="primary" size="small" />
            </div>
          </template>
        </Tab>
      </div>
    `,
  }),
};

export const Documentation: Story = {
  args: {
    tabs: [
      { value: 'usage', label: 'Basic Usage' },
      { value: 'slot', label: 'Slot Props' },
      { value: 'examples', label: 'Examples' },
    ],
    selectedTab: 'usage',
  },
  render: (args) => ({
    components: { Tab },
    setup() {
      const activeTab = ref(args.selectedTab);

      watch(
        () => args.selectedTab,
        (newValue) => {
          activeTab.value = newValue;
        },
      );

      return { args, activeTab };
    },
    template: `
      <div>
        <Tab
          :tabs="args.tabs"
          :size="args.size"
          :full-width="args.fullWidth"
          v-model:selected-tab="activeTab"
        >
          <template #default="{ currentTab, currentValue }">
            <div v-if="currentValue === 'usage'" class="tab-story-content">
              <h2 class="tab-story-heading">How to Use the Tab Component</h2>

              <h3 style="font-size: var(--text-base); font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem;">1. Import and Setup</h3>
              <pre style="background: var(--color-neutral-100); padding: 1rem; border-radius: var(--radius-base); overflow-x: auto; font-size: 0.8125rem;"><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue';
import { Tab, Button, Checkbox } from '@toteat-eng/design-system-vue';

const activeTab = ref('profile');
const tabs = [
  { value: 'profile', label: 'Profile', icon: 'user-outline' },
  { value: 'settings', label: 'Settings', icon: 'pencil-outline' },
  { value: 'notifications', label: 'Notifications', icon: 'warning-outline' },
];

// Your component's data
const emailNotifications = ref(true);
const pushNotifications = ref(false);
&lt;/script&gt;</code></pre>

              <h3 style="font-size: var(--text-base); font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem;">2. Template Usage (Complete Example)</h3>
              <pre style="background: var(--color-neutral-100); padding: 1rem; border-radius: var(--radius-base); overflow-x: auto; font-size: 0.8125rem;"><code>&lt;Tab :tabs="tabs" v-model:selected-tab="activeTab"&gt;
  &lt;template #default="{ currentTab, currentValue }"&gt;
    &lt;!-- Different content per tab using v-if --&gt;
    &lt;div v-if="currentValue === 'profile'"&gt;
      &lt;h2&gt;{{ currentTab?.label }}&lt;/h2&gt;
      &lt;p&gt;Name: John Doe&lt;/p&gt;
      &lt;p&gt;Email: john@example.com&lt;/p&gt;
      &lt;Button text="Edit Profile" variant="primary" size="small" /&gt;
    &lt;/div&gt;

    &lt;div v-else-if="currentValue === 'settings'"&gt;
      &lt;h2&gt;{{ currentTab?.label }}&lt;/h2&gt;
      &lt;p&gt;Language: English&lt;/p&gt;
      &lt;p&gt;Theme: Light&lt;/p&gt;
      &lt;Button text="Save Settings" variant="primary" size="small" /&gt;
    &lt;/div&gt;

    &lt;div v-else-if="currentValue === 'notifications'"&gt;
      &lt;h2&gt;{{ currentTab?.label }}&lt;/h2&gt;
      &lt;Checkbox v-model="emailNotifications" label="Email" /&gt;
      &lt;Checkbox v-model="pushNotifications" label="Push" /&gt;
      &lt;Button text="Update" variant="primary" size="small" /&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/Tab&gt;</code></pre>

              <h3 style="font-size: var(--text-base); font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem;">3. Key Points</h3>
              <ul style="margin-left: 1.5rem; line-height: 1.6;">
                <li><strong>Content is passed via slot:</strong> Use the default slot to render tab content</li>
                <li><strong>Two slot props available:</strong> <code>currentTab</code> (object) and <code>currentValue</code> (string/number)</li>
                <li><strong>Conditional rendering:</strong> Use <code>v-if</code> with <code>currentValue</code> to show different content per tab</li>
                <li><strong>Full width by default:</strong> Tabs span the full width (can be disabled with <code>:full-width="false"</code>)</li>
              </ul>
            </div>

            <div v-else-if="currentValue === 'slot'" class="tab-story-content">
              <h2 class="tab-story-heading">Slot Props Explanation</h2>

              <h3 style="font-size: var(--text-base); font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem;">Available Slot Props</h3>

              <div style="margin-top: 1rem; margin-bottom: 1rem;">
                <h4 style="font-weight: 600; margin-bottom: 0.5rem;">1. <code>currentTab</code> (object)</h4>
                <p style="margin-bottom: 0.5rem;">The complete tab object of the currently selected tab.</p>
                <pre style="background: var(--color-neutral-100); padding: 1rem; border-radius: var(--radius-base); overflow-x: auto;"><code>{
  value: 'tab1',        // Tab identifier
  label: 'First Tab',   // Display text
  icon: 'home-outline', // Optional icon name
  disabled: false       // Optional disabled state
}</code></pre>
                <p style="margin-top: 0.5rem;"><strong>Use case:</strong> Access tab metadata like label or icon</p>
              </div>

              <div style="margin-top: 1rem; margin-bottom: 1rem;">
                <h4 style="font-weight: 600; margin-bottom: 0.5rem;">2. <code>currentValue</code> (string | number)</h4>
                <p style="margin-bottom: 0.5rem;">The value of the currently selected tab (e.g., 'tab1', 'tab2').</p>
                <pre style="background: var(--color-neutral-100); padding: 1rem; border-radius: var(--radius-base); overflow-x: auto;"><code>// Example: 'usage', 'slot', or 'examples'
currentValue === 'usage' // true when first tab is active</code></pre>
                <p style="margin-top: 0.5rem;"><strong>Use case:</strong> Conditional rendering with <code>v-if</code></p>
              </div>

              <h3 style="font-size: var(--text-base); font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem;">Usage Patterns</h3>
              <pre style="background: var(--color-neutral-100); padding: 1rem; border-radius: var(--radius-base); overflow-x: auto;"><code>// Pattern 1: Using currentTab for metadata
&lt;h2&gt;{{ currentTab?.label }}&lt;/h2&gt;

// Pattern 2: Using currentValue for conditional rendering
&lt;div v-if="currentValue === 'profile'"&gt;Profile content&lt;/div&gt;
&lt;div v-else-if="currentValue === 'settings'"&gt;Settings content&lt;/div&gt;

// Pattern 3: Using both together
&lt;div v-if="currentValue === 'home'"&gt;
  &lt;h2&gt;{{ currentTab?.label }}&lt;/h2&gt;
  &lt;Icon v-if="currentTab?.icon" :name="currentTab.icon" /&gt;
&lt;/div&gt;</code></pre>
            </div>

            <div v-else-if="currentValue === 'examples'" class="tab-story-content">
              <h2 class="tab-story-heading">Common Patterns</h2>

              <h3 style="font-size: var(--text-base); font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem;">Example 1: Simple Content Switch</h3>
              <pre style="background: var(--color-neutral-100); padding: 1rem; border-radius: var(--radius-base); overflow-x: auto; font-size: 0.875rem;"><code>&lt;Tab :tabs="tabs" v-model:selected-tab="activeTab"&gt;
  &lt;template #default="{ currentTab }"&gt;
    &lt;h2&gt;{{ currentTab?.label }}&lt;/h2&gt;
    &lt;p&gt;Simple content that shows the tab name&lt;/p&gt;
  &lt;/template&gt;
&lt;/Tab&gt;</code></pre>

              <h3 style="font-size: var(--text-base); font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem;">Example 2: Different Content Per Tab</h3>
              <pre style="background: var(--color-neutral-100); padding: 1rem; border-radius: var(--radius-base); overflow-x: auto; font-size: 0.875rem;"><code>&lt;Tab :tabs="tabs" v-model:selected-tab="activeTab"&gt;
  &lt;template #default="{ currentValue }"&gt;
    &lt;div v-if="currentValue === 'profile'"&gt;
      &lt;h2&gt;User Profile&lt;/h2&gt;
      &lt;p&gt;Name: John Doe&lt;/p&gt;
    &lt;/div&gt;
    &lt;div v-else-if="currentValue === 'settings'"&gt;
      &lt;h2&gt;Settings&lt;/h2&gt;
      &lt;button&gt;Save&lt;/button&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/Tab&gt;</code></pre>

              <h3 style="font-size: var(--text-base); font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem;">Example 3: With Icons</h3>
              <pre style="background: var(--color-neutral-100); padding: 1rem; border-radius: var(--radius-base); overflow-x: auto; font-size: 0.875rem;"><code>const tabs = [
  { value: 'home', label: 'Home', icon: 'home-outline' },
  { value: 'profile', label: 'Profile', icon: 'user-outline' },
];

&lt;Tab :tabs="tabs" v-model:selected-tab="activeTab"&gt;
  &lt;template #default="{ currentTab, currentValue }"&gt;
    &lt;div&gt;
      &lt;h2&gt;{{ currentTab?.label }}&lt;/h2&gt;
      &lt;p&gt;Content for {{ currentValue }}&lt;/p&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/Tab&gt;</code></pre>

              <h3 style="font-size: var(--text-base); font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem;">Example 4: Without Full Width</h3>
              <pre style="background: var(--color-neutral-100); padding: 1rem; border-radius: var(--radius-base); overflow-x: auto; font-size: 0.875rem;"><code>&lt;Tab
  :tabs="tabs"
  v-model:selected-tab="activeTab"
  :full-width="false"
&gt;
  &lt;template #default="{ currentTab }"&gt;
    &lt;p&gt;{{ currentTab?.label }} content&lt;/p&gt;
  &lt;/template&gt;
&lt;/Tab&gt;</code></pre>
            </div>
          </template>
        </Tab>
      </div>
    `,
  }),
};
