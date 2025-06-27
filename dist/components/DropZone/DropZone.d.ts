import { FileList, DropZoneProps, FileWithPreview } from '../../types';
type __VLS_Props = DropZoneProps & {
    modelValue?: FileWithPreview[] | null;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {
    /**
     * Get all currently processed files
     * @returns Array of FileWithPreview
     */
    getFiles: () => {
        file: {
            readonly lastModified: number;
            readonly name: string;
            readonly webkitRelativePath: string;
            readonly size: number;
            readonly type: string;
            arrayBuffer: () => Promise<ArrayBuffer>;
            bytes: () => Promise<Uint8Array>;
            slice: (start?: number, end?: number, contentType?: string) => Blob;
            stream: () => ReadableStream<Uint8Array>;
            text: () => Promise<string>;
        };
        name: string;
        preview: string;
    }[];
    /**
     * Clear all files
     */
    clearFiles: () => void;
    /**
     * Add files programmatically
     * @param files FileList or File[]
     */
    addFiles: (files: FileList | globalThis.File[]) => Promise<void>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    [x: `${string}-drop`]: (files: globalThis.FileList) => any;
    [x: `${string}-drop-error`]: (message: string) => any;
    [x: `${string}-remove`]: (file: FileWithPreview) => any;
    "update:modelValue": (files: FileWithPreview[] | null) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    [x: `on${Capitalize<string>}-drop`]: ((files: globalThis.FileList) => any) | undefined;
    [x: `on${Capitalize<string>}-drop-error`]: ((message: string) => any) | undefined;
    [x: `on${Capitalize<string>}-remove`]: ((file: FileWithPreview) => any) | undefined;
    "onUpdate:modelValue"?: ((files: FileWithPreview[] | null) => any) | undefined;
}>, {
    label: string;
    allowedFileTypes: import('../../types').AllowedFileTypes;
    multiple: boolean;
    accept: string;
    displayPreview: boolean;
    displayFileList: boolean;
    modelValue: FileWithPreview[] | null;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    inputRef: globalThis.HTMLInputElement;
}, any>;
export default _default;
