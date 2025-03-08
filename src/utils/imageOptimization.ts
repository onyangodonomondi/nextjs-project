import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs/promises';
import path from 'path';

export async function getBlurDataUrl(imagePath: string) {
  try {
    // Read the file from the public directory
    const file = await fs.readFile(path.join(process.cwd(), 'public', imagePath));
    
    // Get the base64 blur data
    const { base64 } = await getPlaiceholder(file);
    
    return base64;
  } catch (err) {
    console.error('Error generating blur data:', err);
    return null;
  }
} 