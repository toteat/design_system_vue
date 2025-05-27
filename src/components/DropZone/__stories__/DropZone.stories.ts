import type { Meta, StoryObj } from '@storybook/vue3';
import DropZone from '../DropZone.vue';

const meta = {
  title: 'Components/DropZone',
  component: DropZone,
  tags: ['autodocs'],
  argTypes: {
    instanceName: {
      control: 'text',
      description: 'Unique identifier for the DropZone instance',
    },
    allowedFileTypes: {
      control: 'select',
      options: ['images', 'video', 'text'],
      description: 'Types of files allowed to be uploaded',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple files can be uploaded',
    },
    accept: {
      control: 'text',
      description: 'Custom accept string for file input',
    },
    label: {
      control: 'text',
      description: 'Custom label text for the DropZone',
    },
    displayPreview: {
      control: 'boolean',
      description: 'Whether to display image previews',
    },
    displayFileList: {
      control: 'boolean',
      description: 'Whether to display file list',
    },
  },
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

// Image variants
export const SingleImage: Story = {
  args: {
    instanceName: 'single-image-dropzone',
    allowedFileTypes: 'images',
    multiple: false,
    displayPreview: true,
    displayFileList: false,
    label: 'Upload a single image (PNG, JPG, GIF)',
  },
};

export const MultipleImages: Story = {
  args: {
    instanceName: 'multiple-images-dropzone',
    allowedFileTypes: 'images',
    multiple: true,
    displayPreview: true,
    displayFileList: false,
    label: 'Upload multiple images (PNG, JPG, GIF)',
  },
};

// Video variants
export const SingleVideo: Story = {
  args: {
    instanceName: 'single-video-dropzone',
    allowedFileTypes: 'video',
    multiple: false,
    displayPreview: false,
    displayFileList: true,
    label: 'Upload a single video file (MP4, WebM)',
  },
};

export const MultipleVideos: Story = {
  args: {
    instanceName: 'multiple-videos-dropzone',
    allowedFileTypes: 'video',
    multiple: true,
    displayPreview: false,
    displayFileList: true,
    label: 'Upload multiple video files (MP4, WebM)',
  },
};

// Text variants
export const SingleText: Story = {
  args: {
    instanceName: 'single-text-dropzone',
    allowedFileTypes: 'text',
    multiple: false,
    displayPreview: false,
    displayFileList: true,
    label: 'Upload a single text file (TXT, CSV)',
  },
};

export const MultipleText: Story = {
  args: {
    instanceName: 'multiple-text-dropzone',
    allowedFileTypes: 'text',
    multiple: true,
    displayPreview: false,
    displayFileList: true,
    label: 'Upload multiple text files (TXT, CSV)',
  },
};
