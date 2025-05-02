// Create this new file
export const getImagePath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // In development, use the regular path
  if (process.env.NODE_ENV === 'development') {
    return `/${cleanPath}`;
  }
  
  // In production, prepend the PUBLIC_URL (which will be /fragrance-guide for GitHub Pages)
  return `${process.env.PUBLIC_URL}/${cleanPath}`;
};