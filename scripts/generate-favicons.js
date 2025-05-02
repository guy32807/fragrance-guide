const { favicons } = require('favicons');
const fs = require('fs');
const path = require('path');

const source = './public/icons/favicon-source.svg'; // Source image
const outputDir = './public'; // Output directory

// Configuration
const configuration = {
  path: '/', // Path for generated files
  appName: 'Fragrance Guide',
  appShortName: 'Fragrance',
  appDescription: 'Premium Fragrance Recommendations',
  background: '#ffffff',
  theme_color: '#3a5a40',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: false
  }
};

// Generate favicons
(async () => {
  try {
    console.log('Starting favicon generation...');
    console.log('Using source file:', path.resolve(source));
    
    const response = await favicons(source, configuration);
    
    console.log('Favicons generated successfully');
    console.log('Generated images count:', response.images.length);
    console.log('Generated files count:', response.files.length);
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save files
    console.log('Saving image files...');
    response.images.forEach(image => {
      const filePath = path.join(outputDir, image.name);
      console.log(`Writing: ${filePath}`);
      fs.writeFileSync(filePath, image.contents);
    });
    
    console.log('Saving HTML/JSON files...');
    response.files.forEach(file => {
      const filePath = path.join(outputDir, file.name);
      console.log(`Writing: ${filePath}`);
      fs.writeFileSync(filePath, file.contents);
    });
    
    console.log('Favicon generation completed!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    console.error('Error details:', error.stack);
  }
})();