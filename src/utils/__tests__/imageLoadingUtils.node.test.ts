import { describe, it, expect, vi } from 'vitest';
import {
  loadImageType,
  resetImageState,
  handleBase64Image,
  handleUrlImage,
} from '../imageLoadingUtils';

const base64Png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';
const invalidBase64 = 'data:image/png;base64,invalidbase64string';
const imageUrl = 'https://example.com/image.png';

// Mock dependencies
vi.mock('../base64Utils', async () => {
  const actual = await vi.importActual('../base64Utils');
  return {
    ...actual,
    isBase64: (str: string) => str.startsWith('data:image/'),
    isValidBase64: async (str: string) => str !== invalidBase64,
  };
});
vi.mock('../getImageStringType', async () => {
  return {
    getImageStringType: async (str: string) => {
      if (str === base64Png) return { type: 'base64', mime: 'png' };
      if (str === imageUrl) return { type: 'url', mime: undefined };
      return undefined;
    },
  };
});
vi.mock('../imageSourceUtils', async () => {
  return {
    computeImageSource: (src: string) => src,
  };
});

describe('imageLoadingUtils', () => {
  it('resetImageState resets state', () => {
    const imageTypeInfoReset = { value: { type: 'url', mime: 'png' } as const };
    const isLoading = { value: true };
    const computedImageSrc = { value: 'foo' };
    resetImageState(imageTypeInfoReset, isLoading, computedImageSrc);
    expect(imageTypeInfoReset.value).toBeNull();
    expect(isLoading.value).toBe(false);
    expect(computedImageSrc.value).toBeUndefined();
  });

  it('handleBase64Image sets info and src for valid base64', async () => {
    const imageTypeInfo = { value: null };
    const computedImageSrc = { value: undefined };
    await handleBase64Image(base64Png, imageTypeInfo, computedImageSrc);
    expect(imageTypeInfo.value).toEqual({ type: 'base64', mime: 'png' });
    expect(computedImageSrc.value).toBe(base64Png);
  });

  it('handleBase64Image throws for invalid base64', async () => {
    const imageTypeInfo = { value: null };
    const computedImageSrc = { value: undefined };
    await expect(
      handleBase64Image(invalidBase64, imageTypeInfo, computedImageSrc),
    ).rejects.toThrow('Invalid base64 string');
  });

  it('handleBase64Image throws for missing mime', async () => {
    const imageTypeInfo = { value: null };
    const computedImageSrc = { value: undefined };
    // getImageStringType returns undefined
    await expect(
      handleBase64Image(
        'data:image/png;base64,xxx',
        imageTypeInfo,
        computedImageSrc,
      ),
    ).rejects.toThrow('Invalid image MIME type');
  });

  it('handleUrlImage sets info and src for url', async () => {
    const imageTypeInfo = { value: null };
    const computedImageSrc = { value: undefined };
    await handleUrlImage(imageUrl, imageTypeInfo, computedImageSrc);
    expect(imageTypeInfo.value).toEqual({ type: 'url', mime: undefined });
    expect(computedImageSrc.value).toBe(imageUrl);
  });

  it('loadImageType resets state if no imageSrc', async () => {
    const imageTypeInfoLoad = { value: { type: 'url', mime: 'png' } as const };
    const isLoading = { value: true };
    const hasError = { value: false };
    const isBase64Image = { value: false };
    const computedImageSrc = { value: 'foo' };
    await loadImageType(
      undefined,
      imageTypeInfoLoad,
      isLoading,
      hasError,
      isBase64Image,
      computedImageSrc,
    );
    expect(imageTypeInfoLoad.value).toBeNull();
    expect(isLoading.value).toBe(false);
    expect(computedImageSrc.value).toBeUndefined();
  });

  it('loadImageType handles base64', async () => {
    const imageTypeInfo = { value: null };
    const isLoading = { value: false };
    const hasError = { value: false };
    const isBase64Image = { value: false };
    const computedImageSrc = { value: undefined };
    await loadImageType(
      base64Png,
      imageTypeInfo,
      isLoading,
      hasError,
      isBase64Image,
      computedImageSrc,
    );
    expect(isBase64Image.value).toBe(true);
    expect(imageTypeInfo.value).toEqual({ type: 'base64', mime: 'png' });
    expect(computedImageSrc.value).toBe(base64Png);
  });

  it('loadImageType handles url', async () => {
    const imageTypeInfo = { value: null };
    const isLoading = { value: false };
    const hasError = { value: false };
    const isBase64Image = { value: false };
    const computedImageSrc = { value: undefined };
    await loadImageType(
      imageUrl,
      imageTypeInfo,
      isLoading,
      hasError,
      isBase64Image,
      computedImageSrc,
    );
    expect(isBase64Image.value).toBe(false);
    expect(imageTypeInfo.value).toEqual({ type: 'url', mime: undefined });
    expect(computedImageSrc.value).toBe(imageUrl);
  });

  it('loadImageType sets error on exception', async () => {
    const imageTypeInfo = { value: null };
    const isLoading = { value: false };
    const hasError = { value: false };
    const isBase64Image = { value: false };
    const computedImageSrc = { value: undefined };
    // cause handleBase64Image to throw
    await loadImageType(
      invalidBase64,
      imageTypeInfo,
      isLoading,
      hasError,
      isBase64Image,
      computedImageSrc,
    );
    expect(hasError.value).toBe(true);
    expect(isLoading.value).toBe(false);
  });
});
