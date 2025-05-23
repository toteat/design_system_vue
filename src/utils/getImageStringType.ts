import type { ImageStringType } from '@/types';
import { isBase64 } from './base64Utils';

// Cache for regex pattern to avoid recreating it
const MIME_PATTERN = /^data:image\/([a-zA-Z]+);base64,/;

export const getImageStringType = async (
  data: string,
): Promise<ImageStringType | undefined> => {
  if (!data) {
    return undefined;
  }

  try {
    // Check if the string is a base64 encoded image
    if (isBase64(data)) {
      const match = data.match(MIME_PATTERN);
      const mime = match ? match[1] : undefined;
      return mime ? { type: 'base64', mime } : undefined;
    }

    // Check if the string is a URL
    new URL(data);
    return { type: 'url', mime: undefined };
  } catch {
    return { type: undefined, mime: undefined };
  }
};
