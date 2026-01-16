<script setup lang="ts">
import { computed, ref } from 'vue';
import type { TreeItemProps, TreeItemData } from '@/types';
import Icon from '../Icon/Icon.vue';
import Checkbox from '../Checkbox/Checkbox.vue';

const props = withDefaults(defineProps<TreeItemProps>(), {
  level: 0,
  expanded: false,
  selected: false,
  draggable: false,
  selectable: false,
  hasChildren: false,
  indentSize: 24,
  parentId: null,
  bordered: false,
  flatIndex: 0,
  striped: false,
});

const emit = defineEmits<{
  'toggle-expand': [id: string | number];
  'toggle-select': [id: string | number];
  dragstart: [
    payload: {
      event: globalThis.DragEvent;
      item: TreeItemData;
      parentId: string | number | null;
    },
  ];
  dragend: [payload: { event: globalThis.DragEvent; item: TreeItemData }];
  dragover: [
    payload: {
      event: globalThis.DragEvent;
      item: TreeItemData;
      parentId: string | number | null;
    },
  ];
  dragleave: [payload: { event: globalThis.DragEvent; item: TreeItemData }];
  drop: [
    payload: {
      event: globalThis.DragEvent;
      item: TreeItemData;
      parentId: string | number | null;
    },
  ];
}>();

const indentStyle = computed(() => ({
  '--tree-item-indent': `${props.level * props.indentSize}px`,
}));

const isOddRow = computed(() => props.flatIndex % 2 === 1);

const handleToggleExpand = (): void => {
  if (props.hasChildren && !props.item.disabled) {
    emit('toggle-expand', props.item.id);
  }
};

const handleToggleSelect = (): void => {
  if (!props.item.disabled) {
    emit('toggle-select', props.item.id);
  }
};

const handleActivateKey = (event: globalThis.KeyboardEvent): void => {
  event.preventDefault();
  if (props.hasChildren) {
    handleToggleExpand();
  } else if (props.selectable) {
    handleToggleSelect();
  }
};

const handleArrowKey = (
  event: globalThis.KeyboardEvent,
  expand: boolean,
): void => {
  if (!props.hasChildren) return;
  if (expand && !props.expanded) {
    event.preventDefault();
    emit('toggle-expand', props.item.id);
  } else if (!expand && props.expanded) {
    event.preventDefault();
    emit('toggle-expand', props.item.id);
  }
};

const handleKeydown = (event: globalThis.KeyboardEvent): void => {
  if (props.item.disabled) return;

  // Ignore keyboard events from interactive elements (inputs, textareas, etc.)
  const target = event.target as {
    tagName?: string;
    isContentEditable?: boolean;
  };
  const isInteractiveElement =
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT' ||
    target.isContentEditable;

  if (isInteractiveElement) return;

  switch (event.key) {
    case 'Enter':
    case ' ':
      handleActivateKey(event);
      break;
    case 'ArrowRight':
      handleArrowKey(event, true);
      break;
    case 'ArrowLeft':
      handleArrowKey(event, false);
      break;
  }
};

// Track if drag started from handle
const isDraggingFromHandle = ref(false);

const handleDragHandleMouseDown = (): void => {
  isDraggingFromHandle.value = true;
};

const handleDragStart = (event: globalThis.DragEvent): void => {
  // Only allow drag if it started from the drag handle
  if (!props.draggable || props.item.disabled || !isDraggingFromHandle.value) {
    event.preventDefault();
    isDraggingFromHandle.value = false;
    return;
  }
  const payload = {
    id: props.item.id,
    parentId: props.parentId,
  };
  event.dataTransfer?.setData('application/json', JSON.stringify(payload));
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
  }
  emit('dragstart', { event, item: props.item, parentId: props.parentId });
};

const handleDragEnd = (event: globalThis.DragEvent): void => {
  isDraggingFromHandle.value = false;
  emit('dragend', { event, item: props.item });
};

// Reset drag state on mouseup (in case drag was cancelled)
const handleMouseUp = (): void => {
  isDraggingFromHandle.value = false;
};

const handleDragOver = (event: globalThis.DragEvent): void => {
  if (!props.draggable) return;

  try {
    const types = event.dataTransfer?.types ?? [];
    if (types.includes('application/json')) {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
      emit('dragover', { event, item: props.item, parentId: props.parentId });
    }
  } catch {
    // Security restrictions may prevent reading data during dragover
    event.preventDefault();
    emit('dragover', { event, item: props.item, parentId: props.parentId });
  }
};

const handleDragLeave = (event: globalThis.DragEvent): void => {
  emit('dragleave', { event, item: props.item });
};

const handleDrop = (event: globalThis.DragEvent): void => {
  event.preventDefault();
  emit('drop', { event, item: props.item, parentId: props.parentId });
};
</script>

<template>
  <div
    class="tot-ds-root tree-item"
    :style="indentStyle"
    :data-level="level"
    :data-expanded="expanded"
    :data-selected="selected"
    :data-disabled="item.disabled"
    :data-has-children="hasChildren"
    :data-bordered="bordered"
    :data-striped="striped"
    :data-odd-row="striped && isOddRow"
    role="treeitem"
    :aria-level="level + 1"
    :aria-expanded="hasChildren ? expanded : undefined"
    :aria-selected="selectable ? selected : undefined"
    :aria-disabled="item.disabled"
    tabindex="0"
    @keydown="handleKeydown"
  >
    <div
      class="tree-item__content"
      role="presentation"
      :draggable="draggable && !item.disabled"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @mouseup="handleMouseUp"
    >
      <span
        v-if="draggable"
        class="tree-item__drag-handle"
        aria-hidden="true"
        @mousedown.stop="handleDragHandleMouseDown"
        @touchstart.stop="handleDragHandleMouseDown"
      >
        <Icon name="drag-handle-outline" :size="0.75" />
      </span>

      <div class="tree-item__indent" aria-hidden="true" />

      <Checkbox
        v-if="selectable"
        :checked="selected"
        :disabled="item.disabled"
        size="small"
        class="tree-item__checkbox"
        @update:checked="handleToggleSelect"
      />

      <slot name="prefix" :item="item" :level="level" />

      <div class="tree-item__slots-wrapper">
        <slot name="label" :item="item" :level="level">
          <span class="tree-item__label">{{ item.label }}</span>
        </slot>

        <slot name="meta" :item="item" :level="level">
          <span v-if="item.meta" class="tree-item__meta">{{ item.meta }}</span>
        </slot>

        <slot name="suffix" :item="item" :level="level" />
      </div>

      <button
        v-if="hasChildren"
        type="button"
        class="tree-item__expand"
        :aria-expanded="expanded"
        :aria-label="expanded ? 'Collapse' : 'Expand'"
        :disabled="item.disabled"
        @click.stop="handleToggleExpand"
      >
        <Icon name="chevron-down-outline" :size="1" />
      </button>
      <span v-else class="tree-item__expand-placeholder" aria-hidden="true" />
    </div>

    <div
      v-if="hasChildren"
      class="tree-item__children"
      role="group"
      :hidden="!expanded"
    >
      <slot name="children" />
    </div>
  </div>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.tree-item {
    --tree-item-indent: 0px;
    width: 100%;

    /* Striped rows - odd rows get alternate background */
    &[data-odd-row='true'] > .tree-item__content {
      background-color: var(--color-neutral-100);

      &:hover {
        background-color: var(--color-neutral-200);
      }
    }

    .tree-item__content {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      padding-left: calc(var(--spacing-md) + var(--tree-item-indent));
      min-height: 44px;
      transition: background-color 150ms ease;

      &:hover {
        background-color: var(--color-neutral-100);
      }

      &[draggable='true'] {
        transition:
          opacity 150ms ease,
          background-color 150ms ease;

        &:active .tree-item__drag-handle {
          cursor: grabbing;
        }
      }
    }

    /* Bordered variant - border wraps content and children only at level 0 */
    &[data-bordered='true'][data-level='0'] {
      border: 1px solid var(--color-neutral-200);
      border-radius: var(--radius-lg);
      margin-bottom: var(--spacing-xs);
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;

      > .tree-item__content {
        padding-left: var(--spacing-md);

        &:hover {
          border-radius: var(--radius-lg);
        }
      }

      > .tree-item__children {
        padding-bottom: var(--spacing-xs);
      }

      &[data-expanded='true'] > .tree-item__content:hover {
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
      }
    }

    &:focus-visible {
      outline: none;

      > .tree-item__content {
        outline: 2px solid var(--color-primary);
        outline-offset: -2px;
      }
    }

    &[data-disabled='true'] > .tree-item__content {
      opacity: 0.6;
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }

    &[data-expanded='true'] > .tree-item__content .tree-item__expand {
      transform: rotate(180deg);
    }

    &[data-dragging='true'] > .tree-item__content {
      opacity: 0.5;
    }

    &[data-drag-over='true'] > .tree-item__content {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: var(--tree-item-indent, 0);
        right: 0;
        height: 2px;
        background: var(--color-primary);
      }
    }

    .tree-item__drag-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      color: var(--color-neutral-400);
      padding: var(--spacing-xs);
      margin: calc(-1 * var(--spacing-xs));
      border-radius: var(--radius-sm);
      flex-shrink: 0;
      transition:
        color 150ms ease,
        background-color 150ms ease;

      &:hover {
        color: var(--color-neutral-500);
        background-color: var(--color-neutral-200);
      }
    }

    .tree-item__indent {
      width: 0;
      flex-shrink: 0;
    }

    .tree-item__checkbox {
      flex-shrink: 0;
    }

    .tree-item__slots-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      gap: var(--spacing-sm);
      min-width: 0;
    }

    .tree-item__label {
      flex: 1;
      font-size: var(--text-sm);
      color: var(--color-neutral-500);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tree-item__meta {
      font-size: var(--text-sm);
      color: var(--color-neutral-400);
      flex-shrink: 0;
    }

    .tree-item__expand {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      border: none;
      background: transparent;
      border-radius: var(--radius-sm);
      cursor: pointer;
      color: var(--color-neutral-400);
      flex-shrink: 0;
      margin-left: auto;
      transition:
        color 150ms ease,
        background-color 150ms ease,
        transform 200ms ease-out;

      &:hover {
        background-color: var(--color-neutral-200);
        color: var(--color-neutral-500);
      }

      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: -2px;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

    .tree-item__expand-placeholder {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
    }

    .tree-item__children {
      display: block;
      width: 100%;

      &[hidden] {
        display: none;
      }
    }
  }
}
</style>
