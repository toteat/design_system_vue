<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue';
import { validateFileTypes } from '@/utils/fileTypeUtils';
import { getFilePreview } from '@/utils/filePreviewUtils';
import { revokeObjectURLs } from '@/utils/urlUtils';
import { getAllowedMimeTypes, ALLOWED_TYPES_MAP } from '@/constants';
import type {
  FileList,
  HTMLInputElement,
  DragEvent,
  Event,
  DropZoneProps,
  FileWithPreview,
} from '@/types';
import Icon from '../Icon/Icon.vue';
import ImagePreview from '../ImagePreview/ImagePreview.vue';
import Button from '../Button/Button.vue';

const props = withDefaults(
  defineProps<
    DropZoneProps & {
      modelValue?: FileWithPreview[] | null;
    }
  >(),
  {
    allowedFileTypes: 'images',
    multiple: true,
    accept: '',
    label: 'Haz click o arrastra un archivo para subir',
    displayPreview: true,
    displayFileList: false,
    modelValue: () => [],
  },
);

if (!props.instanceName || props.instanceName.trim() === '') {
  console.error('Missing or empty DropZone instanceName prop');
}

/**
 * DropZone Component
 *
 * Emits:
 * - `{instanceName}-drop`: Fired when files are successfully dropped or selected
 *   Payload: FileList of accepted files
 *
 * - `{instanceName}-drop-error`: Fired when there's an error with file selection
 *   Payload: Error message string
 *
 * - `{instanceName}-remove`: Fired when a file is removed from the preview
 *   Payload: Removed FileWithPreview object
 *
 * @example
 * // Parent component usage
 * <DropZone
 *   instance-name="avatar-upload"
 *   @avatar-upload-drop="handleDrop"
 *   @avatar-upload-drop-error="handleError"
 *   @avatar-upload-remove="handleRemove"
 * />
 */
const emit = defineEmits<{
  /**
   * Emitted when files are successfully dropped or selected
   * @param files List of accepted files
   */
  (e: `${string}-drop`, files: FileList): void;

  /**
   * Emitted when there's an error with file selection
   * @param message Error description
   */
  (e: `${string}-drop-error`, message: string): void;

  /**
   * Emitted when a file is removed from the preview
   * @param file Removed file details
   */
  (e: `${string}-remove`, file: FileWithPreview): void;

  (e: 'update:modelValue', files: FileWithPreview[] | null): void;
}>();

const isDragging = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const isProcessing = ref(false);
const previewFiles = ref<FileWithPreview[]>(props.modelValue || []);

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    previewFiles.value = newValue || [];
  },
  { deep: true },
);

// Watch for internal changes to previewFiles and emit updates
watch(
  previewFiles,
  (newFiles) => {
    emit('update:modelValue', newFiles);
  },
  { deep: true },
);

/**
 * IMPORTANT:
 * The user should always have a visual feedback of the files being uploaded.
 * If displayPreview and displayFileList are both false, the list of files will be displayed anyway.
 * This behavior is intentional and not a bug.
 */
const shouldDisplayFileList = computed(() => {
  return (
    (props.displayFileList ||
      (!props.displayPreview && !props.displayFileList)) &&
    previewFiles.value.length > 0
  );
});

const computedAccept = computed(() => {
  return {
    mime: getAllowedMimeTypes(props.allowedFileTypes),
    extensions: ALLOWED_TYPES_MAP[props.allowedFileTypes]?.types ?? [],
  };
});

async function processFiles(files: FileList): Promise<void> {
  if (isProcessing.value) return;

  try {
    isProcessing.value = true;
    const validFiles = await validateFileTypes(files, props.allowedFileTypes);

    if (validFiles.length > 0) {
      const isImageType = props.allowedFileTypes === 'images';
      const processedFiles: FileWithPreview[] = await Promise.all(
        validFiles.map(async (file) => ({
          file,
          name: file.name,
          preview: await getFilePreview(file, isImageType),
        })),
      );

      // Append new files to existing ones or replace based on multiple prop
      previewFiles.value = props.multiple
        ? [...previewFiles.value, ...processedFiles]
        : processedFiles;

      emit(`${props.instanceName}-drop`, files);
    } else {
      emit(
        `${props.instanceName}-drop-error`,
        `No files match the allowed types: ${props.allowedFileTypes}`,
      );
    }
  } catch (error) {
    emit(
      `${props.instanceName}-drop-error`,
      error instanceof Error ? error.message : 'An unknown error occurred',
    );
  } finally {
    isProcessing.value = false;
  }
}

function onDragOver(event: DragEvent) {
  event.preventDefault();
  isDragging.value = true;
}

function onDragLeave(event: DragEvent) {
  event.preventDefault();
  isDragging.value = false;
}

async function onDrop(event: DragEvent) {
  event.preventDefault();
  isDragging.value = false;

  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    await processFiles(files);
  }
}

function onClick() {
  inputRef.value?.click();
}

async function onFileChange(event: Event) {
  const { files } = event.target as HTMLInputElement;

  if (files && files.length > 0) {
    await processFiles(files);
    (event.target as HTMLInputElement).value = ''; // Reset input
  }
}

function removeFile(index: number) {
  const removedFile = previewFiles.value[index];

  // Revoke the specific object URL
  if (removedFile?.preview) {
    revokeObjectURLs([removedFile.preview]);
  }

  // Remove the file from the array
  previewFiles.value.splice(index, 1);

  // Emit remove event with the removed file
  if (removedFile) {
    emit(`${props.instanceName}-remove`, removedFile);
  }
}

// Expose methods for parent component interaction
defineExpose({
  /**
   * Get all currently processed files
   * @returns Array of FileWithPreview
   */
  getFiles: () => previewFiles.value,

  /**
   * Clear all files
   */
  clearFiles: () => {
    const currentFiles = [...previewFiles.value];
    // Revoke all current preview URLs
    revokeObjectURLs(currentFiles.map((f) => f.preview));
    previewFiles.value = [];
  },

  /**
   * Add files programmatically
   * @param files FileList or File[]
   */
  addFiles: async (files: FileList | globalThis.File[]) => {
    await processFiles(files as FileList);
  },
});

// Cleanup object URLs when component is unmounted
onUnmounted(() => {
  const previews = previewFiles.value.map((file) => file.preview);
  revokeObjectURLs(previews);
  previewFiles.value = [];
});
</script>

<template>
  <Button
    v-if="!instanceName"
    :type="'text'"
    size="large"
    iconName="warning-outline"
    iconPosition="left"
    :text="`Missing or empty DropZone instanceName prop`"
  />
  <div class="tot-ds-root drop-zone-container" v-else>
    <!-- Image Previews for selected files -->
    <div
      v-if="displayPreview && previewFiles.length > 0"
      class="image-preview-grid"
    >
      <button
        v-for="(file, index) in previewFiles"
        :key="index"
        @click.stop="removeFile(index)"
      >
        <ImagePreview
          :key="index"
          :imageSrc="file.preview"
          :width="70"
          :height="70"
          :borderRadius="8"
          alt="Uploaded file preview"
        />
        <Icon name="delete-outline" :size="1" color="gray-400" />
      </button>
    </div>

    <div
      class="drop-zone"
      :class="{
        'drop-zone--dragging': isDragging,
        'drop-zone--processing': isProcessing,
      }"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      @click="onClick"
      :tabindex="0"
      role="button"
      :aria-label="props.label"
    >
      <Icon name="cloud-upload-outline" :size="3" />
      <input
        ref="inputRef"
        type="file"
        class="drop-zone__input"
        :multiple="props.multiple"
        :accept="computedAccept?.mime"
        @change="onFileChange"
        :tabindex="-1"
        aria-hidden="true"
      />
      <strong class="drop-zone__label">{{ props.label }}</strong>
      <p class="drop-zone__description">
        <span v-if="computedAccept" class="drop-zone__file-types">
          ({{ computedAccept.extensions.join(', ') }})
        </span>
      </p>
    </div>
    <div v-if="shouldDisplayFileList" class="drop-zone__file-list">
      <Button
        v-for="(file, index) in previewFiles"
        :key="index"
        class="drop-zone__file-item"
        @click.stop="removeFile(index)"
        :type="'outline'"
        :typeButton="'button'"
        size="small"
        iconName="delete-outline"
        :text="file.name"
      />
    </div>
  </div>
</template>

<style scoped>
.tot-ds-root {
  &.drop-zone-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100%;

    .image-preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
      grid-auto-rows: auto;
      grid-gap: 1.5rem;
      width: 100%;
      justify-items: center;

      button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.125rem 0.125rem 0.5rem 0.125rem;
        border-radius: 0.5rem;
        transition-property: fill, transform, background-color, padding;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        background-color: transparent;

        svg {
          transition-property: fill, transform, color;
          transition-duration: 0.2s;
          transition-timing-function: ease-in-out;
        }

        &:hover {
          background-color: var(--color-gray-100);
          transform: scale(1.25);

          svg {
            fill: var(--color-primary);
          }
        }
      }
    }

    .drop-zone {
      border: 0.125rem dashed var(--color-neutral-300, #ccc);
      border-radius: 0.5rem;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition:
        border-color 0.2s,
        background 0.2s,
        opacity 0.2s;
      background: var(--color-neutral-100, #fafafa);
      outline: none;
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
      &:hover {
        opacity: 0.5;
      }

      .tot-ds-root.btn:hover:not(:disabled) {
        opacity: 1;
      }
    }
    .drop-zone__file-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .drop-zone--dragging {
      border-color: var(--color-primary-500, #007bff);
      background: var(--color-primary-50, #e6f0ff);
    }
    .drop-zone--processing {
      opacity: 0.6;
      cursor: wait;
    }
    .drop-zone__input {
      display: none;
    }
    .drop-zone__browse {
      color: var(--color-primary-500, #007bff);
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
