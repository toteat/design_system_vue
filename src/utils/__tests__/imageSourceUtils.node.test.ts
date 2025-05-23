import { describe, it, expect } from 'vitest';
import { computeImageSource } from '../imageSourceUtils';

describe('computeImageSource', () => {
  it('returns undefined if no imageSrc', () => {
    expect(
      computeImageSource(undefined, { type: 'base64', mime: 'png' }),
    ).toBeUndefined();
    expect(
      computeImageSource('', { type: 'base64', mime: 'png' }),
    ).toBeUndefined();
    expect(computeImageSource('foo', null)).toBeUndefined();
  });

  it('returns data url for base64 with prefix', () => {
    const src = 'data:image/png;base64,abcd';
    expect(computeImageSource(src, { type: 'base64', mime: 'png' })).toBe(src);
  });

  it('returns data url for base64 without prefix', () => {
    const src = 'abcd';
    expect(computeImageSource(src, { type: 'base64', mime: 'png' })).toBe(
      'data:image/png;base64,abcd',
    );
  });

  it('returns original for url', () => {
    const src = 'https://foo.com/bar.png';
    expect(computeImageSource(src, { type: 'url', mime: undefined })).toBe(src);
  });
});
