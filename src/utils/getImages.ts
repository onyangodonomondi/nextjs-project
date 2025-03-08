import fs from 'fs';
import path from 'path';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

export async function getImagesFromDirectory(dirPath: string): Promise<ImageItem[]> {
  try {
    const fullPath = path.join(process.cwd(), 'public', dirPath);
    
    if (!fs.existsSync(fullPath)) {
      return [];
    }
    
    const files = fs.readdirSync(fullPath)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort((a, b) => {
        const aNum = parseInt(a.split('.')[0]);
        const bNum = parseInt(b.split('.')[0]);
        return aNum - bNum;
      });

    const images = files.map((file, index) => ({
      id: index + 1,
      src: `${dirPath}/${file}`,
      alt: `Design ${index + 1}`
    }));

    return images;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
} 