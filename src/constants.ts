import type { AllowedFileTypes } from './types';

export const ALLOWED_TYPES_MAP: Record<
  AllowedFileTypes,
  { types: string[]; prefix: string }
> = {
  images: {
    types: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'heif'],
    prefix: 'image',
  },
  video: {
    types: ['mp4', 'mov', 'webm'],
    prefix: 'video',
  },
  text: {
    types: ['csv'],
    prefix: 'text',
  },
};

export const IMAGE_TYPES = ALLOWED_TYPES_MAP.images.types;
export const VIDEO_TYPES = ALLOWED_TYPES_MAP.video.types;
export const TEXT_TYPES = ALLOWED_TYPES_MAP.text.types;

export const ALLOWED_MIME_TYPES: Record<AllowedFileTypes, string> =
  Object.entries(ALLOWED_TYPES_MAP).reduce(
    (acc, [key, config]) => ({
      ...acc,
      [key]: config.types.map((type) => `${config.prefix}/${type}`).join(','),
    }),
    {} as Record<AllowedFileTypes, string>,
  );

export const getAllowedMimeTypes = (fileType: AllowedFileTypes): string => {
  return ALLOWED_MIME_TYPES[fileType];
};
