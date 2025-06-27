<script setup lang="ts">
import { ref, watch, shallowRef } from 'vue';
import { loadImageType } from '@/utils/imageLoadingUtils';
import type { ImagePreviewProps, ImageStringType } from '@/types';
import SkeletonPreload from '../SkeletonPreload/SkeletonPreload.vue';
import Icon from '../Icon/Icon.vue';
import { isBase64 } from '@/utils/base64Utils';
const URL = globalThis.URL;

const props = withDefaults(defineProps<ImagePreviewProps>(), {
  width: 40,
  height: 40,
  alt: 'Image without alt text',
  imageSrc: '',
  borderRadius: 8,
});

const isLoading = ref(true);
const hasError = ref(false);
const isBase64Image = ref(false);
const imageTypeInfo = shallowRef<ImageStringType | null>(null);
const computedImageSrc = ref<string | undefined>(undefined);

// Update your watcher to handle empty source
watch(
  () => props.imageSrc,
  async (newSrc) => {
    if (!newSrc) {
      hasError.value = true;
      isLoading.value = false;

      return;
    }

    // If not a valid URL and not base64, mark as error
    let isValid = false;
    try {
      // Try to parse as URL
      new URL(newSrc);
      isValid = true;
    } catch {
      // Not a valid URL, check base64
      isValid = isBase64(newSrc);
    }

    if (!isValid) {
      hasError.value = true;
      isLoading.value = false;

      return;
    }

    await loadImageType(
      newSrc,
      imageTypeInfo,
      isLoading,
      hasError,
      isBase64Image,
      computedImageSrc,
    );
  },
  { immediate: true },
);

// Add this watch for base64 images
watch([computedImageSrc, isBase64Image], ([src, isBase64]) => {
  if (src && isBase64) {
    // For base64 images, skip waiting for load event
    isLoading.value = false;
  }
});
</script>

<template>
  <div
    class="tot-ds-root image-preview"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: `${borderRadius}px`,
    }"
  >
    <!-- Base64 image display -->
    <img
      v-if="computedImageSrc && !hasError && isBase64Image"
      :src="computedImageSrc"
      :alt="props.alt"
      :width="width"
      :height="height"
      decoding="async"
    />

    <!-- URL-based image display -->
    <img
      v-else-if="computedImageSrc && !hasError"
      :src="computedImageSrc"
      :alt="props.alt"
      :width="width"
      :height="height"
      decoding="async"
      loading="lazy"
      :class="{ 'visually-hidden': isLoading }"
      @error="hasError = true"
      @load="isLoading = false"
    />

    <!-- Loading state -->
    <SkeletonPreload
      v-if="isLoading && !isBase64Image && !hasError"
      :width="width"
      :height="height"
    />

    <!-- Error state -->
    <Icon
      name="error-outline"
      :size="4"
      color="neutral-300"
      v-if="hasError"
      class="image-preview__error"
    />
  </div>
</template>

<style scoped>
.tot-ds-root {
  &.image-preview {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-neutral-100);
    border-radius: var(--border-radius);
    overflow: hidden;
  }
}

.tot-ds-root img {
  object-fit: cover;
}

.tot-ds-root .image-preview__loading {
  width: 100%;
  height: 100%;
}

.tot-ds-root .image-preview__error {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-neutral-100);
  color: var(--color-red);

  & > .tot-ds-root.icon {
    width: 60%;
    height: 60%;
  }
}

.tot-ds-root .visually-hidden {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}
</style>
