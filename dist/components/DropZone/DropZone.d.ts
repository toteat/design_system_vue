import { DropZoneProps, FileWithPreview } from '../../types';
declare const _default: import('vue').DefineComponent<DropZoneProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    [x: `${string}-drop`]: (files: globalThis.FileList) => any;
    [x: `${string}-drop-error`]: (message: string) => any;
    [x: `${string}-remove`]: (file: FileWithPreview) => any;
}, string, import('vue').PublicProps, Readonly<DropZoneProps> & Readonly<{
    [x: `on${Capitalize<string>}-drop`]: ((files: globalThis.FileList) => any) | undefined;
    [x: `on${Capitalize<string>}-drop-error`]: ((message: string) => any) | undefined;
    [x: `on${Capitalize<string>}-remove`]: ((file: FileWithPreview) => any) | undefined;
}>, {
    label: string;
    allowedFileTypes: import('../../types').AllowedFileTypes;
    multiple: boolean;
    accept: string;
    displayPreview: boolean;
    displayFileList: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    inputRef: globalThis.HTMLInputElement;
}, any>;
export default _default;
