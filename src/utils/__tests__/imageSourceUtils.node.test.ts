import { describe, it, expect } from 'vitest';
import { computeImageSource } from '../imageSourceUtils';

describe('imageSourceUtils', () => {
  describe('computeImageSource', () => {
    // Base64 image scenarios
    it('handles base64 data URLs with existing prefix', () => {
      const result = computeImageSource('data:image/png;base64,base64content', {
        type: 'base64',
        mime: 'png',
      });
      expect(result).toBe('data:image/png;base64,base64content');
    });

    it('adds prefix to base64 images without prefix', () => {
      const result = computeImageSource('base64content', {
        type: 'base64',
        mime: 'png',
      });
      expect(result).toBe('data:image/png;base64,base64content');
    });

    // URL scenarios
    it('returns original URL for URL type', () => {
      const url = 'https://example.com/image.jpg';
      const result = computeImageSource(url, { type: 'url', mime: undefined });
      expect(result).toBe(url);
    });

    // Edge cases
    it('handles undefined image source', () => {
      const result = computeImageSource(undefined, {
        type: undefined,
        mime: undefined,
      });
      expect(result).toBeUndefined();
    });

    it('handles undefined image type info', () => {
      const result = computeImageSource('some-source', null);
      expect(result).toBeUndefined();
    });

    it('handles undefined type', () => {
      const result = computeImageSource('some-source', null);
      expect(result).toBeUndefined();
    });
  });
});
