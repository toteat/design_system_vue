/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DropZone from '../DropZone.vue';

// Mock DataTransfer for testing environments
class MockDataTransferItem implements DataTransferItem {
  kind: 'file' | 'string' = 'file';
  type: string = '';

  constructor(private _file?: File) {}

  getAsFile(): File | null {
    return this._file ?? null;
  }

  getAsString(callback: (data: string) => void): void {
    callback('');
  }

  webkitGetAsEntry(): FileSystemEntry | null {
    return null;
  }
}

class MockDataTransferItemList implements DataTransferItemList {
  private _items: DataTransferItem[] = [];
  [index: number]: DataTransferItem;

  get length(): number {
    return this._items.length;
  }

  item(index: number): DataTransferItem | null {
    return this._items[index] ?? null;
  }

  add(data: File): DataTransferItem | null;
  add(data: string, type: string): DataTransferItem | null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add(data: File | string, _type?: string): DataTransferItem | null {
    const item = new MockDataTransferItem(
      data instanceof File ? data : undefined,
    );
    this._items.push(item);
    return item;
  }

  clear(): void {
    this._items = [];
  }

  remove(index: number): void {
    this._items.splice(index, 1);
  }

  [Symbol.iterator](): ArrayIterator<DataTransferItem> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
    return this._items as unknown as ArrayIterator<DataTransferItem>;
  }
}

class MockDataTransfer implements DataTransfer {
  items: MockDataTransferItemList = new MockDataTransferItemList();
  filesArray: File[] = [];
  get files(): FileList {
    const arr = this.filesArray;
    return {
      length: arr.length,
      item: (i: number) => arr[i] ?? null,
      [Symbol.iterator]: function* () {
        yield* arr;
      },
    } as FileList;
  }

  types: ReadonlyArray<string> = [];
  dropEffect: 'none' | 'copy' | 'link' | 'move' = 'none';
  effectAllowed:
    | 'none'
    | 'copy'
    | 'copyLink'
    | 'copyMove'
    | 'link'
    | 'linkMove'
    | 'move'
    | 'all'
    | 'uninitialized' = 'none';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setData(_format: string, _data: string): void {
    /* intentionally empty */
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getData(_format: string): string {
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearData(_format?: string): void {
    /* intentionally empty */
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDragImage(_element: Element, _x: number, _y: number): void {
    /* intentionally empty */
  }
}

// Provide DataTransfer mock globally for Node
if (
  typeof global !== 'undefined' &&
  typeof (global as any).DataTransfer === 'undefined'
) {
  (global as any).DataTransfer = MockDataTransfer;
}

function createMockDragEvent(
  type: string,
  options: Partial<DragEvent> = {},
): DragEvent {
  const baseEvent = new Event(type, options);
  const mockEvent = Object.create(baseEvent);

  Object.defineProperties(mockEvent, {
    dataTransfer: {
      value: options.dataTransfer ?? new MockDataTransfer(),
      writable: true,
      configurable: true,
    },
    type: { value: type, writable: false },
    target: { value: options.target ?? null, writable: true },
    currentTarget: { value: options.currentTarget ?? null, writable: true },
    bubbles: { value: options.bubbles ?? true, writable: false },
    cancelable: { value: options.cancelable ?? true, writable: false },
    preventDefault: {
      value: () => {},
      writable: false,
    },
    stopPropagation: {
      value: () => {},
      writable: false,
    },
  });

  return mockEvent as DragEvent;
}

// Mock getFilePreview
vi.mock('@/utils/filePreviewUtils', () => ({
  getFilePreview: vi
    .fn()
    .mockResolvedValue('data:image/jpeg;base64,mock-preview-data'),
}));

describe('DropZone.vue Browser Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Basic rendering tests
  it('renders the default slot content', () => {
    const wrapper = mount(DropZone, {
      props: { instanceName: 'test-upload' },
    });
    expect(wrapper.text()).toContain(
      'Haz click o arrastra un archivo para subir',
    );
  });

  // Drag and drop interaction tests
  it('emits drop event when files are dropped', async () => {
    // Import the actual module to mock
    const fileTypeUtils = await import('@/utils/fileTypeUtils');
    const filePreviewUtils = await import('@/utils/filePreviewUtils');

    // Create spy/mock functions
    const validateFileTypesSpy = vi.fn(
      async (files: FileList, allowedFileTypesKey: string) => {
        // Filter files based on the allowed file types key
        const filteredFiles = Array.from(files).filter((file) => {
          const isValid =
            allowedFileTypesKey === 'images' &&
            (file.type.startsWith('image/') ||
              file.name.match(/\.(png|jpg|jpeg|gif|webp)$/i));

          return isValid;
        });

        return filteredFiles as File[];
      },
    );

    const getFilePreviewSpy = vi.fn(async () => {
      return 'data:image/jpeg;base64,mock-preview-data';
    });

    // Replace the original functions with spies
    vi.spyOn(fileTypeUtils, 'validateFileTypes').mockImplementation(
      validateFileTypesSpy,
    );
    vi.spyOn(filePreviewUtils, 'getFilePreview').mockImplementation(
      getFilePreviewSpy,
    );

    const wrapper = mount(DropZone, {
      props: {
        instanceName: 'test-upload',
        allowedFileTypes: 'images',
      },
    });

    // Create a mock file and file list
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockFileList = {
      0: testFile,
      length: 1,
      item: (index: number) => (index === 0 ? testFile : null),
      [Symbol.iterator]: function* () {
        yield testFile;
      },
    } as FileList;

    // Get the component instance
    const vm = wrapper.vm as any;

    // Directly call the processFiles method
    await vm.processFiles(mockFileList);

    // Wait for async operations to complete
    await vi.runAllTimersAsync();
    await wrapper.vm.$nextTick();

    // Check the specific event we're interested in
    const eventName = `${wrapper.props('instanceName')}-drop`;
    const dropEvents = wrapper.emitted(eventName);

    // Assertions with detailed error messages
    expect(dropEvents, `Event "${eventName}" should exist`).toBeTruthy();
    expect(Array.isArray(dropEvents), 'Drop events should be an array').toBe(
      true,
    );
    expect(dropEvents?.length, 'Should have exactly one drop event').toBe(1);

    if (dropEvents && dropEvents.length > 0) {
      const firstEmittedEvent = dropEvents[0];

      expect(
        firstEmittedEvent,
        'First emitted event should be defined',
      ).toBeDefined();
      expect(
        firstEmittedEvent.length,
        'First emitted event should have one argument',
      ).toBe(1);

      // Check the event payload contains the file list
      expect(firstEmittedEvent[0], 'Event should contain the file list').toBe(
        mockFileList,
      );
    } else {
      throw new Error('No drop events emitted');
    }

    // Check if previewFiles was updated correctly
    expect(vm.previewFiles.length, 'previewFiles should be updated').toBe(1);
    expect(vm.previewFiles[0].name, 'preview file name should match').toBe(
      testFile.name,
    );

    // Verify mocked functions were called
    expect(validateFileTypesSpy).toHaveBeenCalledWith(
      expect.objectContaining({ length: 1 }),
      'images',
    );
    expect(getFilePreviewSpy).toHaveBeenCalledWith(testFile, true);
  });

  // Drag state tests
  it('shows dragging state when files are dragged over', async () => {
    const wrapper = mount(DropZone, {
      props: { instanceName: 'test-upload' },
    });
    const dropZone = wrapper.find('.drop-zone');

    const dragOverEvent = createMockDragEvent('dragover');
    await dropZone.trigger('dragover', dragOverEvent);
    expect(dropZone.classes()).toContain('drop-zone--dragging');

    const dragLeaveEvent = createMockDragEvent('dragleave');
    await dropZone.trigger('dragleave', dragLeaveEvent);
    expect(dropZone.classes()).not.toContain('drop-zone--dragging');
  });

  // Prop behavior tests
  it('respects multiple prop', () => {
    const wrapper = mount(DropZone, {
      props: {
        instanceName: 'test-upload',
        multiple: false,
      },
    });
    const input = wrapper.find('input[type="file"]');
    expect(input.attributes('multiple')).toBeUndefined();
  });

  it('respects accept prop', () => {
    const wrapper = mount(DropZone, {
      props: {
        instanceName: 'test-upload',
        accept: '.png,.jpg',
      },
    });
    const input = wrapper.find('input[type="file"]');
    expect(input.attributes('accept')).toBe(
      'image/png,image/jpg,image/jpeg,image/gif,image/webp,image/heif',
    );
  });

  // File input interaction test
  it('triggers file input when clicked', async () => {
    const wrapper = mount(DropZone, {
      props: { instanceName: 'test-upload' },
    });
    const input = wrapper.find('input[type="file"]');

    // Create a mock click function and attach it to the input element
    const mockClick = vi.fn();
    Object.defineProperty(input.element, 'click', {
      value: mockClick,
      writable: true,
      configurable: true,
    });

    await wrapper.find('.drop-zone').trigger('click');
    expect(mockClick).toHaveBeenCalled();
  });

  // UI state tests
  it('displays file preview after successful upload', async () => {
    // Import the actual module to mock
    const fileTypeUtils = await import('@/utils/fileTypeUtils');
    const filePreviewUtils = await import('@/utils/filePreviewUtils');

    // Create spy/mock functions with detailed logging
    const validateFileTypesSpy = vi.fn(async (files: FileList) => {
      // Always return the file to ensure preview creation
      return Array.from(files) as File[];
    });

    const getFilePreviewSpy = vi.fn(async () => {
      return 'data:image/jpeg;base64,mock-preview-data';
    });

    // Replace the original functions with spies
    vi.spyOn(fileTypeUtils, 'validateFileTypes').mockImplementation(
      validateFileTypesSpy,
    );
    vi.spyOn(filePreviewUtils, 'getFilePreview').mockImplementation(
      getFilePreviewSpy,
    );

    const wrapper = mount(DropZone, {
      props: {
        instanceName: 'test-upload',
        allowedFileTypes: 'images',
      },
    });

    // Create a mock file and file list
    const testFile = new File(['test-image-content'], 'test.jpg', {
      type: 'image/jpeg',
    });
    const mockFileList = {
      0: testFile,
      length: 1,
      item: (index: number) => (index === 0 ? testFile : null),
      [Symbol.iterator]: function* () {
        yield testFile;
      },
    } as FileList;

    // Get the component instance and call the method directly
    const vm = wrapper.vm as any;
    await vm.processFiles(mockFileList);

    // Wait for all promises to resolve
    await vi.runAllTimersAsync();
    await wrapper.vm.$nextTick();

    // Comprehensive assertions
    expect(vm.previewFiles.length, 'Should have preview files').toBeGreaterThan(
      0,
    );
    expect(
      vm.previewFiles[0].name,
      'First preview file should match test file',
    ).toBe(testFile.name);

    // Force update to ensure DOM reflects the component state
    await wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();

    // Check for preview grid existence
    const previewGrid = wrapper.find('.image-preview-grid');

    expect(
      previewGrid.exists(),
      'Preview grid should exist after file processing',
    ).toBe(true);

    // Verify file preview was generated
    expect(getFilePreviewSpy).toHaveBeenCalledWith(testFile, true);
  });
});
