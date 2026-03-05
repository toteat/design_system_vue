import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Header from '../Header.vue';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    headers: {
      control: 'object',
      description: 'Array of header items with title and optional description',
    },
    spaceBetween: {
      control: 'boolean',
      description:
        'Apply justify-content: space-between to the header container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    headers: [
      {
        title: 'Header 1',
        description: 'Description 1',
      },
      {
        title: 'Header 2',
        description: 'Description 2',
      },
      {
        title: 'Header 3',
        description: 'Description 3',
      },
    ],
  },
};

export const SingleHeader: Story = {
  args: {
    headers: [
      {
        title: 'Single Header',
        description: 'This is a single header item',
      },
    ],
  },
};

export const WithoutDescriptions: Story = {
  args: {
    headers: [
      {
        title: 'Header 1',
      },
      {
        title: 'Header 2',
      },
      {
        title: 'Header 3',
      },
    ],
  },
};

export const MixedContent: Story = {
  args: {
    headers: [
      {
        title: 'With Description',
        description: 'This header has a description',
      },
      {
        title: 'Without Description',
      },
      {
        title: 'Another With',
        description: 'Another description here',
      },
    ],
  },
};

export const ManyHeaders: Story = {
  args: {
    headers: [
      {
        title: 'Column 1',
        description: 'First column',
      },
      {
        title: 'Column 2',
        description: 'Second column',
      },
      {
        title: 'Column 3',
        description: 'Third column',
      },
      {
        title: 'Column 4',
        description: 'Fourth column',
      },
      {
        title: 'Column 5',
        description: 'Fifth column',
      },
    ],
  },
};

export const SpaceBetween: Story = {
  args: {
    headers: [
      {
        title: 'Header 1',
        description: 'Description 1',
      },
      {
        title: 'Header 2',
        description: 'Description 2',
      },
      {
        title: 'Header 3',
        description: 'Description 3',
      },
    ],
    spaceBetween: true,
  },
};

export const LongContent: Story = {
  args: {
    headers: [
      {
        title: 'This is a very long header title',
        description:
          'This is a very long description that might wrap to multiple lines',
      },
      {
        title: 'Short',
        description: 'Brief',
      },
      {
        title: 'Medium Length Title',
        description: 'A medium length description text',
      },
    ],
  },
};
