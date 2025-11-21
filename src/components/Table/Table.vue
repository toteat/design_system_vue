<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TableProps, TableSortOrder, TableColumnType } from '@/types';
import Icon from '../Icon/Icon.vue';
import Button from '../Button/Button.vue';

const props = withDefaults(defineProps<TableProps>(), {
  striped: false,
  defaultSortOrder: 'asc',
});

// If no defaultSortColumn is provided, use the first sortable column
const getInitialSortColumn = (): string | null => {
  if (props.defaultSortColumn) {
    return props.defaultSortColumn;
  }

  // Find first sortable column
  const firstSortable = props.columns.find((col) => col.sortable);
  return firstSortable ? firstSortable.key : null;
};

// Determine initial sort order
const getInitialSortOrder = (): TableSortOrder => {
  // If user explicitly set defaultSortOrder, use it
  if (props.defaultSortColumn && props.defaultSortOrder) {
    return props.defaultSortOrder;
  }

  // If no defaultSortColumn specified, first sortable column always starts with 'asc' (small-to-big)
  return 'asc';
};

const sortColumn = ref<string | null>(getInitialSortColumn());
const sortOrder = ref<TableSortOrder>(getInitialSortOrder());

const detectColumnType = (value: unknown): TableColumnType => {
  if (value === null || value === undefined) return 'text';

  // Check if it's a number
  if (typeof value === 'number' || !Number.isNaN(Number(value))) {
    return 'number';
  }

  // Check if it's a date
  const dateValue = new Date(value as string);
  if (
    !Number.isNaN(dateValue.getTime()) &&
    typeof value === 'string' &&
    /\d{4}-\d{2}-\d{2}/.test(value as string)
  ) {
    return 'date';
  }

  return 'text';
};

const handleSort = (columnKey: string) => {
  const column = props.columns.find((col) => col.key === columnKey);
  if (!column?.sortable) return;

  if (sortColumn.value === columnKey) {
    // Toggle sort order
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    // New column - set default sort order based on type
    sortColumn.value = columnKey;
    const firstValue = props.data[0]?.[columnKey];
    const columnType = column.sortType || detectColumnType(firstValue);

    // Default sort order based on type
    if (columnType === 'number') {
      sortOrder.value = 'desc'; // Big to small (arrow-up)
    } else if (columnType === 'date') {
      sortOrder.value = 'desc'; // Current to past (arrow-up)
    } else {
      sortOrder.value = 'asc'; // A to Z (arrow-down)
    }
  }
};

const sortedData = computed(() => {
  if (!sortColumn.value) return props.data;

  const column = props.columns.find((col) => col.key === sortColumn.value);
  if (!column) return props.data;

  const sorted = [...props.data].sort((a, b) => {
    const aValue = a[sortColumn.value!];
    const bValue = b[sortColumn.value!];

    // Handle null/undefined
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    const columnType = column.sortType || detectColumnType(aValue);

    let comparison = 0;

    if (columnType === 'number') {
      const aNum = Number(aValue);
      const bNum = Number(bValue);
      comparison = aNum - bNum;
    } else if (columnType === 'date') {
      const aDate = new Date(aValue as string).getTime();
      const bDate = new Date(bValue as string).getTime();
      comparison = aDate - bDate;
    } else {
      // Text comparison
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return sortOrder.value === 'asc' ? comparison : -comparison;
  });

  return sorted;
});
</script>

<template>
  <div class="tot-ds-root table-wrapper">
    <table class="table" :data-striped="striped">
      <thead class="table__header">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="table__header-cell"
            :class="{ 'table__header-cell--sortable': column.sortable }"
            @click="column.sortable ? handleSort(column.key) : null"
          >
            <div class="table__header-content">
              <span>{{ column.label }}</span>
              <span v-if="column.sortable" class="table__sort-icon">
                <!-- Active sort: use Button in icon-only mode with secondary variant -->
                <Button
                  v-if="sortColumn === column.key"
                  :icon-name="
                    sortOrder === 'asc'
                      ? 'arrow-down-outline'
                      : 'arrow-up-outline'
                  "
                  :only-icon="true"
                  variant="secondary"
                  size="tiny"
                  @click.stop="handleSort(column.key)"
                />
                <!-- Inactive sort: use Icon alone -->
                <Icon
                  v-else
                  name="arrow-down-outline"
                  :size="1"
                  color="neutral-300"
                />
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr
          v-for="(row, rowIndex) in sortedData"
          :key="rowIndex"
          class="table__row"
        >
          <td
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            class="table__cell"
          >
            <slot
              :name="`cell-${column.key}`"
              :row="row"
              :column="column"
              :value="row[column.key]"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.table-wrapper {
    width: 100%;
    overflow-x: auto;
  }

  & .table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--text-sm);
    color: var(--color-neutral-500);
  }

  & .table__header {
    background-color: var(--color-gray-100);
  }

  & .table__header-cell {
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 600;
    font-size: var(--text-sm);
    color: var(--color-neutral-500);
    border-bottom: 1px solid var(--color-gray-200);

    &.table__header-cell--sortable {
      cursor: pointer;
      user-select: none;
      transition: background-color 200ms ease-in-out;

      &:hover {
        background-color: var(--color-gray-200);
      }
    }
  }

  & .table__header-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: space-between;
  }

  & .table__sort-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  & .table__row {
    background-color: var(--color-white);
    transition: background-color 200ms ease-in-out;

    &:hover {
      background-color: var(--color-gray-100);
    }
  }

  & .table__cell {
    padding: 0.75rem 1rem;
    font-size: var(--text-sm);
    color: var(--color-neutral-500);
    border-bottom: 1px solid var(--color-gray-200);
  }

  & .table[data-striped='true'] {
    & .table__row:nth-child(even) {
      background-color: var(--color-gray-100);
    }
  }
}
</style>
