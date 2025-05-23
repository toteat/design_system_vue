import { describe, it, expect } from 'vitest';
import { getImageStringType } from '../getImageStringType';

describe('getImageStringType', () => {
  it('returns undefined for empty string', async () => {
    expect(await getImageStringType('')).toBeUndefined();
  });

  it('returns base64 type and mime for data url', async () => {
    const str = 'data:image/png;base64,abcd';
    expect(await getImageStringType(str)).toEqual({
      type: 'base64',
      mime: 'png',
    });
  });

  it('returns undefined for base64 with no mime', async () => {
    const str = 'data:image/;base64,abcd';
    expect(await getImageStringType(str)).toBeUndefined();
  });

  it('returns url type for valid url', async () => {
    expect(await getImageStringType('https://foo.com/bar.png')).toEqual({
      type: 'url',
      mime: undefined,
    });
  });

  it('returns undefined type for invalid url', async () => {
    expect(await getImageStringType('not a url')).toEqual({
      type: undefined,
      mime: undefined,
    });
  });
});
