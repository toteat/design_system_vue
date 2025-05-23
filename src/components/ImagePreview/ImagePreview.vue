<script setup lang="ts">
import { ref, watch, shallowRef } from 'vue';
import { loadImageType } from '@/utils/imageLoadingUtils';
import type { ImagePreviewProps, ImageStringType } from '@/types';
import SkeletonPreload from '../SkeletonPreload/SkeletonPreload.vue';
import Icon from '../Icon/Icon.vue';

const props = withDefaults(defineProps<ImagePreviewProps>(), {
  width: 40,
  height: 40,
  alt: 'Image without alt text',
  imageSrc: '',
});

const isLoading = ref(true);
const hasError = ref(false);
const isBase64Image = ref(false);
const imageTypeInfo = shallowRef<ImageStringType | null>(null);
const computedImageSrc = ref<string | undefined>(undefined);

// Update your watcher to handle empty source
watch(
  () => props.imageSrc,
  (newSrc) => {
    hasError.value = false;
    isLoading.value = true;

    if (!newSrc) {
      hasError.value = true;
      isLoading.value = false;
      return;
    }

    loadImageType(
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
    class="image-preview"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <!-- Base64 image display -->
    <picture v-if="computedImageSrc && !hasError && isBase64Image">
      <img
        :src="computedImageSrc"
        :alt="props.alt"
        :width="width"
        :height="height"
        decoding="async"
      />
    </picture>

    <!-- URL-based image display -->
    <picture v-else-if="computedImageSrc && !hasError">
      <img
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
    </picture>

    <!-- Loading state -->
    <SkeletonPreload
      v-if="isLoading && !isBase64Image && !hasError"
      :width="width"
      :height="height"
      :borderRadius="16"
    />

    <!-- Error state -->
    <div v-if="hasError" class="image-preview__error">
      <Icon name="error-outline" :size="4" color="neutral-300" />
    </div>
  </div>
</template>

<style scoped>
.image-preview {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-neutral-100);
  border-radius: 16px;
  overflow: hidden;
}

img {
  object-fit: cover;
}

.image-preview__loading {
  width: 100%;
  height: 100%;
}

.image-preview__error {
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

.visually-hidden {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}
</style>
