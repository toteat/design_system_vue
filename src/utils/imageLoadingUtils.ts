import type { ImageStringType } from '@/types';
import { isBase64, isValidBase64 } from './base64Utils';
import { useImageStringTypeDetector } from './useImageStringType';
import { computeImageSource } from './imageSourceUtils';
import { useWebWorkerFn } from '@vueuse/core';

const WORKER_DATA_URL_PREFIX = 'data:image/';
const WORKER_BASE64_PATTERN = /^[A-Za-z0-9+/=]+$/;
const WORKER_MIME_PATTERN = /^data:image\/([a-zA-Z]+);base64,/i;

export function workerAtobPolyfill(str: string): string {
  try {
    if (typeof window !== 'undefined' && typeof window.atob === 'function') {
      return window.atob(str);
    }
    return Buffer.from(str, 'base64').toString('binary');
  } catch {
    return '';
  }
}

export function workerIsValidBase64(str: string): boolean {
  if (!str) {
    return false;
  }

  try {
    if (str.startsWith(WORKER_DATA_URL_PREFIX)) {
      const base64 = str.split(',')[1];
      return base64 && WORKER_BASE64_PATTERN.test(base64)
        ? workerAtobPolyfill(base64) !== null
        : false;
    }
    return WORKER_BASE64_PATTERN.test(str) && workerAtobPolyfill(str) !== null;
  } catch {
    return false;
  }
}

export function workerGetImageStringType(data: string) {
  if (!data) {
    return undefined;
  }

  try {
    if (data.startsWith(WORKER_DATA_URL_PREFIX)) {
      const match = data.match(WORKER_MIME_PATTERN);
      if (!match) {
        return undefined;
      }
      const mime = match[1].toLowerCase();
      return { type: 'base64' as const, mime };
    }

    new URL(data);
    return { type: 'url' as const, mime: undefined };
  } catch {
    return { type: undefined, mime: undefined };
  }
}

export function workerComputeImageSource(
  imageSrc: string | undefined,
  imageTypeInfo: {
    type: 'base64' | 'url' | undefined;
    mime: string | undefined;
  },
): string | undefined {
  if (!imageSrc || !imageTypeInfo) {
    return undefined;
  }

  if (imageTypeInfo.type === 'base64') {
    return imageSrc.startsWith(WORKER_DATA_URL_PREFIX)
      ? imageSrc
      : `${WORKER_DATA_URL_PREFIX}${imageTypeInfo.mime};base64,${imageSrc}`;
  }

  return imageSrc;
}

// Reset all state variables to their initial values
export const resetImageState = (
  imageTypeInfo: { value: ImageStringType | null },
  isLoading: { value: boolean },
  computedImageSrc: { value: string | undefined },
) => {
  imageTypeInfo.value = null;
  isLoading.value = false;
  computedImageSrc.value = undefined;
};

// Handle base64 image processing and validation
export const handleBase64Image = async (
  imageSrc: string,
  imageTypeInfo: { value: ImageStringType | null },
  computedImageSrc: { value: string | undefined },
) => {
  const { getImageStringType } = useImageStringTypeDetector();

  // Validate base64 string format
  const isValid = await isValidBase64(imageSrc);
  if (!isValid) {
    console.warn('Base64 validation failed for:', imageSrc);

    // Try to get image type info even if validation fails
    const typeInfo = await getImageStringType(imageSrc);

    if (!typeInfo || !typeInfo.mime) {
      console.error('Unable to process base64 image:', imageSrc);
      throw new Error(`Invalid base64 string: ${imageSrc}`);
    }

    // If we have a valid MIME type, we might still be able to process the image
    imageTypeInfo.value = typeInfo;
    computedImageSrc.value = computeImageSource(imageSrc, imageTypeInfo.value);
    return;
  }

  // Get image type information with MIME type
  const typeInfo = await getImageStringType(imageSrc);

  if (!typeInfo) {
    console.error('Type info detection completely failed for:', imageSrc);
    throw new Error(`Unable to detect image type: ${imageSrc}`);
  }

  if (!typeInfo.mime) {
    console.error('MIME type detection failed for:', imageSrc);
    throw new Error(`Invalid image MIME type: ${imageSrc}`);
  }

  // Set image type info and compute source
  imageTypeInfo.value = typeInfo;
  computedImageSrc.value = computeImageSource(imageSrc, imageTypeInfo.value);
};

// Handle URL image processing
export const handleUrlImage = async (
  imageSrc: string,
  imageTypeInfo: { value: ImageStringType | null },
  computedImageSrc: { value: string | undefined },
) => {
  const { getImageStringType } = useImageStringTypeDetector();

  // Get image type information
  const typeInfo = await getImageStringType(imageSrc);
  imageTypeInfo.value = typeInfo ?? null;

  // Compute final image source
  computedImageSrc.value = computeImageSource(imageSrc, imageTypeInfo.value);
};

// Main function to load and process image
export const loadImageType = async (
  imageSrc: string | undefined,
  imageTypeInfo: { value: ImageStringType | null },
  isLoading: { value: boolean },
  hasError: { value: boolean },
  isBase64Image: { value: boolean },
  computedImageSrc: { value: string | undefined },
) => {
  // Handle case when no image source is provided
  if (!imageSrc) {
    resetImageState(imageTypeInfo, isLoading, computedImageSrc);

    return;
  }

  try {
    // Reset loading and error states
    isLoading.value = true;
    hasError.value = false;

    // Check if the image is in base64 format
    isBase64Image.value = isBase64(imageSrc);
    if (isBase64Image.value) {
      try {
        await handleBase64Image(imageSrc, imageTypeInfo, computedImageSrc);
      } catch (error) {
        hasError.value = true;
        isLoading.value = false;
        console.error('Failed to load base64 image:', error);
      }
      // Keep loading true for base64 images until the image is actually loaded
      // The @load event on the img element will set it to false
      return;
    }

    // Process URL image
    await handleUrlImage(imageSrc, imageTypeInfo, computedImageSrc);
    // For URL images, keep loading true until the image is actually loaded
    // The @load event on the img element will set it to false
  } catch (error) {
    // Handle any errors during image processing
    hasError.value = true;
    isLoading.value = false;
    console.error('Failed to load image type:', error);
  }
};

// Web Worker composable for handling base64 images
export function useBase64ImageHandler() {
  const { workerFn, workerStatus } = useWebWorkerFn(
    async (imageSrc: string) => {
      const isValid = workerIsValidBase64(imageSrc);
      if (!isValid) {
        throw new Error('Invalid base64 string');
      }

      // Get image type information with MIME type
      const typeInfo = workerGetImageStringType(imageSrc);
      if (!typeInfo || !typeInfo.mime) {
        throw new Error('Invalid image MIME type');
      }

      return {
        typeInfo,
        computedSrc: workerComputeImageSource(imageSrc, typeInfo),
      };
    },
    { timeout: 5000 },
  );

  return { handleBase64ImageInWorker: workerFn, workerStatus };
}
