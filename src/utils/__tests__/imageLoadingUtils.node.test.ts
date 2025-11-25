import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as imageLoadingUtils from '../imageLoadingUtils';
import { useImageStringTypeDetector } from '../useImageStringType';
import { isBase64, isValidBase64 } from '../base64Utils';
import { computeImageSource } from '../imageSourceUtils';
import { useWebWorkerFn } from '@vueuse/core';
import type { ImageStringType } from '@/types';

vi.mock('../useImageStringType', () => ({
  useImageStringTypeDetector: vi.fn(),
}));

vi.mock('../base64Utils', () => ({
  isBase64: vi.fn(),
  isValidBase64: vi.fn(),
}));

vi.mock('../imageSourceUtils', () => ({
  computeImageSource: vi.fn(),
}));

vi.mock('@vueuse/core', () => ({
  useWebWorkerFn: vi.fn(),
}));

const {
  resetImageState,
  handleBase64Image,
  handleUrlImage,
  loadImageType,
  useBase64ImageHandler,
  workerAtobPolyfill,
  workerIsValidBase64,
  workerGetImageStringType,
  workerComputeImageSource,
} = imageLoadingUtils;

describe('imageLoadingUtils', () => {
  const createMockStateObjects = () => ({
    imageTypeInfo: { value: null } as { value: ImageStringType | null },
    isLoading: { value: false },
    hasError: { value: false },
    isBase64Image: { value: false },
    computedImageSrc: { value: undefined },
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (isBase64 as vi.Mock).mockReturnValue(false);
    (isValidBase64 as vi.Mock).mockResolvedValue(true);
    (computeImageSource as vi.Mock).mockReturnValue('computed-src');
    (useImageStringTypeDetector as vi.Mock).mockReturnValue({
      getImageStringType: vi.fn().mockResolvedValue({
        type: 'url',
        mime: undefined,
      }),
    });
    (useWebWorkerFn as vi.Mock).mockImplementation((fn) => ({
      workerFn: fn,
      workerStatus: { value: 'idle' },
    }));
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
      const mockGetImageStringType = vi.fn().mockResolvedValue({
        type: 'base64',
        mime: 'png',
      });
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });
      (computeImageSource as vi.Mock).mockReturnValue('formatted-base64');

      const imageTypeInfo = { value: null } as {
        value: ImageStringType | null;
      };
      const computedImageSrc = { value: undefined };
      const validBase64 = 'data:image/png;base64,valid';

      await handleBase64Image(validBase64, imageTypeInfo, computedImageSrc);

      expect(isValidBase64).toHaveBeenCalledWith(validBase64);
      expect(imageTypeInfo.value).toEqual({ type: 'base64', mime: 'png' });
      expect(computedImageSrc.value).toBe('formatted-base64');
      expect(computeImageSource).toHaveBeenCalledWith(
        validBase64,
        imageTypeInfo.value,
      );
    });

    it('falls back to detected MIME type when validation fails', async () => {
      (isValidBase64 as vi.Mock).mockResolvedValue(false);
      const mockGetImageStringType = vi.fn().mockResolvedValue({
        type: 'base64',
        mime: 'png',
      });
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });
      (computeImageSource as vi.Mock).mockReturnValue('fallback-src');

      const imageTypeInfo = { value: null } as {
        value: ImageStringType | null;
      };
      const computedImageSrc = { value: undefined };
      const invalidBase64 = 'data:image/png;base64,invalid';

      await handleBase64Image(invalidBase64, imageTypeInfo, computedImageSrc);

      expect(imageTypeInfo.value).toEqual({ type: 'base64', mime: 'png' });
      expect(computedImageSrc.value).toBe('fallback-src');
    });

    it('throws when validation fails and MIME cannot be inferred', async () => {
      (isValidBase64 as vi.Mock).mockResolvedValue(false);
      const mockGetImageStringType = vi.fn().mockResolvedValue(null);
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });

      const imageTypeInfo = { value: null } as {
        value: ImageStringType | null;
      };
      const computedImageSrc = { value: undefined };

      await expect(
        handleBase64Image('invalid', imageTypeInfo, computedImageSrc),
      ).rejects.toThrow('Invalid base64 string');
    });

    it('throws when type info cannot be detected after validation', async () => {
      const mockGetImageStringType = vi.fn().mockResolvedValue(null);
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });

      const imageTypeInfo = { value: null } as {
        value: ImageStringType | null;
      };
      const computedImageSrc = { value: undefined };

      await expect(
        handleBase64Image(
          'data:image/png;base64,valid',
          imageTypeInfo,
          computedImageSrc,
        ),
      ).rejects.toThrow('Unable to detect image type');
    });

    it('throws when MIME is missing after detection', async () => {
      const mockGetImageStringType = vi
        .fn()
        .mockResolvedValue({ type: 'base64', mime: undefined });
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });

      const imageTypeInfo = { value: null } as {
        value: ImageStringType | null;
      };
      const computedImageSrc = { value: undefined };

      await expect(
        handleBase64Image(
          'data:image/png;base64,valid',
          imageTypeInfo,
          computedImageSrc,
        ),
      ).rejects.toThrow('Invalid image MIME type');
    });
  });

  describe('handleUrlImage', () => {
    it('processes URL image and computes source', async () => {
      const mockGetImageStringType = vi.fn().mockResolvedValue({
        type: 'url',
        mime: undefined,
      });
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });
      (computeImageSource as vi.Mock).mockReturnValue('resolved-url');

      const imageTypeInfo = { value: null } as {
        value: ImageStringType | null;
      };
      const computedImageSrc = { value: undefined };

      await handleUrlImage(
        'https://example.com/image.jpg',
        imageTypeInfo,
        computedImageSrc,
      );

      expect(imageTypeInfo.value).toEqual({ type: 'url', mime: undefined });
      expect(computedImageSrc.value).toBe('resolved-url');
    });

    it('sets null metadata when detection fails', async () => {
      const mockGetImageStringType = vi.fn().mockResolvedValue(null);
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: mockGetImageStringType,
      });
      (computeImageSource as vi.Mock).mockReturnValue('url-src');

      const imageTypeInfo = {
        value: { type: 'url', mime: undefined } as ImageStringType | null,
      };
      const computedImageSrc = { value: undefined };

      await handleUrlImage(
        'https://example.com/image.jpg',
        imageTypeInfo,
        computedImageSrc,
      );

      expect(imageTypeInfo.value).toBeNull();
      expect(computedImageSrc.value).toBe('url-src');
    });
  });

  describe('loadImageType', () => {
    it('resets state when source is undefined', async () => {
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

    it('handles base64 path and keeps loading true until image load', async () => {
      (isBase64 as vi.Mock).mockReturnValue(true);
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: vi.fn().mockResolvedValue({
          type: 'base64',
          mime: 'png',
        }),
      });
      (computeImageSource as vi.Mock).mockReturnValue('base64-src');

      const mockStateObjects = createMockStateObjects();

      await loadImageType(
        'data:image/png;base64,valid',
        mockStateObjects.imageTypeInfo,
        mockStateObjects.isLoading,
        mockStateObjects.hasError,
        mockStateObjects.isBase64Image,
        mockStateObjects.computedImageSrc,
      );

      expect(mockStateObjects.imageTypeInfo.value).toEqual({
        type: 'base64',
        mime: 'png',
      });
      expect(mockStateObjects.computedImageSrc.value).toBe('base64-src');
      expect(mockStateObjects.isBase64Image.value).toBe(true);
      expect(mockStateObjects.isLoading.value).toBe(true);
      expect(mockStateObjects.hasError.value).toBe(false);
    });

    it('flags error when base64 handling throws', async () => {
      (isBase64 as vi.Mock).mockReturnValue(true);
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: vi.fn().mockResolvedValue(null),
      });

      const mockStateObjects = createMockStateObjects();

      await loadImageType(
        'data:image/png;base64,broken',
        mockStateObjects.imageTypeInfo,
        mockStateObjects.isLoading,
        mockStateObjects.hasError,
        mockStateObjects.isBase64Image,
        mockStateObjects.computedImageSrc,
      );

      expect(mockStateObjects.hasError.value).toBe(true);
      expect(mockStateObjects.isLoading.value).toBe(false);
    });

    it('processes URL images when not base64', async () => {
      (isBase64 as vi.Mock).mockReturnValue(false);
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: vi.fn().mockResolvedValue({
          type: 'url',
          mime: undefined,
        }),
      });
      (computeImageSource as vi.Mock).mockReturnValue('url-src');

      const mockStateObjects = createMockStateObjects();

      await loadImageType(
        'https://example.com/image.jpg',
        mockStateObjects.imageTypeInfo,
        mockStateObjects.isLoading,
        mockStateObjects.hasError,
        mockStateObjects.isBase64Image,
        mockStateObjects.computedImageSrc,
      );

      expect(mockStateObjects.imageTypeInfo.value).toEqual({
        type: 'url',
        mime: undefined,
      });
      expect(mockStateObjects.computedImageSrc.value).toBe('url-src');
      expect(mockStateObjects.hasError.value).toBe(false);
      expect(mockStateObjects.isLoading.value).toBe(true);
    });

    it('handles URL processing errors', async () => {
      (isBase64 as vi.Mock).mockReturnValue(false);
      (useImageStringTypeDetector as vi.Mock).mockReturnValue({
        getImageStringType: vi.fn().mockRejectedValue(new Error('url failure')),
      });

      const mockStateObjects = createMockStateObjects();

      await loadImageType(
        'https://example.com/image.jpg',
        mockStateObjects.imageTypeInfo,
        mockStateObjects.isLoading,
        mockStateObjects.hasError,
        mockStateObjects.isBase64Image,
        mockStateObjects.computedImageSrc,
      );

      expect(mockStateObjects.hasError.value).toBe(true);
      expect(mockStateObjects.isLoading.value).toBe(false);
    });
  });

  describe('useBase64ImageHandler', () => {
    it('processes valid base64 payloads inside worker fn', async () => {
      const { handleBase64ImageInWorker, workerStatus } =
        useBase64ImageHandler();

      expect(workerStatus.value).toBe('idle');

      await expect(
        handleBase64ImageInWorker('data:image/png;base64,SGVsbG8='),
      ).resolves.toEqual({
        typeInfo: { type: 'base64', mime: 'png' },
        computedSrc: 'data:image/png;base64,SGVsbG8=',
      });
    });

    it('rejects invalid base64 payloads in worker', async () => {
      const { handleBase64ImageInWorker } = useBase64ImageHandler();

      await expect(
        handleBase64ImageInWorker('not-valid-base64'),
      ).rejects.toThrow('Invalid base64 string');
    });

    it('throws when MIME metadata cannot be inferred from raw payloads', async () => {
      const { handleBase64ImageInWorker } = useBase64ImageHandler();

      await expect(
        handleBase64ImageInWorker('U29tZUJhc2U2NA=='),
      ).rejects.toThrow('Invalid image MIME type');
    });
  });

  describe('worker helper utilities', () => {
    const originalAtob = globalThis.atob;

    afterEach(() => {
      globalThis.atob = originalAtob;
    });

    it('decodes via window.atob when available', () => {
      expect(workerAtobPolyfill('SGVsbG8=')).toBe('Hello');
    });

    it('falls back to Buffer when atob is unavailable', () => {
      globalThis.atob = undefined as unknown as typeof globalThis.atob;
      expect(workerAtobPolyfill('SGVsbG8=')).toBe('Hello');
    });

    it('returns empty string when decoding fails', () => {
      globalThis.atob = undefined as unknown as typeof globalThis.atob;
      const bufferSpy = vi.spyOn(Buffer, 'from').mockImplementation(() => {
        throw new Error('decode error');
      });

      expect(workerAtobPolyfill('SGVsbG8=')).toBe('');
      bufferSpy.mockRestore();
    });

    it('worker base64 validator rejects empty strings', () => {
      expect(workerIsValidBase64('')).toBe(false);
    });

    it('worker base64 validator rejects malformed data URLs', () => {
      expect(workerIsValidBase64('data:image/png;base64,')).toBe(false);
    });

    it('worker base64 validator handles unexpected errors', () => {
      const tricky = {
        startsWith() {
          throw new Error('boom');
        },
      } as unknown as string;

      expect(workerIsValidBase64(tricky)).toBe(false);
    });

    it('worker image type detection returns undefined for empty data', () => {
      expect(workerGetImageStringType('')).toBeUndefined();
    });

    it('worker image type detection handles missing MIME pattern', () => {
      expect(workerGetImageStringType('data:image/png;base64')).toBeUndefined();
    });

    it('worker image type detection returns URL metadata', () => {
      expect(workerGetImageStringType('https://example.com/image.png')).toEqual(
        {
          type: 'url',
          mime: undefined,
        },
      );
    });

    it('worker image type detection falls back when URL parsing fails', () => {
      expect(workerGetImageStringType('not-a-url')).toEqual({
        type: undefined,
        mime: undefined,
      });
    });

    it('worker image type detection extracts base64 metadata', () => {
      expect(workerGetImageStringType('data:image/gif;base64,AAAA')).toEqual({
        type: 'base64',
        mime: 'gif',
      });
    });

    it('worker compute image source returns undefined when inputs missing', () => {
      expect(
        workerComputeImageSource(undefined, { type: 'url', mime: undefined }),
      ).toBeUndefined();
      expect(
        workerComputeImageSource(
          'data:image/png;base64,AAA',
          undefined as never,
        ),
      ).toBeUndefined();
    });

    it('worker compute image source preserves prefixed base64 input', () => {
      const src = 'data:image/png;base64,AAA';
      expect(
        workerComputeImageSource(src, { type: 'base64', mime: 'png' }),
      ).toBe(src);
    });

    it('worker compute image source prefixes raw base64 strings', () => {
      expect(
        workerComputeImageSource('AAA', { type: 'base64', mime: 'png' }),
      ).toBe('data:image/png;base64,AAA');
    });

    it('worker compute image source returns URLs untouched', () => {
      expect(
        workerComputeImageSource('https://example.com/image.png', {
          type: 'url',
          mime: undefined,
        }),
      ).toBe('https://example.com/image.png');
    });
  });
});
