import type { ImageStringType } from '@/types';
import { isBase64, isValidBase64 } from './base64Utils';
import { getImageStringType } from './getImageStringType';
import { computeImageSource } from './imageSourceUtils';

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
  // Validate base64 string format
  const isValid = await isValidBase64(imageSrc);
  if (!isValid) {
    throw new Error('Invalid base64 string');
  }

  // Get image type information with MIME type
  const typeInfo = await getImageStringType(imageSrc);
  if (!typeInfo || !typeInfo.mime) {
    throw new Error('Invalid image MIME type');
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
      await handleBase64Image(imageSrc, imageTypeInfo, computedImageSrc);
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
