export function generateFilePreview(file: File): string {
  // Get file extension
  const extension = file.name.split('.').pop()?.toUpperCase() || '';

  // Create a canvas to generate a preview
  const canvas = document.createElement('canvas');
  canvas.width = 40;
  canvas.height = 40;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Fill with light gray background
    ctx.fillStyle = '#E0E0E0';
    ctx.fillRect(0, 0, 40, 40);

    // Set text properties
    ctx.fillStyle = '#333';
    ctx.font = 'bold 1rem Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw file extension
    ctx.fillText(extension, 20, 20);
  }

  return canvas.toDataURL();
}

export function getFilePreview(file: File, isImage: boolean): Promise<string> {
  if (isImage) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          resolve(result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return Promise.resolve(generateFilePreview(file));
}
