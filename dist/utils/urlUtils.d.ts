/**
 * Revoke multiple object URLs and clear the array
 * @param urls Array of object URLs to revoke
 */
export declare function revokeObjectURLs(urls: string[]): void;
/**
 * Create an object URL for a given file
 * @param file File to create an object URL for
 * @returns Object URL string
 */
export declare function createObjectURL(file: File): string;
