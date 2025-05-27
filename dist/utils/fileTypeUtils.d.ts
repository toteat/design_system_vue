import { AllowedFileTypes } from '../types';
/**
 * Validates files against allowed file types
 * @param files FileList to validate
 * @param allowedFileTypesKey Key from AllowedFileTypes
 * @returns Filtered valid files
 */
export declare function validateFileTypes(files: FileList, allowedFileTypesKey: AllowedFileTypes): Promise<File[]>;
/**
 * Checks if a single file is of an allowed type
 * @param file File to validate
 * @param allowedFileTypesKey Key from AllowedFileTypes
 * @returns Boolean indicating if file type is allowed
 */
export declare function isFileTypeAllowed(file: File, allowedFileTypesKey: AllowedFileTypes): boolean;
