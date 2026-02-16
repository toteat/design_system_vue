import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from '../Header.vue';
import type { HeaderProps } from '@/types';

describe('Header Component', () => {
  describe('Rendering', () => {
    it('renders as section element', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Test Header', description: 'Test Description' }],
        },
      });
      const section = wrapper.find('section');
      expect(section.exists()).toBe(true);
    });

    it('renders with correct base classes', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Test' }],
        },
      });
      const section = wrapper.find('section');
      expect(section.classes()).toContain('tot-ds-root');
      expect(section.classes()).toContain('header');
    });

    it('renders empty when no headers provided', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [],
        },
      });
      const items = wrapper.findAll('.header__item');
      expect(items).toHaveLength(0);
    });

    it('renders with default empty array when headers prop is not provided', () => {
      const wrapper = mount(Header);
      const items = wrapper.findAll('.header__item');
      expect(items).toHaveLength(0);
    });
  });

  describe('Props - Headers', () => {
    it('renders single header item', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Header 1', description: 'Description 1' }],
        },
      });
      const items = wrapper.findAll('.header__item');
      expect(items).toHaveLength(1);
    });

    it('renders multiple header items', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [
            { title: 'Header 1', description: 'Description 1' },
            { title: 'Header 2', description: 'Description 2' },
            { title: 'Header 3', description: 'Description 3' },
          ],
        },
      });
      const items = wrapper.findAll('.header__item');
      expect(items).toHaveLength(3);
    });

    it('displays header titles correctly', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Test Title 1' }, { title: 'Test Title 2' }],
        },
      });
      const titles = wrapper.findAll('.header__title');
      expect(titles[0].text()).toBe('Test Title 1');
      expect(titles[1].text()).toBe('Test Title 2');
    });

    it('displays header descriptions when provided', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Title', description: 'Test Description' }],
        },
      });
      const description = wrapper.find('.header__description');
      expect(description.exists()).toBe(true);
      expect(description.text()).toBe('Test Description');
    });

    it('does not render description element when not provided', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Title Only' }],
        },
      });
      const descriptions = wrapper.findAll('.header__description');
      expect(descriptions).toHaveLength(0);
    });

    it('handles mix of items with and without descriptions', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [
            { title: 'With Description', description: 'Has description' },
            { title: 'Without Description' },
            { title: 'Also With', description: 'Another description' },
          ],
        },
      });
      const descriptions = wrapper.findAll('.header__description');
      expect(descriptions).toHaveLength(2);
      expect(descriptions[0].text()).toBe('Has description');
      expect(descriptions[1].text()).toBe('Another description');
    });
  });

  describe('Title Styling', () => {
    it('applies correct classes to title', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Test' }],
        },
      });
      const title = wrapper.find('.header__title');
      expect(title.classes()).toContain('header__title');
      expect(title.exists()).toBe(true);
    });
  });

  describe('Description Styling', () => {
    it('applies correct classes to description', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Test', description: 'Desc' }],
        },
      });
      const description = wrapper.find('.header__description');
      expect(description.classes()).toContain('header__description');
      expect(description.exists()).toBe(true);
    });
  });

  describe('Props Reactivity', () => {
    it('updates when headers prop changes', async () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Initial' }],
        },
      });
      expect(wrapper.findAll('.header__item')).toHaveLength(1);

      await wrapper.setProps({
        headers: [{ title: 'Updated 1' }, { title: 'Updated 2' }],
      });
      expect(wrapper.findAll('.header__item')).toHaveLength(2);
    });

    it('updates titles when prop changes', async () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Initial Title' }],
        },
      });
      let title = wrapper.find('.header__title');
      expect(title.text()).toBe('Initial Title');

      await wrapper.setProps({
        headers: [{ title: 'Updated Title' }],
      });
      title = wrapper.find('.header__title');
      expect(title.text()).toBe('Updated Title');
    });

    it('adds descriptions when prop changes', async () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Title' }],
        },
      });
      expect(wrapper.findAll('.header__description')).toHaveLength(0);

      await wrapper.setProps({
        headers: [{ title: 'Title', description: 'New Description' }],
      });
      const description = wrapper.find('.header__description');
      expect(description.exists()).toBe(true);
      expect(description.text()).toBe('New Description');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string title', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: '' }],
        },
      });
      const title = wrapper.find('.header__title');
      expect(title.exists()).toBe(true);
      expect(title.text()).toBe('');
    });

    it('handles empty string description', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Title', description: '' }],
        },
      });
      const descriptions = wrapper.findAll('.header__description');
      expect(descriptions).toHaveLength(0);
    });

    it('handles very long titles', () => {
      const longTitle = 'A'.repeat(100);
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: longTitle }],
        },
      });
      const title = wrapper.find('.header__title');
      expect(title.text()).toBe(longTitle);
    });

    it('handles very long descriptions', () => {
      const longDescription = 'B'.repeat(200);
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Title', description: longDescription }],
        },
      });
      const description = wrapper.find('.header__description');
      expect(description.text()).toBe(longDescription);
    });

    it('handles many header items', () => {
      const headers: HeaderProps[] = Array.from({ length: 10 }, (_, i) => ({
        title: `Header ${i + 1}`,
        description: `Description ${i + 1}`,
      }));

      const wrapper = mount(Header, {
        props: { headers },
      });
      const items = wrapper.findAll('.header__item');
      expect(items).toHaveLength(10);
    });
  });

  describe('Props - SpaceBetween', () => {
    it('does not apply space-between class by default', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Test' }],
        },
      });
      const section = wrapper.find('section');
      expect(section.classes()).not.toContain('header--space-between');
    });

    it('does not apply space-between class when spaceBetween is false', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Test' }],
          spaceBetween: false,
        },
      });
      const section = wrapper.find('section');
      expect(section.classes()).not.toContain('header--space-between');
    });

    it('applies space-between class when spaceBetween is true', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Test' }],
          spaceBetween: true,
        },
      });
      const section = wrapper.find('section');
      expect(section.classes()).toContain('header--space-between');
    });

    it('toggles space-between class reactively', async () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Test' }],
          spaceBetween: false,
        },
      });
      const section = wrapper.find('section');
      expect(section.classes()).not.toContain('header--space-between');

      await wrapper.setProps({ spaceBetween: true });
      expect(section.classes()).toContain('header--space-between');

      await wrapper.setProps({ spaceBetween: false });
      expect(section.classes()).not.toContain('header--space-between');
    });
  });

  describe('Container Structure', () => {
    it('renders items inside section with proper classes', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Header 1' }, { title: 'Header 2' }],
        },
      });
      const section = wrapper.find('section');
      expect(section.classes()).toContain('tot-ds-root');
      expect(section.classes()).toContain('header');
    });

    it('applies correct classes to section', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Test' }],
        },
      });
      const section = wrapper.find('section');
      expect(section.classes()).toContain('tot-ds-root');
      expect(section.classes()).toContain('header');
    });

    it('renders section element with header items', () => {
      const wrapper = mount(Header, {
        props: {
          headers: [{ title: 'Test' }],
        },
      });
      const section = wrapper.find('section');
      expect(section.exists()).toBe(true);
      const items = section.findAll('.header__item');
      expect(items.length).toBeGreaterThan(0);
    });
  });
});
