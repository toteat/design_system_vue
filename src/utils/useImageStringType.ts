import type { ImageStringType } from '@/types';
import { useWebWorkerFn } from '@vueuse/core';

export function useImageStringTypeDetector() {
  const { workerFn, workerStatus } = useWebWorkerFn(
    (data: string): ImageStringType | undefined => {
      // Inline all constants and logic
      const DATA_URL_PREFIX = 'data:image/';
      const MIME_PATTERN = /^data:image\/([a-zA-Z0-9]+)(?:;[^;]+)*;base64,/i;
      const BASE64_PATTERN = /^[A-Za-z0-9+/=]+$/;

      if (!data) {
        return undefined;
      }

      try {
        // Check if it's a data URL with base64
        if (data.startsWith(DATA_URL_PREFIX)) {
          const match = data.match(MIME_PATTERN);

          if (!match) {
            return undefined;
          }

          // Extract and validate base64 part
          const base64Part = data.split(',')[1];

          if (!base64Part || !BASE64_PATTERN.test(base64Part)) {
            return undefined;
          }

          const mime = match[1].toLowerCase();

          return { type: 'base64' as const, mime };
        }

        // Check if it's a URL
        new URL(data);
        return { type: 'url' as const, mime: undefined };
      } catch (error) {
        console.info('Invalid base64 string', error);
        return { type: undefined, mime: undefined };
      }
    },
    { timeout: 5000 },
  );

  return { getImageStringType: workerFn, workerStatus };
}
