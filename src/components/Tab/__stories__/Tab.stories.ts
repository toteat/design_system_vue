import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, watch } from 'vue';
import Tab from '../Tab.vue';
import Button from '../../Button/Button.vue';
import Checkbox from '../../Checkbox/Checkbox.vue';

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
  render: (args) => ({
    components: { Tab },
    setup() {
      const activeTab = ref(args.selectedTab);

      // Watch args.selectedTab changes from Storybook controls
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
          <template #default="{ currentTab }">
            <div>
              <h2 class="tab-story-heading">{{ currentTab?.label }}</h2>
              <p class="tab-story-text">
                This is the content for {{ currentTab?.label }}. You can put any content here.
              </p>
            </div>
          </template>
        </Tab>
      </div>
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

export const CustomContent: Story = {
  args: {
    tabs: [
      { value: 'products', label: 'Products', icon: 'shopping-cart-outline' },
      { value: 'orders', label: 'Orders', icon: 'purchase-order-list-outline' },
      { value: 'customers', label: 'Customers', icon: 'user-outline' },
    ],
    selectedTab: 'products',
  },
  render: (args) => ({
    components: { Tab, Button },
    setup() {
      const activeTab = ref(args.selectedTab);
      return { args, activeTab };
    },
    template: `
      <div>
        <Tab v-bind="args" v-model:selected-tab="activeTab">
          <template #default="{ currentValue }">
            <div v-if="currentValue === 'products'" class="tab-story-content">
              <h2 class="tab-story-heading">Product Catalog</h2>
              <div class="tab-story-grid">
                <div class="tab-story-card">
                  <h3 class="tab-story-card-title">Product 1</h3>
                  <p class="tab-story-card-subtitle">$29.99</p>
                  <Button text="View" variant="outline" size="tiny" />
                </div>
                <div class="tab-story-card">
                  <h3 class="tab-story-card-title">Product 2</h3>
                  <p class="tab-story-card-subtitle">$49.99</p>
                  <Button text="View" variant="outline" size="tiny" />
                </div>
                <div class="tab-story-card">
                  <h3 class="tab-story-card-title">Product 3</h3>
                  <p class="tab-story-card-subtitle">$19.99</p>
                  <Button text="View" variant="outline" size="tiny" />
                </div>
              </div>
            </div>
            <div v-else-if="currentValue === 'orders'" class="tab-story-content">
              <h2 class="tab-story-heading">Recent Orders</h2>
              <div class="tab-story-list">
                <div class="tab-story-list-item">
                  <h3 class="tab-story-card-title">Order #1234</h3>
                  <p class="tab-story-card-subtitle">Status: Shipped</p>
                </div>
                <div class="tab-story-list-item">
                  <h3 class="tab-story-card-title">Order #1235</h3>
                  <p class="tab-story-card-subtitle">Status: Processing</p>
                </div>
                <div class="tab-story-list-item">
                  <h3 class="tab-story-card-title">Order #1236</h3>
                  <p class="tab-story-card-subtitle">Status: Delivered</p>
                </div>
              </div>
            </div>
            <div v-else-if="currentValue === 'customers'" class="tab-story-content">
              <h2 class="tab-story-heading">Customer List</h2>
              <div class="tab-story-list">
                <div class="tab-story-list-item">
                  <h3 class="tab-story-card-title">Alice Johnson</h3>
                  <p class="tab-story-card-subtitle">alice@example.com</p>
                </div>
                <div class="tab-story-list-item">
                  <h3 class="tab-story-card-title">Bob Smith</h3>
                  <p class="tab-story-card-subtitle">bob@example.com</p>
                </div>
                <div class="tab-story-list-item">
                  <h3 class="tab-story-card-title">Carol Williams</h3>
                  <p class="tab-story-card-subtitle">carol@example.com</p>
                </div>
              </div>
            </div>
          </template>
        </Tab>
      </div>
    `,
  }),
};
