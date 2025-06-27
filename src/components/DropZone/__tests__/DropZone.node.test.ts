import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import DropZone from '../DropZone.vue';
import { nextTick } from 'vue';
import type { FileWithPreview } from '@/types';

// Mock DataTransfer for testing
class MockDataTransfer {
  items: {
    add: (file: File) => void;
  } = {
    add: (file: File) => {
      this.files.push(file);
    },
  };

  files: File[] = [];
}

// Mock utilities
vi.mock('@/utils/fileTypeUtils', () => ({
  validateFileTypes: vi.fn(),
}));

vi.mock('@/utils/filePreviewUtils', () => ({
  getFilePreview: vi.fn(),
}));

vi.mock('@/utils/urlUtils', () => ({
  revokeObjectURLs: vi.fn(),
}));

describe('DropZone Node Tests', () => {
  // Helper function to create a mock File
  const createMockFile = (name: string, type: string) => {
    return new File(['test content'], name, { type });
  };

  // Type-safe method extraction
  function getDropZoneVm(wrapper: VueWrapper) {
    const vm = wrapper.vm as unknown as {
      onDrop: (event: DragEvent) => Promise<void>;
      processFiles: (files: FileList) => Promise<void>;
      removeFile: (index: number) => void;
      onFileChange: (event: Event) => Promise<void>;
      isDragging: boolean;
      previewFiles: FileWithPreview[];
      inputRef: HTMLInputElement | null;
    };
    return vm;
  }

  // Test file processing and validation
  it('handles file drop successfully', async () => {
    const { validateFileTypes } = await import('@/utils/fileTypeUtils');
    const { getFilePreview } = await import('@/utils/filePreviewUtils');

    // Mock implementations
    vi.mocked(validateFileTypes).mockResolvedValue([
      createMockFile('test.jpg', 'image/jpeg'),
    ]);
    vi.mocked(getFilePreview).mockResolvedValue('mock-preview-url');

    const wrapper = mount(DropZone, {
      props: {
        instanceName: 'test-upload',
        allowedFileTypes: 'images',
      },
    });

    // Simulate file drop
    const mockFiles = new MockDataTransfer();
    mockFiles.items.add(createMockFile('test.jpg', 'image/jpeg'));
    const dropEvent = {
      preventDefault: vi.fn(),
      dataTransfer: { files: mockFiles.files },
    } as unknown as DragEvent;

    await getDropZoneVm(wrapper).onDrop(dropEvent);
    await nextTick();

    // Check emitted events
    const emittedEvents = wrapper.emitted();
    const dropEvents = emittedEvents['test-upload-drop'] as unknown[][];
    expect(dropEvents).toBeTruthy();
    expect(dropEvents?.[0]?.[0]).toBeDefined();
    expect(getDropZoneVm(wrapper).previewFiles.length).toBe(1);
  });

  // Test error handling for invalid file types
  it('handles file drop error', async () => {
    const { validateFileTypes } = await import('@/utils/fileTypeUtils');

    // Mock implementation to return no valid files
    vi.mocked(validateFileTypes).mockResolvedValue([]);

    const wrapper = mount(DropZone, {
      props: {
        instanceName: 'test-upload',
        allowedFileTypes: 'images',
      },
    });

    // Simulate file drop
    const mockFiles = new MockDataTransfer();
    mockFiles.items.add(createMockFile('test.txt', 'text/plain'));
    const dropEvent = {
      preventDefault: vi.fn(),
      dataTransfer: { files: mockFiles.files },
    } as unknown as DragEvent;

    await getDropZoneVm(wrapper).onDrop(dropEvent);
    await nextTick();

    // Check emitted events
    const emittedEvents = wrapper.emitted();
    const errorEvents = emittedEvents['test-upload-drop-error'] as unknown[][];
    expect(errorEvents).toBeTruthy();
    expect(errorEvents?.[0]?.[0]).toBeDefined();
    expect(getDropZoneVm(wrapper).previewFiles.length).toBe(0);
  });

  // Test file removal functionality
  it('removes file from preview', async () => {
    const { getFilePreview } = await import('@/utils/filePreviewUtils');
    const { revokeObjectURLs } = await import('@/utils/urlUtils');
    const { validateFileTypes } = await import('@/utils/fileTypeUtils');

    // Mock implementations
    vi.mocked(getFilePreview).mockResolvedValue('mock-preview-url');
    vi.mocked(validateFileTypes).mockImplementation(async (files) => {
      return Array.from(files);
    });

    const wrapper = mount(DropZone, {
      props: {
        instanceName: 'test-upload',
        allowedFileTypes: 'images',
      },
    });

    // Add a mock file
    const mockFiles = new MockDataTransfer();
    const testFile = createMockFile('test.jpg', 'image/jpeg');
    mockFiles.items.add(testFile);
    const dropEvent = {
      preventDefault: vi.fn(),
      dataTransfer: { files: mockFiles.files },
    } as unknown as DragEvent;

    // Drop the file
    await getDropZoneVm(wrapper).onDrop(dropEvent);
    await nextTick();

    // Verify file was added
    const initialPreviewFiles = getDropZoneVm(wrapper).previewFiles;
    expect(initialPreviewFiles.length).toBe(1);

    // Remove the file
    getDropZoneVm(wrapper).removeFile(0);
    await nextTick();

    // Check emitted events and file removal
    const removeEvents = wrapper.emitted('test-upload-remove');
    expect(removeEvents).toBeTruthy();
    expect(removeEvents?.[0]?.[0]).toBeDefined();
    expect(getDropZoneVm(wrapper).previewFiles.length).toBe(0);
    expect(revokeObjectURLs).toHaveBeenCalledWith(
      expect.arrayContaining(['mock-preview-url']),
    );
  });

  // Test file change event handling
  it('handles file change event', async () => {
    const { validateFileTypes } = await import('@/utils/fileTypeUtils');
    const { getFilePreview } = await import('@/utils/filePreviewUtils');

    // Mock implementations
    vi.mocked(validateFileTypes).mockImplementation(async (files) => {
      return Array.from(files);
    });
    vi.mocked(getFilePreview).mockResolvedValue('mock-preview-url');

    const wrapper = mount(DropZone, {
      props: {
        instanceName: 'test-upload',
        allowedFileTypes: 'images',
      },
    });

    // Simulate file input change
    const mockFiles = new MockDataTransfer();
    const testFile = createMockFile('test.jpg', 'image/jpeg');
    mockFiles.items.add(testFile);
    const mockEvent = {
      target: {
        files: mockFiles.files,
        value: 'C:\\fakepath\\test.jpg',
      },
    } as unknown as Event;

    // Trigger file change
    await getDropZoneVm(wrapper).onFileChange(mockEvent);
    await nextTick();

    // Check emitted events
    const emittedEvents = wrapper.emitted();
    const dropEvents = emittedEvents['test-upload-drop'] as unknown[][];

    expect(dropEvents).toBeTruthy();
    expect(dropEvents?.[0]?.[0]).toBeDefined();
    expect(getDropZoneVm(wrapper).previewFiles.length).toBe(1);
  });

  // Test display behavior combinations
  describe('Display behavior combinations', () => {
    it('shows file list when both displayPreview and displayFileList are false', async () => {
      const { validateFileTypes } = await import('@/utils/fileTypeUtils');
      const { getFilePreview } = await import('@/utils/filePreviewUtils');

      // Mock implementations
      vi.mocked(validateFileTypes).mockImplementation(async (files) => {
        return Array.from(files);
      });
      vi.mocked(getFilePreview).mockResolvedValue('mock-preview-url');

      const wrapper = mount(DropZone, {
        props: {
          instanceName: 'test-upload',
          allowedFileTypes: 'images',
          displayPreview: false,
          displayFileList: false,
        },
      });

      // Add a file
      const mockFiles = new MockDataTransfer();
      const testFile = createMockFile('test.jpg', 'image/jpeg');
      mockFiles.items.add(testFile);
      const dropEvent = {
        preventDefault: vi.fn(),
        dataTransfer: { files: mockFiles.files },
      } as unknown as DragEvent;

      await getDropZoneVm(wrapper).onDrop(dropEvent);
      await nextTick();

      // Verify file list is shown
      expect(wrapper.find('.drop-zone__file-list').exists()).toBe(true);
      expect(wrapper.find('.image-preview-grid').exists()).toBe(false);
    });

    it('shows preview when displayPreview is true and displayFileList is false', async () => {
      const { validateFileTypes } = await import('@/utils/fileTypeUtils');
      const { getFilePreview } = await import('@/utils/filePreviewUtils');

      // Mock implementations
      vi.mocked(validateFileTypes).mockImplementation(async (files) => {
        return Array.from(files);
      });
      vi.mocked(getFilePreview).mockResolvedValue('mock-preview-url');

      const wrapper = mount(DropZone, {
        props: {
          instanceName: 'test-upload',
          allowedFileTypes: 'images',
          displayPreview: true,
          displayFileList: false,
        },
      });

      // Add a file
      const mockFiles = new MockDataTransfer();
      const testFile = createMockFile('test.jpg', 'image/jpeg');
      mockFiles.items.add(testFile);
      const dropEvent = {
        preventDefault: vi.fn(),
        dataTransfer: { files: mockFiles.files },
      } as unknown as DragEvent;

      await getDropZoneVm(wrapper).onDrop(dropEvent);
      await nextTick();

      // Verify preview is shown
      expect(wrapper.find('.image-preview-grid').exists()).toBe(true);
      expect(wrapper.find('.drop-zone__file-list').exists()).toBe(false);
    });

    it('shows file list when displayFileList is true', async () => {
      const { validateFileTypes } = await import('@/utils/fileTypeUtils');
      const { getFilePreview } = await import('@/utils/filePreviewUtils');

      // Mock implementations
      vi.mocked(validateFileTypes).mockImplementation(async (files) => {
        return Array.from(files);
      });
      vi.mocked(getFilePreview).mockResolvedValue('mock-preview-url');

      const wrapper = mount(DropZone, {
        props: {
          instanceName: 'test-upload',
          allowedFileTypes: 'images',
          displayPreview: false,
          displayFileList: true,
        },
      });

      // Add a file
      const mockFiles = new MockDataTransfer();
      const testFile = createMockFile('test.jpg', 'image/jpeg');
      mockFiles.items.add(testFile);
      const dropEvent = {
        preventDefault: vi.fn(),
        dataTransfer: { files: mockFiles.files },
      } as unknown as DragEvent;

      await getDropZoneVm(wrapper).onDrop(dropEvent);
      await nextTick();

      // Verify file list is shown
      expect(wrapper.find('.drop-zone__file-list').exists()).toBe(true);
      expect(wrapper.find('.image-preview-grid').exists()).toBe(false);
    });
  });

  // Test null handling for modelValue
  describe('Null handling for modelValue', () => {
    it('handles null modelValue prop correctly', async () => {
      const wrapper = mount(DropZone, {
        props: {
          instanceName: 'test-upload',
          allowedFileTypes: 'images',
          modelValue: null,
        },
      });

      await nextTick();

      // Component should initialize with empty array internally
      expect(getDropZoneVm(wrapper).previewFiles).toEqual([]);
    });

    it('handles undefined modelValue prop correctly', async () => {
      const wrapper = mount(DropZone, {
        props: {
          instanceName: 'test-upload',
          allowedFileTypes: 'images',
          modelValue: undefined,
        },
      });

      await nextTick();

      // Component should initialize with empty array internally
      expect(getDropZoneVm(wrapper).previewFiles).toEqual([]);
    });

    it('emits update:modelValue with correct type when files change', async () => {
      const { validateFileTypes } = await import('@/utils/fileTypeUtils');
      const { getFilePreview } = await import('@/utils/filePreviewUtils');

      // Mock implementations
      vi.mocked(validateFileTypes).mockImplementation(async (files) => {
        return Array.from(files);
      });
      vi.mocked(getFilePreview).mockResolvedValue('mock-preview-url');

      const wrapper = mount(DropZone, {
        props: {
          instanceName: 'test-upload',
          allowedFileTypes: 'images',
          modelValue: null,
        },
      });

      // Add a file
      const mockFiles = new MockDataTransfer();
      const testFile = createMockFile('test.jpg', 'image/jpeg');
      mockFiles.items.add(testFile);
      const dropEvent = {
        preventDefault: vi.fn(),
        dataTransfer: { files: mockFiles.files },
      } as unknown as DragEvent;

      await getDropZoneVm(wrapper).onDrop(dropEvent);
      await nextTick();

      // Check that update:modelValue was emitted
      const updateEvents = wrapper.emitted('update:modelValue');
      expect(updateEvents).toBeTruthy();
      expect(updateEvents?.[0]?.[0]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            file: expect.any(File),
            name: 'test.jpg',
            preview: 'mock-preview-url',
          }),
        ]),
      );
    });

    it('watches modelValue changes and updates internal state', async () => {
      const mockFileWithPreview: FileWithPreview = {
        file: createMockFile('test.jpg', 'image/jpeg'),
        name: 'test.jpg',
        preview: 'mock-preview-url',
      };

      const wrapper = mount(DropZone, {
        props: {
          instanceName: 'test-upload',
          allowedFileTypes: 'images',
          modelValue: null,
        },
      });

      // Initially should be empty
      expect(getDropZoneVm(wrapper).previewFiles).toEqual([]);

      // Update modelValue to include a file
      await wrapper.setProps({ modelValue: [mockFileWithPreview] });
      await nextTick();

      // Internal state should be updated
      expect(getDropZoneVm(wrapper).previewFiles).toEqual([
        mockFileWithPreview,
      ]);

      // Update modelValue back to null
      await wrapper.setProps({ modelValue: null });
      await nextTick();

      // Internal state should be empty again
      expect(getDropZoneVm(wrapper).previewFiles).toEqual([]);
    });

    it('handles modelValue changes from external source', async () => {
      const wrapper = mount(DropZone, {
        props: {
          instanceName: 'test-upload',
          allowedFileTypes: 'images',
          modelValue: [],
        },
      });

      const mockFileWithPreview: FileWithPreview = {
        file: createMockFile('external.jpg', 'image/jpeg'),
        name: 'external.jpg',
        preview: 'external-preview-url',
      };

      // Simulate external change to modelValue
      await wrapper.setProps({ modelValue: [mockFileWithPreview] });
      await nextTick();

      // Internal state should reflect the external change
      expect(getDropZoneVm(wrapper).previewFiles).toEqual([
        mockFileWithPreview,
      ]);
      expect(getDropZoneVm(wrapper).previewFiles[0].name).toBe('external.jpg');

      // Change back to null
      await wrapper.setProps({ modelValue: null });
      await nextTick();

      expect(getDropZoneVm(wrapper).previewFiles).toEqual([]);
    });
  });

  // Test v-model compatibility
  describe('v-model compatibility', () => {
    it('works with v-model when initialized with null', async () => {
      const { validateFileTypes } = await import('@/utils/fileTypeUtils');
      const { getFilePreview } = await import('@/utils/filePreviewUtils');

      // Mock implementations
      vi.mocked(validateFileTypes).mockImplementation(async (files) => {
        return Array.from(files);
      });
      vi.mocked(getFilePreview).mockResolvedValue('mock-preview-url');

      const wrapper = mount(DropZone, {
        props: {
          instanceName: 'test-upload',
          allowedFileTypes: 'images',
          modelValue: null,
          'onUpdate:modelValue': (files: FileWithPreview[] | null) => {
            wrapper.setProps({ modelValue: files });
          },
        },
      });

      // Add a file through drop
      const mockFiles = new MockDataTransfer();
      const testFile = createMockFile('vmodel.jpg', 'image/jpeg');
      mockFiles.items.add(testFile);
      const dropEvent = {
        preventDefault: vi.fn(),
        dataTransfer: { files: mockFiles.files },
      } as unknown as DragEvent;

      await getDropZoneVm(wrapper).onDrop(dropEvent);
      await nextTick();

      // The modelValue should be updated
      expect(wrapper.props('modelValue')).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'vmodel.jpg',
            preview: 'mock-preview-url',
          }),
        ]),
      );
    });
  });
});
