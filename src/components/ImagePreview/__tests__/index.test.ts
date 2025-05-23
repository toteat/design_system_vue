import { describe, it, expect } from 'vitest';
import * as entry from '../index';
import ImagePreview from '../ImagePreview.vue';

describe('ImagePreview index.ts', () => {
  it('should export ImagePreview', () => {
    expect(entry.ImagePreview).toBe(ImagePreview);
  });
});
