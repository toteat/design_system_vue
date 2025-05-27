import { ALLOWED_TYPES_MAP } from '@/constants';
import type { AllowedFileTypes } from '@/types';

/**
 * Validates files against allowed file types
 * @param files FileList to validate
 * @param allowedFileTypesKey Key from AllowedFileTypes
 * @returns Filtered valid files
 */
export async function validateFileTypes(
  files: FileList,
  allowedFileTypesKey: AllowedFileTypes,
): Promise<File[]> {
  const allowedTypes = ALLOWED_TYPES_MAP[allowedFileTypesKey].types;
  const prefix = ALLOWED_TYPES_MAP[allowedFileTypesKey].prefix;

  // Convert FileList to array, handling different possible input types
  const fileArray = Array.from(files).filter(Boolean);

  const validFiles = fileArray.filter((file) => {
    if (!file || !(file instanceof File)) {
      console.warn('Invalid file object:', file);
      return false;
    }

    // Check MIME type or file extension
    const mimeTypeMatch = file.type.startsWith(`${prefix}/`);
    const extensionMatch = allowedTypes.some(
      (type) =>
        file.type.includes(type) ||
        file.name.toLowerCase().endsWith(`.${type}`),
    );

    const isValid = mimeTypeMatch || extensionMatch;

    return isValid;
  });

  return validFiles;
}

/**
 * Checks if a single file is of an allowed type
 * @param file File to validate
 * @param allowedFileTypesKey Key from AllowedFileTypes
 * @returns Boolean indicating if file type is allowed
 */
export function isFileTypeAllowed(
  file: File,
  allowedFileTypesKey: AllowedFileTypes,
): boolean {
  const allowedTypes = ALLOWED_TYPES_MAP[allowedFileTypesKey].types;
  const prefix = ALLOWED_TYPES_MAP[allowedFileTypesKey].prefix;

  // Check MIME type or file extension
  const mimeTypeMatch = file.type.startsWith(`${prefix}/`);
  const extensionMatch = allowedTypes.some(
    (type) =>
      file.type.includes(type) || file.name.toLowerCase().endsWith(`.${type}`),
  );

  return mimeTypeMatch || extensionMatch;
}
