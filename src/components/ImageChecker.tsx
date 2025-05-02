import React, { useState } from 'react';
import styled from 'styled-components';
import { blogPosts } from '../data/BlogPosts';
import { getImagePath } from '../constants/paths';

const CheckerContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 20px;
  margin: 20px 0;
`;

const Title = styled.h3`
  margin-top: 0;
  color: #3a5a40;
`;

const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ImageCard = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
`;

// Use data attributes instead of props for styling
const ImageStatus = styled.div<{ $loaded: boolean, $error: boolean }>`
  color: ${props => props.$loaded ? 'green' : props.$error ? 'red' : 'orange'};
  font-weight: bold;
  margin-top: 8px;
`;

const ActionButton = styled.button`
  background-color: #3a5a40;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin-right: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: #344e41;
  }
`;

const ImageChecker: React.FC = () => {
  const [showChecker, setShowChecker] = useState(false);
  
  if (!showChecker) {
    return (
      <ActionButton onClick={() => setShowChecker(true)}>
        Check Blog Images
      </ActionButton>
    );
  }
  
  return (
    <CheckerContainer>
      <Title>Blog Image Checker</Title>
      <p>This tool checks all blog post images to ensure they're loading correctly.</p>
      
      <ActionButton onClick={() => setShowChecker(false)}>Hide Checker</ActionButton>
      
      <ImageList>
        {blogPosts.map(post => (
          <BlogImageCard key={post.id} post={post} />
        ))}
      </ImageList>
    </CheckerContainer>
  );
};

// Individual image card component
const BlogImageCard: React.FC<{ post: any }> = ({ post }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const imagePath = getImagePath(post.imageUrl);
  
  return (
    <ImageCard>
      <h4>{post.title}</h4>
      <div>Image: {post.imageUrl}</div>
      <div>Resolved: {imagePath}</div>
      
      <img 
        src={imagePath} 
        alt={post.imageAlt}
        style={{ 
          width: '100%', 
          height: '120px', 
          objectFit: 'cover',
          marginTop: '10px',
          display: 'block'
        }}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
      
      {/* Using $ prefix for transient props in styled-components */}
      <ImageStatus $loaded={imageLoaded} $error={imageError}>
        {imageLoaded ? 'Loaded ✅' : imageError ? 'Failed to load ❌' : 'Loading...'}
      </ImageStatus>
    </ImageCard>
  );
};

export default ImageChecker;