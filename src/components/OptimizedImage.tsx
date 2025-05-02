import React from 'react';
import styled from 'styled-components';
import { getImagePath } from '../constants/paths';

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
`;

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A component that uses the optimal GitHub Pages-compatible image paths
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className, 
  style 
}) => {
  const optimizedPath = getImagePath(src);
  
  // For debugging
  console.log(`OptimizedImage: ${src} → ${optimizedPath}`);
  
  return (
    <StyledImage 
      src={optimizedPath} 
      alt={alt} 
      className={className} 
      style={style}
    />
  );
};

export default OptimizedImage;