
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
  const iconUrl = `https://zenoramgmt.com/lovable-uploads/a74796bd-128e-406d-96ad-ffb55f18b928.png?v=${timestamp}`;
  
  // Standard favicon
  const newFavicon = document.createElement('link');
  newFavicon.rel = 'icon';
  newFavicon.href = iconUrl;
  newFavicon.type = 'image/png';
  document.head.appendChild(newFavicon);
  
  // Apple touch icon
  const appleTouchIcon = document.createElement('link');
  appleTouchIcon.rel = 'apple-touch-icon';
  appleTouchIcon.href = iconUrl;
  document.head.appendChild(appleTouchIcon);
  
  // Shortcut icon (for IE compatibility)
  const shortcutIcon = document.createElement('link');
  shortcutIcon.rel = 'shortcut icon';
  shortcutIcon.href = iconUrl;
  document.head.appendChild(shortcutIcon);
  
  console.log('All favicon references refreshed at:', new Date().toISOString());
};
