import { ImageStringType } from '../types';
export declare const resetImageState: (imageTypeInfo: {
    value: ImageStringType | null;
}, isLoading: {
    value: boolean;
}, computedImageSrc: {
    value: string | undefined;
}) => void;
export declare const handleBase64Image: (imageSrc: string, imageTypeInfo: {
    value: ImageStringType | null;
}, computedImageSrc: {
    value: string | undefined;
}) => Promise<void>;
export declare const handleUrlImage: (imageSrc: string, imageTypeInfo: {
    value: ImageStringType | null;
}, computedImageSrc: {
    value: string | undefined;
}) => Promise<void>;
export declare const loadImageType: (imageSrc: string | undefined, imageTypeInfo: {
    value: ImageStringType | null;
}, isLoading: {
    value: boolean;
}, hasError: {
    value: boolean;
}, isBase64Image: {
    value: boolean;
}, computedImageSrc: {
    value: string | undefined;
}) => Promise<void>;
export declare function useBase64ImageHandler(): {
    handleBase64ImageInWorker: (imageSrc: string) => Promise<Promise<{
        typeInfo: {
            type: "base64";
            mime: string;
        };
        computedSrc: string | undefined;
    }>>;
    workerStatus: import('vue').ShallowRef<import('@vueuse/core').WebWorkerStatus, import('@vueuse/core').WebWorkerStatus>;
};
