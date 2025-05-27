import { ImageStringType } from '../types';
export declare function useImageStringTypeDetector(): {
    getImageStringType: (data: string) => Promise<ImageStringType | undefined>;
    workerStatus: import('vue').ShallowRef<import('@vueuse/core').WebWorkerStatus, import('@vueuse/core').WebWorkerStatus>;
};
