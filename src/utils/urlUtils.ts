/**
 * Revoke multiple object URLs and clear the array
 * @param urls Array of object URLs to revoke
 */
export function revokeObjectURLs(urls: string[]): void {
  const URL = globalThis.URL;
  urls.forEach(URL.revokeObjectURL);
}

/**
 * Create an object URL for a given file
 * @param file File to create an object URL for
 * @returns Object URL string
 */
export function createObjectURL(file: File): string {
  const URL = globalThis.URL;
  return URL.createObjectURL(file);
}
