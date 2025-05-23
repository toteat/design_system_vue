import { describe, it, expect } from 'vitest';
import { getImageMime } from '../getImageMime';

describe('getImageMime', () => {
  it('should extract mime type from base64 data', async () => {
    const base64Data =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    const result = await getImageMime(base64Data);
    expect(result).toBe('image/png');
  });

  it('should return undefined for non-base64 data', async () => {
    const nonBase64Data = 'https://example.com/image.jpg';
    const result = await getImageMime(nonBase64Data);
    expect(result).toBeUndefined();
  });

  it('should return undefined for invalid base64 format', async () => {
    const invalidBase64 = 'data:invalid-format';
    const result = await getImageMime(invalidBase64);
    expect(result).toBeUndefined();
  });

  it('should handle empty string', async () => {
    const result = await getImageMime('');
    expect(result).toBeUndefined();
  });

  it('should handle different image types', async () => {
    const testCases = [
      { input: 'data:image/jpeg;base64,', expected: 'image/jpeg' },
      { input: 'data:image/gif;base64,', expected: 'image/gif' },
      { input: 'data:image/webp;base64,', expected: 'image/webp' },
      { input: 'data:image/svg+xml;base64,', expected: 'image/svg+xml' },
    ];

    for (const { input, expected } of testCases) {
      const result = await getImageMime(input);
      expect(result).toBe(expected);
    }
  });
});
