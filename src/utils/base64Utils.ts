import { IMAGE_TYPES } from '@/constants';

// Cache for regex patterns to avoid recreating them
const BASE64_PATTERN = /^[A-Za-z0-9+/=]+$/;
const DATA_URL_PREFIX = 'data:image/';
const DATA_URL_REGEX = /^data:image\/([a-z]+);base64,(.+)$/i;

// isValidBase64 for non-worker usage
export const isValidBase64 = async (str: string): Promise<boolean> => {
  if (!str) {
    return false;
  }

  try {
    // Check if it's a data URL
    if (str.startsWith(DATA_URL_PREFIX)) {
      // Use regex to parse data URL
      const match = str.match(DATA_URL_REGEX);
      if (!match) {
        return false;
      }

      // Extract MIME type and base64 content
      const mimeType = match[1].toLowerCase();
      const base64 = match[2];

      // Check if MIME type is valid
      if (!IMAGE_TYPES.includes(mimeType)) {
        return false;
      }

      // Validate base64 part
      if (!base64 || base64.length === 0) {
        return false;
      }

      // Strict base64 validation
      const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
      if (!base64Regex.test(base64)) {
        return false;
      }

      // Validate base64 padding
      const paddingLength = base64.length % 4;
      if (paddingLength === 1) {
        return false;
      }

      try {
        // Attempt to decode
        window.atob(base64);
        return true;
      } catch {
        return false;
      }
    }

    // Check if it's a raw base64 string
    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
    if (!base64Regex.test(str)) {
      return false;
    }

    // Validate base64 padding
    const paddingLength = str.length % 4;
    if (paddingLength === 1) {
      return false;
    }

    try {
      // Attempt to decode
      window.atob(str);
      return true;
    } catch {
      return false;
    }
  } catch {
    return false;
  }
};

export const isBase64 = (imageSrc: string): boolean => {
  if (!imageSrc) {
    return false;
  }

  // Quick check for data URL
  if (imageSrc.startsWith(DATA_URL_PREFIX)) {
    const match = imageSrc.match(DATA_URL_REGEX);
    if (!match) {
      return false;
    }
    const mimeType = match[1];
    return IMAGE_TYPES.includes(mimeType.toLowerCase());
  }

  // Only run regex test if string looks like base64
  if (imageSrc.length % 4 === 0 && BASE64_PATTERN.test(imageSrc)) {
    return true;
  }

  return false;
};
