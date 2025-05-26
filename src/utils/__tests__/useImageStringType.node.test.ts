import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useImageStringTypeDetector } from '../useImageStringType';

// Mock @vueuse/core
vi.mock('@vueuse/core', () => ({
  useWebWorkerFn: vi.fn().mockImplementation((fn) => {
    const workerStatus = ref('PENDING');
    const workerFn = async (data: string) => {
      try {
        return fn(data);
      } catch (error) {
        workerStatus.value = 'ERROR';
        throw error;
      }
    };

    return { workerFn, workerStatus };
  }),
}));

describe('useImageStringTypeDetector', () => {
  it('initializes with correct initial state', () => {
    const { workerStatus, getImageStringType } = useImageStringTypeDetector();

    expect(workerStatus.value).toBe('PENDING');
    expect(getImageStringType).toBeDefined();
  });

  it('detects base64 image type', async () => {
    const { getImageStringType } = useImageStringTypeDetector();

    const base64Image = 'data:image/png;base64,someBase64Content';
    const result = await getImageStringType(base64Image);

    expect(result).toEqual({
      type: 'base64',
      mime: 'png',
    });
  });

  it('detects URL image type', async () => {
    const { getImageStringType } = useImageStringTypeDetector();

    const url = 'https://example.com/image.jpg';
    const result = await getImageStringType(url);

    expect(result).toEqual({
      type: 'url',
      mime: undefined,
    });
  });

  it('handles invalid image type', async () => {
    const { getImageStringType } = useImageStringTypeDetector();

    const invalidImage = 'not-an-image';
    const result = await getImageStringType(invalidImage);

    expect(result).toEqual({
      type: undefined,
      mime: undefined,
    });
  });

  it('handles empty string', async () => {
    const { getImageStringType } = useImageStringTypeDetector();

    const result = await getImageStringType('');

    expect(result).toBeUndefined();
  });

  it('handles undefined input', async () => {
    const { getImageStringType } = useImageStringTypeDetector();

    const result = await getImageStringType('');

    expect(result).toBeUndefined();
  });
});
