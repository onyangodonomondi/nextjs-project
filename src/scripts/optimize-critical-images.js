const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// List of critical images to optimize
const criticalImages = [
  'public/images/hero.jpg',
  'public/images/logo.png',
  // Add other critical images
];

async function optimizeCriticalImages() {
  for (const imagePath of criticalImages) {
    if (!fs.existsSync(imagePath)) continue;
    
    const outputPath = imagePath.replace(/\.(jpg|png)$/, '.opt.$1');
    
    await sharp(imagePath)
      .resize(1200) // Reasonable max width
      .jpeg({ quality: 80 })
      .toFile(outputPath);
      
    // Replace original with optimized
    fs.renameSync(outputPath, imagePath);
    console.log(`Optimized: ${imagePath}`);
  }
}

optimizeCriticalImages().catch(console.error); 