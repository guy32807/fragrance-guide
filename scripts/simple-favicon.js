const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if ImageMagick is installed
try {
  execSync('convert -version');
  console.log('ImageMagick is installed');
} catch (error) {
  console.error('ImageMagick is not installed. Please install it first.');
  console.error('On macOS: brew install imagemagick');
  process.exit(1);
}

// Source SVG file path
const svgFilePath = path.resolve('./public/icons/favicon-source.svg');

// Create a temporary PNG file
const tempPngPath = path.resolve('./public/temp-favicon.png');

// Run ImageMagick to convert SVG to PNG
try {
  console.log(`Converting SVG to PNG: ${svgFilePath} -> ${tempPngPath}`);
  execSync(`convert ${svgFilePath} ${tempPngPath}`);
  console.log('Conversion successful');
} catch (error) {
  console.error('Error converting SVG to PNG:', error.message);
  process.exit(1);
}

// Create different sized favicons
const sizes = [16, 32, 64, 192, 512];

try {
  // Create favicons of different sizes
  for (const size of sizes) {
    const outputPath = path.resolve(`./public/favicon-${size}x${size}.png`);
    console.log(`Creating ${size}x${size} favicon: ${outputPath}`);
    execSync(`convert ${tempPngPath} -resize ${size}x${size} ${outputPath}`);
  }
  
  // Create favicon.ico (combines 16x16, 32x32, and 64x64)
  console.log('Creating favicon.ico');
  execSync(`convert ./public/favicon-16x16.png ./public/favicon-32x32.png ./public/favicon-64x64.png ./public/favicon.ico`);
  
  // Rename some files to match React's expected names
  fs.renameSync('./public/favicon-192x192.png', './public/logo192.png');
  fs.renameSync('./public/favicon-512x512.png', './public/logo512.png');
  
  // Clean up temporary files
  fs.unlinkSync(tempPngPath);
  fs.unlinkSync('./public/favicon-16x16.png');
  fs.unlinkSync('./public/favicon-32x32.png');
  fs.unlinkSync('./public/favicon-64x64.png');
  
  console.log('Favicon generation completed successfully!');
} catch (error) {
  console.error('Error during favicon generation:', error.message);
}