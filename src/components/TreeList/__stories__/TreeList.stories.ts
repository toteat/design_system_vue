import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import TreeList from '../TreeList.vue';
import TextInput from '../../TextInput/TextInput.vue';
import Checkbox from '../../Checkbox/Checkbox.vue';
import Tooltip from '../../Tooltip/Tooltip.vue';
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

export const WithEditableInputs: Story = {
  render: () => ({
    components: {
      TreeList,
      TextInput,
      Checkbox,
      Tooltip,
    },
    setup() {
      const items = ref<TreeItemData[]>([
        {
          id: 'cat-1',
          label: '[Category name]',
          meta: '[Node ID]',
          children: [
            {
              id: 'subcat-1',
              label: '[Sub-category name]',
              meta: '[Node ID]',
            },
            {
              id: 'subcat-2',
              label: '[Sub-category name]',
              meta: '[Node ID]',
              children: [
                {
                  id: 'subsub-1',
                  label: '[Sub-sub category]',
                  meta: '[Node ID]',
                },
                {
                  id: 'subsub-2',
                  label: '[Sub-sub category]',
                  meta: '[Node ID]',
                },
                {
                  id: 'subsub-3',
                  label: '[Sub-sub category]',
                  meta: '[Node ID]',
                },
                {
                  id: 'subsub-4',
                  label: '[Sub-sub category]',
                  meta: '[Node ID]',
                },
                {
                  id: 'subsub-5',
                  label: '[Sub-sub category]',
                  meta: '[Node ID]',
                },
              ],
            },
          ],
        },
        {
          id: 'cat-2',
          label: '[Category name]',
          meta: '[Node ID]',
        },
      ]);
      const expandedIds = ref<(string | number)[]>(['cat-1', 'subcat-2']);
      const visibility = ref<Record<string, boolean>>({});

      const getVisibility = (id: string | number): boolean => {
        return visibility.value[id] ?? false;
      };

      const toggleVisibility = (id: string | number): void => {
        visibility.value[id] = !getVisibility(id);
      };

      const updateLabel = (item: TreeItemData, value: string): void => {
        item.label = value;
      };

      const flattenOrder = (
        itemsList: TreeItemData[],
        depth = 0,
      ): Array<{
        id: string | number;
        label: string;
        depth: number;
      }> => {
        const result: Array<{
          id: string | number;
          label: string;
          depth: number;
        }> = [];
        for (const item of itemsList) {
          result.push({
            id: item.id,
            label: item.label,
            depth,
          });
          if (item.children && item.children.length > 0) {
            result.push(...flattenOrder(item.children, depth + 1));
          }
        }
        return result;
      };

      const orderLog = ref(flattenOrder(items.value));

      const handleReorder = (): void => {
        orderLog.value = flattenOrder(items.value);
        console.log('Order updated:', orderLog.value);
      };

      return {
        items,
        expandedIds,
        visibility,
        getVisibility,
        toggleVisibility,
        updateLabel,
        orderLog,
        handleReorder,
      };
    },
    template: `
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          Test typing spaces in the TextInput fields - they should work normally without expanding/collapsing nodes.
        </p>
        <TreeList
          v-model:items="items"
          v-model:expanded-ids="expandedIds"
          draggable
          bordered
          :indent-size="24"
          @reorder="handleReorder"
        >
          <template #label="{ item }">
            <Tooltip content="Category name" position="top">
              <TextInput
                :model-value="item.label"
                size="small"
                :width="160"
                @update:model-value="updateLabel(item, $event)"
                @click.stop
              />
            </Tooltip>
          </template>
          <template #meta="{ item }">
            <Tooltip content="Category ID" position="top">
              <span style="color: #666; font-size: 12px;">{{ item.meta }}</span>
            </Tooltip>
          </template>
          <template #suffix="{ item }">
            <Tooltip content="Visible to customers" position="top">
              <Checkbox
                :checked="getVisibility(item.id)"
                size="small"
                @update:checked="toggleVisibility(item.id)"
                @click.stop
              >
                Visible to customers
              </Checkbox>
            </Tooltip>
          </template>
        </TreeList>
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-size: 13px; font-family: monospace;">
          <strong style="display: block; margin-bottom: 8px;">Item order:</strong>
          <div v-for="item in orderLog" :key="item.id" :style="{ paddingLeft: item.depth * 16 + 'px' }">
            {{ item.id }} - {{ item.label }}
          </div>
        </div>
      </div>
    `,
  }),
};
