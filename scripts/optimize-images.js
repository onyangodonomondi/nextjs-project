const { promises: fs } = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

async function optimizeImages() {
  const imagePatterns = ['public/**/*.{jpg,jpeg,png}'];
  
  for (const pattern of imagePatterns) {
    const files = glob.sync(pattern);
    
    for (const file of files) {
      try {
        console.log(`Optimizing ${file}...`);
        const image = sharp(file);
        const metadata = await image.metadata();
        
        // Skip already optimized files
        if (path.basename(file).includes('.opt.')) continue;
        
        const outputPath = file.replace(/\.(jpg|jpeg|png)$/, '.opt.$1');
        
        await image
          .resize({
            width: Math.min(metadata.width, 1920),
            withoutEnlargement: true
          })
          .jpeg({ quality: 80 })
          .toFile(outputPath);
          
        // Replace original with optimized version
        await fs.rename(outputPath, file);
        
      } catch (error) {
        console.error(`Error optimizing ${file}:`, error);
      }
    }
  }
}

optimizeImages().catch(console.error); 