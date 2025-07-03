// Convert blur hash to data URL for server-side rendering
export function getBlurDataURL(blurHash?: string | null): string {
  if (!blurHash) {
    // Return a default gray blur data URL if no blur hash is available
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=';
  }

  // Create a simple SVG blur placeholder based on the blur hash
  // This is a simplified approach that works for SSR
  const colors = extractColorsFromBlurHash(blurHash);

  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blur-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${colors.secondary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.tertiary};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="20" height="20" fill="url(#blur-gradient)"/>
    </svg>`
  ).toString('base64')}`;
}

// Extract rough colors from blur hash for placeholder
function extractColorsFromBlurHash(blurHash: string): { primary: string; secondary: string; tertiary: string } {
  // This is a very simplified extraction - in a real implementation you'd decode the blur hash properly
  const hash = blurHash.replace(/[^a-zA-Z0-9]/g, '');
  const r1 = parseInt(hash.substring(0, 2), 36) % 256;
  const g1 = parseInt(hash.substring(2, 4), 36) % 256;
  const b1 = parseInt(hash.substring(4, 6), 36) % 256;

  const r2 = parseInt(hash.substring(6, 8), 36) % 256;
  const g2 = parseInt(hash.substring(8, 10), 36) % 256;
  const b2 = parseInt(hash.substring(10, 12), 36) % 256;

  const r3 = parseInt(hash.substring(12, 14), 36) % 256;
  const g3 = parseInt(hash.substring(14, 16), 36) % 256;
  const b3 = parseInt(hash.substring(16, 18), 36) % 256;

  return {
    primary: `rgb(${r1},${g1},${b1})`,
    secondary: `rgb(${r2},${g2},${b2})`,
    tertiary: `rgb(${r3},${g3},${b3})`,
  };
}

// Simpler approach: convert blur hash to CSS blur filter
export function blurHashToDataURL(blurHash: string): string {
  // This is a simple implementation that creates a data URL from the blur hash
  // For production, you might want to use a more sophisticated approach
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=';
  }

  canvas.width = 20;
  canvas.height = 20;

  // Create a simple gradient based on the blur hash
  const gradient = ctx.createLinearGradient(0, 0, 20, 20);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 20, 20);

  return canvas.toDataURL();
}
