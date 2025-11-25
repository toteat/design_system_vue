import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { createObjectURL, revokeObjectURLs } from '../urlUtils';

const mockCreateObjectURL = vi.fn<string, [File]>();
const mockRevokeObjectURL = vi.fn<void, [string]>();

describe('urlUtils', () => {
  beforeEach(() => {
    mockCreateObjectURL.mockReturnValue('blob:mock-url');
    mockRevokeObjectURL.mockReset();

    vi.stubGlobal('URL', {
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: mockRevokeObjectURL,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetAllMocks();
  });

  it('creates object URLs via the global URL implementation', () => {
    const file = { name: 'demo-file' } as File;

    const result = createObjectURL(file);

    expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);
    expect(mockCreateObjectURL).toHaveBeenCalledWith(file);
    expect(result).toBe('blob:mock-url');
  });

  it('revokes all provided object URLs', () => {
    const urls = ['blob:1', 'blob:2', 'blob:3'];

    revokeObjectURLs(urls);

    expect(mockRevokeObjectURL).toHaveBeenCalledTimes(urls.length);
    let index = 0;
    for (const url of urls) {
      expect(mockRevokeObjectURL.mock.calls[index]?.[0]).toBe(url);
      index += 1;
    }
  });
});
