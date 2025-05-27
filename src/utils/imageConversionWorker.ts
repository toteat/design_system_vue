// Image conversion web worker
self.onmessage = async (event: MessageEvent) => {
  // Verify the origin of the message
  if (event.origin !== self.location.origin) {
    self.postMessage({ error: 'Unauthorized origin' });
    return;
  }

  const { file } = event.data;

  try {
    // Convert file to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    self.postMessage({
      base64,
      success: true,
    });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : 'Conversion failed',
      success: false,
    });
  }
};
