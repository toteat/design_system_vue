<script setup lang="ts">
import { ref, watch, computed, provide, useSlots, toRef } from 'vue';
import type { TreeListProps, TreeItemData } from '@/types';
import TreeItem from '../TreeItem/TreeItem.vue';

const props = withDefaults(defineProps<TreeListProps>(), {
  items: () => [],
  draggable: false,
  expandedIds: () => [],
  selectedIds: () => [],
  selectable: false,
  indentSize: 24,
  bordered: false,
  striped: false,
});

const emit = defineEmits<{
  'update:items': [value: TreeItemData[]];
  'update:expandedIds': [value: (string | number)[]];
  'update:selectedIds': [value: (string | number)[]];
  reorder: [
    payload: {
      itemId: string | number;
      fromParentId: string | number | null;
      toParentId: string | number | null;
      fromIndex: number;
      toIndex: number;
    },
  ];
  'item-expand': [item: TreeItemData];
  'item-select': [item: TreeItemData];
}>();

const slots = useSlots();

const itemsRef = toRef(props, 'items');
const expandedIdsRef = toRef(props, 'expandedIds');
const selectedIdsRef = toRef(props, 'selectedIds');

const internalItems = ref<TreeItemData[]>(
  JSON.parse(JSON.stringify(itemsRef.value)),
);
const internalExpandedIds = ref<(string | number)[]>([...expandedIdsRef.value]);
const internalSelectedIds = ref<(string | number)[]>([...selectedIdsRef.value]);

watch(
  () => props.items,
  (newVal) => {
    internalItems.value = JSON.parse(JSON.stringify(newVal));
  },
  { deep: true },
);

watch(
  () => props.expandedIds,
  (newVal) => {
    internalExpandedIds.value = [...newVal];
  },
);

watch(
  () => props.selectedIds,
  (newVal) => {
    internalSelectedIds.value = [...newVal];
  },
);

const expandedIds = computed({
  get: () => internalExpandedIds.value,
  set: (value: (string | number)[]) => {
    internalExpandedIds.value = value;
    emit('update:expandedIds', value);
  },
});

const selectedIds = computed({
  get: () => internalSelectedIds.value,
  set: (value: (string | number)[]) => {
    internalSelectedIds.value = value;
    emit('update:selectedIds', value);
  },
});

const isExpanded = (id: string | number): boolean => {
  return expandedIds.value.includes(id);
};

// Calculate flat indices for striped rows (pre-order traversal of visible items)
const flatIndexMap = computed(() => {
  const map = new Map<string | number, number>();
  let index = 0;

  const traverse = (items: TreeItemData[]): void => {
    for (const item of items) {
      map.set(item.id, index++);
      if (item.children?.length && isExpanded(item.id)) {
        traverse(item.children);
      }
    }
  };

  traverse(internalItems.value);
  return map;
});

const getFlatIndex = (id: string | number): number => {
  return flatIndexMap.value.get(id) ?? 0;
};

const isSelected = (id: string | number): boolean => {
  return selectedIds.value.includes(id);
};

const toggleExpand = (id: string | number): void => {
  const item = findItemById(internalItems.value, id);
  if (isExpanded(id)) {
    expandedIds.value = expandedIds.value.filter((i) => i !== id);
  } else {
    expandedIds.value = [...expandedIds.value, id];
  }
  if (item) {
    emit('item-expand', item);
  }
};

const toggleSelect = (id: string | number): void => {
  const item = findItemById(internalItems.value, id);
  if (isSelected(id)) {
    selectedIds.value = selectedIds.value.filter((i) => i !== id);
  } else {
    selectedIds.value = [...selectedIds.value, id];
  }
  if (item) {
    emit('item-select', item);
  }
};

const findItemById = (
  items: TreeItemData[],
  id: string | number,
): TreeItemData | null => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

// Drag and drop
const dragState = ref<{
  itemId: string | number;
  parentId: string | number | null;
} | null>(null);

const dragOverState = ref<{
  itemId: string | number;
  parentId: string | number | null;
} | null>(null);

const handleDragStart = (payload: {
  event: globalThis.DragEvent;
  item: TreeItemData;
  parentId: string | number | null;
}): void => {
  dragState.value = {
    itemId: payload.item.id,
    parentId: payload.parentId,
  };
};

const handleDragEnd = (): void => {
  dragState.value = null;
  dragOverState.value = null;
};

const handleDragOver = (payload: {
  event: globalThis.DragEvent;
  item: TreeItemData;
  parentId: string | number | null;
}): void => {
  if (!dragState.value) return;

  // Only allow drop on same level (same parentId)
  if (dragState.value.parentId !== payload.parentId) {
    if (payload.event.dataTransfer) {
      payload.event.dataTransfer.dropEffect = 'none';
    }
    dragOverState.value = null;
    return;
  }

  // Don't allow drop on self
  if (dragState.value.itemId === payload.item.id) {
    dragOverState.value = null;
    return;
  }

  dragOverState.value = {
    itemId: payload.item.id,
    parentId: payload.parentId,
  };
};

const handleDragLeave = (): void => {
  dragOverState.value = null;
};

const handleDrop = (payload: {
  event: globalThis.DragEvent;
  item: TreeItemData;
  parentId: string | number | null;
}): void => {
  if (!dragState.value) return;

  // Only allow drop on same level
  if (dragState.value.parentId !== payload.parentId) {
    handleDragEnd();
    return;
  }

  const sourceId = dragState.value.itemId;
  const targetId = payload.item.id;
  const { parentId } = payload;

  if (sourceId === targetId) {
    handleDragEnd();
    return;
  }

  // Find the parent array
  let parentArray: TreeItemData[];
  if (parentId === null) {
    parentArray = internalItems.value;
  } else {
    const parent = findItemById(internalItems.value, parentId);
    if (!parent?.children) {
      handleDragEnd();
      return;
    }
    parentArray = parent.children;
  }

  const sourceIndex = parentArray.findIndex((i) => i.id === sourceId);
  const targetIndex = parentArray.findIndex((i) => i.id === targetId);

  if (sourceIndex === -1 || targetIndex === -1) {
    handleDragEnd();
    return;
  }

  // Reorder
  const [movedItem] = parentArray.splice(sourceIndex, 1);
  parentArray.splice(targetIndex, 0, movedItem);

  emit('update:items', internalItems.value);
  emit('reorder', {
    itemId: sourceId,
    fromParentId: parentId,
    toParentId: parentId,
    fromIndex: sourceIndex,
    toIndex: targetIndex,
  });

  handleDragEnd();
};

const isDragging = (id: string | number): boolean => {
  return dragState.value?.itemId === id;
};

const isDragOver = (id: string | number): boolean => {
  return dragOverState.value?.itemId === id;
};

// Provide slots to nested TreeItems
provide('treeListSlots', slots);
</script>

<script lang="ts">
import { defineComponent, h, type PropType, type VNode } from 'vue';

// Recursive component for nested items
const TreeListRecursive = defineComponent({
  name: 'TreeListRecursive',
  props: {
    items: {
      type: Array as PropType<TreeItemData[]>,
      required: true,
    },
    parentId: {
      type: [String, Number] as PropType<string | number>,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    expandedIds: {
      type: Array as PropType<(string | number)[]>,
      required: true,
    },
    selectedIds: {
      type: Array as PropType<(string | number)[]>,
      required: true,
    },
    draggable: Boolean,
    selectable: Boolean,
    bordered: Boolean,
    striped: Boolean,
    indentSize: {
      type: Number,
      default: 24,
    },
    dragState: {
      type: Object as PropType<{
        itemId: string | number;
        parentId: string | number | null;
      } | null>,
      default: null,
    },
    dragOverState: {
      type: Object as PropType<{
        itemId: string | number;
        parentId: string | number | null;
      } | null>,
      default: null,
    },
    flatIndexMap: {
      type: Object as PropType<Map<string | number, number>>,
      default: () => new Map(),
    },
  },
  emits: {
    'toggle-expand': (id: string | number) =>
      typeof id === 'string' || typeof id === 'number',
    'toggle-select': (id: string | number) =>
      typeof id === 'string' || typeof id === 'number',
    dragstart: (payload: {
      event: globalThis.DragEvent;
      item: TreeItemData;
      parentId: string | number | null;
    }) => payload !== undefined,
    dragend: (payload: { event: globalThis.DragEvent; item: TreeItemData }) =>
      payload !== undefined,
    dragover: (payload: {
      event: globalThis.DragEvent;
      item: TreeItemData;
      parentId: string | number | null;
    }) => payload !== undefined,
    dragleave: (payload: { event: globalThis.DragEvent; item: TreeItemData }) =>
      payload !== undefined,
    drop: (payload: {
      event: globalThis.DragEvent;
      item: TreeItemData;
      parentId: string | number | null;
    }) => payload !== undefined,
  },
  setup(props, { emit, slots }) {
    const isExpanded = (id: string | number): boolean =>
      props.expandedIds.includes(id);
    const isSelected = (id: string | number): boolean =>
      props.selectedIds.includes(id);
    const isDragging = (id: string | number): boolean =>
      props.dragState?.itemId === id;
    const isDragOver = (id: string | number): boolean =>
      props.dragOverState?.itemId === id;
    const getFlatIndex = (id: string | number): number =>
      props.flatIndexMap.get(id) ?? 0;

    return () => {
      const renderItems = (
        items: TreeItemData[],
        parentId: string | number,
        level: number,
      ): VNode[] => {
        return items.map((item) => {
          const hasChildren = Boolean(item.children?.length);

          return h(
            TreeItem,
            {
              key: item.id,
              item,
              level,
              parentId,
              expanded: isExpanded(item.id),
              selected: isSelected(item.id),
              draggable: props.draggable,
              selectable: props.selectable,
              bordered: props.bordered,
              striped: props.striped,
              flatIndex: getFlatIndex(item.id),
              hasChildren,
              indentSize: props.indentSize,
              'data-dragging': isDragging(item.id),
              'data-drag-over': isDragOver(item.id),
              'onToggle-expand': (id: string | number) =>
                emit('toggle-expand', id),
              'onToggle-select': (id: string | number) =>
                emit('toggle-select', id),
              onDragstart: (payload: {
                event: globalThis.DragEvent;
                item: TreeItemData;
                parentId: string | number | null;
              }) => emit('dragstart', payload),
              onDragend: (payload: {
                event: globalThis.DragEvent;
                item: TreeItemData;
              }) => emit('dragend', payload),
              onDragover: (payload: {
                event: globalThis.DragEvent;
                item: TreeItemData;
                parentId: string | number | null;
              }) => emit('dragover', payload),
              onDragleave: (payload: {
                event: globalThis.DragEvent;
                item: TreeItemData;
              }) => emit('dragleave', payload),
              onDrop: (payload: {
                event: globalThis.DragEvent;
                item: TreeItemData;
                parentId: string | number | null;
              }) => emit('drop', payload),
            },
            {
              label: slots.label,
              meta: slots.meta,
              prefix: slots.prefix,
              suffix: slots.suffix,
              children:
                hasChildren && item.children
                  ? () => renderItems(item.children ?? [], item.id, level + 1)
                  : undefined,
            },
          );
        });
      };

      return h(
        'div',
        { class: 'tree-list__nested' },
        renderItems(props.items, props.parentId, props.level),
      );
    };
  },
});

export { TreeListRecursive };
</script>

<template>
  <div class="tot-ds-root tree-list" role="tree" :data-draggable="draggable">
    <template v-for="item in internalItems" :key="item.id">
      <TreeItem
        :item="item"
        :level="0"
        :parent-id="null"
        :expanded="isExpanded(item.id)"
        :selected="isSelected(item.id)"
        :draggable="draggable"
        :selectable="selectable"
        :bordered="bordered"
        :has-children="Boolean(item.children?.length)"
        :indent-size="indentSize"
        :flat-index="getFlatIndex(item.id)"
        :striped="striped"
        :data-dragging="isDragging(item.id)"
        :data-drag-over="isDragOver(item.id)"
        @toggle-expand="toggleExpand"
        @toggle-select="toggleSelect"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
      >
        <template #label="slotProps">
          <slot name="label" v-bind="slotProps">
            <span class="tree-list__label">{{ slotProps.item.label }}</span>
          </slot>
        </template>

        <template #meta="slotProps">
          <slot name="meta" v-bind="slotProps">
            <span v-if="slotProps.item.meta" class="tree-list__meta">
              {{ slotProps.item.meta }}
            </span>
          </slot>
        </template>

        <template #prefix="slotProps">
          <slot name="prefix" v-bind="slotProps" />
        </template>

        <template #suffix="slotProps">
          <slot name="suffix" v-bind="slotProps" />
        </template>

        <template v-if="item.children?.length" #children>
          <TreeListRecursive
            :items="item.children"
            :parent-id="item.id"
            :level="1"
            :expanded-ids="expandedIds"
            :selected-ids="selectedIds"
            :draggable="draggable"
            :selectable="selectable"
            :bordered="bordered"
            :striped="striped"
            :indent-size="indentSize"
            :drag-state="dragState"
            :drag-over-state="dragOverState"
            :flat-index-map="flatIndexMap"
            @toggle-expand="toggleExpand"
            @toggle-select="toggleSelect"
            @dragstart="handleDragStart"
            @dragend="handleDragEnd"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @drop="handleDrop"
          >
            <template #label="slotProps">
              <slot name="label" v-bind="slotProps" />
            </template>
            <template #meta="slotProps">
              <slot name="meta" v-bind="slotProps" />
            </template>
            <template #prefix="slotProps">
              <slot name="prefix" v-bind="slotProps" />
            </template>
            <template #suffix="slotProps">
              <slot name="suffix" v-bind="slotProps" />
            </template>
          </TreeListRecursive>
        </template>
      </TreeItem>
    </template>
  </div>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.tree-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

.tree-list__label {
  flex: 1;
  font-size: var(--text-sm);
  color: var(--color-neutral-500);
}

.tree-list__meta {
  font-size: var(--text-sm);
  color: var(--color-neutral-400);
}

.tree-list__nested {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
