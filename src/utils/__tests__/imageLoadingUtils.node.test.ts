import { describe, it, expect, vi } from 'vitest';
import {
  resetImageState,
  handleBase64Image,
  handleUrlImage,
  loadImageType,
  useBase64ImageHandler,
} from '../imageLoadingUtils';
import { useImageStringTypeDetector } from '../useImageStringType';
import type { ImageStringType } from '@/types';

// Mock dependencies
vi.mock('../useImageStringType', () => ({
  useImageStringTypeDetector: vi.fn(),
}));

describe('imageLoadingUtils', () => {
  // Mock state objects
  const createMockStateObjects = () => ({
    imageTypeInfo: { value: null } as { value: ImageStringType | null },
    isLoading: { value: false },
    hasError: { value: false },
    isBase64Image: { value: false },
    computedImageSrc: { value: undefined },
  });

  describe('resetImageState', () => {
    it('resets state objects to initial values', () => {
      const imageTypeInfo = {
        value: { type: 'base64', mime: 'png' } as ImageStringType,
      };
      const isLoading = { value: true };
      const computedImageSrc = { value: 'some-src' };

      resetImageState(imageTypeInfo, isLoading, computedImageSrc);

      expect(imageTypeInfo.value).toBeNull();
      expect(isLoading.value).toBe(false);
      expect(computedImageSrc.value).toBeUndefined();
    });
  });

  describe('handleBase64Image', () => {
    it('processes valid base64 image', async () => {
      // Mock dependencies
      const mockGetImageStringType = vi.fn().mockResolvedValue({
        type: 'base64',
        mime: 'png',
      });
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });

      const imageTypeInfo = { value: null } as {
        value: ImageStringType | null;
      };
      const computedImageSrc = { value: undefined };
      const validBase64 = 'data:image/png;base64,validBase64String';

      await handleBase64Image(validBase64, imageTypeInfo, computedImageSrc);

      expect(imageTypeInfo.value).toEqual({ type: 'base64', mime: 'png' });
      expect(computedImageSrc.value).toBe(validBase64);
    });

    it('handles invalid base64 image with valid MIME type', async () => {
      // Mock dependencies to simulate partial validation
      const mockGetImageStringType = vi.fn().mockResolvedValue({
        type: 'base64',
        mime: 'png',
      });
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });

      const imageTypeInfo = { value: null } as {
        value: ImageStringType | null;
      };
      const computedImageSrc = { value: undefined };
      const invalidBase64 = 'data:image/png;base64,invalidBase64String';

      await handleBase64Image(invalidBase64, imageTypeInfo, computedImageSrc);

      expect(imageTypeInfo.value).toEqual({ type: 'base64', mime: 'png' });
      expect(computedImageSrc.value).toBe(invalidBase64);
    });

    it('throws error for completely invalid base64 image', async () => {
      // Mock dependencies to simulate complete validation failure
      const mockGetImageStringType = vi.fn().mockResolvedValue(null);
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });

      const imageTypeInfo = { value: null } as {
        value: ImageStringType | null;
      };
      const computedImageSrc = { value: undefined };
      const invalidBase64 = 'invalid-base64';

      await expect(
        handleBase64Image(invalidBase64, imageTypeInfo, computedImageSrc),
      ).rejects.toThrow('Invalid base64 string');
    });
  });

  describe('handleUrlImage', () => {
    it('processes URL image', async () => {
      // Mock dependencies
      const mockGetImageStringType = vi.fn().mockResolvedValue({
        type: 'url',
        mime: undefined,
      });
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });

      const imageTypeInfo = { value: null } as {
        value: ImageStringType | null;
      };
      const computedImageSrc = { value: undefined };
      const url = 'https://example.com/image.jpg';

      await handleUrlImage(url, imageTypeInfo, computedImageSrc);

      expect(imageTypeInfo.value).toEqual({ type: 'url', mime: undefined });
      expect(computedImageSrc.value).toBe(url);
    });
  });

  describe('loadImageType', () => {
    it('handles undefined image source', async () => {
      const mockStateObjects = createMockStateObjects();

      await loadImageType(
        undefined,
        mockStateObjects.imageTypeInfo,
        mockStateObjects.isLoading,
        mockStateObjects.hasError,
        mockStateObjects.isBase64Image,
        mockStateObjects.computedImageSrc,
      );

      expect(mockStateObjects.imageTypeInfo.value).toBeNull();
      expect(mockStateObjects.isLoading.value).toBe(false);
      expect(mockStateObjects.computedImageSrc.value).toBeUndefined();
    });

    it('processes base64 image', async () => {
      // Mock dependencies
      const mockGetImageStringType = vi.fn().mockResolvedValue({
        type: 'base64',
        mime: 'png',
      });
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });

      const mockStateObjects = createMockStateObjects();
      const base64Image = 'data:image/png;base64,validBase64String';

      await loadImageType(
        base64Image,
        mockStateObjects.imageTypeInfo,
        mockStateObjects.isLoading,
        mockStateObjects.hasError,
        mockStateObjects.isBase64Image,
        mockStateObjects.computedImageSrc,
      );

      expect(mockStateObjects.isBase64Image.value).toBe(true);
      expect(mockStateObjects.isLoading.value).toBe(true);
      expect(mockStateObjects.hasError.value).toBe(false);
    });

    it('handles image loading error', async () => {
      // Mock dependencies to throw an error
      const mockGetImageStringType = vi
        .fn()
        .mockRejectedValue(new Error('Test error'));
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });

      const mockStateObjects = createMockStateObjects();
      const base64Image = 'data:image/png;base64,invalidBase64String';

      await loadImageType(
        base64Image,
        mockStateObjects.imageTypeInfo,
        mockStateObjects.isLoading,
        mockStateObjects.hasError,
        mockStateObjects.isBase64Image,
        mockStateObjects.computedImageSrc,
      );

      expect(mockStateObjects.isLoading.value).toBe(false);
      expect(mockStateObjects.hasError.value).toBe(true);
    });
  });

  describe('useBase64ImageHandler', () => {
    it('creates a web worker function for base64 image handling', () => {
      const { handleBase64ImageInWorker, workerStatus } =
        useBase64ImageHandler();

      expect(handleBase64ImageInWorker).toBeDefined();
      expect(workerStatus).toBeDefined();
    });
  });
});
