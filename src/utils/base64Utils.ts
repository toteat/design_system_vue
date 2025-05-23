// Cache for regex patterns to avoid recreating them
const BASE64_PATTERN = /^[A-Za-z0-9+/=]+$/;
const DATA_URL_PREFIX = 'data:image/';

export const isValidBase64 = async (str: string): Promise<boolean> => {
  if (!str) {
    return false;
  }

  try {
    // Check if it's a data URL
    if (str.startsWith(DATA_URL_PREFIX)) {
      const base64 = str.split(',')[1];
      return base64 ? window.atob(base64) !== null : false;
    }
    // Check if it's a raw base64 string
    return window.atob(str) !== null;
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
    return true;
  }

  // Only run regex test if string looks like base64
  if (imageSrc.length % 4 === 0 && BASE64_PATTERN.test(imageSrc)) {
    return true;
  }

  return false;
};
