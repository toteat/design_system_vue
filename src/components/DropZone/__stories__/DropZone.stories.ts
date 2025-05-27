import type { Meta, StoryObj } from '@storybook/vue3';
import DropZone from '../DropZone.vue';

const meta: Meta<typeof DropZone> = {
  title: 'Components/DropZone',
  component: DropZone,
  argTypes: {
    instanceName: {
      control: 'text',
      description: 'Unique identifier for the dropzone instance',
      defaultValue: 'default-dropzone',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types (extensions or MIME types)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the drop zone',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DropZone>;

export const Default: Story = {
  args: {
    instanceName: 'default-upload',
    label: 'Drag & drop files here, or browse',
    multiple: true,
  },
};

export const SingleImageUpload: Story = {
  args: {
    instanceName: 'single-image-upload',
    multiple: false,
    label: 'Select an image',
  },
};

export const MultipleImageUploadOnly: Story = {
  args: {
    instanceName: 'multiple-images',
    allowedFileTypes: 'images',
    label: 'Upload multiple image files only',
  },
};

export const VideoUploadOnly: Story = {
  args: {
    instanceName: 'video-upload',
    allowedFileTypes: 'video',
    label: 'Upload video files only',
  },
};

export const CSVUploadOnly: Story = {
  args: {
    instanceName: 'csv-upload',
    allowedFileTypes: 'text',
    accept: '.csv',
    label: 'Upload CSV files only',
  },
  parameters: {
    docs: {
      description: {
        story:
          'You can download a [sample CSV file for testing here](data:text/csv;charset=utf-8,Año,Marca,Modelo,Descripción,Precio%0A1997,Ford,E350,"ac, ABS, moon",3000.00%0A1999,Chevy,Venture,Extended Edition,4900.00%0A1999,Chevy,Venture,"Extended Edition, Very Large",5000.00%0A1996,Jeep,Grand Cherokee,"MUST SELL! air, moon roof, loaded",4799.00)',
      },
    },
  },
};

export const CustomLabel: Story = {
  args: {
    instanceName: 'custom-label-upload',
    label: 'Custom message here',
  },
};

export const MissingInstanceName: Story = {
  args: {
    instanceName: '',
  },
};
