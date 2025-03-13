import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function saveFile(file: File): Promise<string> {
  try {
    // Ensure upload directory exists
    await createUploadDir();

    // Generate unique filename
    const ext = path.extname(file.name);
    const filename = `${uuidv4()}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file
    await writeFile(filepath, buffer);

    // Return relative path for database storage
    return `/uploads/blog/${filename}`;
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error('Failed to save file');
  }
}

async function createUploadDir() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating upload directory:', error);
    throw error;
  }
} 