/**
 * IMPORTANT IMAGE PATH GUIDELINES
 * -------------------------------
 * 1. Always store images in /public/images/
 * 2. Always reference images without a leading slash: 'images/filename.jpg'
 * 3. Always use the getImagePath() function to resolve paths for GitHub Pages compatibility
 * 4. Never use direct paths like '/images/file.jpg' or './images/file.jpg'
 */

/**
 * Helper function to get image paths that work properly with GitHub Pages
 */
export const getImagePath = (path: string): string => {
  // Remove any leading slash
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // For GitHub Pages deployment, use the PUBLIC_URL
  if (process.env.NODE_ENV === 'production') {
    // Option 1: Use the PUBLIC_URL environment variable
    if (process.env.PUBLIC_URL) {
      return `${process.env.PUBLIC_URL}/${cleanPath}`;
    }
    
    // Option 2: Use a hardcoded GitHub Pages URL
    return `https://guy32807.github.io/fragrance-guide/${cleanPath}`;
  }
  
  // For local development, use the repo path approach
  return `/fragrance-guide/${cleanPath}`;
};

// Simple check if image exists (mainly for debugging)
export const checkImageExistence = async (imagePath: string): Promise<string[]> => {
  const paths = [
    `/${imagePath}`, 
    `/fragrance-guide/${imagePath}`
  ];
  
  return paths; // Just return all paths for now
};