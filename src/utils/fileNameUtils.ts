export function generateFileName(originalName: string): string {
  // Remove file extension
  const nameWithoutExt = originalName.split('.')[0];
  
  // Clean the name (remove special characters, replace spaces with hyphens)
  const cleanName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
    
  // Add timestamp and random string
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  
  return `${cleanName}-${timestamp}-${randomString}`;
} 