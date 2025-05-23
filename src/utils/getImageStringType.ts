import type { ImageStringType } from '@/types';
import { getImageMime } from './getImageMime';

export const getImageStringType = async (
  data: string,
): Promise<ImageStringType | undefined> => {
  if (!data) {
    return undefined;
  }

  // Check if the string is a base64 encoded image
  const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
  if (base64Regex.test(data)) {
    const mime = await getImageMime(data);
    return Promise.resolve(mime ? { type: 'base64', mime } : undefined);
  }

  // Check if the string is a URL
  try {
    new URL(data);
    return Promise.resolve({ type: 'url', mime: undefined });
  } catch {
    return Promise.resolve({ type: undefined, mime: undefined });
  }
};
