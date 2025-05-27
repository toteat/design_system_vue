import { ref } from 'vue';

export function useImageConversionWorker() {
  const base64Image = ref('');
  const isLoading = ref(false);
  const error = ref('');

  function convertToBase64(file: File) {
    // Reset previous state
    base64Image.value = '';
    isLoading.value = true;
    error.value = '';

    // Create a web worker
    const worker = new Worker(
      new URL('./imageConversionWorker.ts', import.meta.url),
    );

    return new Promise<string>((resolve, reject) => {
      worker.onmessage = (event) => {
        isLoading.value = false;

        if (event.data.success) {
          base64Image.value = event.data.base64;
          resolve(event.data.base64);
        } else {
          error.value = event.data.error;
          reject(new Error(event.data.error));
        }

        // Terminate the worker
        worker.terminate();
      };

      worker.onerror = (err) => {
        isLoading.value = false;
        error.value = err.message;
        reject(err);
        worker.terminate();
      };

      // Send file to worker
      worker.postMessage({ file });
    });
  }

  return {
    base64Image,
    isLoading,
    error,
    convertToBase64,
  };
}
