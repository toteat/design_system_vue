import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import TreeList from '../TreeList.vue';
import type { TreeItemData } from '@/types';

const meta: Meta<typeof TreeList> = {
  title: 'Components/TreeList',
  component: TreeList,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Hierarchical tree data',
    },
    draggable: {
      control: 'boolean',
      description: 'Enable drag reordering within same level',
    },
    expandedIds: {
      control: 'object',
      description: 'IDs of expanded items',
    },
    selectedIds: {
      control: 'object',
      description: 'IDs of selected items',
    },
    selectable: {
      control: 'boolean',
      description: 'Show checkboxes for selection',
    },
    indentSize: {
      control: 'number',
      description: 'Pixels of indentation per level',
    },
    striped: {
      control: 'boolean',
      description: 'Alternate row background colors (white and neutral-100)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeList>;

const simpleItems: TreeItemData[] = [
  { id: 'item-1', label: 'Item 1', meta: '[ID]' },
  { id: 'item-2', label: 'Item 2', meta: '[ID]' },
  { id: 'item-3', label: 'Item 3', meta: '[ID]' },
];

const nestedItems: TreeItemData[] = [
  {
    id: 'l0',
    label: 'Level 0',
    meta: '[ID]',
    children: [
      {
        id: 'l1-1',
        label: 'Level 1 - Item 1',
        meta: '[ID]',
        children: [
          { id: 'l2-1', label: 'Level 2 - Item 1', meta: '[ID]' },
          { id: 'l2-2', label: 'Level 2 - Item 2', meta: '[ID]' },
        ],
      },
      { id: 'l1-2', label: 'Level 1 - Item 2', meta: '[ID]' },
      { id: 'l1-3', label: 'Level 1 - Item 3', meta: '[ID]' },
    ],
  },
];

export const Default: Story = {
  render: (args) => ({
    components: { TreeList },
    setup() {
      const items = ref([...simpleItems]);
      return { args, items };
    },
    template: `
      <TreeList v-bind="args" :items="items" />
    `,
  }),
};

export const WithCheckboxes: Story = {
  render: () => ({
    components: { TreeList },
    setup() {
      const items = ref([...simpleItems]);
      const selectedIds = ref<(string | number)[]>(['item-1']);
      return { items, selectedIds };
    },
    template: `
      <div>
        <TreeList
          :items="items"
          v-model:selected-ids="selectedIds"
          selectable
        />
        <p style="margin-top: 16px; color: #666; font-size: 14px;">
          Selected: {{ selectedIds.join(', ') || 'None' }}
        </p>
      </div>
    `,
  }),
};

export const Draggable: Story = {
  render: () => ({
    components: { TreeList },
    setup() {
      const items = ref([...simpleItems]);
      const handleReorder = (payload: unknown) => {
        console.log('Reordered:', payload);
      };
      return { items, handleReorder };
    },
    template: `
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          Drag items to reorder them within the same level.
        </p>
        <TreeList
          v-model:items="items"
          draggable
          @reorder="handleReorder"
        />
        <p style="margin-top: 16px; color: #666; font-size: 14px;">
          Order: {{ items.map(i => i.label).join(', ') }}
        </p>
      </div>
    `,
  }),
};

export const NestedHierarchy: Story = {
  render: () => ({
    components: { TreeList },
    setup() {
      const items = ref(JSON.parse(JSON.stringify(nestedItems)));
      const expandedIds = ref<(string | number)[]>(['l0', 'l1-1']);
      return { items, expandedIds };
    },
    template: `
      <TreeList
        :items="items"
        v-model:expanded-ids="expandedIds"
        draggable
      />
    `,
  }),
};

export const Striped: Story = {
  render: () => ({
    components: { TreeList },
    setup() {
      const items = ref(JSON.parse(JSON.stringify(nestedItems)));
      const expandedIds = ref<(string | number)[]>(['l0', 'l1-1']);
      return { items, expandedIds };
    },
    template: `
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          Alternating row colors (white and #F2F2F2) for better visual separation.
        </p>
        <TreeList
          :items="items"
          v-model:expanded-ids="expandedIds"
          striped
        />
      </div>
    `,
  }),
};

export const StripedWithCheckboxes: Story = {
  render: () => ({
    components: { TreeList },
    setup() {
      const items = ref(JSON.parse(JSON.stringify(nestedItems)));
      const expandedIds = ref<(string | number)[]>(['l0', 'l1-1']);
      const selectedIds = ref<(string | number)[]>([]);
      return { items, expandedIds, selectedIds };
    },
    template: `
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          Striped rows combined with checkboxes for selection.
        </p>
        <TreeList
          :items="items"
          v-model:expanded-ids="expandedIds"
          v-model:selected-ids="selectedIds"
          striped
          selectable
        />
        <p style="margin-top: 16px; color: #666; font-size: 14px;">
          Selected: {{ selectedIds.join(', ') || 'None' }}
        </p>
      </div>
    `,
  }),
};

export const FullFeatured: Story = {
  render: () => ({
    components: { TreeList },
    setup() {
      const items = ref(JSON.parse(JSON.stringify(nestedItems)));
      const expandedIds = ref<(string | number)[]>(['l0', 'l1-1']);
      const selectedIds = ref<(string | number)[]>([]);
      return { items, expandedIds, selectedIds };
    },
    template: `
      <div>
        <TreeList
          v-model:items="items"
          v-model:expanded-ids="expandedIds"
          v-model:selected-ids="selectedIds"
          draggable
          selectable
        />
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-size: 14px;">
          <p><strong>Selected:</strong> {{ selectedIds.join(', ') || 'None' }}</p>
          <p><strong>Expanded:</strong> {{ expandedIds.join(', ') || 'None' }}</p>
        </div>
      </div>
    `,
  }),
};

export const DeepNesting: Story = {
  render: () => ({
    components: { TreeList },
    setup() {
      const items = ref<TreeItemData[]>([
        {
          id: 'l1',
          label: 'Level 1',
          children: [
            {
              id: 'l2',
              label: 'Level 2',
              children: [
                {
                  id: 'l3',
                  label: 'Level 3',
                  children: [
                    {
                      id: 'l4',
                      label: 'Level 4',
                      children: [
                        { id: 'l5-1', label: 'Level 5 - Item 1' },
                        { id: 'l5-2', label: 'Level 5 - Item 2' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]);
      const expandedIds = ref<(string | number)[]>(['l1', 'l2', 'l3', 'l4']);
      return { items, expandedIds };
    },
    template: `
      <TreeList
        :items="items"
        v-model:expanded-ids="expandedIds"
        draggable
      />
    `,
  }),
};
