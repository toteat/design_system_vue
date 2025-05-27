export declare function useImageConversionWorker(): {
    base64Image: import('vue').Ref<string, string>;
    isLoading: import('vue').Ref<boolean, boolean>;
    error: import('vue').Ref<string, string>;
    convertToBase64: (file: File) => Promise<string>;
};
