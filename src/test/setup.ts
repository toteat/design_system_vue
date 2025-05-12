import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

// Configure Vue Test Utils
config.global.mocks = {
  // Add any global mocks here
}
