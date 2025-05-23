import type { ImageMime } from '@/types';

export const getImageMime = async (data: string): Promise<ImageMime> => {
  const matches = data.match(/^data:(.+?);base64,/);
  return matches ? matches[1] : undefined;
};
