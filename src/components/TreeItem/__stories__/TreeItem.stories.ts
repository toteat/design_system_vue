import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import TreeItem from '../TreeItem.vue';
import TextInput from '@/components/TextInput/TextInput.vue';
import Button from '@/components/Button/Button.vue';
import type { TreeItemData } from '@/types';

const meta: Meta<typeof TreeItem> = {
  title: 'Components/TreeItem',
  component: TreeItem,
  tags: ['autodocs'],
  argTypes: {
    item: {
      control: 'object',
      description: 'The item data',
    },
    level: {
      control: 'number',
      description: 'Nesting depth for indentation',
    },
    expanded: {
      control: 'boolean',
      description: 'Whether children are visible',
    },
    selected: {
      control: 'boolean',
      description: 'Whether item is selected',
    },
    draggable: {
      control: 'boolean',
      description: 'Enable drag handle',
    },
    selectable: {
      control: 'boolean',
      description: 'Show checkbox',
    },
    hasChildren: {
      control: 'boolean',
      description: 'Show expand/collapse chevron',
    },
    indentSize: {
      control: 'number',
      description: 'Pixels per indent level',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeItem>;

const defaultItem: TreeItemData = {
  id: 'item-1',
  label: 'Item 1',
  meta: '[ID]',
};

export const Default: Story = {
  render: (args) => ({
    components: { TreeItem },
    setup() {
      return { args };
    },
    template: `
      <div role="tree">
        <TreeItem v-bind="args" />
      </div>
    `,
  }),
  args: {
    item: defaultItem,
    level: 0,
    expanded: false,
    selected: false,
    draggable: false,
    selectable: false,
    hasChildren: false,
  },
};

export const WithDragHandle: Story = {
  render: (args) => ({
    components: { TreeItem },
    setup() {
      return { args };
    },
    template: `
      <div role="tree">
        <TreeItem v-bind="args" />
      </div>
    `,
  }),
  args: {
    item: defaultItem,
    draggable: true,
  },
};

export const WithCheckbox: Story = {
  render: (args) => ({
    components: { TreeItem },
    setup() {
      const selected = ref(false);
      const handleToggleSelect = () => {
        selected.value = !selected.value;
      };
      return { args, selected, handleToggleSelect };
    },
    template: `
      <div role="tree">
        <TreeItem
          v-bind="args"
          :selected="selected"
          @toggle-select="handleToggleSelect"
        />
      </div>
    `,
  }),
  args: {
    item: defaultItem,
    selectable: true,
    draggable: true,
  },
};

export const WithChildren: Story = {
  render: (args) => ({
    components: { TreeItem },
    setup() {
      const expanded = ref(true);
      const handleToggleExpand = () => {
        expanded.value = !expanded.value;
      };
      return { args, expanded, handleToggleExpand };
    },
    template: `
      <div role="tree">
        <TreeItem
          v-bind="args"
          :expanded="expanded"
          @toggle-expand="handleToggleExpand"
        >
          <template #children>
            <TreeItem
              :item="{ id: 'child-1', label: 'Child Item 1', meta: '[ID]' }"
              :level="1"
              :indent-size="24"
              draggable
            />
            <TreeItem
              :item="{ id: 'child-2', label: 'Child Item 2', meta: '[ID]' }"
              :level="1"
              :indent-size="24"
              draggable
            />
          </template>
        </TreeItem>
      </div>
    `,
  }),
  args: {
    item: { id: 'parent', label: 'Parent Item', meta: '[ID]' },
    hasChildren: true,
    draggable: true,
  },
};

export const NestedLevels: Story = {
  render: () => ({
    components: { TreeItem },
    setup() {
      const expanded1 = ref(true);
      const expanded2 = ref(true);
      return { expanded1, expanded2 };
    },
    template: `
      <div role="tree">
        <TreeItem
          :item="{ id: 'l0', label: 'Level 0', meta: '[ID]' }"
          :level="0"
          :expanded="expanded1"
          has-children
          draggable
          @toggle-expand="expanded1 = !expanded1"
        >
          <template #children>
            <TreeItem
              :item="{ id: 'l1', label: 'Level 1', meta: '[ID]' }"
              :level="1"
              :expanded="expanded2"
              has-children
              draggable
              @toggle-expand="expanded2 = !expanded2"
            >
              <template #children>
                <TreeItem
                  :item="{ id: 'l2-1', label: 'Level 2 - Item 1', meta: '[ID]' }"
                  :level="2"
                  draggable
                />
                <TreeItem
                  :item="{ id: 'l2-2', label: 'Level 2 - Item 2', meta: '[ID]' }"
                  :level="2"
                  draggable
                />
              </template>
            </TreeItem>
            <TreeItem
              :item="{ id: 'l1-2', label: 'Level 1 - Item 2', meta: '[ID]' }"
              :level="1"
              draggable
            />
          </template>
        </TreeItem>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    components: { TreeItem },
    setup() {
      return { args };
    },
    template: `
      <div role="tree">
        <TreeItem v-bind="args" />
      </div>
    `,
  }),
  args: {
    item: {
      id: 'disabled',
      label: 'Disabled Item',
      meta: '[ID]',
      disabled: true,
    },
    draggable: true,
    selectable: true,
  },
};

export const AllFeatures: Story = {
  render: () => ({
    components: { TreeItem },
    setup() {
      const expanded = ref(true);
      const selected = ref(false);
      return { expanded, selected };
    },
    template: `
      <div role="tree">
        <TreeItem
          :item="{ id: 'full', label: 'Full Featured', meta: '[ID]' }"
          :level="0"
          :expanded="expanded"
          :selected="selected"
          has-children
          draggable
          selectable
          @toggle-expand="expanded = !expanded"
          @toggle-select="selected = !selected"
        >
          <template #children>
            <TreeItem
              :item="{ id: 'child', label: 'Child Item', meta: '[ID]' }"
              :level="1"
              draggable
              selectable
            />
          </template>
        </TreeItem>
      </div>
    `,
  }),
};

export const CustomSlots: Story = {
  render: () => ({
    components: { TreeItem, TextInput, Button },
    setup() {
      return {};
    },
    template: `
      <div role="tree">
        <TreeItem
          :item="{ id: 'custom', label: 'Custom Item' }"
          draggable
        >
          <template #label="{ item }">
            <TextInput
              :model-value="item.label"
              size="small"
              :width="200"
              @click.stop
            />
          </template>
          <template #meta>
            <span style="color: #666; font-size: 12px;">[Custom Meta]</span>
          </template>
          <template #suffix>
            <Button
              text="Active"
              variant="primary"
              size="tiny"
            />
          </template>
        </TreeItem>
      </div>
    `,
  }),
};
