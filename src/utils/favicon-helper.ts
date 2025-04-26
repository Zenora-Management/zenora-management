
/**
 * Helper function to ensure favicon is properly refreshed
 * This can be called from main.tsx if needed
 */
export const refreshFavicon = () => {
  // Remove any existing favicons
  const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
  existingFavicons.forEach(favicon => favicon.remove());
  
  // Add fresh favicon links
  const newFavicon = document.createElement('link');
  newFavicon.rel = 'icon';
  newFavicon.href = 'https://zenoramgmt.com/lovable-uploads/a74796bd-128e-406d-96ad-ffb55f18b928.png?v=' + new Date().getTime();
  newFavicon.type = 'image/png';
  document.head.appendChild(newFavicon);
  
  console.log('Favicon refreshed');
};
