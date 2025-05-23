import { describe, it, expect } from 'vitest';
import { getImageStringType } from '../getImageStringType';

describe('getImageStringType', () => {
  it('should return undefined for empty input', async () => {
    const result = await getImageStringType('');
    expect(result).toBeUndefined();
  });

  it('should return undefined for null input', async () => {
    const result = await getImageStringType(null as unknown as string);
    expect(result).toBeUndefined();
  });

  it('should detect base64 image data', async () => {
    const base64Data =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    const result = await getImageStringType(base64Data);
    expect(result).toEqual({
      type: 'base64',
      mime: 'image/png',
    });
  });

  it('should detect URL', async () => {
    const url = 'https://example.com/image.jpg';
    const result = await getImageStringType(url);
    expect(result).toEqual({
      type: 'url',
      mime: undefined,
    });
  });

  it('should handle invalid URL', async () => {
    const invalidUrl = 'not-a-url';
    const result = await getImageStringType(invalidUrl);
    expect(result).toEqual({
      type: undefined,
      mime: undefined,
    });
  });

  it('should handle invalid base64 data', async () => {
    const invalidBase64 = 'data:image/png;base64,invalid';
    const result = await getImageStringType(invalidBase64);
    expect(result).toEqual({
      type: 'base64',
      mime: 'image/png',
    });
  });
});
