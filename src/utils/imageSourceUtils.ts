import type { ImageStringType } from '@/types';

// Cache for data URL prefix to avoid string concatenation
const DATA_URL_PREFIX = 'data:image/';

export const computeImageSource = (
  imageSrc: string | undefined,
  imageTypeInfo: ImageStringType | null,
): string | undefined => {
  if (!imageSrc || !imageTypeInfo) {
    return undefined;
  }

  // Format base64 image with proper data URL prefix if needed
  if (imageTypeInfo.type === 'base64') {
    return imageSrc.startsWith(DATA_URL_PREFIX)
      ? imageSrc
      : `${DATA_URL_PREFIX}${imageTypeInfo.mime};base64,${imageSrc}`;
  }

  // For URLs, return the original source
  return imageSrc;
};
