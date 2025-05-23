import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SkeletonPreload from '../SkeletonPreload.vue';

describe('SkeletonPreload', () => {
  it('renders with default props', () => {
    const wrapper = mount(SkeletonPreload);
    const element = wrapper.find('.skeleton-preload');

    expect(element.exists()).toBe(true);
    expect(element.attributes('style')).toContain('--skeleton-width: 40px');
    expect(element.attributes('style')).toContain('--skeleton-height: 40px');
    expect(element.attributes('style')).toContain(
      '--skeleton-border-radius: 50%',
    );
  });

  it('renders with custom props', () => {
    const props = {
      width: 100,
      height: 50,
      borderRadius: 4,
      isRounded: false,
    };

    const wrapper = mount(SkeletonPreload, { props });
    const element = wrapper.find('.skeleton-preload');

    expect(element.exists()).toBe(true);
    expect(element.attributes('style')).toContain('--skeleton-width: 100px');
    expect(element.attributes('style')).toContain('--skeleton-height: 50px');
    expect(element.attributes('style')).toContain(
      '--skeleton-border-radius: 4px',
    );
  });

  it('applies rounded style when isRounded is true', () => {
    const wrapper = mount(SkeletonPreload, { props: { isRounded: true } });
    const element = wrapper.find('.skeleton-preload');

    expect(element.attributes('style')).toContain(
      '--skeleton-border-radius: 50%',
    );
    expect(element.attributes('style')).toContain('--skeleton-height: 40px');
  });

  it('applies custom height when isRounded is false', () => {
    const wrapper = mount(SkeletonPreload, {
      props: {
        isRounded: false,
        height: 60,
      },
    });
    const element = wrapper.find('.skeleton-preload');

    expect(element.attributes('style')).toContain('--skeleton-height: 60px');
  });
});
