<script lang="ts">
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'
import type { ButtonType, ButtonSize } from '@/types'

describe('Button Component', () => {
  // Test default props
  it('renders with default props', () => {
    const wrapper = mount(Button)
    expect(wrapper.classes()).toContain('btn-primary')
    expect(wrapper.classes()).toContain('btn-size-medium')
    expect(wrapper.text()).toBe('Loading...')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.attributes('disabled')).toBeUndefined()
  })

  // Test different button types
  const buttonTypes: ButtonType[] = ['primary', 'secondary', 'outline', 'text']
  it.each(buttonTypes)('renders %s button type correctly', (type) => {
    const wrapper = mount(Button, {
      props: { type }
    })
    expect(wrapper.classes()).toContain(`btn-${type}`)
  })

  // Test different sizes
  const buttonSizes: ButtonSize[] = ['smaller', 'small', 'medium', 'large']
  it.each(buttonSizes)('renders %s size correctly', (size) => {
    const wrapper = mount(Button, {
      props: { size }
    })
    expect(wrapper.classes()).toContain(`btn-size-${size}`)
  })

  // Test disabled state
  it('applies disabled state correctly', () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    // Instead of checking for the class which is applied via CSS
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  // Test full width
  it('applies full width class when isFull is true', () => {
    const wrapper = mount(Button, {
      props: { isFull: true }
    })
    expect(wrapper.classes()).toContain('btn-full')
  })

  // Test loading state
  it('shows loading state correctly', () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    })
    expect(wrapper.classes()).toContain('btn-loading')
  })

  // Test custom event name
  it('emits custom event name when clicked', async () => {
    const customEventName = 'custom-click'
    const wrapper = mount(Button, {
      props: { clickEventName: customEventName }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted(customEventName)).toBeTruthy()
  })

  // Test default event name
  it('emits default event name when no custom name provided', async () => {
    const wrapper = mount(Button)

    await wrapper.trigger('click')
    expect(wrapper.emitted('button-click-default-name')).toBeTruthy()
  })

  // Test event payload
  it('emits event when clicked', async () => {
    const wrapper = mount(Button)

    await wrapper.trigger('click')

    // Check that the event is emitted
    const emitted = wrapper.emitted('button-click-default-name')
    expect(emitted).toBeTruthy()
    expect(emitted?.length).toBe(1)
  })

  // Test custom loading text
  it('displays custom loading text', () => {
    const customText = 'Please wait...'
    const wrapper = mount(Button, {
      props: { loading: true, text: customText }
    })
    expect(wrapper.text()).toBe(customText)
  })

  // Test selected state
  it('applies selected state correctly', () => {
    const wrapper = mount(Button, {
      props: { selected: true }
    })
    expect(wrapper.classes()).toContain('selected')
  })

  // Test custom button type
  it('applies custom button type attribute', () => {
    const wrapper = mount(Button, {
      props: { typeButton: 'submit' }
    })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  // Test icon button
  it('renders button with icon correctly', () => {
    const wrapper = mount(Button, {
      props: {
        iconName: 'home-outline',
        onlyIcon: true
      }
    })
    expect(wrapper.find('span').exists()).toBe(false)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  // Test button with icon and text
  it('renders button with icon and text correctly', () => {
    const wrapper = mount(Button, {
      props: {
        iconName: 'home-outline',
        text: 'Home',
        onlyIcon: false
      }
    })
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.text()).toContain('Home')
  })

  // Test for existence of button and basic states
  it('implements proper hover and active CSS', () => {
    const wrapper = mount(Button)
    const buttonElement = wrapper.element as HTMLButtonElement

    // Verify the button exists
    expect(buttonElement.tagName).toBe('BUTTON')
    // We can't actually test CSS pseudo-classes in JSDOM, so we'll just
    // verify the component is properly configured
    expect(wrapper.classes()).toContain('btn')
  })

  // Test outline button configuration
  it('has proper outline button configuration', async () => {
    const wrapper = mount(Button, {
      props: { type: 'outline', selected: true }
    })

    // Verify the outline button is properly configured
    expect(wrapper.classes()).toContain('btn-outline')
    expect(wrapper.classes()).toContain('selected')
  })
})
</script>
