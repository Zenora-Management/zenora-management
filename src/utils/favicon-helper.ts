/**
 * Helper function to ensure favicon is properly refreshed
 * This can be called from main.tsx if needed
 */
export const refreshFavicon = () => {
  // Remove any existing favicons
  const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
  existingFavicons.forEach(favicon => favicon.remove());
  
  // Add fresh favicon links with cache-busting parameters
  const timestamp = new Date().getTime();
  const iconUrl = `/zenora-z-favicon.svg?v=${timestamp}`;
  
  // Standard favicon
  const newFavicon = document.createElement('link');
  newFavicon.rel = 'icon';
  newFavicon.href = iconUrl;
  newFavicon.type = 'image/svg+xml';
  document.head.appendChild(newFavicon);
  
  // Apple touch icon
  const appleTouchIcon = document.createElement('link');
  appleTouchIcon.rel = 'apple-touch-icon';
  appleTouchIcon.href = iconUrl;
  document.head.appendChild(appleTouchIcon);
  
  // Safari pinned tab icon
  const maskIcon = document.createElement('link');
  maskIcon.rel = 'mask-icon';
  maskIcon.href = iconUrl;
  maskIcon.setAttribute('color', '#1A1F2C');
  document.head.appendChild(maskIcon);
  
  console.log('All favicon references refreshed at:', new Date().toISOString());
};
