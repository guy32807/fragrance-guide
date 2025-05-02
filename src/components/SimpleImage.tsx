import React from 'react';
import styled from 'styled-components';
import { getImagePath } from '../constants/paths';

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
}

const SimpleImage: React.FC<SimpleImageProps> = ({ src, alt, className }) => {
  // Get the processed image path
  const imagePath = getImagePath(src);
  
  // Log path for debugging
  console.log(`Loading image: ${src} → ${imagePath}`);
  
  return (
    <Image 
      src={imagePath} 
      alt={alt} 
      className={className} 
      onError={(e) => console.error(`Failed to load image: ${imagePath}`)}
    />
  );
};

export default SimpleImage;