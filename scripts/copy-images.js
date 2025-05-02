const fs = require('fs');
const path = require('path');

// Paths
const sourceDir = path.resolve(__dirname, '../public/images');
const targetDir = path.resolve(__dirname, '../build/images');

console.log('Copying images from', sourceDir, 'to', targetDir);

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('Created directory:', targetDir);
}

// Check if source directory exists
if (!fs.existsSync(sourceDir)) {
  console.error('Error: Source directory does not exist:', sourceDir);
  process.exit(1);
}

// Get list of files in source directory
const files = fs.readdirSync(sourceDir);

// Copy each file
let copiedCount = 0;
files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  
  // Only copy if it's a file
  if (fs.statSync(sourcePath).isFile()) {
    try {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${file}`);
      copiedCount++;
    } catch (err) {
      console.error(`Error copying ${file}:`, err);
    }
  }
});

console.log(`Done! Copied ${copiedCount} out of ${files.length} files.`);

// List the contents of the target directory
console.log('\nContents of build/images:');
if (fs.existsSync(targetDir)) {
  const buildFiles = fs.readdirSync(targetDir);
  if (buildFiles.length === 0) {
    console.log('Directory is empty!');
  } else {
    buildFiles.forEach(file => {
      console.log(`- ${file}`);
    });
  }
} else {
  console.log('Directory does not exist!');
}