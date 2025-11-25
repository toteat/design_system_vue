/* eslint-disable @typescript-eslint/no-explicit-any */
class MockDataTransferItem {
  kind = 'file';
  type = '';
  constructor(private _file?: File) {}
  getAsFile() {
    return this._file ?? null;
  }
  getAsString(cb: (data: string) => void) {
    cb('');
  }
  webkitGetAsEntry() {
    return null;
  }
}
class MockDataTransferItemList {
  private _items: any[] = [];
  get length() {
    return this._items.length;
  }
  item(i: number) {
    return this._items[i] ?? null;
  }
  add(file: File) {
    this._items.push(new MockDataTransferItem(file));
  }
  clear() {
    this._items = [];
  }
  remove(i: number) {
    this._items.splice(i, 1);
  }
  [Symbol.iterator]() {
    return (this._items as any)[Symbol.iterator]();
  }
}
class MockDataTransfer {
  items = new MockDataTransferItemList();
  filesArray: File[] = [];
  get files() {
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
  dropEffect = 'none';
  effectAllowed = 'none';
  setData() {}
  getData() {
    return '';
  }
  clearData() {}
  setDragImage() {}
}
if (
  typeof global !== 'undefined' &&
  typeof (global as any).DataTransfer === 'undefined'
) {
  (global as any).DataTransfer = MockDataTransfer;
}

import { describe, it, expect, vi } from 'vitest';
import { validateFileTypes, isFileTypeAllowed } from '../fileTypeUtils';

describe('fileTypeUtils', () => {
  // Mock File creation helper
  function createMockFile(name: string, type: string): File {
    return new File(['test content'], name, { type });
  }

  describe('validateFileTypes', () => {
    it('filters files based on allowed types', async () => {
      // Create a mock FileList manually
      const mockFiles = [
        createMockFile('image1.png', 'image/png'),
        createMockFile('image2.jpg', 'image/jpeg'),
        createMockFile('document.pdf', 'application/pdf'),
      ];

      // Create a mock FileList object
      const fileList = {
        length: mockFiles.length,
        item: (index: number) => mockFiles[index],
        [Symbol.iterator]: function* () {
          for (let i = 0; i < this.length; i++) {
            yield this.item(i);
          }
        },
      } as FileList;

      const validFiles = await validateFileTypes(fileList, 'images');

      expect(validFiles.length).toBe(2);
      expect(validFiles[0].name).toBe('image1.png');
      expect(validFiles[1].name).toBe('image2.jpg');
    });

    it('returns empty array when no files match', async () => {
      // Create a mock FileList manually
      const mockFiles = [
        createMockFile('document.pdf', 'application/pdf'),
        createMockFile('text.txt', 'text/plain'),
      ];

      const fileList = {
        length: mockFiles.length,
        item: (index: number) => mockFiles[index],
        [Symbol.iterator]: function* () {
          for (let i = 0; i < this.length; i++) {
            yield this.item(i);
          }
        },
      } as FileList;

      const validFiles = await validateFileTypes(fileList, 'images');

      expect(validFiles.length).toBe(0);
    });

    it('filters out invalid entries and uses extension fallback', async () => {
      const mockWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const invalidEntry = {} as File;
      const entries = [createMockFile('picture.PNG', ''), invalidEntry];

      const fileList = {
        length: entries.length,
        item: (index: number) => entries[index],
        [Symbol.iterator]: function* () {
          for (let i = 0; i < this.length; i++) {
            yield this.item(i);
          }
        },
      } as FileList;

      const validFiles = await validateFileTypes(fileList, 'images');

      expect(validFiles).toHaveLength(1);
      expect(validFiles[0].name).toBe('picture.PNG');
      expect(mockWarn).toHaveBeenCalledWith(
        'Invalid file object:',
        invalidEntry,
      );

      mockWarn.mockRestore();
    });
  });

  describe('isFileTypeAllowed', () => {
    it('returns true for allowed image types', () => {
      const pngFile = createMockFile('image.png', 'image/png');
      const jpegFile = createMockFile('image.jpg', 'image/jpeg');

      expect(isFileTypeAllowed(pngFile, 'images')).toBe(true);
      expect(isFileTypeAllowed(jpegFile, 'images')).toBe(true);
    });

    it('returns false for disallowed file types', () => {
      const pdfFile = createMockFile('document.pdf', 'application/pdf');
      const txtFile = createMockFile('text.txt', 'text/plain');

      expect(isFileTypeAllowed(pdfFile, 'images')).toBe(false);
      expect(isFileTypeAllowed(txtFile, 'images')).toBe(false);
    });

    it('uses extension match when MIME type is missing', () => {
      const fileWithNoMime = createMockFile(
        'photo.jpeg',
        'application/octet-stream',
      );

      expect(isFileTypeAllowed(fileWithNoMime, 'images')).toBe(true);
    });
  });
});
