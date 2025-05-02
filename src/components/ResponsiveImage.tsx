import React, { useState } from 'react';
import styled from 'styled-components';
import { getImagePath } from '../constants/paths';

const StyledImage = styled.img<{$loaded: boolean}>`
  max-width: 100%;
  height: auto;
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const PlaceholderDiv = styled.div`
  background-color: #f0f0f0;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ 
  src, 
  alt, 
  className, 
  style 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Process the image path
  const imageSrc = getImagePath(src);
  
  if (error) {
    return (
      <PlaceholderDiv>
        Image failed to load
      </PlaceholderDiv>
    );
  }
  
  return (
    <>
      {!loaded && (
        <PlaceholderDiv>
          Loading...
        </PlaceholderDiv>
      )}
      <StyledImage 
        src={imageSrc} 
        alt={alt} 
        className={className} 
        style={{ ...style, display: loaded ? 'block' : 'none' }}
        $loaded={loaded}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  );
};

export default ResponsiveImage;