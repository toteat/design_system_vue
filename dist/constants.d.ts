import { AllowedFileTypes, ComponentSize } from './types';
export declare const COMPONENT_SIZE_MAP: Record<ComponentSize, number>;
export declare const ALLOWED_TYPES_MAP: Record<AllowedFileTypes, {
    types: string[];
    prefix: string;
}>;
export declare const IMAGE_TYPES: string[];
export declare const VIDEO_TYPES: string[];
export declare const TEXT_TYPES: string[];
export declare const ALLOWED_MIME_TYPES: Record<AllowedFileTypes, string>;
export declare const getAllowedMimeTypes: (fileType: AllowedFileTypes) => string;
