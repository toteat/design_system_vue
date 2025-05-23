import { describe, it, expect } from 'vitest';
import { isBase64, isValidBase64 } from '../base64Utils';

describe('base64Utils', () => {
  it('returns false for empty string', async () => {
    expect(isBase64('')).toBe(false);
    expect(await isValidBase64('')).toBe(false);
  });

  it('detects data URL as base64', async () => {
    const str = 'data:image/png;base64,abcd';
    expect(isBase64(str)).toBe(true);
    expect(await isValidBase64(str)).toBe(true);
  });

  it('detects raw base64 string', async () => {
    // 8 chars, valid base64
    const str = 'YWJjZGVmZw==';
    expect(isBase64(str)).toBe(true);
    expect(await isValidBase64(str)).toBe(true);
  });

  it('returns false for invalid base64', async () => {
    expect(isBase64('notbase64')).toBe(false);
    expect(await isValidBase64('notbase64')).toBe(false);
  });

  it('returns false for bad data url', async () => {
    expect(await isValidBase64('data:image/png;base64,')).toBe(false);
  });

  it('returns false if atob throws', async () => {
    const orig = globalThis.atob;
    globalThis.atob = () => {
      throw new Error('bad');
    };
    expect(await isValidBase64('YWJjZGVmZw==')).toBe(false);
    globalThis.atob = orig;
  });
});
