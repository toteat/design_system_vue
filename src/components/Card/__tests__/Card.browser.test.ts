import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from '../Card.vue';
import type { CardProps } from '@/types';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders as section by default (not clickable)', () => {
      const wrapper = mount(Card);
      const element = wrapper.find('section');
      expect(element.exists()).toBe(true);
      expect(element.classes()).toContain('tot-ds-root');
      expect(element.classes()).toContain('card');
    });

    it('renders as anchor when href is provided', () => {
      const wrapper = mount(Card, {
        props: { href: '/profile' },
      });
      const anchor = wrapper.find('a');
      expect(anchor.exists()).toBe(true);
      expect(anchor.attributes('href')).toBe('/profile');
    });

    it('renders slot content correctly', () => {
      const wrapper = mount(Card, {
        slots: {
          default: '<h1>Card Content</h1>',
        },
      });
      expect(wrapper.html()).toContain('<h1>Card Content</h1>');
    });
  });

  describe('Props - Padding', () => {
    const paddingVariants: Array<CardProps['padding']> = [
      'none',
      'small',
      'medium',
      'large',
    ];

    it.each(paddingVariants)('applies %s padding data attribute', (padding) => {
      const wrapper = mount(Card, {
        props: { padding },
      });
      const section = wrapper.find('section');
      expect(section.attributes('data-padding')).toBe(padding);
    });

    it('uses medium as default padding', () => {
      const wrapper = mount(Card);
      const section = wrapper.find('section');
      expect(section.attributes('data-padding')).toBe('medium');
    });
  });

  describe('Props - Elevation', () => {
    const elevationVariants: Array<CardProps['elevation']> = [
      'none',
      'small',
      'medium',
      'large',
    ];

    it.each(elevationVariants)(
      'applies %s elevation data attribute',
      (elevation) => {
        const wrapper = mount(Card, {
          props: { elevation },
        });
        const section = wrapper.find('section');
        expect(section.attributes('data-elevation')).toBe(elevation);
      },
    );

    it('uses none as default elevation', () => {
      const wrapper = mount(Card);
      const section = wrapper.find('section');
      expect(section.attributes('data-elevation')).toBe('none');
    });
  });

  describe('Link Behavior', () => {
    it('sets target attribute for links', () => {
      const wrapper = mount(Card, {
        props: { href: 'https://example.com', target: '_blank' },
      });
      const link = wrapper.find('a');
      expect(link.attributes('target')).toBe('_blank');
    });

    it('auto-adds rel="noopener noreferrer" for _blank target', () => {
      const wrapper = mount(Card, {
        props: { href: 'https://example.com', target: '_blank' },
      });
      const link = wrapper.find('a');
      expect(link.attributes('rel')).toBe('noopener noreferrer');
    });

    it('allows custom rel attribute', () => {
      const wrapper = mount(Card, {
        props: { href: '/profile', rel: 'author' },
      });
      const link = wrapper.find('a');
      expect(link.attributes('rel')).toBe('author');
    });

    it('does not add rel for internal links without target', () => {
      const wrapper = mount(Card, {
        props: { href: '/profile' },
      });
      const link = wrapper.find('a');
      expect(link.attributes('rel')).toBeUndefined();
    });
  });

  describe('v-model:hovered on Links', () => {
    it('emits update:hovered on mouseenter', async () => {
      const wrapper = mount(Card, {
        props: { href: '/test' },
      });
      const link = wrapper.find('a');
      await link.trigger('mouseenter');
      expect(wrapper.emitted('update:hovered')).toBeTruthy();
      expect(wrapper.emitted('update:hovered')?.[0]).toEqual([true]);
    });

    it('emits update:hovered false on mouseleave', async () => {
      const wrapper = mount(Card, {
        props: { href: '/test' },
      });
      const link = wrapper.find('a');
      await link.trigger('mouseleave');
      expect(wrapper.emitted('update:hovered')).toBeTruthy();
      expect(wrapper.emitted('update:hovered')?.[0]).toEqual([false]);
    });
  });

  describe('v-model:focused on Links', () => {
    it('emits update:focused on focus', async () => {
      const wrapper = mount(Card, {
        props: { href: '/test' },
      });
      const link = wrapper.find('a');
      await link.trigger('focus');
      expect(wrapper.emitted('update:focused')).toBeTruthy();
      expect(wrapper.emitted('update:focused')?.[0]).toEqual([true]);
    });

    it('emits update:focused false on blur', async () => {
      const wrapper = mount(Card, {
        props: { href: '/test' },
      });
      const link = wrapper.find('a');
      await link.trigger('blur');
      expect(wrapper.emitted('update:focused')).toBeTruthy();
      expect(wrapper.emitted('update:focused')?.[0]).toEqual([false]);
    });
  });

  describe('v-model:pressed on Links', () => {
    it('emits update:pressed true on mousedown', async () => {
      const wrapper = mount(Card, {
        props: { href: '/test' },
      });
      const link = wrapper.find('a');
      await link.trigger('mousedown');
      expect(wrapper.emitted('update:pressed')).toBeTruthy();
      expect(wrapper.emitted('update:pressed')?.[0]).toEqual([true]);
    });

    it('emits update:pressed false on mouseup', async () => {
      const wrapper = mount(Card, {
        props: { href: '/test' },
      });
      const link = wrapper.find('a');
      await link.trigger('mouseup');
      expect(wrapper.emitted('update:pressed')).toBeTruthy();
      expect(wrapper.emitted('update:pressed')?.[0]).toEqual([false]);
    });

    it('resets pressed state on mouseleave', async () => {
      const wrapper = mount(Card, {
        props: { href: '/test' },
      });
      const link = wrapper.find('a');
      await link.trigger('mousedown');
      await link.trigger('mouseleave');

      const pressedEmits = wrapper.emitted('update:pressed') as unknown[][];
      expect(pressedEmits).toHaveLength(2);
      expect(pressedEmits[0]).toEqual([true]);
      expect(pressedEmits[1]).toEqual([false]);
    });
  });

  describe('Accessibility', () => {
    it('has correct attributes for link cards', () => {
      const wrapper = mount(Card, {
        props: { href: '/test' },
      });
      const anchor = wrapper.find('a');
      expect(anchor.exists()).toBe(true);
      expect(anchor.attributes('href')).toBe('/test');
    });

    it('uses semantic section element for static cards', () => {
      const wrapper = mount(Card);
      const section = wrapper.find('section');
      expect(section.exists()).toBe(true);
      expect(section.attributes('role')).toBeUndefined();
      expect(section.attributes('tabindex')).toBeUndefined();
    });

    it('applies data-clickable attribute correctly', () => {
      const staticCard = mount(Card);
      const section = staticCard.find('section');
      expect(section.exists()).toBe(true);
      expect(section.attributes('data-clickable')).toBe('false');

      const linkCard = mount(Card, { props: { href: '/test' } });
      const link = linkCard.find('a');
      expect(link.exists()).toBe(true);
      expect(link.attributes('data-clickable')).toBe('true');
    });
  });

  describe('CSS Classes', () => {
    it('always includes tot-ds-root and card classes', () => {
      const wrapper = mount(Card);
      const section = wrapper.find('section');
      expect(section.classes()).toContain('tot-ds-root');
      expect(section.classes()).toContain('card');
    });

    it('maintains classes across element types', () => {
      const section = mount(Card);
      const link = mount(Card, { props: { href: '/test' } });

      expect(section.find('section').classes()).toContain('tot-ds-root');
      expect(section.find('section').classes()).toContain('card');

      expect(link.find('a').classes()).toContain('tot-ds-root');
      expect(link.find('a').classes()).toContain('card');
    });
  });

  describe('Props Reactivity', () => {
    it('updates when padding prop changes', async () => {
      const wrapper = mount(Card, {
        props: { padding: 'small' },
      });
      let section = wrapper.find('section');
      expect(section.attributes('data-padding')).toBe('small');

      await wrapper.setProps({ padding: 'large' });
      section = wrapper.find('section');
      expect(section.attributes('data-padding')).toBe('large');
    });

    it('updates when elevation prop changes', async () => {
      const wrapper = mount(Card, {
        props: { elevation: 'small' },
      });
      let section = wrapper.find('section');
      expect(section.attributes('data-elevation')).toBe('small');

      await wrapper.setProps({ elevation: 'large' });
      section = wrapper.find('section');
      expect(section.attributes('data-elevation')).toBe('large');
    });

    it('changes element type when href is added', async () => {
      const wrapper = mount(Card);
      expect(wrapper.find('section').exists()).toBe(true);

      await wrapper.setProps({ href: '/test' });
      expect(wrapper.find('a').exists()).toBe(true);
      expect(wrapper.find('a').attributes('href')).toBe('/test');
    });
  });

  describe('Multiple Interaction States', () => {
    it('handles rapid hover toggles on link cards', async () => {
      const wrapper = mount(Card, {
        props: { href: '/test' },
      });
      const link = wrapper.find('a');

      await link.trigger('mouseenter');
      await link.trigger('mouseleave');
      await link.trigger('mouseenter');
      await link.trigger('mouseleave');

      const hoveredEmits = wrapper.emitted('update:hovered') as unknown[][];
      expect(hoveredEmits).toHaveLength(4);
      expect(hoveredEmits).toEqual([[true], [false], [true], [false]]);
    });

    it('cleans up pressed state when mouse leaves during press', async () => {
      const wrapper = mount(Card, {
        props: { href: '/test' },
      });
      const link = wrapper.find('a');

      await link.trigger('mousedown');
      await link.trigger('mouseleave');

      const pressedEmits = wrapper.emitted('update:pressed') as unknown[][];

      expect(pressedEmits).toEqual([[true], [false]]);
    });
  });

  describe('Computed isClickable', () => {
    it('returns true when href is provided', () => {
      const wrapper = mount(Card, {
        props: { href: '/test' },
      });
      const link = wrapper.find('a');
      expect(link.attributes('data-clickable')).toBe('true');
    });

    it('returns false for static cards', () => {
      const wrapper = mount(Card);
      const section = wrapper.find('section');
      expect(section.attributes('data-clickable')).toBe('false');
    });
  });

  describe('Edge Cases and Full Coverage', () => {
    it('emits all interaction states on link', async () => {
      const wrapper = mount(Card, {
        props: { href: '/test' },
      });
      const link = wrapper.find('a');

      // Hover
      await link.trigger('mouseenter');
      expect(wrapper.emitted('update:hovered')?.[0]).toEqual([true]);

      // Focus
      await link.trigger('focus');
      expect(wrapper.emitted('update:focused')?.[0]).toEqual([true]);

      // Press
      await link.trigger('mousedown');
      expect(wrapper.emitted('update:pressed')?.[0]).toEqual([true]);

      await link.trigger('mouseup');
      expect(wrapper.emitted('update:pressed')?.[1]).toEqual([false]);

      // Blur
      await link.trigger('blur');
      expect(wrapper.emitted('update:focused')?.[1]).toEqual([false]);

      // Un-hover
      await link.trigger('mouseleave');
      expect(wrapper.emitted('update:hovered')?.[1]).toEqual([false]);
    });

    it('renders correctly with all props combined', () => {
      const wrapper = mount(Card, {
        props: {
          padding: 'large',
          elevation: 'medium',
          hoverable: true,
          href: 'https://example.com',
          target: '_blank',
        },
      });

      const link = wrapper.find('a');
      expect(link.exists()).toBe(true);
      expect(link.attributes('href')).toBe('https://example.com');
      expect(link.attributes('target')).toBe('_blank');
      expect(link.attributes('rel')).toBe('noopener noreferrer');
      expect(link.attributes('data-padding')).toBe('large');
      expect(link.attributes('data-elevation')).toBe('medium');
      expect(link.attributes('data-hoverable')).toBe('true');
    });
  });

  describe('Max Width', () => {
    it('applies maxWidth as pixels when number provided', () => {
      const wrapper = mount(Card, {
        props: { maxWidth: 400 },
      });
      const section = wrapper.find('section');
      expect(section.attributes('style')).toContain('--card-max-width: 400px');
    });

    it('applies maxWidth as string when CSS value provided', () => {
      const wrapper = mount(Card, {
        props: { maxWidth: '50vw' },
      });
      const section = wrapper.find('section');
      expect(section.attributes('style')).toContain('--card-max-width: 50vw');
    });

    it('does not apply maxWidth style when undefined', () => {
      const wrapper = mount(Card);
      const section = wrapper.find('section');
      expect(section.attributes('style')).toBeUndefined();
    });

    it('applies maxWidth to link cards', () => {
      const wrapper = mount(Card, {
        props: { href: '/test', maxWidth: 600 },
      });
      const link = wrapper.find('a');
      expect(link.attributes('style')).toContain('--card-max-width: 600px');
    });
  });
});
