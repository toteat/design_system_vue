import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import ImagePreview from '../ImagePreview.vue';

const base64Png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'; // Truncated for brevity
const imageUrl = 'https://example.com/image.png';

async function waitForImg(
  wrapper: VueWrapper<InstanceType<typeof ImagePreview>>,
) {
  let img = wrapper.find('img');
  let tries = 0;
  while (!img.exists() && tries < 5) {
    await wrapper.vm.$nextTick();
    img = wrapper.find('img');
    tries++;
  }
  if (!img.exists()) throw new Error('img not found');
  return img;
}

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
});
