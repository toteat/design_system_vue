import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Table from '../Table.vue';
import Button from '../../Button/Button.vue';

// Row type used by stories
type TableRow = Record<string, string | number | undefined>;

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    striped: {
      control: 'boolean',
      description: 'Enable alternating row colors',
      defaultValue: false,
    },
  },
  args: {
    striped: false,
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
import { Table, Button } from '@toteat-eng/design-system-vue';

const handleEdit = (row: TableRow) => {
  console.log('Edit:', row);
  // Handle edit action
};

const handleDelete = (row: TableRow) => {
  console.log('Delete:', row);
  // Handle delete action
};

const columns = [
  { key: 'name', label: 'Name', sortable: true, sortType: 'text' },
  { key: 'email', label: 'Email', sortable: true, sortType: 'text' },
  { key: 'role', label: 'Role', sortable: true, sortType: 'text' },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'actions', label: 'Actions', sortable: false },
];

const data = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { name: 'Alice Williams', email: 'alice@example.com', role: 'Manager', status: 'Active' },
  { name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
];
</script>

<template>
  <Table :columns="columns" :data="data">
    <!-- Custom cell rendering for actions column -->
    <template #cell-actions="{ row }">
      <div style="display: flex; gap: 0.5rem;">
        <Button
          text="Edit"
          variant="secondary"
          size="tiny"
          @click="handleEdit(row)"
        />
        <Button
          text="Delete"
          variant="tertiary"
          size="tiny"
          @click="handleDelete(row)"
        />
      </div>
    </template>
  </Table>
</template>`,
      },
    },
  },
  render: (args) => ({
    components: { Table, Button },
    setup() {
      const handleEdit = (row: TableRow) => {
        console.log('Edit:', row);
        alert(`Edit: ${String(row.name)}`);
      };

      const handleDelete = (row: TableRow) => {
        console.log('Delete:', row);
        alert(`Delete: ${String(row.name)}`);
      };

      const columns = [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
          sortType: 'text' as const,
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
          sortType: 'text' as const,
        },
        {
          key: 'role',
          label: 'Role',
          sortable: true,
          sortType: 'text' as const,
        },
        { key: 'status', label: 'Status', sortable: false },
        { key: 'actions', label: 'Actions', sortable: false },
      ];

      const data = [
        {
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          status: 'Active',
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'User',
          status: 'Active',
        },
        {
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'User',
          status: 'Inactive',
        },
        {
          name: 'Alice Williams',
          email: 'alice@example.com',
          role: 'Manager',
          status: 'Active',
        },
        {
          name: 'Charlie Brown',
          email: 'charlie@example.com',
          role: 'User',
          status: 'Active',
        },
      ];

      return { args, columns, data, handleEdit, handleDelete };
    },
    template: `
      <Table :columns="columns" :data="data" v-bind="args">
        <template #cell-actions="{ row }">
          <div style="display: flex; gap: 0.5rem;">
            <Button
              text="Edit"
              variant="secondary"
              size="tiny"
              @click="handleEdit(row)"
            />
            <Button
              text="Delete"
              variant="tertiary"
              size="tiny"
              @click="handleDelete(row)"
            />
          </div>
        </template>
      </Table>
    `,
  }),
};

export const Striped: Story = {
  args: {
    striped: true,
    columns: [
      { key: 'product', label: 'Product' },
      { key: 'category', label: 'Category' },
      { key: 'price', label: 'Price' },
      { key: 'stock', label: 'Stock' },
    ],
    data: [
      {
        product: 'Laptop',
        category: 'Electronics',
        price: '$999',
        stock: '15',
      },
      { product: 'Mouse', category: 'Accessories', price: '$29', stock: '150' },
      {
        product: 'Keyboard',
        category: 'Accessories',
        price: '$79',
        stock: '85',
      },
      {
        product: 'Monitor',
        category: 'Electronics',
        price: '$299',
        stock: '42',
      },
      { product: 'Webcam', category: 'Electronics', price: '$89', stock: '67' },
      {
        product: 'Headset',
        category: 'Accessories',
        price: '$59',
        stock: '120',
      },
    ],
  },
};

export const MinimalData: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'title', label: 'Title' },
    ],
    data: [
      { id: '1', title: 'First Item' },
      { id: '2', title: 'Second Item' },
    ],
  },
};

export const LargeDataset: Story = {
  args: {
    striped: true,
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'department', label: 'Department' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'location', label: 'Location' },
    ],
    data: Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Employee ${i + 1}`,
      department: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'][i % 5],
      email: `employee${i + 1}@company.com`,
      phone: `+1 (555) ${String(i).padStart(3, '0')}-${String(i * 10).padStart(4, '0')}`,
      location: ['New York', 'San Francisco', 'Austin', 'Seattle', 'Boston'][
        i % 5
      ],
    })),
  },
};

export const WithSorting: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name', sortable: true, sortType: 'text' },
      { key: 'age', label: 'Age', sortable: true, sortType: 'number' },
      { key: 'email', label: 'Email', sortable: true, sortType: 'text' },
      { key: 'joinDate', label: 'Join Date', sortable: true, sortType: 'date' },
      { key: 'status', label: 'Status', sortable: false },
    ],
    data: [
      {
        name: 'John Doe',
        age: 32,
        email: 'john@example.com',
        joinDate: '2023-05-15',
        status: 'Active',
      },
      {
        name: 'Jane Smith',
        age: 28,
        email: 'jane@example.com',
        joinDate: '2024-01-20',
        status: 'Active',
      },
      {
        name: 'Bob Johnson',
        age: 45,
        email: 'bob@example.com',
        joinDate: '2022-11-10',
        status: 'Inactive',
      },
      {
        name: 'Alice Williams',
        age: 35,
        email: 'alice@example.com',
        joinDate: '2023-08-03',
        status: 'Active',
      },
      {
        name: 'Charlie Brown',
        age: 29,
        email: 'charlie@example.com',
        joinDate: '2024-03-12',
        status: 'Active',
      },
      {
        name: 'Diana Prince',
        age: 41,
        email: 'diana@example.com',
        joinDate: '2022-06-25',
        status: 'Active',
      },
    ],
    defaultSortColumn: 'name',
    defaultSortOrder: 'asc',
  },
};

export const WithActions: Story = {
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
import { Table, Button } from '@toteat-eng/design-system-vue';

const handleEdit = (row: TableRow) => {
  console.log('Edit:', row);
};

const handleDelete = (row: TableRow) => {
  console.log('Delete:', row);
};

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'actions', label: 'Actions' },
];

const data = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];
</script>

<template>
  <Table :columns="columns" :data="data">
    <template #cell-actions="{ row }">
      <div style="display: flex; gap: 0.5rem;">
        <Button
          text="Edit"
          variant="secondary"
          size="tiny"
          @click="handleEdit(row)"
        />
        <Button
          text="Delete"
          variant="tertiary"
          size="tiny"
          @click="handleDelete(row)"
        />
      </div>
    </template>
  </Table>
</template>`,
      },
    },
  },
  render: (args) => ({
    components: { Table, Button },
    setup() {
      const handleEdit = (row: TableRow) => {
        console.log('Edit:', row);
        alert(`Edit: ${String(row.name)}`);
      };

      const handleDelete = (row: TableRow) => {
        console.log('Delete:', row);
        alert(`Delete: ${String(row.name)}`);
      };

      const columns = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'actions', label: 'Actions' },
      ];

      const data = [
        { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
        { name: 'Alice Williams', email: 'alice@example.com', role: 'Manager' },
      ];

      return { args, columns, data, handleEdit, handleDelete };
    },
    template: `
      <Table :columns="columns" :data="data" v-bind="args">
        <template #cell-actions="{ row }">
          <div style="display: flex; gap: 0.5rem;">
            <Button
              text="Edit"
              variant="secondary"
              size="tiny"
              @click="handleEdit(row)"
            />
            <Button
              text="Delete"
              variant="tertiary"
              size="tiny"
              @click="handleDelete(row)"
            />
          </div>
        </template>
      </Table>
    `,
  }),
};
