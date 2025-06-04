import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import DropZone from '../DropZone.vue';
import type { FileWithPreview } from '@/types';
import type { DropZoneProps } from '@/types';

// Wrapper component to demonstrate event handling
const DropZoneWrapper = defineComponent({
  components: { DropZone },
  props: {
    instanceName: {
      type: String,
      required: true,
    },
    allowedFileTypes: {
      type: String,
      default: 'images',
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    displayPreview: {
      type: Boolean,
      default: true,
    },
    displayFileList: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup(props: DropZoneProps) {
    // Reactive state to track events and files
    const uploadedFiles = ref<FileWithPreview[]>([]);
    const errorMessage = ref<string>('');
    const removedFile = ref<{ name: string } | null>(null);
    const lastEventType = ref<string>('');
    const uploadStatus = ref<'idle' | 'uploading' | 'success' | 'error'>(
      'idle',
    );

    // New reactive state for modal
    const isModalOpen = ref(false);
    const modalContent = ref('');

    // Type the dropZoneRef with the exposed methods
    const dropZoneRef = ref<{
      getFiles: () => FileWithPreview[];
      clearFiles: () => void;
      addFiles: (files: FileList | File[]) => Promise<void>;
    } | null>(null);

    // Method to generate event names
    const getEventName = (suffix: string) => {
      return `${props.instanceName}-${suffix}`;
    };

    // Simulated file upload method
    const uploadFiles = async () => {
      // Check if there are files to upload
      if (uploadedFiles.value.length === 0) {
        errorMessage.value = 'No files to upload';
        return;
      }

      try {
        // Start upload process
        uploadStatus.value = 'uploading';

        // Create FormData for file upload
        const formData = new FormData();
        uploadedFiles.value.forEach((fileWithPreview, index) => {
          // Append each file to FormData
          formData.append(
            `file_${index}`,
            fileWithPreview.file,
            fileWithPreview.name,
          );
        });

        // Prepare data for modal display
        const uploadData = {
          files: uploadedFiles.value.map((fileWithPreview) => ({
            name: fileWithPreview.name,
            size: fileWithPreview.file.size,
            type: fileWithPreview.file.type,
            lastModified: fileWithPreview.file.lastModified,
          })),
          formDataKeys: Array.from(formData.keys()),
        };

        // Update modal content with formatted data
        modalContent.value = JSON.stringify(uploadData, null, 2);

        // Open modal
        isModalOpen.value = true;

        // Simulated API call (replace with actual API endpoint)
        const response = await fetch('https://example.com/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        // Handle successful upload
        uploadStatus.value = 'success';
        lastEventType.value = 'files-uploaded';
      } catch (error) {
        // Handle upload error
        uploadStatus.value = 'error';
        errorMessage.value =
          error instanceof Error
            ? error.message
            : 'An unknown error occurred during upload';
      }
    };

    // Method to clear files programmatically
    const clearFiles = () => {
      if (dropZoneRef.value) {
        dropZoneRef.value.clearFiles();
      }
    };

    // Method to add files programmatically
    const addFiles = async () => {
      if (dropZoneRef.value) {
        // Create a mock FileList for demonstration
        const mockFile = new File(['mock content'], 'mock-file.txt', {
          type: 'text/plain',
        });
        await dropZoneRef.value.addFiles([mockFile]);
      }
    };

    // Method to close modal
    const closeModal = () => {
      // Close the modal
      isModalOpen.value = false;

      // Reset upload-related states
      uploadStatus.value = 'idle';
      lastEventType.value = '';
      errorMessage.value = '';
    };

    // Event handler for successful file drop
    const handleDrop = (files: FileList) => {
      // Record the event type
      lastEventType.value = getEventName('drop');

      // Demonstrate file list access
      console.log(
        'Uploaded Files:',
        Array.from(files).map((f) => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
      );
    };

    // Event handler for drop errors
    const handleError = (message: string) => {
      // Store error message
      errorMessage.value = message;

      // Record the event type
      lastEventType.value = getEventName('drop-error');

      // Log the error
      console.error('Drop Error:', message);
    };

    // Event handler for file removal
    const handleRemove = (file: FileWithPreview) => {
      // Store removed file info
      removedFile.value = { name: file.name };

      // Record the event type
      lastEventType.value = getEventName('remove');

      // Log removed file
      console.log('Removed File:', file.name);
    };

    return {
      uploadedFiles,
      errorMessage,
      removedFile,
      lastEventType,
      uploadStatus,
      getEventName,
      handleDrop,
      handleError,
      handleRemove,
      uploadFiles,

      // New modal-related returns
      isModalOpen,
      modalContent,
      closeModal,

      // New programmatic file management methods
      dropZoneRef,
      clearFiles,
      addFiles,
    };
  },
  template: `
    <div class="dropzone-wrapper" style="max-width: 600px; margin: 0 auto; position: relative;">
      <DropZone
        ref="dropZoneRef"
        :instance-name="instanceName"
        :allowed-file-types="allowedFileTypes"
        :multiple="multiple"
        :display-preview="displayPreview"
        :display-file-list="displayFileList"
        :label="label"
        v-model="uploadedFiles"
        @[getEventName('drop')]="handleDrop"
        @[getEventName('drop-error')]="handleError"
        @[getEventName('remove')]="handleRemove"
      />

      <div style="display: flex; gap: 1rem; margin-top: 1rem;">
        <button @click="uploadFiles" :disabled="uploadedFiles.length === 0">
          Upload Files
        </button>
        <button @click="clearFiles">
          Clear Files
        </button>
        <button @click="addFiles">
          Add Mock File
        </button>
      </div>

      <h2 style="margin-top: 2rem; color: #333;">Elements below are only for testing purposes</h2>
      <!-- Uploaded Files Section -->
      <div v-if="uploadedFiles.length > 0" class="uploaded-files" style="
        margin-top: 1rem;
        padding: 1rem;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        background-color: #f5f5f5;
      ">
        <h3 style="margin: 0 0 0.5rem 0; color: #333;">Uploaded Files</h3>

        <!-- Event Tracking Section -->
      <div class="event-log" style="
        margin-top: 1rem;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #f9f9f9;
      ">
        <h3 style="margin: 0 0 0.5rem 0; color: #333;">Event Tracking</h3>

        <div style="margin-bottom: 0.5rem;">
          <strong>Last Event:</strong>
          <span :style="{
            color: lastEventType.includes('drop-error') ? 'red' :
                   lastEventType.includes('remove') ? 'orange' :
                   lastEventType.includes('uploaded') ? 'green' : 'blue'
          }">
            {{ lastEventType || 'No events yet' }}
          </span>
        </div>

        <div v-if="errorMessage" style="color: red; margin-top: 0.5rem;">
          <strong>Error:</strong> {{ errorMessage }}
        </div>

        <div v-if="removedFile" style="color: orange; margin-top: 0.5rem;">
          <strong>Removed File:</strong> {{ removedFile.name }}
        </div>
      </div>

        <!-- Upload Button -->
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        ">
          <strong>{{ uploadedFiles.length }} file(s) selected</strong>
          <button
            @click="uploadFiles"
            :disabled="uploadStatus === 'uploading'"
            style="
              background-color: #28a745;
              color: white;
              border: none;
              padding: 0.5rem 1rem;
              border-radius: 4px;
              cursor: pointer;
              display: flex;
              align-items: center;
            "
          >
            <span style="margin-right: 0.5rem;">🚀</span>
            {{ uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Files' }}
          </button>
        </div>

        <div class="file-list">
          <div
            v-for="file in uploadedFiles"
            :key="file.name"
            class="file-item"
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0.5rem;
              background-color: white;
              border: 1px solid #ddd;
              margin-bottom: 0.5rem;
              border-radius: 4px;
            "
          >
            <div class="file-info">
              <strong>{{ file.name }}</strong>
              <small style="color: #666; margin-left: 0.5rem;">
                ({{ (file.file.size / 1024).toFixed(2) }} KB, {{ file.file.type }})
              </small>
            </div>
          </div>
        </div>
      </div>

      <!-- Native HTML Modal -->
      <dialog
        :open="isModalOpen"
        style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          max-width: 600px;
          max-height: 80%;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          background-color: white;
          overflow: auto;
        "
      >
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        ">
          <h2 style="margin: 0; color: #333;">Upload Data Preview</h2>
          <button
            @click="closeModal"
            style="
              background-color: #dc3545;
              color: white;
              border: none;
              padding: 0.5rem 1rem;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            Close
          </button>
        </div>

        <pre style="
          background-color: #f4f4f4;
          padding: 1rem;
          border-radius: 4px;
          white-space: pre-wrap;
          word-wrap: break-word;
          font-family: monospace;
          max-height: 400px;
          overflow: auto;
          color: black;
          font-size: 0.9rem;
          line-height: 1.5;
        ">{{ modalContent }}</pre>
      </dialog>


    </div>
  `,
});

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

export const Default: Story = {
  render: (args) => ({
    components: { DropZoneWrapper },
    setup() {
      return { args };
    },
    template: '<DropZoneWrapper v-bind="args" />',
  }),
  args: {
    instanceName: 'multiple-images-dropzone',
    allowedFileTypes: 'images',
    multiple: true,
    displayPreview: true,
    displayFileList: true,
    label: 'Upload multiple images',
  },
};

// Image variants with different display combinations
export const SingleImageWithPreview: Story = {
  render: (args) => ({
    components: { DropZoneWrapper },
    setup() {
      return { args };
    },
    template: '<DropZoneWrapper v-bind="args" />',
  }),
  args: {
    instanceName: 'single-image-dropzone',
    allowedFileTypes: 'images',
    multiple: false,
    displayPreview: true,
    displayFileList: false,
    label: 'Upload a single image (PNG, JPG, GIF)',
  },
};

export const SingleImageWithFileList: Story = {
  render: (args) => ({
    components: { DropZoneWrapper },
    setup() {
      return { args };
    },
    template: '<DropZoneWrapper v-bind="args" />',
  }),
  args: {
    instanceName: 'single-image-dropzone',
    allowedFileTypes: 'images',
    multiple: false,
    displayPreview: false,
    displayFileList: true,
    label: 'Upload a single image (PNG, JPG, GIF)',
  },
};

export const MultipleImagesWithPreview: Story = {
  render: (args) => ({
    components: { DropZoneWrapper },
    setup() {
      return { args };
    },
    template: '<DropZoneWrapper v-bind="args" />',
  }),
  args: {
    instanceName: 'multiple-images-dropzone',
    allowedFileTypes: 'images',
    multiple: true,
    displayPreview: true,
    displayFileList: false,
    label: 'Upload multiple images (PNG, JPG, GIF)',
  },
};

export const MultipleImagesWithFileList: Story = {
  render: (args) => ({
    components: { DropZoneWrapper },
    setup() {
      return { args };
    },
    template: '<DropZoneWrapper v-bind="args" />',
  }),
  args: {
    instanceName: 'multiple-images-dropzone',
    allowedFileTypes: 'images',
    multiple: true,
    displayPreview: false,
    displayFileList: true,
    label: 'Upload multiple images (PNG, JPG, GIF)',
  },
};

// Video variants with different display combinations
export const SingleVideoWithFileList: Story = {
  render: (args) => ({
    components: { DropZoneWrapper },
    setup() {
      return { args };
    },
    template: '<DropZoneWrapper v-bind="args" />',
  }),
  args: {
    instanceName: 'single-video-dropzone',
    allowedFileTypes: 'video',
    multiple: false,
    displayPreview: false,
    displayFileList: true,
    label: 'Upload a single video file (MP4, WebM)',
  },
};

export const MultipleVideosWithFileList: Story = {
  render: (args) => ({
    components: { DropZoneWrapper },
    setup() {
      return { args };
    },
    template: '<DropZoneWrapper v-bind="args" />',
  }),
  args: {
    instanceName: 'multiple-videos-dropzone',
    allowedFileTypes: 'video',
    multiple: true,
    displayPreview: false,
    displayFileList: true,
    label: 'Upload multiple video files (MP4, WebM)',
  },
};

// Text variants with different display combinations
export const SingleTextWithFileList: Story = {
  render: (args) => ({
    components: { DropZoneWrapper },
    setup() {
      return { args };
    },
    template: '<DropZoneWrapper v-bind="args" />',
  }),
  args: {
    instanceName: 'single-text-dropzone',
    allowedFileTypes: 'text',
    multiple: false,
    displayPreview: false,
    displayFileList: true,
    label: 'Upload a single text file (TXT, CSV)',
  },
};

export const MultipleTextWithFileList: Story = {
  render: (args) => ({
    components: { DropZoneWrapper },
    setup() {
      return { args };
    },
    template: '<DropZoneWrapper v-bind="args" />',
  }),
  args: {
    instanceName: 'multiple-text-dropzone',
    allowedFileTypes: 'text',
    multiple: true,
    displayPreview: false,
    displayFileList: true,
    label: 'Upload multiple text files (TXT, CSV)',
  },
};
