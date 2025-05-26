import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import ImagePreview from '../ImagePreview.vue';
import type { LoadImageTypeFunction } from '@/index';

const base64Png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'; // Truncated for brevity
const imageUrl = 'https://example.com/image.png';

// Mock the useImageStringTypeDetector composable
vi.mock('@/utils/useImageStringType', () => ({
  useImageStringTypeDetector: () => ({
    getImageStringType: async (str: string) => {
      if (str === base64Png) return { type: 'base64' as const, mime: 'png' };
      if (str === imageUrl) return { type: 'url' as const, mime: undefined };
      return undefined;
    },
    workerStatus: { value: 'ready' },
  }),
}));

async function waitForImg(
  wrapper: VueWrapper<InstanceType<typeof ImagePreview>>,
) {
  let img = wrapper.find('img');
  let tries = 0;
  while (!img.exists() && tries < 20) {
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 100)); // Increased delay
    img = wrapper.find('img');
    tries++;
  }
  if (!img.exists()) {
    console.error('Wrapper HTML:', wrapper.html());
    console.error('Component state:', wrapper.vm);
    throw new Error('img not found');
  }
  return img;
}

// Mock the loadImageType utility to simulate base64 image loading
vi.mock('@/utils/imageLoadingUtils', async () => {
  const actual = await vi.importActual('@/utils/imageLoadingUtils');
  return {
    ...actual,
    loadImageType: vi.fn(
      async (
        imageSrc,
        imageTypeInfo,
        isLoading,
        hasError,
        isBase64Image,
        computedImageSrc,
      ) => {
        // Simulate base64 image loading
        if (imageSrc.startsWith('data:image/')) {
          imageTypeInfo.value = { type: 'base64', mime: 'png' };
          isLoading.value = false;
          isBase64Image.value = true;
          computedImageSrc.value = imageSrc;
        } else {
          // Call original implementation for other cases
          return (
            actual as { loadImageType: LoadImageTypeFunction }
          ).loadImageType(
            imageSrc,
            imageTypeInfo,
            isLoading,
            hasError,
            isBase64Image,
            computedImageSrc,
          );
        }
      },
    ),
  };
});

describe('ImagePreview.vue (browser)', () => {
  beforeEach(() => {
    // Reset mocks
    vi.restoreAllMocks();
  });

  it('shows skeleton while loading and then displays image', async () => {
    const wrapper = mount(ImagePreview, {
      props: { imageSrc: imageUrl },
    });
    expect(wrapper.findComponent({ name: 'SkeletonPreload' }).exists()).toBe(
      true,
    );
    const img = await waitForImg(wrapper);
    await img.trigger('load');
    await wrapper.vm.$nextTick();
    expect(img.classes()).not.toContain('visually-hidden');
  });

  it('shows error icon on image error', async () => {
    const wrapper = mount(ImagePreview, {
      props: { imageSrc: imageUrl },
    });
    const img = await waitForImg(wrapper);
    await img.trigger('error');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.image-preview__error').exists()).toBe(true);
  });

  it('renders base64 image instantly', async () => {
    const wrapper = mount(ImagePreview, {
      props: { imageSrc: base64Png },
    });
    await wrapper.vm.$nextTick();
    const img = await waitForImg(wrapper);
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toContain('data:image/png;base64');
    expect(wrapper.findComponent({ name: 'SkeletonPreload' }).exists()).toBe(
      false,
    );
  });

  it('applies alt, width, and height', async () => {
    const wrapper = mount(ImagePreview, {
      props: { imageSrc: imageUrl, alt: 'desc', width: 99, height: 77 },
    });
    const img = await waitForImg(wrapper);
    await img.trigger('load');
    await wrapper.vm.$nextTick();
    expect(img.attributes('alt')).toBe('desc');
    expect(img.attributes('width')).toBe('99');
    expect(img.attributes('height')).toBe('77');
  });

  it('renders <img> with loading="lazy" for URL images', async () => {
    const wrapper = mount(ImagePreview, {
      props: { imageSrc: imageUrl },
    });
    const img = await waitForImg(wrapper);
    expect(img.attributes('loading')).toBe('lazy');
  });
});
