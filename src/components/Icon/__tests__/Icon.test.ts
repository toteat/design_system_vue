import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from '../Icon.vue'
import * as Icons from '../icons'

describe('Icon Component', () => {
  it('renders default icon with correct viewBox, fill, and size', () => {
    const wrapper = mount(Icon)

    // Default props: name 'home-outline', size 1, color 'black'
    expect(wrapper.classes()).toContain('icon')
    expect(wrapper.attributes('viewBox')).toBe(Icons.ICON_HOME_OUTLINE[1])
    expect(wrapper.element.style.getPropertyValue('--size')).toBe('1rem')
    expect(wrapper.attributes('fill')).toBe('var(--color-black)')
  })

  it('renders custom icon name, size, and color', () => {
    const wrapper = mount(Icon, {
      props: { name: 'apple-filled', size: 2, color: 'primary' }
    })
    expect(wrapper.attributes('viewBox')).toBe(Icons.ICON_APPLE_FILLED[1])
    expect(wrapper.element.style.getPropertyValue('--size')).toBe('2rem')
    expect(wrapper.attributes('fill')).toBe('var(--color-primary)')
  })

  it('warns and uses fallback for invalid name', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(Icon, {
      props: { name: 'invalid-icon' as any }
    })
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('[Icon.vue] Icon content not found for name: invalid-icon')
    )
    // fallback viewBox
    expect(wrapper.attributes('viewBox')).toBe('0 0 16 16')
    warnSpy.mockRestore()
  })
})
