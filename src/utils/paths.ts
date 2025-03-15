/**
 * Updates image paths to use the correct directory structure
 */
export function getImagePath(path: string, type: 'logos' | 'projects' | 'team' = 'logos'): string {
  if (!path) return '/images/placeholder.jpg';
  
  // Handle portfolio subdirectories
  if (type === 'logos') {
    // Support both old path formats and new ones
    if (path.startsWith('/images/logos/')) {
      return path.replace('/images/logos/', '/images/portfolio/logos/');
    }
    
    if (!path.includes('/portfolio/logos/')) {
      // If it's a relative path or absolute path without portfolio
      const filename = path.startsWith('/') ? path.split('/').pop() : path;
      return `/images/portfolio/logos/${filename}`;
    }
  }
  
  return path;
} 