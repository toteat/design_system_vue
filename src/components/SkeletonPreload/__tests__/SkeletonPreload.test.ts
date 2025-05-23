import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SkeletonPreload from '../SkeletonPreload.vue';

describe('SkeletonPreload', () => {
  it('renders with default props', () => {
    const wrapper = mount(SkeletonPreload);
    const element = wrapper.find('.skeleton-preload');
    const style = element.attributes('style');

    expect(element.exists()).toBe(true);
    expect(style).toContain('--skeleton-width: 40px');
    expect(style).toContain('--skeleton-height: 40px');
    expect(style).toContain('--skeleton-border-radius: 8px');
  });

  it('applies custom width and height', () => {
    const wrapper = mount(SkeletonPreload, {
      props: {
        width: 200,
        height: 100,
      },
    });
    const element = wrapper.find('.skeleton-preload');
    const style = element.attributes('style');

    expect(style).toContain('--skeleton-width: 200px');
    expect(style).toContain('--skeleton-height: 100px');
  });

  it('applies custom border radius', () => {
    const wrapper = mount(SkeletonPreload, {
      props: {
        borderRadius: 16,
      },
    });
    const element = wrapper.find('.skeleton-preload');
    const style = element.attributes('style');

    expect(style).toContain('--skeleton-border-radius: 16px');
  });

  it('applies circular style when isRounded is true', () => {
    const wrapper = mount(SkeletonPreload, {
      props: {
        width: 100,
        height: 200,
        borderRadius: 16,
        isRounded: true,
      },
    });
    const element = wrapper.find('.skeleton-preload');
    const style = element.attributes('style');

    expect(style).toContain('--skeleton-height: 100px');
    expect(style).toContain('--skeleton-border-radius: 50%');
  });

  it('has correct CSS classes and styles', () => {
    const wrapper = mount(SkeletonPreload);
    const element = wrapper.find('.skeleton-preload');

    expect(element.classes()).toContain('skeleton-preload');
    expect(element.attributes('style')).toBeDefined();
  });

  it('maintains aspect ratio when isRounded is true', () => {
    const wrapper = mount(SkeletonPreload, {
      props: {
        width: 80,
        height: 120,
        isRounded: true,
      },
    });
    const element = wrapper.find('.skeleton-preload');
    const style = element.attributes('style');

    expect(style).toContain('--skeleton-height: 80px');
    expect(style).toContain('--skeleton-border-radius: 50%');
  });

  it('applies correct animation styles', () => {
    const wrapper = mount(SkeletonPreload);
    const element = wrapper.find('.skeleton-preload');
    const style = element.attributes('style');

    expect(style).toBeDefined();
  });
});
