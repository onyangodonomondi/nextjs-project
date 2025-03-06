import { getPlaiceholder } from 'plaiceholder';

export async function getBlurDataUrl(imagePath: string) {
  try {
    const { base64 } = await getPlaiceholder(imagePath);
    return base64;
  } catch (err) {
    return null;
  }
} 